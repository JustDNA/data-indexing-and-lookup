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
    const pipelineConfig = job.data;
    const sourceClient = SourceClientFactory.createSourceClient(
                            pipelineConfig.sourceType, pipelineConfig.sourceConfig
                        );
    const sourceFilesToIndex = await sourceClient.listSourceFiles();
    for (const file of sourceFilesToIndex) {
        console.log(`\n\nEnquing file to be indexed: ${JSON.stringify(file)}`);
        await indexerQueueClient.addToQueue({
            pipelineConfig,
            file
        });   
    }
}

monitorQueueClient.listenToQueue(monitorHandler);
