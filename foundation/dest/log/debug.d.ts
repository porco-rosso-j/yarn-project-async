import { type LogFn } from './log_fn.js';
/**
 * Return a logger, meant to be silent by default and verbose during debugging.
 * @param name - The module name of the logger.
 * @returns A callable log function.
 */
export declare function createDebugOnlyLogger(name: string): LogFn;
/**
 * Set a function to be called before each log message is handled by the debug logger.
 * The hook function will receive the logger namespace and any arguments passed to the logger.
 * This can be useful for adding additional context, filtering logs, or performing side-effects
 * based on logged messages.
 *
 * @param fn - The function to be called before each log message.
 */
export declare function setPreDebugLogHook(fn: (...args: any[]) => void): void;
/**
 * Set a callback function to be executed after each log is written by the debug logger.
 * This allows additional behavior or side effects to occur after a log has been written,
 * such as sending logs to external services, formatting output, or triggering events.
 *
 * @param fn - The callback function to be executed after each log. It receives the same arguments as the original log function call.
 */
export declare function setPostDebugLogHook(fn: (...args: any[]) => void): void;
/**
 * Enable logs for the specified namespace(s) or wildcard pattern(s).
 * This function activates the logging functionality for the given
 * namespace(s) or pattern(s), allowing developers to selectively display
 * debug logs that match the provided string(s).
 *
 * @param str - The namespace(s) or wildcard pattern(s) for which logs should be enabled.
 */
export declare function enableLogs(str: string): void;
/**
 * Check if the logging is enabled for a given namespace.
 * The input 'str' represents the namespace for which the log status is being checked.
 * Returns true if the logging is enabled, otherwise false.
 *
 * @param str - The namespace string used to determine if logging is enabled.
 * @returns A boolean indicating whether logging is enabled for the given namespace.
 */
export declare function isLogEnabled(str: string): boolean;
/**
 * Format a debug string filling in `'{0}'` entries with their
 * corresponding values from the args array, amd `'{}'` with the whole array.
 *
 * @param formatStr - str of form `'this is a string with some entries like {0} and {1}'`
 * @param args - array of fields to fill in the string format entries with
 * @returns formatted string
 */
interface Printable {
    toString(): string;
}
export declare function applyStringFormatting(formatStr: string, args: Printable[]): string;
export {};
//# sourceMappingURL=debug.d.ts.map