class BaseSourceClient {
    /**
     * Init source client with connection config if applies
     */
    constructor(connectionConfig = {}) {
        this._connectionConfig = connectionConfig;
    }

    /**
     * @method (abstract) listSourceFiles
     * @description List files at the source that were created/updated
     * in given time window
     * @param {Object} sourceLocation location of source files. eg: a particular directory
     * @param {Number} startTimestamp
     * @param {Number} endTimestamp
     * @returns {Map<String, Number>} Map of file name to modified timestamp
     */
    async listSourceFiles(sourceLocation, startTimestamp, endTimestamp) {
        throw new Error('Implementation not available for listSourceFiles');
    }

    /**
     * @method (abstract) getFileMetadata
     * @description gets metadata info of a source file
     * @param {Object} sourceFileLocation file location
     * @returns {Object} file metadata
     */
    getFileMetadata(sourceFileLocation) {
        throw new Error('Implementation not available for listenToQueue');
    }

    /**
     * @method (abstract) getFile
     * @description gets a source file
     * @param {Object} sourceFileLocation file location
     * @returns {Object} file
     */
    getFile(sourceFileLocation) {
        throw new Error('Implementation not available for listenToQueue');
    }
}

module.exports = BaseSourceClient;
