class BaseQueueClient {
    constructor(queueName) {
        this._queueName = queueName;
    }

    /**
     * @method (abstract) addToQueue
     * @description adds job item to a queue
     * @param {Object} job item 
     * @returns null
     */
    addToQueue(item) {
        throw new Error('Implementation not available for addToQueue');
    }

    /**
     * @method (abstract) listenToQueue
     * @description listens to items in queue and triggers handler
     * @param {Function} handler handler function
     * @returns null
     */
    listenToQueue(handler) {
        throw new Error('Implementation not available for listenToQueue');
    }
}

module.exports = BaseQueueClient;
