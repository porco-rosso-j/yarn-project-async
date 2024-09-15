/**
 * InterruptibleSleep is a utility class that allows you to create an interruptible sleep function.
 * The sleep function can be interrupted at any time by calling the `interrupt` method, which can
 * also specify whether the sleep should throw an error or just return. This is useful when you need
 * to terminate long-running processes or perform cleanup tasks in response to external events.
 *
 * @example
 * const sleeper = new InterruptibleSleep();
 *
 * async function longRunningTask() \{
 *   try \{
 *     await sleeper.sleep(3000);
 *     console.log('Task completed after 3 seconds');
 *   \} catch (e) \{
 *     console.log('Task was interrupted');
 *   \}
 * \}
 *
 * setTimeout(() =\> sleeper.interrupt(true), 1500); // Interrupt the sleep after 1.5 seconds
 */
export declare class InterruptibleSleep {
    private interrupts;
    /**
     * Sleep for a specified amount of time in milliseconds.
     * The sleep function will pause the execution of the current async function
     * for the given time period, allowing other tasks to run before resuming.
     *
     * @param ms - The number of milliseconds to sleep.
     * @returns A Promise that resolves after the specified time has passed.
     */
    sleep(ms: number): Promise<void>;
    /**
     * Interrupts the current sleep operation and optionally throws an error if specified.
     * By default, when interrupted, the sleep operation will resolve without throwing.
     * If 'sleepShouldThrow' is set to true, the sleep operation will throw an InterruptError instead.
     *
     * @param sleepShouldThrow - A boolean value indicating whether the sleep operation should throw an error when interrupted. Default is false.
     */
    interrupt(sleepShouldThrow?: boolean): void;
}
/**
 * Puts the current execution context to sleep for a specified duration.
 * This simulates a blocking sleep operation by using an asynchronous function and a Promise that resolves after the given duration.
 * The sleep function can be interrupted by the 'interrupt' method of the InterruptibleSleep class.
 *
 * @param ms - The duration in milliseconds for which the sleep operation should last.
 * @param returnValue - The return value of the promise.
 * @returns A Promise that resolves after the specified duration, allowing the use of 'await' to pause execution.
 */
export declare function sleep<T>(ms: number, returnValue?: T): Promise<T | undefined>;
//# sourceMappingURL=index.d.ts.map