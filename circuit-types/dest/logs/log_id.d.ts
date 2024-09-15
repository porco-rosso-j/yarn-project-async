import { BufferReader } from '@aztec/foundation/serialize';
/** A globally unique log id. */
export declare class LogId {
    /** The block number the log was emitted in. */
    readonly blockNumber: number;
    /** The index of a tx in a block the log was emitted in. */
    readonly txIndex: number;
    /** The index of a log the tx was emitted in. */
    readonly logIndex: number;
    /**
     * Parses a log id from a string.
     * @param blockNumber - The block number.
     * @param txIndex - The transaction index.
     * @param logIndex - The log index.
     */
    constructor(
    /** The block number the log was emitted in. */
    blockNumber: number, 
    /** The index of a tx in a block the log was emitted in. */
    txIndex: number, 
    /** The index of a log the tx was emitted in. */
    logIndex: number);
    /**
     * Serializes log id to a buffer.
     * @returns A buffer containing the serialized log id.
     */
    toBuffer(): Buffer;
    /**
     * Creates a LogId from a buffer.
     * @param buffer - A buffer containing the serialized log id.
     * @returns A log id.
     */
    static fromBuffer(buffer: Buffer | BufferReader): LogId;
    /**
     * Converts the LogId instance to a string.
     * @returns A string representation of the log id.
     */
    toString(): string;
    /**
     * Creates a LogId from a string.
     * @param data - A string representation of a log id.
     * @returns A log id.
     */
    static fromString(data: string): LogId;
    /**
     * Serializes log id to a human readable string.
     * @returns A human readable representation of the log id.
     */
    toHumanReadable(): string;
}
//# sourceMappingURL=log_id.d.ts.map