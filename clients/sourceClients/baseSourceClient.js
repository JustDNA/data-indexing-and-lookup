class BaseSourceClient {
    /**
     * Init source client with source config
     */
    constructor(sourceConfig) {
        this._sourceConfig = sourceConfig;
    }

    /**
     * @method (abstract) listSourceFiles
     * @description List files at the source that were created/updated
     * in given time window
     * @param {Number} startTimestamp
     * @param {Number} endTimestamp
     * @returns {Map<String, Number>} Map of file name to modified timestamp
     */
    async listSourceFiles(startTimestamp, endTimestamp) {
        throw new Error('Implementation not available for listSourceFiles');
    }

    /**
     * @method (abstract) getFileMetadata
     * @description gets metadata info of a source file
     * @param {Object} sourceFileLocation file location
     * @returns {Object} file metadata
     */
    async getFileMetadata(sourceFileLocation) {
        throw new Error('Implementation not available for listenToQueue');
    }

    /**
     * @method (abstract) getFileUniqueId
     * @description gets a unique identifier for a file, can
     * be from source or generated from composite params
     * @param {Object} sourceFileLocation file location
     * @returns {String} id
     */
    async getFileUniqueId(sourceFileLocation) {
        throw new Error('Implementation not available for listenToQueue');
    }

    /**
     * @method (abstract) getFile
     * @description gets a source file
     * @param {Object} sourceFileLocation file location
     * @returns {Object} file
     */
    async getFile(sourceFileLocation) {
        throw new Error('Implementation not available for listenToQueue');
    }
}

module.exports = BaseSourceClient;
