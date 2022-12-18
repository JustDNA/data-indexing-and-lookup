const constants = require('commons').Constants;
const helpers = require('commons').Helpers;
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

const fetchFile = async (eventData) => {
    const config = eventData.config;
    const sourceClient = SourceClientFactory.createSourceClient(
                            config.sourceType, config.sourceConfig
                        );
    return await sourceClient.getFile(eventData.file);
}

const jobHandler = async (job) => {
    console.info(`\n\nIndexing file ${JSON.stringify(job.data.file)}`);
    const fileData = await fetchFile(job.data);
    const text = await helpers.getTextFromFile(fileData.type, fileData.buffer);
    console.log(text);
}

indexerQueueClient.listenToQueue(jobHandler);
