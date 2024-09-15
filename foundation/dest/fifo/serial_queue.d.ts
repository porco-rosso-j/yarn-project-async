/**
 * A more specialized fifo queue that enqueues functions to execute. Enqueued functions are executed in serial.
 */
export declare class SerialQueue {
    private readonly queue;
    private runningPromise;
    /**
     * Initializes the execution of enqueued functions in the serial queue.
     * Functions are executed in the order they were added to the queue, with each function
     * waiting for the completion of the previous one before starting its execution.
     * This method should be called once to start processing the queue.
     */
    start(): void;
    /**
     * Returns the current number of enqueued functions in the serial queue.
     * This provides a way to check the size of the queue and monitor its progress.
     *
     * @returns The length of the serial queue as a number.
     */
    length(): number;
    /**
     * Cancels the processing of the remaining functions in the serial queue and resolves the running promise.
     * Any enqueued functions that have not yet been executed will be discarded. The queue can still accept new
     * functions after cancellation, but the previously enqueued functions will not be re-processed.
     *
     * @returns The running promise which resolves when the current executing function (if any) completes.
     */
    cancel(): Promise<void>;
    /**
     * Signals the SerialQueue that it should finish processing its current task and stop accepting new tasks.
     * The returned Promise resolves when all enqueued tasks have completed execution.
     *
     * @returns A Promise that resolves when the queue is completely emptied and no new tasks are allowed.
     */
    end(): Promise<void>;
    /**
     * Enqueues fn for execution on the serial queue.
     * Returns the result of the function after execution.
     * @param fn - The function to enqueue.
     * @returns A resolution promise. Rejects if the function does, or if the function could not be enqueued.
     */
    put<T>(fn: () => Promise<T>): Promise<T>;
    /**
     * Awaiting this ensures the queue is empty before resuming.
     */
    syncPoint(): Promise<void>;
}
//# sourceMappingURL=serial_queue.d.ts.map