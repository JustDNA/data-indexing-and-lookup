/**
 * This is a helper lib quickly put together.
 * Ideally, we will have more cron/time related operations.
 * Similarly more around file classification and processing operations.
 * All time and cron related functionalities can become their own module.
 * File related operations can become their own module and
 * even their own service component.
 */

var cronParser = require('cron-parser');
const textract = require('textract');
const util = require('util');

/**
 * @method getLastTimeWindowForCron
 * @description Given cron expression, this method returns
 * the last time window. For example, the cron represents an hourly
 * frequency, at 06:01:37, this would return the timestamp equivalent
 * for the window [05:00:00, 06:00:00]
 * @param {String} cronExpression 
 * @returns [startTimestamp, endTimestamp]
 */
exports.getLastTimeWindowForCron = function(cronExpression) {
    const interval = cronParser.parseExpression(cronExpression);
    interval.prev();
    const prevIntervalStart = interval.prev();
    const startTimestamp = new Date(prevIntervalStart).getTime();
    
    const prevIntervalEnd = interval.next();
    const endTimestamp = new Date(prevIntervalEnd).getTime();

    return [
        0, // TEMP
        endTimestamp
    ]
};

/**
 * @method getTextFromFile
 * @description Given file type and buffer, this method returns
 * the text contents of a file. The list of supported file types
 * are listed here: https://www.npmjs.com/package/textract/v/2.4.0#currently-extracts
 * @param {String} fileType 
 * @param {Buffer} fileBuffer 
 * @returns {String} text contents of the file
 */
exports.getTextFromFile = async function(fileType, fileBuffer) {
    return await util.promisify(textract.fromBufferWithMime)(fileType, fileBuffer);
};
