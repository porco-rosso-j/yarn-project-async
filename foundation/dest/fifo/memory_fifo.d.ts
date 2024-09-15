/**
 * A simple fifo queue. It can grow unbounded. It can have multiple producers and consumers.
 * Putting an item onto the queue always succeeds, unless either end() or cancel() has been called in which case
 * the item being pushed is simply discarded.
 */
export declare class MemoryFifo<T> {
    private log;
    private waiting;
    private items;
    private flushing;
    constructor(log?: import("../log/logger.js").Logger);
    /**
     * Returns the current number of items in the queue.
     * The length represents the size of the queue at the time of invocation and may change as new items are added or consumed.
     *
     * @returns The number of items in the queue.
     */
    length(): number;
    /**
     * Returns next item within the queue, or blocks until an item has been put into the queue.
     *
     * If given a timeout, the promise will reject if no item is received after `timeoutSec` seconds.
     * If the timeout is undefined (default), this call will block until an item is available or the queue is closed.
     * If the timeout is 0 and there are no items available then the queue will immediately reject with a TimeoutError.
     *
     * If the queue is flushing, `null` is returned.
     * @param timeoutSec - The timeout in seconds.
     * @returns A result promise.
     */
    get(timeoutSec?: number): Promise<T | null>;
    /**
     * Put an item onto back of the queue.
     * @param item - The item to enqueue.
     * @returns A boolean indicating whether the item was successfully added to the queue.
     */
    put(item: T): boolean;
    /**
     * Once ended, no further items are added to queue. Consumers will consume remaining items within the queue.
     * The queue is not reusable after calling `end()`.
     * Any consumers waiting for an item receive null.
     */
    end(): void;
    /**
     * Once cancelled, all items are discarded from the queue, and no further items are added to the queue.
     * The queue is not reusable after calling `cancel()`.
     * Any consumers waiting for an item receive null.
     */
    cancel(): void;
    /**
     * Process items from the queue using a provided handler function.
     * The function iterates over items in the queue, invoking the handler for each item until the queue is empty and flushing.
     * If the handler throws an error, it will be caught and logged as 'Queue handler exception:', but the iteration will continue.
     * The process function returns a promise that resolves when there are no more items in the queue and the queue is flushing.
     *
     * @param handler - A function that takes an item of type T and returns a Promise<void> after processing the item.
     * @returns A Promise<void> that resolves when the queue is finished processing.
     */
    process(handler: (item: T) => Promise<void>): Promise<void>;
}
//# sourceMappingURL=memory_fifo.d.ts.map