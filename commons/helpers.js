var cronParser = require('cron-parser');

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
