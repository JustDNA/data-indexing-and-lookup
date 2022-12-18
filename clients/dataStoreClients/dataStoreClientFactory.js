const RedisClient = require('./redisClient');

class DataStoreClientFactory {
    static createDataStoreClient() {
        const connectionConfig = {}; // local setup
        
        // if we change the client in future, we init a different client object here
        return new RedisClient(connectionConfig);
    }
}

module.exports = DataStoreClientFactory;
