import { TimeoutError } from '../error/index.js';
import { createDebugLogger } from '../log/index.js';
/**
 * A simple fifo queue. It can grow unbounded. It can have multiple producers and consumers.
 * Putting an item onto the queue always succeeds, unless either end() or cancel() has been called in which case
 * the item being pushed is simply discarded.
 */
export class MemoryFifo {
    constructor(log = createDebugLogger('aztec:foundation:memory_fifo')) {
        this.log = log;
        this.waiting = [];
        this.items = [];
        this.flushing = false;
    }
    /**
     * Returns the current number of items in the queue.
     * The length represents the size of the queue at the time of invocation and may change as new items are added or consumed.
     *
     * @returns The number of items in the queue.
     */
    length() {
        return this.items.length;
    }
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
    get(timeoutSec) {
        if (this.items.length) {
            return Promise.resolve(this.items.shift());
        }
        if (this.items.length === 0 && this.flushing) {
            return Promise.resolve(null);
        }
        // if the caller doesn't want to wait for an item to be available
        // immediately reject with a Timeout error
        if (timeoutSec === 0) {
            return Promise.reject(new TimeoutError('Timeout getting item from queue.'));
        }
        return new Promise((resolve, reject) => {
            this.waiting.push(resolve);
            if (timeoutSec) {
                setTimeout(() => {
                    const index = this.waiting.findIndex(r => r === resolve);
                    if (index > -1) {
                        this.waiting.splice(index, 1);
                        const err = new TimeoutError('Timeout getting item from queue.');
                        reject(err);
                    }
                }, timeoutSec * 1000);
            }
        });
    }
    /**
     * Put an item onto back of the queue.
     * @param item - The item to enqueue.
     * @returns A boolean indicating whether the item was successfully added to the queue.
     */
    put(item) {
        if (this.flushing) {
            this.log.warn('Discarding item because queue is flushing');
            return false;
        }
        else if (this.waiting.length) {
            this.waiting.shift()(item);
            return true;
        }
        else {
            this.items.push(item);
            return true;
        }
    }
    /**
     * Once ended, no further items are added to queue. Consumers will consume remaining items within the queue.
     * The queue is not reusable after calling `end()`.
     * Any consumers waiting for an item receive null.
     */
    end() {
        this.flushing = true;
        this.waiting.forEach(resolve => resolve(null));
    }
    /**
     * Once cancelled, all items are discarded from the queue, and no further items are added to the queue.
     * The queue is not reusable after calling `cancel()`.
     * Any consumers waiting for an item receive null.
     */
    cancel() {
        this.flushing = true;
        this.items = [];
        this.waiting.forEach(resolve => resolve(null));
    }
    /**
     * Process items from the queue using a provided handler function.
     * The function iterates over items in the queue, invoking the handler for each item until the queue is empty and flushing.
     * If the handler throws an error, it will be caught and logged as 'Queue handler exception:', but the iteration will continue.
     * The process function returns a promise that resolves when there are no more items in the queue and the queue is flushing.
     *
     * @param handler - A function that takes an item of type T and returns a Promise<void> after processing the item.
     * @returns A Promise<void> that resolves when the queue is finished processing.
     */
    async process(handler) {
        try {
            while (true) {
                const item = await this.get();
                if (item === null) {
                    break;
                }
                await handler(item);
            }
        }
        catch (err) {
            this.log.error('Queue handler exception', err);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5X2ZpZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlmby9tZW1vcnlfZmlmby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBS3JCLFlBQW9CLE1BQU0saUJBQWlCLENBQUMsOEJBQThCLENBQUM7UUFBdkQsUUFBRyxHQUFILEdBQUcsQ0FBb0Q7UUFKbkUsWUFBTyxHQUFpQyxFQUFFLENBQUM7UUFDM0MsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBRXFELENBQUM7SUFFL0U7Ozs7O09BS0c7SUFDSSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLEdBQUcsQ0FBQyxVQUFtQjtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLDBDQUEwQztRQUMxQyxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNCLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztvQkFDekQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7d0JBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDO2dCQUNILENBQUMsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxHQUFHLENBQUMsSUFBTztRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQzthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEdBQUc7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTTtRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFtQztRQUN0RCxJQUFJLENBQUM7WUFDSCxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUNaLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsTUFBTTtnQkFDUixDQUFDO2dCQUNELE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0NBQ0YifQ==