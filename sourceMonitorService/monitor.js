const constants = require('commons').Constants;
const SourceClientFactory = require('source-clients').SourceClientFactory;
const QueueClientFactory = require('queue-clients').QueueClientFactory;

const PIPELINE_NAME = process.env.PIPELINE_NAME;
if (!PIPELINE_NAME) {
    throw new Error(`PIPELINE_NAME env var needs to be set for monitor service`);
}

const monitorQueueClient = QueueClientFactory.createQueueClient(
                                PIPELINE_NAME,
                                constants.PIPELINE_STAGES.SOURCE_MONITOR
                            );
const indexerQueueClient = QueueClientFactory.createQueueClient(
                                PIPELINE_NAME,
                                constants.PIPELINE_STAGES.FILE_INDEXING
                            );

const monitorHandler = async (job) => {
    const config = job.data.config;
    const startTimestamp = job.data.timewindow.startTimestamp;
    const endTimestamp = job.data.timewindow.endTimestamp;
    const sourceClient = SourceClientFactory.createSourceClient(
                            config.sourceType, config.sourceConfig
                        );
    const sourceFilesToIndex = await sourceClient.listSourceFiles(startTimestamp, endTimestamp);
    
    if (sourceFilesToIndex.length < 1) {
        console.log(`\n\nNo files have been modified at source. skipping...`);
        return;
    }
    
    for (const file of sourceFilesToIndex) {
        console.log(`\n\nEnquing file to be indexed: ${JSON.stringify(file)}`);
        await indexerQueueClient.addToQueue({
            config,
            file
        });   
    }
}

monitorQueueClient.listenToQueue(monitorHandler);
