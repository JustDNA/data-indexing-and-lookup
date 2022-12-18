const QueueClientFactory = require('queue-clients').QueueClientFactory;
const constants = require('commons').Constants;

const PIPELINE_NAME = process.env.PIPELINE_NAME;
if (!PIPELINE_NAME) {
    throw new Error(`PIPELINE_NAME env var needs to be set for monitor service`);
}

const indexerQueueClient = QueueClientFactory.createQueueClient(
    PIPELINE_NAME,
    constants.PIPELINE_STAGES.FILE_INDEXING
);

const jobHandler = async (job) => {
    console.info(`running job! with id ${job.id}`);
}

indexerQueueClient.listenToQueue(jobHandler);
