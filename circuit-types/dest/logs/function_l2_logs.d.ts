import { EncryptedL2Log } from './encrypted_l2_log.js';
import { EncryptedL2NoteLog } from './encrypted_l2_note_log.js';
import { UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Data container of logs emitted in 1 function invocation (corresponds to 1 kernel iteration).
 */
export declare abstract class FunctionL2Logs<TLog extends UnencryptedL2Log | EncryptedL2NoteLog | EncryptedL2Log> {
    /**
     * An array of logs.
     */
    readonly logs: TLog[];
    constructor(
    /**
     * An array of logs.
     */
    logs: TLog[]);
    /**
     * Serializes all function logs into a buffer.
     * @returns A buffer containing the serialized logs.
     * @remarks Each log is prefixed with 4 bytes for its length, then all the serialized logs are concatenated and
     *          the resulting buffer is prefixed with 4 bytes for its total length.
     */
    toBuffer(): Buffer;
    /**
     * Get the total length of all serialized data
     * @returns Total length of serialized data.
     */
    getSerializedLength(): number;
    /**
     * Get the total length of all chargable data (raw log data + 4 for each log)
     * TODO: Rename this? getChargableLength? getDALength?
     * @returns Total length of data.
     */
    getKernelLength(): number;
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash(): Buffer;
    /**
     * Convert a FunctionL2Logs class object to a plain JSON object.
     * @returns A plain object with FunctionL2Logs properties.
     */
    toJSON(): {
        logs: object[];
    };
}
export declare class EncryptedNoteFunctionL2Logs extends FunctionL2Logs<EncryptedL2NoteLog> {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty(): EncryptedNoteFunctionL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf: Buffer, isLengthPrefixed?: boolean): EncryptedNoteFunctionL2Logs;
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new EncryptedNoteFunctionL2Logs object.
     */
    static random(numLogs: number): EncryptedNoteFunctionL2Logs;
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedNoteFunctionL2Logs;
}
export declare class EncryptedFunctionL2Logs extends FunctionL2Logs<EncryptedL2Log> {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty(): EncryptedFunctionL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf: Buffer, isLengthPrefixed?: boolean): EncryptedFunctionL2Logs;
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new EncryptedFunctionL2Logs object.
     */
    static random(numLogs: number): EncryptedFunctionL2Logs;
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedFunctionL2Logs;
}
export declare class UnencryptedFunctionL2Logs extends FunctionL2Logs<UnencryptedL2Log> {
    /**
     * Creates an empty L2Logs object with no logs.
     * @returns A new FunctionL2Logs object with no logs.
     */
    static empty(): UnencryptedFunctionL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns Deserialized instance of `FunctionL2Logs`.
     */
    static fromBuffer(buf: Buffer, isLengthPrefixed?: boolean): UnencryptedFunctionL2Logs;
    /**
     * Creates a new L2Logs object with `numLogs` logs.
     * @param numLogs - The number of logs to create.
     * @returns A new UnencryptedFunctionL2Logs object.
     */
    static random(numLogs: number): UnencryptedFunctionL2Logs;
    /**
     * Convert a plain JSON object to a FunctionL2Logs class object.
     * @param obj - A plain FunctionL2Logs JSON object.
     * @returns A FunctionL2Logs class object.
     */
    static fromJSON(obj: any): UnencryptedFunctionL2Logs;
}
//# sourceMappingURL=function_l2_logs.d.ts.map