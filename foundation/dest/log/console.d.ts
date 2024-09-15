import { type LogFn } from './log_fn.js';
/**
 * Creates a Logger function with an optional prefix for log messages.
 * If a prefix is provided, the created logger will prepend it to each log message.
 * If no prefix is provided, the default console.log will be returned.
 *
 * @param prefix - The optional string to prepend to each log message.
 * @returns A Logger function that accepts any number of arguments and logs them with the specified prefix.
 */
export declare function createConsoleLogger(prefix?: string): LogFn;
//# sourceMappingURL=console.d.ts.map