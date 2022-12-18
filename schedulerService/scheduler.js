const constants = require('commons').Constants;
var cron = require('node-cron');
const DataStoreClientFactory = require('datastore-clients').DataStoreClientFactory;
const helpers = require('commons').Helpers;
const QueueClientFactory = require('queue-clients').QueueClientFactory;

/**
 * Ideally we should not be using a data store client (eg redis/mongo/etc) directly.
 * We should fetch condigs via a data model (every table at the data store will have a
 * data model). Ideally, Mongodb/dynamodb is a better
 * choice for storing the configs. For POC, using redisp.
 */
const dataStoreClient = DataStoreClientFactory.createDataStoreClient();

/**
 * The scheduler logic is oversimplified here for local demo.
 * Ideally, it will be a lambda which with be triggered at a lowest possible
 * frequency (allowed for a pipeline in the product). And everytime it will
 * read all pipeline configs and find the pipelines that can be triggered at that time
 * and push events to the queue.
 */
(async () => {
    const pipelinesConfigsString =
        await dataStoreClient.get(constants.DATASTORE_TABLES.PIPELINE_CONFIGS);
    const pipelinesConfigs = JSON.parse(pipelinesConfigsString);
    
    console.log('PIPELINES CONFIGS', pipelinesConfigs);
    
    for (const config of pipelinesConfigs) {
        const monitorQueueClient =
            QueueClientFactory.createQueueClient(
                config.pipelineName,
                constants.PIPELINE_STAGES.SOURCE_MONITOR
            );
        cron.schedule(config.schedule, async () => {
            const [ startTimestamp, endTimestamp ] = helpers.getLastTimeWindowForCron(config.schedule);
            console.log(`\ntriggering pipeline ${config.pipelineName} ` +
                `with start time ${startTimestamp} and end time ${endTimestamp}`);
            
                await monitorQueueClient.addToQueue({
                    config,
                    timewindow: {
                        startTimestamp,
                        endTimestamp
                    }
                });
        });
    }
})();
