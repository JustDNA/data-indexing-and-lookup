const AWS = require('aws-sdk');
const BaseSourceClient = require('./baseSourceClient');
const util = require('util');

class S3Client extends BaseSourceClient {
    /**
     * Init source client with connection config if applies
     */
    constructor(connectionConfig = {}) {
        super(connectionConfig);
        /**
         * In case of non local setup, using this._connectionConfig we
         * will have to assume necessary role and get temp creds for the AWS
         * object
         */
        this._s3 = new AWS.S3();
    }

    /**
     * @method (abstract) listSourceFiles
     * @description List files at the source that were created/updated
     * in given time window
     * @param {Object} sourceLocation location of source files. eg: a bucket
     * @param {Number} startTimestamp
     * @param {Number} endTimestamp
     * @returns {Map<String, Number>} Map of file name to modified timestamp
     */
    async listSourceFiles(sourceLocation, startTimestamp, endTimestamp) {
        const params = { 
            Bucket: sourceLocation.bucket,
            Delimiter: '/',
            Prefix: sourceLocation.prefix
        }
     
        /**
         * 1 issue here: AWS S3 API does not support time based ordering or filtering.
         * So we have to filter by time on client side.
         */

        /**
         * For POC, not paginating. 1000 results we get in 1st page is sufficient
         */
        const s3ListObjects = await util.promisify(this._s3.listObjects).bind(this._s3)(params);
        
        return s3ListObjects;
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

module.exports = S3Client;
