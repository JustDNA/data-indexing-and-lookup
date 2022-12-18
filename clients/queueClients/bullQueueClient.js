const Bull = require('bull');
const BaseQueueClient = require('./baseQueueClient');

class BullQueueClient extends BaseQueueClient {
    constructor(queueName, connectionConfig = {}) {
        super(queueName, connectionConfig);
        this._queue = new Bull(queueName);
        this._options = {
            removeOnComplete: true,
            delay: 1000, // in ms
            attempts: 3,
            backoff: 60000 // static 1 min delay between retries
        };
    }

    /**
     * @method addToQueue
     * @description adds job item to a queue
     * @param {Object} job item 
     * @returns null
     */
    async addToQueue(item) {
        const job = await this._queue.add(item, this._options);
        console.log('Enqueued job using bull queue', job.data);
    }

    _handlerCompleted(job) {
        console.info(
            `Job in ${job.queue.name} completed for: ${job.id}`
        )
        job.remove()
    }
    
    _handlerFailure(job, err) {
        if (job.attemptsMade >= job.opts.attempts) {
            console.info(
                `Retries exhausted in ${job.queue.name} for: ${job.id}`,
                err
            )
            return null
        }
        console.info(
            `Job in ${job.queue.name} failed for: ${job.id} with ${err.message
            }. ${job.opts.attempts - job.attemptsMade} attempts left`
        )
    }
    
    _handlerStalled(job) {
        console.info(
            `Job in ${job.queue.name} stalled for: ${job.id}`
        )
    }

    /**
     * @method listenToQueue
     * @description listens to job item in queue and triggers handler
     * @param {Function} handler handler function
     * @returns null
     */
    listenToQueue(handler) {
        this._queue.process(async (job) => {
            return await handler(job);
          });
        this._queue.on('failed', this._handlerFailure);
        this._queue.on('completed', this._handlerCompleted);
        this._queue.on('stalled', this._handlerStalled);
    }
}

module.exports = BullQueueClient;
