import { pedersenHash } from '@aztec/foundation/crypto';

/** Computes the expected root of a merkle tree given a leaf and its sibling path. */
// TODO_ASYNC: can't use await as hasher defined in MerkleTreeCalculator's constructor can't use await.
export async function computeRootFromSiblingPath(
  leaf: Buffer,
  siblingPath: Buffer[],
  index: number,
  // hasher = async (left: Buffer, right: Buffer) => (await pedersenHash([left, right])).toBuffer(),
  hasher = (left: Buffer, right: Buffer) => Buffer.alloc(32),
) {
  let result = leaf;
  for (const sibling of siblingPath) {
    result = index & 1 ? hasher(sibling, result) : hasher(result, sibling);
    index >>= 1;
  }
  return result;
}
