const constants = require('commons').Constants;

/**
 * Abstract class
 */
class BaseSearchEngineClient {
    /**
     * Init search engine client with connection config if applies
     */
    constructor(connectionConfig = {}) {
        this._connectionConfig = connectionConfig;
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
        throw new Error('Implementation not available for indexText');
    }

    /**
     * @method (abstract) searchText
     * @description search for text in the given index and return hits (source information)
     * @param {String} searchText text data to be searched
     * @param {String} index (optional) search engine index name
     * @returns {Object} source information
     */
    async searchText(searchText, index = constants.DEFAULT_SEARCH_ENGINE_INDEX_NAME) {
        throw new Error('Implementation not available for searchText');
    }
}

module.exports = BaseSearchEngineClient;
