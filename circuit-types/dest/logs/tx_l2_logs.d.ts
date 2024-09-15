import { type LogHash } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
import { type EncryptedL2Log } from './encrypted_l2_log.js';
import { type EncryptedL2NoteLog } from './encrypted_l2_note_log.js';
import { type FunctionL2Logs } from './function_l2_logs.js';
import { type UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Data container of logs emitted in 1 tx.
 */
export declare abstract class TxL2Logs<TLog extends UnencryptedL2Log | EncryptedL2NoteLog | EncryptedL2Log> {
    /** * An array containing logs emitted in individual function invocations in this tx. */
    readonly functionLogs: FunctionL2Logs<TLog>[];
    abstract hash(): Buffer;
    constructor(
    /** * An array containing logs emitted in individual function invocations in this tx. */
    functionLogs: FunctionL2Logs<TLog>[]);
    /**
     * Serializes logs into a buffer.
     * @returns A buffer containing the serialized logs.
     */
    toBuffer(): Buffer;
    /**
     * Get the total length of serialized data.
     * @returns Total length of serialized data.
     */
    getSerializedLength(): number;
    /**
     * Get the total length of all chargable data (raw log data + 4 for each log)
     * TODO: Rename this? getChargableLength? getDALength?
     * @returns Total length of data.
     */
    getKernelLength(): number;
    /** Gets the total number of logs. */
    getTotalLogCount(): number;
    /**
     * Adds function logs to the existing logs.
     * @param functionLogs - The function logs to add
     * @remarks Used by sequencer to append unencrypted logs emitted in public function calls.
     */
    addFunctionLogs(functionLogs: FunctionL2Logs<TLog>[]): void;
    /**
     * Convert a TxL2Logs class object to a plain JSON object.
     * @returns A plain object with TxL2Logs properties.
     */
    toJSON(): {
        functionLogs: {
            logs: object[];
        }[];
    };
    /**
     * Unrolls logs from this tx.
     * @returns Unrolled logs.
     */
    unrollLogs(): TLog[];
    /**
     * Checks if two TxL2Logs objects are equal.
     * @param other - Another TxL2Logs object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other: TxL2Logs<TLog>): boolean;
    /**
     * Filter the logs from functions from this TxL2Logs that
     * appear in the provided logHashes
     * @param logHashes hashes we want to keep
     * @param output our aggregation
     * @returns our aggregation
     */
    filter(logHashes: LogHash[], output: TxL2Logs<TLog>): TxL2Logs<TLog>;
}
export declare class UnencryptedTxL2Logs extends TxL2Logs<UnencryptedL2Log> {
    /** Creates an empty instance. */
    static empty(): UnencryptedTxL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf: Buffer | BufferReader, isLengthPrefixed?: boolean): UnencryptedTxL2Logs;
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls: number, numLogsPerCall: number): UnencryptedTxL2Logs;
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj: any): UnencryptedTxL2Logs;
    /**
     * Computes unencrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelUnencryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash(): Buffer;
}
export declare class EncryptedNoteTxL2Logs extends TxL2Logs<EncryptedL2NoteLog> {
    /** Creates an empty instance. */
    static empty(): EncryptedNoteTxL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf: Buffer | BufferReader, isLengthPrefixed?: boolean): EncryptedNoteTxL2Logs;
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls: number, numLogsPerCall: number): EncryptedNoteTxL2Logs;
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedNoteTxL2Logs;
    /**
     * Computes encrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelNoteEncryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash(): Buffer;
}
export declare class EncryptedTxL2Logs extends TxL2Logs<EncryptedL2Log> {
    /** Creates an empty instance. */
    static empty(): EncryptedTxL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf: Buffer | BufferReader, isLengthPrefixed?: boolean): EncryptedTxL2Logs;
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls: number, numLogsPerCall: number): EncryptedTxL2Logs;
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedTxL2Logs;
    /**
     * Computes encrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelEncryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash(): Buffer;
}
//# sourceMappingURL=tx_l2_logs.d.ts.map