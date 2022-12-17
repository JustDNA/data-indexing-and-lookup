const QueueClientFactory = require('queue-clients').QueueClientFactory;
const constants = require('commons').Constants;

const queueClient = QueueClientFactory.createQueueClient(constants.S3_QUEUE_NAME);

(async () => {
    const mockJobs = 10
    for (let i = 0; i < mockJobs; i++) {
        const data = {
            message: `execute job ${i}`,
            param: i
        }
        await queueClient.addToQueue(data);
    }
})();
