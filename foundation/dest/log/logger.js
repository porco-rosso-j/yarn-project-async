import debug from 'debug';
const LogLevels = ['silent', 'error', 'warn', 'info', 'verbose', 'debug'];
const DefaultLogLevel = process.env.NODE_ENV === 'test' ? 'silent' : 'info';
const envLogLevel = process.env.LOG_LEVEL?.toLowerCase();
export const currentLevel = LogLevels.includes(envLogLevel) ? envLogLevel : DefaultLogLevel;
const namespaces = process.env.DEBUG ?? 'aztec:*';
debug.enable(namespaces);
/**
 * Creates a new DebugLogger for the current module, defaulting to the LOG_LEVEL env var.
 * If DEBUG="[module]" env is set, will enable debug logging if the module matches.
 * Uses npm debug for debug level and console.error for other levels.
 * @param name - Name of the module.
 * @returns A debug logger.
 */
export function createDebugLogger(name) {
    const debugLogger = debug(name);
    const logger = {
        silent: () => { },
        error: (msg, err, data) => logWithDebug(debugLogger, 'error', fmtErr(msg, err), data),
        warn: (msg, data) => logWithDebug(debugLogger, 'warn', msg, data),
        info: (msg, data) => logWithDebug(debugLogger, 'info', msg, data),
        verbose: (msg, data) => logWithDebug(debugLogger, 'verbose', msg, data),
        debug: (msg, data) => logWithDebug(debugLogger, 'debug', msg, data),
    };
    return Object.assign((msg, data) => logWithDebug(debugLogger, 'debug', msg, data), logger);
}
const logHandlers = [];
/**
 * Registers a callback for all logs, whether they are emitted in the current log level or not.
 * @param handler - Callback to be called on every log.
 */
export function onLog(handler) {
    logHandlers.push(handler);
}
/**
 * Logs args to npm debug if enabled or log level is debug, console.error otherwise.
 * @param debug - Instance of npm debug.
 * @param level - Intended log level.
 * @param args - Args to log.
 */
function logWithDebug(debug, level, msg, data) {
    for (const handler of logHandlers) {
        handler(level, debug.namespace, msg, data);
    }
    msg = data ? `${msg} ${fmtLogData(data)}` : msg;
    if (debug.enabled && LogLevels.indexOf(level) <= LogLevels.indexOf(currentLevel)) {
        debug('[%s] %s', level.toUpperCase(), msg);
    }
}
/**
 * Concatenates a log message and an exception.
 * @param msg - Log message
 * @param err - Error to log
 * @returns A string with both the log message and the error message.
 */
function fmtErr(msg, err) {
    const errStr = err && [err.name, err.message].filter(x => !!x).join(' ');
    return err ? `${msg}: ${errStr || err}` : msg;
}
/**
 * Formats structured log data as a string for console output.
 * @param data - Optional log data.
 */
function fmtLogData(data) {
    return Object.entries(data ?? {})
        .map(([key, value]) => `${key}=${typeof value === 'object' && 'toString' in value ? value.toString() : value}`)
        .join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBSTFCLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVUsQ0FBQztBQUNuRixNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFFLFFBQWtCLENBQUMsQ0FBQyxDQUFFLE1BQWdCLENBQUM7QUFPbEcsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFjLENBQUM7QUFDckUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO0FBRTVGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztBQUNsRCxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBZ0J6Qjs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBWTtJQUM1QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEMsTUFBTSxNQUFNLEdBQUc7UUFDYixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztRQUNoQixLQUFLLEVBQUUsQ0FBQyxHQUFXLEVBQUUsR0FBYSxFQUFFLElBQWMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDakgs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