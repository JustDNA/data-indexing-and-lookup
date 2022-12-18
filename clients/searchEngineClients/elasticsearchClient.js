const BaseSearchEngineClient = require('./baseSearchEngineClient');
const constants = require('commons').Constants;
const { Client } = require('@elastic/elasticsearch')

class ElasticsearchClient extends BaseSearchEngineClient {
    constructor(connectionConfig = {}) {
        super(connectionConfig);
        this._client = new Client(connectionConfig);
    }

    /**
     * @method (abstract) indexText
     * @description index the given text data to a given search engine index
     * @param {String} data text data to be indexed
     * @param {Object} metadata metadata information of the file
     * @param {String} index (optional) search engine index name
     * @returns null
     */
    async indexText(data, metadata, index = constants.DEFAULT_SEARCH_ENGINE_INDEX_NAME) {
        await this._client.index({
            index,
            document: {
                metadata,
                data
            }
          });
        console.log(`Data indexed successfully for ${JSON.stringify(metadata)}`);
    }

    /**
     * @method (abstract) searchText
     * @description search for text in the given index and return hits (source information)
     * @param {String} searchText text data to be searched
     * @param {String} index (optional) search engine index name
     * @returns {Object} source information
     */
    async searchText(searchText, index = constants.DEFAULT_SEARCH_ENGINE_INDEX_NAME) {
        const result = await this._client.search({
            index,
            query: {
                match: {
                data: searchText
                }
            }
        });
        return result;
    }
}

module.exports = ElasticsearchClient;
