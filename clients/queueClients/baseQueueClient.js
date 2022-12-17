class BaseQueueClient {
    /**
     * Init queue client with queue name, connection config if applies
     */
    constructor(queueName, connectionConfig = {}) {
        this._queueName = queueName;
        this._connectionConfig = connectionConfig;
    }

    /**
     * @method (abstract) addToQueue
     * @description adds job item to a queue
     * @param {Object} job item 
     * @returns null
     */
    async addToQueue(item) {
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
