import { BufferReader } from '@aztec/foundation/serialize';
/**
 * The Proof class is a wrapper around the circuits proof.
 * Underlying it is a buffer of proof data in a form a barretenberg prover understands.
 * It provides methods to easily create, serialize, and deserialize the proof data for efficient
 * communication and storage.
 */
export declare class Proof {
    /**
     * Holds the serialized proof data in a binary buffer format.
     */
    buffer: Buffer;
    numPublicInputs: number;
    readonly __proofBrand: any;
    constructor(
    /**
     * Holds the serialized proof data in a binary buffer format.
     */
    buffer: Buffer, numPublicInputs: number);
    /**
     * Create a Proof from a Buffer or BufferReader.
     * Expects a length-encoding.
     *
     * @param buffer - A Buffer or BufferReader containing the length-encoded proof data.
     * @returns A Proof instance containing the decoded proof data.
     */
    static fromBuffer(buffer: Buffer | BufferReader): Proof;
    /**
     * Convert the Proof instance to a custom Buffer format.
     * This function serializes the Proof's buffer length and data sequentially into a new Buffer.
     *
     * @returns A Buffer containing the serialized proof data in custom format.
     */
    toBuffer(): Buffer;
    /**
     * Serialize the Proof instance to a hex string.
     * @returns The hex string representation of the proof data.
     */
    toString(): string;
    withoutPublicInputs(): Buffer;
    /**
     * Deserialize a Proof instance from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns - A new Proof instance.
     */
    static fromString(str: string): Proof;
}
/**
 * Makes an empty proof.
 * Note: Used for local devnet milestone where we are not proving anything yet.
 * @returns The empty "proof".
 */
export declare function makeEmptyProof(): Proof;
//# sourceMappingURL=proof.d.ts.map