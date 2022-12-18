const constants = require('commons').Constants;
const SourceClientFactory = require('source-clients').SourceClientFactory;
const textract = require('textract');
const QueueClientFactory = require('queue-clients').QueueClientFactory;
const util = require('util');

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

const fetchTextFromFile = async (fileType, fileBuffer) => {
    try {
        const text =
            await util.promisify(textract.fromBufferWithMime)(fileType, fileBuffer);
        console.log(text);
    } catch (err) {
        console.log(err);
    }
}

const jobHandler = async (job) => {
    console.info(`\n\nIndexing file ${JSON.stringify(job.data.file)}`);
    const fileData = await fetchFile(job.data);
    if (fileData.type !== 'image/jpeg') {
        return;
    }
    const text = await fetchTextFromFile(fileData.type, fileData.buffer);
}

indexerQueueClient.listenToQueue(jobHandler);
