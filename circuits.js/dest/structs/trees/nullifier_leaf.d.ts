import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type IndexedTreeLeaf, type IndexedTreeLeafPreimage } from '@aztec/foundation/trees';
/**
 * Class containing the data of a preimage of a single leaf in the nullifier tree.
 * Note: It's called preimage because this data gets hashed before being inserted as a node into the `IndexedTree`.
 */
export declare class NullifierLeafPreimage implements IndexedTreeLeafPreimage {
    /**
     * Leaf value inside the indexed tree's linked list.
     */
    nullifier: Fr;
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextNullifier: Fr;
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex: bigint;
    constructor(
    /**
     * Leaf value inside the indexed tree's linked list.
     */
    nullifier: Fr, 
    /**
     * Next value inside the indexed tree's linked list.
     */
    nextNullifier: Fr, 
    /**
     * Index of the next leaf in the indexed tree's linked list.
     */
    nextIndex: bigint);
    getKey(): bigint;
    getNextKey(): bigint;
    getNextIndex(): bigint;
    asLeaf(): NullifierLeaf;
    toBuffer(): Buffer;
    toHashInputs(): Buffer[];
    toFields(): Fr[];
    clone(): NullifierLeafPreimage;
    toJSON(): {
        nullifier: `0x${string}`;
        nextNullifier: `0x${string}`;
        nextIndex: string;
    };
    static empty(): NullifierLeafPreimage;
    static fromBuffer(buffer: Buffer | BufferReader): NullifierLeafPreimage;
    static fromLeaf(leaf: NullifierLeaf, nextKey: bigint, nextIndex: bigint): NullifierLeafPreimage;
    static clone(preimage: NullifierLeafPreimage): NullifierLeafPreimage;
    static fromJSON(json: any): NullifierLeafPreimage;
}
/**
 * A nullifier to be inserted in the nullifier tree.
 */
export declare class NullifierLeaf implements IndexedTreeLeaf {
    /**
     * Nullifier value.
     */
    nullifier: Fr;
    constructor(
    /**
     * Nullifier value.
     */
    nullifier: Fr);
    getKey(): bigint;
    toBuffer(): Buffer;
    isEmpty(): boolean;
    updateTo(_another: NullifierLeaf): NullifierLeaf;
    static buildDummy(key: bigint): NullifierLeaf;
    static fromBuffer(buf: Buffer): NullifierLeaf;
}
//# sourceMappingURL=nullifier_leaf.d.ts.map