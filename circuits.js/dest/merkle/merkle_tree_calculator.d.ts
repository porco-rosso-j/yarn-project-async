import { MerkleTree } from './merkle_tree.js';
/**
 * Merkle tree calculator.
 */
export declare class MerkleTreeCalculator {
    private height;
    private zeroHashes;
    private hasher;
    constructor(height: number);
    setHasher(zeroLeaf?: Buffer, hasher?: (left: Buffer, right: Buffer) => Promise<Buffer>): Promise<void>;
    computeTree(leaves?: Buffer[]): Promise<MerkleTree>;
    computeTreeRoot(leaves?: Buffer[]): Promise<Buffer>;
}
//# sourceMappingURL=merkle_tree_calculator.d.ts.map