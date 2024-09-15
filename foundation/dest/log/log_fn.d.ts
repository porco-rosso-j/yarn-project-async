/** Structured log data to include with the message. */
export type LogData = Record<string, string | number | bigint | boolean | {
    toString(): string;
}>;
/** A callable logger instance. */
export type LogFn = (msg: string, data?: LogData) => void;
//# sourceMappingURL=log_fn.d.ts.map