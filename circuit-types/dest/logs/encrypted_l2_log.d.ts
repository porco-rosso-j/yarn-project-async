import { Fr } from '@aztec/circuits.js';
/**
 * Represents an individual encrypted event log entry.
 */
export declare class EncryptedL2Log {
    readonly data: Buffer;
    readonly maskedContractAddress: Fr;
    constructor(data: Buffer, maskedContractAddress: Fr);
    get length(): number;
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer(): Buffer;
    /** Returns a JSON-friendly representation of the log. */
    toJSON(): object;
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj: any): EncryptedL2Log;
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(data: Buffer): EncryptedL2Log;
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash(): Buffer;
    /**
     * Calculates siloed hash of serialized encryptedlogs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    getSiloedHash(): Buffer;
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random(): EncryptedL2Log;
}
//# sourceMappingURL=encrypted_l2_log.d.ts.map