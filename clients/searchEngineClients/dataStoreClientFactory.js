const ElasticsearchClient = require('./elasticsearchClient');

class SearchEngineClientFactory {
    static createSearchEngineClient() {
        const connectionConfig = { node: 'http://localhost:9200' }; // local setup
        
        // if we change the client in future, we init a different client object here
        return new ElasticsearchClient(connectionConfig);
    }
}

module.exports = SearchEngineClientFactory;
