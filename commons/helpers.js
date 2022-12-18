var cronParser = require('cron-parser');

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
        startTimestamp,
        endTimestamp
    ]
};
