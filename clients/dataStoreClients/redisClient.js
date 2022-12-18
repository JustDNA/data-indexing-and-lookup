const BaseDataStoreClient = require('./baseDataStoreClient');
const redis = require('redis');

class RedisClient extends BaseDataStoreClient {
    constructor(connectionConfig = {}) {
        super(connectionConfig);
        this._client = redis.createClient();
    }

    /**
     * @method (abstract) get
     * @description get value of a key
     * @param {String} key
     * @returns {Object} value
     */
    async get(key) {
        await this._client.connect();
        const value = await this._client.get(key);
        await this._client.disconnect();
        return value;
    }

    /**
     * @method (abstract) set
     * @description set value of a key
     * @param {String} key
     * @param {String} value
     * @returns null
     */
    async set(key, value) {
        await this._client.connect();
        await this._client.set(key, value);
        await this._client.disconnect();
    }
}

module.exports = RedisClient;
