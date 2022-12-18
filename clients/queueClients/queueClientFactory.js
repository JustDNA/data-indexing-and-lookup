const BullQueueClient = require('./bullQueueClient');

class QueueClientFactory {
    static createQueueClient(pipelineName, pipelineStage) {
        const connectionConfig = {}; // local setup
        
        const queueName = `${pipelineName}|${pipelineStage}`;
        // if we change the client in future, we init a different client object here
        return new BullQueueClient(queueName, connectionConfig);
    }
}

module.exports = QueueClientFactory;
