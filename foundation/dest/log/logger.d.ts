import { type LogData, type LogFn } from './log_fn.js';
declare const LogLevels: readonly ["silent", "error", "warn", "info", "verbose", "debug"];
/**
 * A valid log severity level.
 */
export type LogLevel = (typeof LogLevels)[number];
export declare const currentLevel: "silent" | "error" | "warn" | "info" | "verbose" | "debug";
/** Log function that accepts an exception object */
type ErrorLogFn = (msg: string, err?: Error | unknown, data?: LogData) => void;
/**
 * Logger that supports multiple severity levels.
 */
export type Logger = {
    [K in LogLevel]: LogFn;
} & {
    error: ErrorLogFn;
};
/**
 * Logger that supports multiple severity levels and can be called directly to issue a debug statement.
 * Intended as a drop-in replacement for the debug module.
 */
export type DebugLogger = Logger;
/**
 * Creates a new DebugLogger for the current module, defaulting to the LOG_LEVEL env var.
 * If DEBUG="[module]" env is set, will enable debug logging if the module matches.
 * Uses npm debug for debug level and console.error for other levels.
 * @param name - Name of the module.
 * @returns A debug logger.
 */
export declare function createDebugLogger(name: string): DebugLogger;
/** A callback to capture all logs. */
export type LogHandler = (level: LogLevel, namespace: string, msg: string, data?: LogData) => void;
/**
 * Registers a callback for all logs, whether they are emitted in the current log level or not.
 * @param handler - Callback to be called on every log.
 */
export declare function onLog(handler: LogHandler): void;
export {};
//# sourceMappingURL=logger.d.ts.map