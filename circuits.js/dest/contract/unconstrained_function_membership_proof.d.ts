import { type ContractArtifact, type FunctionSelector } from '@aztec/foundation/abi';
import { type ContractClassPublic, type UnconstrainedFunctionMembershipProof, type UnconstrainedFunctionWithMembershipProof } from '@aztec/types/contracts';
/**
 * Creates a membership proof for an unconstrained function in a contract class, to be verified via `isValidUnconstrainedFunctionMembershipProof`.
 * @param selector - Selector of the function to create the proof for.
 * @param artifact - Artifact of the contract class where the function is defined.
 */
export declare function createUnconstrainedFunctionMembershipProof(selector: FunctionSelector, artifact: ContractArtifact): UnconstrainedFunctionMembershipProof;
/**
 * Verifies that an unconstrained function with a membership proof as emitted by the ClassRegisterer contract is valid,
 * as defined in the protocol specs at contract-deployment/classes:
 *
 * ```
 * // Load contract class from local db
 * contract_class = db.get_contract_class(contract_class_id)
 *
 * // Compute artifact leaf and assert it belongs to the artifact
 * artifact_function_leaf = sha256(selector, metadata_hash, sha256(bytecode))
 * computed_artifact_unconstrained_function_tree_root = compute_root(artifact_function_leaf, artifact_function_tree_sibling_path, artifact_function_tree_leaf_index)
 * computed_artifact_hash = sha256(private_functions_artifact_tree_root, computed_artifact_unconstrained_function_tree_root, artifact_metadata_hash)
 * assert computed_artifact_hash == contract_class.artifact_hash
 * ```
 * @param fn - Function to check membership proof for.
 * @param contractClass - In which contract class the function is expected to be.
 */
export declare function isValidUnconstrainedFunctionMembershipProof(fn: UnconstrainedFunctionWithMembershipProof, contractClass: Pick<ContractClassPublic, 'artifactHash'>): Promise<boolean>;
//# sourceMappingURL=unconstrained_function_membership_proof.d.ts.map