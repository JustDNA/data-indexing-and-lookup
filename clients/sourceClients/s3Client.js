const AWS = require('aws-sdk');
const BaseSourceClient = require('./baseSourceClient');
const util = require('util');

class S3Client extends BaseSourceClient {
    /**
     * Init source client with source config
     */
    constructor(sourceConfig) {
        super(sourceConfig);
        /**
         * In case of non local setup, we
         * will have to assume necessary role and get temp creds for the AWS
         * object. For local POC, skipping the step since aws is already configured
         * in host machone
         */
        this._s3 = new AWS.S3();
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
        const params = { 
            Bucket: this._sourceConfig.bucket
        }
     
        /**
         * 1 issue here: AWS S3 API does not support time based ordering or filtering.
         * So we have to filter by time on client side.
         */

        /**
         * For POC, not paginating. 1000 results we get in 1st page is sufficient
         */
        const response = await util.promisify(this._s3.listObjects).bind(this._s3)(params);

        // client side filtering of files modified in given time window
        const filesList = response.Contents.filter(file => {
            const modifiedTimestamp = new Date(file.LastModified).getTime();
            return modifiedTimestamp >= startTimestamp && modifiedTimestamp < endTimestamp;
        });

        return filesList;
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
