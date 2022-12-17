const BaseDataStoreClient = require('./baseDataStoreClient');

import { createClient } from 'redis';

class RedisClient extends BaseDataStoreClient {
    constructor(connectionConfig = {}) {
        super(connectionConfig);
        this._client = createClient();
    }

    /**
     * @method (abstract) get
     * @description get value of a key
     * @param {String} key
     * @returns {Object} value
     */
    async get(key) {
        await client.connect();
        const value = await client.get(key);
        await client.disconnect();
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
        await client.connect();
        await client.set(key, value);
        await client.disconnect();
    }
}

module.exports = RedisClient;
