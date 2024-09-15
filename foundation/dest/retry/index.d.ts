/** An error that indicates that the operation should not be retried. */
export declare class NoRetryError extends Error {
}
/**
 * Generates a backoff sequence for retrying operations with an increasing delay.
 * The backoff sequence follows this pattern: 1, 1, 1, 2, 4, 8, 16, 32, 64, ...
 * This generator can be used in combination with the `retry` function to perform
 * retries with exponential backoff and capped at 64 seconds between attempts.
 *
 * @returns A generator that yields the next backoff value in seconds as an integer.
 */
export declare function backoffGenerator(): Generator<number, void, unknown>;
/**
 * Generates a backoff sequence based on the array of retry intervals to use with the `retry` function.
 * @param retries - Intervals to retry (in seconds).
 * @returns A generator sequence.
 */
export declare function makeBackoff(retries: number[]): Generator<number, void, unknown>;
/**
 * Retry a given asynchronous function with a specific backoff strategy, until it succeeds or backoff generator ends.
 * It logs the error and retry interval in case an error is caught. The function can be named for better log output.
 *
 * @param fn - The asynchronous function to be retried.
 * @param name - The optional name of the operation, used for logging purposes.
 * @param backoff - The optional backoff generator providing the intervals in seconds between retries. Defaults to a predefined series.
 * @param log - Logger to use for logging.
 * @param failSilently - Do not log errors while retrying.
 * @returns A Promise that resolves with the successful result of the provided function, or rejects if backoff generator ends.
 * @throws If `NoRetryError` is thrown by the `fn`, it is rethrown.
 */
export declare function retry<Result>(fn: () => Promise<Result>, name?: string, backoff?: Generator<number, void, unknown>, log?: import("../log/logger.js").Logger, failSilently?: boolean): Promise<Result>;
/**
 * Retry an asynchronous function until it returns a truthy value or the specified timeout is exceeded.
 * The function is retried periodically with a fixed interval between attempts. The operation can be named for better error messages.
 * Will never timeout if the value is 0.
 *
 * @param fn - The asynchronous function to be retried, which should return a truthy value upon success or undefined otherwise.
 * @param name - The optional name of the operation, used for generating timeout error message.
 * @param timeout - The optional maximum time, in seconds, to keep retrying before throwing a timeout error. Defaults to 0 (never timeout).
 * @param interval - The optional interval, in seconds, between retry attempts. Defaults to 1 second.
 * @returns A Promise that resolves with the successful (truthy) result of the provided function, or rejects if timeout is exceeded.
 */
export declare function retryUntil<T>(fn: () => Promise<T | undefined>, name?: string, timeout?: number, interval?: number): Promise<NonNullable<Awaited<T>>>;
//# sourceMappingURL=index.d.ts.map