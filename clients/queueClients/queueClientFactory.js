const BullQueueClient = require('./bullQueueClient');

class QueueClientFactory {
    static createQueueClient(queueName) {
        // if we change the client in future, we init a different client object here
        return new BullQueueClient(queueName);
    }
}

module.exports = QueueClientFactory;