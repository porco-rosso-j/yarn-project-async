import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type IndexedTreeLeaf, type IndexedTreeLeafPreimage } from '@aztec/foundation/trees';
/**
 * Class containing the data of a preimage of a single leaf in the public data tree.
 * Note: It's called preimage because this data gets hashed before being inserted as a node into the `IndexedTree`.
 */
export declare class PublicDataTreeLeafPreimage implements IndexedTreeLeafPreimage {
    /**
     * The slot of the leaf
     */
    slot: Fr;
    /**
     * The value of the leaf
     */
    value: Fr;
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextSlot: Fr;
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex: bigint;
    constructor(
    /**
     * The slot of the leaf
     */
    slot: Fr, 
    /**
     * The value of the leaf
     */
    value: Fr, 
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextSlot: Fr, 
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex: bigint);
    getKey(): bigint;
    getNextKey(): bigint;
    getNextIndex(): bigint;
    asLeaf(): PublicDataTreeLeaf;
    toBuffer(): Buffer;
    toHashInputs(): Buffer[];
    clone(): PublicDataTreeLeafPreimage;
    static empty(): PublicDataTreeLeafPreimage;
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataTreeLeafPreimage;
    static fromLeaf(leaf: PublicDataTreeLeaf, nextKey: bigint, nextIndex: bigint): PublicDataTreeLeafPreimage;
    static clone(preimage: PublicDataTreeLeafPreimage): PublicDataTreeLeafPreimage;
}
/**
 * A leaf in the public data indexed tree.
 */
export declare class PublicDataTreeLeaf implements IndexedTreeLeaf {
    /**
     * The slot the value is stored in
     */
    slot: Fr;
    /**
     * The value stored in the slot
     */
    value: Fr;
    constructor(
    /**
     * The slot the value is stored in
     */
    slot: Fr, 
    /**
     * The value stored in the slot
     */
    value: Fr);
    getKey(): bigint;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataTreeLeaf;
    equals(another: PublicDataTreeLeaf): boolean;
    toString(): string;
    isEmpty(): boolean;
    updateTo(another: PublicDataTreeLeaf): PublicDataTreeLeaf;
    static buildDummy(key: bigint): PublicDataTreeLeaf;
    static empty(): PublicDataTreeLeaf;
}
//# sourceMappingURL=public_data_leaf.d.ts.map