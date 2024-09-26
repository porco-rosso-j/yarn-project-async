// import { pedersenHash } from '@aztec/foundation/crypto';
import { pedersenHash } from '@aztec/foundation/crypto';

import { MerkleTree } from './merkle_tree.js';

/**
 * Merkle tree calculator.
 */
export class MerkleTreeCalculator {
  private zeroHashes: Buffer[] = [];
  private hasher!: (left: Buffer, right: Buffer) => Promise<Buffer>;

  constructor(private height: number) {}

  async setHasher(
    zeroLeaf = Buffer.alloc(32),
    hasher: (left: Buffer, right: Buffer) => Promise<Buffer> = async (left, right) => {
      return (await pedersenHash([left, right])).toBuffer();
    },
  ) {
    this.hasher = hasher;
    this.zeroHashes = [zeroLeaf];
    for (let i = 0; i < this.height; i++) {
      const prevHash = this.zeroHashes[i];
      const newHash = await this.hasher(prevHash, prevHash);
      this.zeroHashes.push(newHash);
    }
  }

  async computeTree(leaves: Buffer[] = []): Promise<MerkleTree> {
    if (leaves.length === 0) {
      // TODO(#4425): We should be returning a number of nodes that matches the tree height.
      return new MerkleTree(this.height, [this.zeroHashes[this.zeroHashes.length - 1]]);
    }

    let result = leaves.slice();

    for (let i = 0; i < this.height; ++i) {
      const numLeaves = 2 ** (this.height - i);
      const newLeaves: Buffer[] = [];
      for (let j = 0; j < leaves.length / 2; ++j) {
        const l = leaves[j * 2];
        const r = leaves[j * 2 + 1] || this.zeroHashes[i];
        if (!this.hasher) {
          throw new Error('MerkleTreeCalculator: setHasher() must be called before computing a tree.');
        }
        newLeaves[j] = await this.hasher(l, r);
      }
      result = result.concat(new Array(numLeaves - leaves.length).fill(this.zeroHashes[i]), newLeaves);
      leaves = newLeaves;
    }

    return new MerkleTree(this.height, result);
  }

  async computeTreeRoot(leaves: Buffer[] = []): Promise<Buffer> {
    if (leaves.length === 0) {
      return this.zeroHashes[this.zeroHashes.length - 1];
    }

    leaves = leaves.slice();

    for (let i = 0; i < this.height; ++i) {
      let j = 0;
      for (; j < leaves.length / 2; ++j) {
        const l = leaves[j * 2];
        const r = leaves[j * 2 + 1] || this.zeroHashes[i];
        if (!this.hasher) {
          throw new Error('MerkleTreeCalculator: setHasher() must be called before computing a tree.');
        }
        leaves[j] = await this.hasher(l, r);
      }
      leaves = leaves.slice(0, j);
    }

    return leaves[0];
  }
}
