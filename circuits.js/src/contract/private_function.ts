import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { type PrivateFunction } from '@aztec/types/contracts';

import { FUNCTION_TREE_HEIGHT, GeneratorIndex } from '../constants.gen.js';
import { type MerkleTree, MerkleTreeCalculator } from '../merkle/index.js';

// Memoize the merkle tree calculators to avoid re-computing the zero-hash for each level in each call
let privateFunctionTreeCalculator: MerkleTreeCalculator | undefined;

const PRIVATE_FUNCTION_SIZE = 2;

/** Returns a Merkle tree for the set of private functions in a contract. */
export async function computePrivateFunctionsTree(fns: PrivateFunction[]): Promise<MerkleTree> {
  return (await getPrivateFunctionTreeCalculator()).computeTree(await computePrivateFunctionLeaves(fns));
}

/** Returns the Merkle tree root for the set of private functions in a contract. */
export async function computePrivateFunctionsRoot(fns: PrivateFunction[]): Promise<Fr> {
  return Fr.fromBuffer(
    await (await getPrivateFunctionTreeCalculator()).computeTreeRoot(await computePrivateFunctionLeaves(fns)),
  );
}

async function computePrivateFunctionLeaves(fns: PrivateFunction[]): Promise<Buffer[]> {
  const leaves = [...fns].sort((a, b) => a.selector.value - b.selector.value);
  return await Promise.all(leaves.map(computePrivateFunctionLeaf));
}

/** Returns the leaf for a given private function. */
export async function computePrivateFunctionLeaf(fn: PrivateFunction): Promise<Buffer> {
  return (await pedersenHash([fn.selector, fn.vkHash], GeneratorIndex.FUNCTION_LEAF)).toBuffer();
}

async function getPrivateFunctionTreeCalculator(): Promise<MerkleTreeCalculator> {
  if (!privateFunctionTreeCalculator) {
    // const functionTreeZeroLeaf = pedersenHash(new Array(PRIVATE_FUNCTION_SIZE).fill(0)).toBuffer();
    // privateFunctionTreeCalculator = new MerkleTreeCalculator(FUNCTION_TREE_HEIGHT, functionTreeZeroLeaf);
    // const functionTreeZeroLeaf = async () => {
    //   return (await pedersenHash(new Array(PRIVATE_FUNCTION_SIZE).fill(0))).toBuffer();
    // };
    const functionTreeZeroLeaf = (await pedersenHash(new Array(PRIVATE_FUNCTION_SIZE).fill(0))).toBuffer();

    privateFunctionTreeCalculator = new MerkleTreeCalculator(FUNCTION_TREE_HEIGHT);
    await privateFunctionTreeCalculator.setHasher(functionTreeZeroLeaf);
  }
  return privateFunctionTreeCalculator;
}
