const QueueClientFactory = require('queue-clients').QueueClientFactory;
const constants = require('commons').Constants;

const queueClient = QueueClientFactory.createQueueClient(constants.S3_QUEUE_NAME);

const jobHandler = async (job) => {
    console.info(`running job! with id ${job.id}`);
}

queueClient.listenToQueue(jobHandler);
