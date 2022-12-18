const constants = require('commons').Constants;
var cron = require('node-cron');
const DataStoreClientFactory = require('datastore-clients').DataStoreClientFactory;
const QueueClientFactory = require('queue-clients').QueueClientFactory;

const queueClient = QueueClientFactory.createQueueClient(constants.S3_QUEUE_NAME);

/**
 * Ideally we should not be using a data store client (eg redis/mongo/etc) directly.
 * We should fetch condigs via a data model (every table at the data store will have a
 * data model). For POC, using redis client directly
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
        await dataStoreClient.get(constants.DATASTORE_TABLES.PILELINE_CONFIGS);
    const pipelinesConfigs = JSON.parse(pipelinesConfigsString);
    console.log('CONFIGS', pipelinesConfigs);
    for (const config of pipelinesConfigs) {
        cron.schedule(config.schedule, async () => {
            console.log('triggering pipeline', pipelineName);
            await queueClient.addToQueue(data);
        });
    }
})();
