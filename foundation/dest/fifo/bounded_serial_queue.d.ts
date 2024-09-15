/**
 * Leverages the unbounded SerialQueue and Semaphore to create a SerialQueue that will block when putting an item
 * if the queue size = maxQueueSize.
 */
export declare class BoundedSerialQueue {
    private log;
    private readonly queue;
    private semaphore;
    constructor(maxQueueSize: number, log?: import("../log/logger.js").Logger);
    /**
     * Initializes the underlying SerialQueue instance, allowing items to be processed from the queue.
     * The start method should be called before using the BoundedSerialQueue to ensure proper functionality.
     */
    start(): void;
    /**
     * Returns the current number of items in the queue.
     * This is useful for monitoring the size of BoundedSerialQueue and understanding its utilization.
     *
     * @returns The length of the queue as an integer value.
     */
    length(): number;
    /**
     * Cancels the current operation in the SerialQueue, if any, and clears the queue.
     * Any pending tasks in the queue will not be executed, and the queue will be emptied.
     * This method is useful for cleaning up resources and stopping ongoing processes when they are no longer needed.
     * @returns A promise, resolved once cancelled.
     */
    cancel(): Promise<void>;
    /**
     * Ends the queue processing gracefully, preventing new items from being added.
     * The currently executing item, if any, will complete and remaining queued items
     * will be processed in order. Once all items have been processed, the queue becomes
     * permanently unusable.
     *
     * @returns A promise that resolves when all items in the queue have been processed.
     */
    end(): Promise<void>;
    /**
     * The caller will block until fn is successfully enqueued.
     * The fn itself is execute asynchronously and its result discarded.
     * TODO(AD) do we need this if we have exec()?
     * @param fn - The function to call once unblocked.
     */
    put(fn: () => Promise<void>): Promise<void>;
    /**
     * The caller will block until fn is successfully executed, and it's result returned.
     * @param fn - The function.
     * @returns A promise that resolves with the result once executed.
     */
    exec<T>(fn: () => Promise<T>): Promise<T>;
    /**
     * Awaiting this ensures the queue is empty before resuming.
     */
    syncPoint(): Promise<void>;
}
//# sourceMappingURL=bounded_serial_queue.d.ts.map