import { BufferReader } from '@aztec/foundation/serialize';
import { type EncryptedL2Log } from './encrypted_l2_log.js';
import { type EncryptedL2NoteLog } from './encrypted_l2_note_log.js';
import { type TxL2Logs } from './tx_l2_logs.js';
import { type UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Data container of logs emitted in all txs in a given L2 block.
 */
export declare abstract class L2BlockL2Logs<TLog extends UnencryptedL2Log | EncryptedL2NoteLog | EncryptedL2Log> {
    /**
     * An array containing logs emitted in individual function invocations in this tx.
     */
    readonly txLogs: TxL2Logs<TLog>[];
    constructor(
    /**
     * An array containing logs emitted in individual function invocations in this tx.
     */
    txLogs: TxL2Logs<TLog>[]);
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
     * Gets the total number of logs emitted from all the TxL2Logs.
     */
    getTotalLogCount(): number;
    /**
     * Seralizes logs into a string.
     * @returns A string representation of the serialized logs.
     */
    toString(): string;
    /**
     * Convert a L2BlockL2Logs class object to a plain JSON object.
     * @returns A plain object with L2BlockL2Logs properties.
     */
    toJSON(): {
        txLogs: {
            functionLogs: {
                logs: object[];
            }[];
        }[];
    };
    /**
     * Checks if two L2BlockL2Logs objects are equal.
     * @param other - Another L2BlockL2Logs object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other: L2BlockL2Logs<TLog>): boolean;
    /**
     * Returns the total number of log entries across an array of L2BlockL2Logs.
     * @param l2BlockL2logs - L2BlockL2Logs to sum over.
     * @returns Total sum of log entries.
     */
    static getTotalLogCount<TLog extends UnencryptedL2Log | EncryptedL2NoteLog | EncryptedL2Log>(l2BlockL2logs: L2BlockL2Logs<TLog>[]): number;
}
export declare class EncryptedNoteL2BlockL2Logs extends L2BlockL2Logs<EncryptedL2NoteLog> {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedNoteL2BlockL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): EncryptedNoteL2BlockL2Logs;
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data: string): EncryptedNoteL2BlockL2Logs;
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs: number, numCalls: number, numLogsPerCall: number): EncryptedNoteL2BlockL2Logs;
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs: (EncryptedNoteL2BlockL2Logs | undefined)[]): EncryptedL2NoteLog[];
}
export declare class EncryptedL2BlockL2Logs extends L2BlockL2Logs<EncryptedL2Log> {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj: any): EncryptedL2BlockL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): EncryptedL2BlockL2Logs;
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data: string): EncryptedL2BlockL2Logs;
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs: number, numCalls: number, numLogsPerCall: number): EncryptedL2BlockL2Logs;
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs: (EncryptedL2BlockL2Logs | undefined)[]): EncryptedL2Log[];
}
export declare class UnencryptedL2BlockL2Logs extends L2BlockL2Logs<UnencryptedL2Log> {
    /**
     * Convert a plain JSON object to a L2BlockL2Logs class object.
     * @param obj - A plain L2BlockL2Logs JSON object.
     * @returns A L2BlockL2Logs class object.
     */
    static fromJSON(obj: any): UnencryptedL2BlockL2Logs;
    /**
     * Deserializes logs from a buffer.
     * @param buffer - The buffer containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): UnencryptedL2BlockL2Logs;
    /**
     * Deserializes logs from a string.
     * @param data - The string containing the serialized logs.
     * @returns A new `L2BlockL2Logs` object.
     */
    static fromString(data: string): UnencryptedL2BlockL2Logs;
    /**
     * Creates a new `L2BlockL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each function
     * call.
     * @param numTxs - The number of txs in the block.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `L2BlockL2Logs` object.
     */
    static random(numTxs: number, numCalls: number, numLogsPerCall: number): UnencryptedL2BlockL2Logs;
    /**
     * Unrolls logs from a set of blocks.
     * @param blockLogs - Input logs from a set of blocks.
     * @returns Unrolled logs.
     */
    static unrollLogs(blockLogs: (UnencryptedL2BlockL2Logs | undefined)[]): UnencryptedL2Log[];
}
//# sourceMappingURL=l2_block_l2_logs.d.ts.map