/** A simple immutable Merkle tree container. Use a MerkleTreeCalculator to create a new instance from a set of leaves. */
export declare class MerkleTree {
    readonly height: number;
    readonly nodes: Buffer[];
    constructor(height: number, nodes: Buffer[]);
    get root(): Buffer;
    get leaves(): Buffer[];
    /** Returns a sibling path to the given element or to the element in the given index. */
    getSiblingPath(leafIndex: number): Buffer[];
    getSiblingPath(leaf: Buffer): Buffer[];
    /** Returns the leaf index for a given element. */
    getIndex(element: Buffer): number;
    /** Returns a nice string representation of the tree, useful for debugging purposes. */
    drawTree(): string;
}
//# sourceMappingURL=merkle_tree.d.ts.map