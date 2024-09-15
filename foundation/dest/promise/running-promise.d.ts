/**
 * RunningPromise is a utility class that helps manage the execution of an asynchronous function
 * at a specified polling interval. It allows starting, stopping, and checking the status of the
 * internally managed promise. The class also supports interrupting the polling process when stopped.
 */
export declare class RunningPromise {
    private fn;
    private pollingIntervalMS;
    private running;
    private runningPromise;
    private interruptibleSleep;
    constructor(fn: () => void | Promise<void>, pollingIntervalMS?: number);
    /**
     * Starts the running promise.
     */
    start(): void;
    /**
     * Stops the running promise, resolves any pending interruptible sleep,
     * and waits for the currently executing function to complete.
     */
    stop(): Promise<void>;
    /**
     * Checks if the running promise is currently active.
     * @returns True if the promise is running.
     */
    isRunning(): boolean;
}
//# sourceMappingURL=running-promise.d.ts.map