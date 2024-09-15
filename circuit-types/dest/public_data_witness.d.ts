import { Fr, PUBLIC_DATA_TREE_HEIGHT, PublicDataTreeLeafPreimage } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
import { SiblingPath } from './sibling_path/sibling_path.js';
/**
 * Public data witness.
 * @remarks This allows to prove either:
 * - That a slot in the public data tree is empty (0 value) if it falls within the range of the leaf.
 * - The current value of a slot in the public data tree if it matches exactly the slot of the leaf.
 */
export declare class PublicDataWitness {
    /**
     * The index of the leaf in the public data tree.
     */
    readonly index: bigint;
    /**
     * Preimage of a low leaf. All the slots in the range of the leaf are empty, and the current value of the
     * leaf slot is stored in the leaf.
     */
    readonly leafPreimage: PublicDataTreeLeafPreimage;
    /**
     * Sibling path to prove membership of the leaf.
     */
    readonly siblingPath: SiblingPath<typeof PUBLIC_DATA_TREE_HEIGHT>;
    constructor(
    /**
     * The index of the leaf in the public data tree.
     */
    index: bigint, 
    /**
     * Preimage of a low leaf. All the slots in the range of the leaf are empty, and the current value of the
     * leaf slot is stored in the leaf.
     */
    leafPreimage: PublicDataTreeLeafPreimage, 
    /**
     * Sibling path to prove membership of the leaf.
     */
    siblingPath: SiblingPath<typeof PUBLIC_DATA_TREE_HEIGHT>);
    /**
     * Returns a field array representation of a public data witness.
     * @returns A field array representation of a public data witness.
     */
    toFields(): Fr[];
    toBuffer(): Buffer;
    /**
     * Returns a string representation of the TxEffect object.
     */
    toString(): string;
    /**
     * Deserializes an PublicDataWitness object from a buffer.
     * @param buf - Buffer or BufferReader to deserialize.
     * @returns An instance of PublicDataWitness.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataWitness;
    /**
     * Deserializes an PublicDataWitness object from a string.
     * @param str - String to deserialize.
     * @returns An instance of PublicDataWitness.
     */
    static fromString(str: string): PublicDataWitness;
}
//# sourceMappingURL=public_data_witness.d.ts.map