class BaseDataStoreClient {
    /**
     * Init data store client with connection config if applies
     */
    constructor(connectionConfig = {}) {
        this._connectionConfig = connectionConfig;
    }

    /**
     * @method (abstract) get
     * @description get value of a key
     * @param {String} key
     * @returns {Object} value
     */
    async get(key) {
        throw new Error('Implementation not available for get');
    }

    /**
     * @method (abstract) set
     * @description set value of a key
     * @param {String} key
     * @param {String} value
     * @returns null
     */
    async set(key, value) {
        throw new Error('Implementation not available for listenToQueue');
    }
}

module.exports = BaseDataStoreClient;
