import { MerkleTree } from './merkle_tree.js';
/**
 * Merkle tree calculator.
 */
export declare class MerkleTreeCalculator {
    private height;
    private zeroHashes;
    private hasher;
    constructor(height: number, zeroLeaf?: Buffer, hasher?: (left: Buffer, right: Buffer) => Buffer);
    computeTree(leaves?: Buffer[]): MerkleTree;
    computeTreeRoot(leaves?: Buffer[]): Buffer;
}
//# sourceMappingURL=merkle_tree_calculator.d.ts.map