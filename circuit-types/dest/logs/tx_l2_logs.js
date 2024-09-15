import { Fr, MAX_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX, } from '@aztec/circuits.js';
import { sha256Trunc } from '@aztec/foundation/crypto';
import { BufferReader, prefixBufferWithLength } from '@aztec/foundation/serialize';
import isEqual from 'lodash.isequal';
import { EncryptedFunctionL2Logs, EncryptedNoteFunctionL2Logs, UnencryptedFunctionL2Logs, } from './function_l2_logs.js';
/**
 * Data container of logs emitted in 1 tx.
 */
export class TxL2Logs {
    constructor(
    /** * An array containing logs emitted in individual function invocations in this tx. */
    functionLogs) {
        this.functionLogs = functionLogs;
    }
    /**
     * Serializes logs into a buffer.
     * @returns A buffer containing the serialized logs.
     */
    toBuffer() {
        const serializedFunctionLogs = this.functionLogs.map(logs => logs.toBuffer());
        // Concatenate all serialized function logs into a single buffer and prefix it with 4 bytes for its total length.
        return prefixBufferWithLength(Buffer.concat(serializedFunctionLogs));
    }
    /**
     * Get the total length of serialized data.
     * @returns Total length of serialized data.
     */
    getSerializedLength() {
        return this.functionLogs.reduce((acc, logs) => acc + logs.getSerializedLength(), 0) + 4;
    }
    /**
     * Get the total length of all chargable data (raw log data + 4 for each log)
     * TODO: Rename this? getChargableLength? getDALength?
     * @returns Total length of data.
     */
    getKernelLength() {
        return this.functionLogs.reduce((acc, logs) => acc + logs.getKernelLength(), 0);
    }
    /** Gets the total number of logs. */
    getTotalLogCount() {
        return this.functionLogs.reduce((acc, logs) => acc + logs.logs.length, 0);
    }
    /**
     * Adds function logs to the existing logs.
     * @param functionLogs - The function logs to add
     * @remarks Used by sequencer to append unencrypted logs emitted in public function calls.
     */
    addFunctionLogs(functionLogs) {
        this.functionLogs.push(...functionLogs);
    }
    /**
     * Convert a TxL2Logs class object to a plain JSON object.
     * @returns A plain object with TxL2Logs properties.
     */
    toJSON() {
        return {
            functionLogs: this.functionLogs.map(log => log.toJSON()),
        };
    }
    /**
     * Unrolls logs from this tx.
     * @returns Unrolled logs.
     */
    unrollLogs() {
        return this.functionLogs.flatMap(functionLog => functionLog.logs);
    }
    /**
     * Checks if two TxL2Logs objects are equal.
     * @param other - Another TxL2Logs object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other) {
        return isEqual(this, other);
    }
    /**
     * Filter the logs from functions from this TxL2Logs that
     * appear in the provided logHashes
     * @param logHashes hashes we want to keep
     * @param output our aggregation
     * @returns our aggregation
     */
    filter(logHashes, output) {
        for (const fnLogs of this.functionLogs) {
            let include = false;
            for (const log of fnLogs.logs) {
                if (logHashes.findIndex(lh => lh.value.equals(Fr.fromBuffer(log.getSiloedHash()))) !== -1) {
                    include = true;
                }
            }
            if (include) {
                output.addFunctionLogs([fnLogs]);
            }
        }
        return output;
    }
}
export class UnencryptedTxL2Logs extends TxL2Logs {
    /** Creates an empty instance. */
    static empty() {
        return new UnencryptedTxL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = BufferReader.asReader(buf);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const serializedFunctionLogs = reader.readBufferArray(logsBufLength);
        const functionLogs = serializedFunctionLogs.map(logs => UnencryptedFunctionL2Logs.fromBuffer(logs, false));
        return new UnencryptedTxL2Logs(functionLogs);
    }
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls, numLogsPerCall) {
        if (numCalls * numLogsPerCall > MAX_UNENCRYPTED_LOGS_PER_TX) {
            throw new Error(`Trying to create ${numCalls * numLogsPerCall} logs for one tx (max: ${MAX_UNENCRYPTED_LOGS_PER_TX})`);
        }
        const functionLogs = [];
        for (let i = 0; i < numCalls; i++) {
            functionLogs.push(UnencryptedFunctionL2Logs.random(numLogsPerCall));
        }
        return new UnencryptedTxL2Logs(functionLogs);
    }
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj) {
        const functionLogs = obj.functionLogs.map((log) => UnencryptedFunctionL2Logs.fromJSON(log));
        return new UnencryptedTxL2Logs(functionLogs);
    }
    /**
     * Computes unencrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelUnencryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash() {
        const unrolledLogs = this.unrollLogs();
        if (unrolledLogs.length == 0) {
            return Buffer.alloc(32);
        }
        let flattenedLogs = Buffer.alloc(0);
        for (const logsFromSingleFunctionCall of unrolledLogs) {
            flattenedLogs = Buffer.concat([flattenedLogs, logsFromSingleFunctionCall.getSiloedHash()]);
        }
        // pad the end of logs with 0s
        for (let i = 0; i < MAX_UNENCRYPTED_LOGS_PER_TX - unrolledLogs.length; i++) {
            flattenedLogs = Buffer.concat([flattenedLogs, Buffer.alloc(32)]);
        }
        return sha256Trunc(flattenedLogs);
    }
}
export class EncryptedNoteTxL2Logs extends TxL2Logs {
    /** Creates an empty instance. */
    static empty() {
        return new EncryptedNoteTxL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = BufferReader.asReader(buf);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const serializedFunctionLogs = reader.readBufferArray(logsBufLength);
        const functionLogs = serializedFunctionLogs.map(logs => EncryptedNoteFunctionL2Logs.fromBuffer(logs, false));
        return new EncryptedNoteTxL2Logs(functionLogs);
    }
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls, numLogsPerCall) {
        if (numCalls * numLogsPerCall > MAX_NOTE_ENCRYPTED_LOGS_PER_TX) {
            throw new Error(`Trying to create ${numCalls * numLogsPerCall} logs for one tx (max: ${MAX_NOTE_ENCRYPTED_LOGS_PER_TX})`);
        }
        const functionLogs = [];
        for (let i = 0; i < numCalls; i++) {
            functionLogs.push(EncryptedNoteFunctionL2Logs.random(numLogsPerCall));
        }
        return new EncryptedNoteTxL2Logs(functionLogs);
    }
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj) {
        const functionLogs = obj.functionLogs.map((log) => EncryptedNoteFunctionL2Logs.fromJSON(log));
        return new EncryptedNoteTxL2Logs(functionLogs);
    }
    /**
     * Computes encrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelNoteEncryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash() {
        const unrolledLogs = this.unrollLogs();
        if (unrolledLogs.length == 0) {
            return Buffer.alloc(32);
        }
        let flattenedLogs = Buffer.alloc(0);
        for (const logsFromSingleFunctionCall of unrolledLogs) {
            flattenedLogs = Buffer.concat([flattenedLogs, logsFromSingleFunctionCall.hash()]);
        }
        // pad the end of logs with 0s
        for (let i = 0; i < MAX_NOTE_ENCRYPTED_LOGS_PER_TX - unrolledLogs.length; i++) {
            flattenedLogs = Buffer.concat([flattenedLogs, Buffer.alloc(32)]);
        }
        return sha256Trunc(flattenedLogs);
    }
}
export class EncryptedTxL2Logs extends TxL2Logs {
    /** Creates an empty instance. */
    static empty() {
        return new EncryptedTxL2Logs([]);
    }
    /**
     * Deserializes logs from a buffer.
     * @param buf - The buffer containing the serialized logs.
     * @param isLengthPrefixed - Whether the buffer is prefixed with 4 bytes for its total length.
     * @returns A new L2Logs object.
     */
    static fromBuffer(buf, isLengthPrefixed = true) {
        const reader = BufferReader.asReader(buf);
        // If the buffer is length prefixed use the length to read the array. Otherwise, the entire buffer is consumed.
        const logsBufLength = isLengthPrefixed ? reader.readNumber() : -1;
        const serializedFunctionLogs = reader.readBufferArray(logsBufLength);
        const functionLogs = serializedFunctionLogs.map(logs => EncryptedFunctionL2Logs.fromBuffer(logs, false));
        return new EncryptedTxL2Logs(functionLogs);
    }
    /**
     * Creates a new `TxL2Logs` object with `numCalls` function logs and `numLogsPerCall` logs in each invocation.
     * @param numCalls - The number of function calls in the tx.
     * @param numLogsPerCall - The number of logs emitted in each function call.
     * @param logType - The type of logs to generate.
     * @returns A new `TxL2Logs` object.
     */
    static random(numCalls, numLogsPerCall) {
        if (numCalls * numLogsPerCall > MAX_ENCRYPTED_LOGS_PER_TX) {
            throw new Error(`Trying to create ${numCalls * numLogsPerCall} logs for one tx (max: ${MAX_ENCRYPTED_LOGS_PER_TX})`);
        }
        const functionLogs = [];
        for (let i = 0; i < numCalls; i++) {
            functionLogs.push(EncryptedFunctionL2Logs.random(numLogsPerCall));
        }
        return new EncryptedTxL2Logs(functionLogs);
    }
    /**
     * Convert a plain JSON object to a TxL2Logs class object.
     * @param obj - A plain TxL2Logs JSON object.
     * @returns A TxL2Logs class object.
     */
    static fromJSON(obj) {
        const functionLogs = obj.functionLogs.map((log) => EncryptedFunctionL2Logs.fromJSON(log));
        return new EncryptedTxL2Logs(functionLogs);
    }
    /**
     * Computes encrypted logs hash as is done in the kernel and decoder contract.
     * @param logs - Logs to be hashed.
     * @returns The hash of the logs.
     * Note: This is a TS implementation of `computeKernelEncryptedLogsHash` function in Decoder.sol. See that function documentation
     *       for more details.
     */
    hash() {
        const unrolledLogs = this.unrollLogs();
        if (unrolledLogs.length == 0) {
            return Buffer.alloc(32);
        }
        let flattenedLogs = Buffer.alloc(0);
        for (const logsFromSingleFunctionCall of unrolledLogs) {
            flattenedLogs = Buffer.concat([flattenedLogs, logsFromSingleFunctionCall.getSiloedHash()]);
        }
        // pad the end of logs with 0s
        for (let i = 0; i < MAX_ENCRYPTED_LOGS_PER_TX - unrolledLogs.length; i++) {
            flattenedLogs = Buffer.concat([flattenedLogs, Buffer.alloc(32)]);
        }
        return sha256Trunc(flattenedLogs);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfbDJfbG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dzL3R4X2wyX2xvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEVBQUUsRUFFRix5QkFBeUIsRUFDekIsOEJBQThCLEVBQzlCLDJCQUEyQixHQUM1QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFbkYsT0FBTyxPQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QiwyQkFBMkIsRUFFM0IseUJBQXlCLEdBQzFCLE1BQU0sdUJBQXVCLENBQUM7QUFHL0I7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLFFBQVE7SUFHNUI7SUFDRSx3RkFBd0Y7SUFDeEUsWUFBb0M7UUFBcEMsaUJBQVksR0FBWixZQUFZLENBQXdCO0lBQ25ELENBQUM7SUFFSjs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLGlIQUFpSDtRQUNqSCxPQUFPLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVEOzs7O09B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