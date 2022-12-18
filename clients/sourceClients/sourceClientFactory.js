const S3Client = require('./s3Client');
const constants = require('commons').Constants;

class SourceClientFactory {
    static createSourceClient(sourceType, sourceConfig) {
        switch (sourceType) {
            case constants.DATASOURCES.S3:
                return new S3Client(sourceConfig);        
                break;
            default:
                break;
        }
    }
}

module.exports = SourceClientFactory;
