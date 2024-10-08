import { BufferReader } from '@aztec/foundation/serialize';
/**
 * A class representing hash of Aztec transaction.
 */
export declare class TxHash {
    /**
     * The buffer containing the hash.
     */
    buffer: Buffer;
    /**
     * The size of the hash in bytes.
     */
    static SIZE: number;
    /**
     * TxHash with value zero.
     */
    static ZERO: TxHash;
    constructor(
    /**
     * The buffer containing the hash.
     */
    buffer: Buffer);
    /**
     * Returns the raw buffer of the hash.
     * @returns The buffer containing the hash.
     */
    toBuffer(): Buffer;
    /**
     * Creates a TxHash from a buffer.
     * @param buffer - The buffer to create from.
     * @returns A new TxHash object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): TxHash;
    /**
     * Checks if this hash and another hash are equal.
     * @param hash - A hash to compare with.
     * @returns True if the hashes are equal, false otherwise.
     */
    equals(hash: TxHash): boolean;
    /**
     * Returns true if this hash is zero.
     * @returns True if this hash is zero.
     */
    isZero(): boolean;
    /**
     * Convert this hash to a hex string.
     * @returns The hex string.
     */
    toString(): string;
    /**
     * Convert this hash to a big int.
     * @returns The big int.
     */
    toBigInt(): bigint;
    /**
     * Creates a tx hash from a bigint.
     * @param hash - The tx hash as a big int.
     * @returns The TxHash.
     */
    static fromBigInt(hash: bigint): TxHash;
    /**
     * Converts this hash from a buffer of 28 bytes.
     * Verifies the input is 28 bytes.
     * @param buffer - The 28 byte buffer to construct from.
     * @returns A TxHash created from the input buffer with 4 bytes 0 padding at the front.
     */
    static fromBuffer28(buffer: Buffer): TxHash;
    /**
     * Converts a string into a TxHash object.
     * @param str - The TX hash in string format.
     * @returns A new TxHash object.
     */
    static fromString(str: string): TxHash;
    /**
     * Generates a random TxHash.
     * @returns A new TxHash object.
     */
    static random(): TxHash;
}
//# sourceMappingURL=tx_hash.d.ts.map