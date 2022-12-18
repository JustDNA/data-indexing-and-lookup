const constants = require('commons').Constants;
const helpers = require('commons').Helpers;
const SearchEngineClientFactory = require('search-engine-clients').SearchEngineClientFactory;
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

const indexFileData = async (text, metadata, fileUniqueId) => {
    const searchEngineClient = SearchEngineClientFactory.createSearchEngineClient();
    await searchEngineClient.indexText(text, metadata, fileUniqueId);
};

const jobHandler = async (job) => {
    console.info(`\n\nIndexing file ${JSON.stringify(job.data.file)}`);
    
    const config = job.data.config;
    const sourceClient = SourceClientFactory.createSourceClient(
                            config.sourceType, config.sourceConfig
                        );
    const fileData = await sourceClient.getFile(job.data.file);
    const fileMetadata = await sourceClient.getFileMetadata(job.data.file);
    const fileUniqueId = await sourceClient.getFileUniqueId(job.data.file);

    const text = await helpers.getTextFromFile(fileData.type, fileData.buffer);
    
    await indexFileData(text, fileMetadata, fileUniqueId);
}

indexerQueueClient.listenToQueue(jobHandler);
