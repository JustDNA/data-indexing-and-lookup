const constants = require('commons').Constants;
var cron = require('node-cron');
const SourceClientFactory = require('source-clients').SourceClientFactory;
const QueueClientFactory = require('queue-clients').QueueClientFactory;

const queueClient = QueueClientFactory.createQueueClient(constants.S3_QUEUE_NAME);
const s3Client = SourceClientFactory.createSourceClient(constants.DATASOURCES.S3);

const SOURCE_BUCKET = 'borneo-assignment-test-bucket';
const SCHEDULE = '*/2 * * * * *';
const SCHEDULE2 = '*/4 * * * * *';

cron.schedule(SCHEDULE, async () => {
    console.log('task 1');
    // const files = await s3Client.listSourceFiles({
    //     bucket: SOURCE_BUCKET
    // });
    // console.log(`Files list`, files);
    //     await queueClient.addToQueue(data);
});

cron.schedule(SCHEDULE2, async () => {
    console.log('task 2');
    // const files = await s3Client.listSourceFiles({
    //     bucket: SOURCE_BUCKET
    // });
    // console.log(`Files list`, files);
    //     await queueClient.addToQueue(data);
});
