const S3Client = require('./s3Client');
const constants = require('commons').Constants;

class SourceClientFactory {
    static createSourceClient(datasourceType) {
        switch (datasourceType) {
            case constants.DATASOURCES.S3:
                const connectionConfig = {}; // local setup
                return new S3Client(connectionConfig);        
                break;
            default:
                break;
        }
    }
}

module.exports = SourceClientFactory;
