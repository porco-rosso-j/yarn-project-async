import { type ContractArtifact, type FunctionArtifact, FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { type MerkleTree } from '../merkle/merkle_tree.js';
/**
 * Returns the artifact hash of a given compiled contract artifact.
 *
 * ```
 * private_functions_artifact_leaves = artifact.private_functions.map fn =>
 *   sha256(fn.selector, fn.metadata_hash, sha256(fn.bytecode))
 * private_functions_artifact_tree_root = merkleize(private_functions_artifact_leaves)
 *
 * unconstrained_functions_artifact_leaves = artifact.unconstrained_functions.map fn =>
 *   sha256(fn.selector, fn.metadata_hash, sha256(fn.bytecode))
 * unconstrained_functions_artifact_tree_root = merkleize(unconstrained_functions_artifact_leaves)
 *
 * version = 1
 * artifact_hash = sha256(
 *   version,
 *   private_functions_artifact_tree_root,
 *   unconstrained_functions_artifact_tree_root,
 *   artifact_metadata,
 * )
 * ```
 * @param artifact - Artifact to calculate the hash for.
 */
export declare function computeArtifactHash(artifact: ContractArtifact | {
    privateFunctionRoot: Fr;
    unconstrainedFunctionRoot: Fr;
    metadataHash: Fr;
}): Promise<Fr>;
export declare function computeArtifactHashPreimage(artifact: ContractArtifact): Promise<{
    privateFunctionRoot: Fr;
    unconstrainedFunctionRoot: Fr;
    metadataHash: Fr;
}>;
export declare function computeArtifactMetadataHash(artifact: ContractArtifact): Fr;
export declare function computeArtifactFunctionTreeRoot(artifact: ContractArtifact, fnType: FunctionType): Promise<Fr>;
export declare function computeArtifactFunctionTree(artifact: ContractArtifact, fnType: FunctionType): Promise<MerkleTree | undefined>;
export declare function computeFunctionArtifactHash(fn: FunctionArtifact | (Pick<FunctionArtifact, 'bytecode'> & {
    functionMetadataHash: Fr;
    selector: FunctionSelector;
})): Fr;
export declare function computeFunctionMetadataHash(fn: FunctionArtifact): Fr;
export declare function getArtifactMerkleTreeHasher(): (l: Buffer, r: Buffer) => Promise<Buffer>;
//# sourceMappingURL=artifact_hash.d.ts.map