const BullQueueClient = require('./bullQueueClient');

class QueueClientFactory {
    static createQueueClient(queueName) {
        const connectionConfig = {}; // local setup
        
        // if we change the client in future, we init a different client object here
        return new BullQueueClient(queueName, connectionConfig);
    }
}

module.exports = QueueClientFactory;
