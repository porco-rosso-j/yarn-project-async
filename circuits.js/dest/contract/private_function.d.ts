import { Fr } from '@aztec/foundation/fields';
import { type PrivateFunction } from '@aztec/types/contracts';
import { type MerkleTree } from '../merkle/index.js';
/** Returns a Merkle tree for the set of private functions in a contract. */
export declare function computePrivateFunctionsTree(fns: PrivateFunction[]): Promise<MerkleTree>;
/** Returns the Merkle tree root for the set of private functions in a contract. */
export declare function computePrivateFunctionsRoot(fns: PrivateFunction[]): Promise<Fr>;
/** Returns the leaf for a given private function. */
export declare function computePrivateFunctionLeaf(fn: PrivateFunction): Promise<Buffer>;
//# sourceMappingURL=private_function.d.ts.map