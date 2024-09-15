import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
/**
 * Contains information which can be used to prove that a leaf is a member of a Merkle tree.
 */
export declare class MembershipWitness<N extends number> {
    /**
     * Index of a leaf in the Merkle tree.
     */
    leafIndex: bigint;
    /**
     * Sibling path of the leaf in the Merkle tree.
     */
    siblingPath: Tuple<Fr, N>;
    constructor(
    /**
     * Size of the sibling path (number of fields it contains).
     */
    pathSize: N, 
    /**
     * Index of a leaf in the Merkle tree.
     */
    leafIndex: bigint, 
    /**
     * Sibling path of the leaf in the Merkle tree.
     */
    siblingPath: Tuple<Fr, N>);
    toBuffer(): Buffer;
    /**
     * Creates a random membership witness. Used for testing purposes.
     * @param pathSize - Number of fields in the sibling path.
     * @returns Random membership witness.
     */
    static random<N extends number>(pathSize: N): MembershipWitness<N>;
    /**
     * Creates a membership witness whose sibling path is full of zero fields.
     * @param pathSize - Number of fields in the sibling path.
     * @param leafIndex - Index of the leaf in the Merkle tree.
     * @returns Membership witness with zero sibling path.
     */
    static empty<N extends number>(pathSize: N, leafIndex?: bigint): MembershipWitness<N>;
    static fromBufferArray<N extends number>(leafIndex: bigint, siblingPath: Tuple<Buffer, N>): MembershipWitness<N>;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized `MembershipWitness`.
     */
    static fromBuffer<N extends number>(buffer: Buffer | BufferReader, size: N): MembershipWitness<N>;
    /**
     * Creates a deserializer object for a MembershipWitness with a given size.
     * @param size - Expected size of the witness.
     * @returns A deserializer object.
     */
    static deserializer<N extends number>(size: N): {
        fromBuffer(buffer: Buffer | BufferReader): MembershipWitness<N>;
    };
}
//# sourceMappingURL=membership_witness.d.ts.map