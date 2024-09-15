// import { pedersenHash } from '@aztec/foundation/crypto';
import { MerkleTree } from './merkle_tree.js';
/**
 * Merkle tree calculator.
 */
export class MerkleTreeCalculator {
    // TODO_ASYNC: can't use await in constructor. should be initialized outside.
    constructor(height, zeroLeaf = Buffer.alloc(32), 
    // hasher = (left: Buffer, right: Buffer) => pedersenHash([left, right]).toBuffer(),
    hasher = (left, right) => Buffer.alloc(32)) {
        this.height = height;
        this.hasher = hasher;
        this.zeroHashes = Array.from([0], () => zeroLeaf);
        // this.zeroHashes = Array.from({ length: height }).reduce(
        //   (acc: Buffer[], _, i) => [...acc, this.hasher(acc[i], acc[i])],
        //   [zeroLeaf],
        // );
    }
    computeTree(leaves = []) {
        if (leaves.length === 0) {
            // TODO(#4425): We should be returning a number of nodes that matches the tree height.
            return new MerkleTree(this.height, [this.zeroHashes[this.zeroHashes.length - 1]]);
        }
        let result = leaves.slice();
        for (let i = 0; i < this.height; ++i) {
            const numLeaves = 2 ** (this.height - i);
            const newLeaves = [];
            for (let j = 0; j < leaves.length / 2; ++j) {
                const l = leaves[j * 2];
                const r = leaves[j * 2 + 1] || this.zeroHashes[i];
                newLeaves[j] = this.hasher(l, r);
            }
            result = result.concat(new Array(numLeaves - leaves.length).fill(this.zeroHashes[i]), newLeaves);
            leaves = newLeaves;
        }
        return new MerkleTree(this.height, result);
    }
    computeTreeRoot(leaves = []) {
        if (leaves.length === 0) {
            return this.zeroHashes[this.zeroHashes.length - 1];
        }
        leaves = leaves.slice();
        for (let i = 0; i < this.height; ++i) {
            let j = 0;
            for (; j < leaves.length / 2; ++j) {
                const l = leaves[j * 2];
                const r = leaves[j * 2 + 1] || this.zeroHashes[i];
                leaves[j] = this.hasher(l, r);
            }
            leaves = leaves.slice(0, j);
        }
        return leaves[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlX3RyZWVfY2FsY3VsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXJrbGUvbWVya2xlX3RyZWVfY2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTlDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQiw2RUFBNkU7SUFDN0UsWUFDVSxNQUFjLEVBQ3RCLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUMzQixvRkFBb0Y7SUFDcEYsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBSGxELFdBQU0sR0FBTixNQUFNLENBQVE7UUFLdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsMkRBQTJEO1FBQzNELG9FQUFvRTtRQUNwRSxnQkFBZ0I7UUFDaEIsS0FBSztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBbUIsRUFBRTtRQUMvQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDeEIsc0ZBQXNGO1lBQ3RGLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFNUIsS0FBSyxJQUFJLENB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