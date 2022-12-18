const constants = require('commons').Constants;
const SourceClientFactory = require('source-clients').SourceClientFactory;
const QueueClientFactory = require('queue-clients').QueueClientFactory;

const PIPELINE_NAME = process.env.PIPELINE_NAME;
if (!PIPELINE_NAME) {
    throw new Error(`PIPELINE_NAME env var needs to be set for monitor service`);
}

const indexerQueueClient = QueueClientFactory.createQueueClient(
    PIPELINE_NAME,
    constants.PIPELINE_STAGES.FILE_INDEXING
);

const jobHandler = async (job) => {
    console.info(`\n\nIndexing file ${JSON.stringify(job.data.file)}`);
    const pipelineConfig = job.data.config;
    const sourceClient = SourceClientFactory.createSourceClient(
                            pipelineConfig.sourceType, pipelineConfig.sourceConfig
                        );
    const fileData = await sourceClient.getFile(job.data.file);
    console.log(`FILE DATA`, fileData);
}

indexerQueueClient.listenToQueue(jobHandler);
