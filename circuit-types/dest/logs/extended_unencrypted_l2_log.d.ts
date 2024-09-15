import { BufferReader } from '@aztec/foundation/serialize';
import { LogId } from './log_id.js';
import { UnencryptedL2Log } from './unencrypted_l2_log.js';
/**
 * Represents an individual unencrypted log entry extended with info about the block and tx it was emitted in.
 */
export declare class ExtendedUnencryptedL2Log {
    /** Globally unique id of the log. */
    readonly id: LogId;
    /** The data contents of the log. */
    readonly log: UnencryptedL2Log;
    constructor(
    /** Globally unique id of the log. */
    id: LogId, 
    /** The data contents of the log. */
    log: UnencryptedL2Log);
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer(): Buffer;
    /**
     * Serializes log to a string.
     * @returns A string containing the serialized log.
     */
    toString(): string;
    /**
     * Serializes log to a human readable string.
     * @returns A human readable representation of the log.
     */
    toHumanReadable(): string;
    /**
     * Checks if two ExtendedUnencryptedL2Log objects are equal.
     * @param other - Another ExtendedUnencryptedL2Log object to compare with.
     * @returns True if the two objects are equal, false otherwise.
     */
    equals(other: ExtendedUnencryptedL2Log): boolean;
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer or buffer reader containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(buffer: Buffer | BufferReader): ExtendedUnencryptedL2Log;
    /**
     * Deserializes `ExtendedUnencryptedL2Log` object from a hex string representation.
     * @param data - A hex string representation of the log.
     * @returns An `ExtendedUnencryptedL2Log` object.
     */
    static fromString(data: string): ExtendedUnencryptedL2Log;
}
//# sourceMappingURL=extended_unencrypted_l2_log.d.ts.map