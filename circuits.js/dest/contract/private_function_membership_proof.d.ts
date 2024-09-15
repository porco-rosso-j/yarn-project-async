import { type ContractArtifact, type FunctionSelector } from '@aztec/foundation/abi';
import { type ContractClassPublic, type ExecutablePrivateFunctionWithMembershipProof, type PrivateFunctionMembershipProof } from '@aztec/types/contracts';
/**
 * Creates a membership proof for a private function in a contract class, to be verified via `isValidPrivateFunctionMembershipProof`.
 * @param selector - Selector of the function to create the proof for.
 * @param artifact - Artifact of the contract class where the function is defined.
 */
export declare function createPrivateFunctionMembershipProof(selector: FunctionSelector, artifact: ContractArtifact): Promise<PrivateFunctionMembershipProof>;
/**
 * Verifies that a private function with a membership proof as emitted by the ClassRegisterer contract is valid,
 * as defined in the protocol specs at contract-deployment/classes:
 *
 * ```
 * // Load contract class from local db
 * contract_class = db.get_contract_class(contract_class_id)
 *
 * // Compute function leaf and assert it belongs to the private functions tree
 * function_leaf = pedersen([selector as Field, vk_hash], GENERATOR__FUNCTION_LEAF)
 * computed_private_function_tree_root = compute_root(function_leaf, private_function_tree_sibling_path)
 * assert computed_private_function_tree_root == contract_class.private_function_root
 *
 * // Compute artifact leaf and assert it belongs to the artifact
 * artifact_function_leaf = sha256(selector, metadata_hash, sha256(bytecode))
 * computed_artifact_private_function_tree_root = compute_root(artifact_function_leaf, artifact_function_tree_sibling_path)
 * computed_artifact_hash = sha256(computed_artifact_private_function_tree_root, unconstrained_functions_artifact_tree_root, artifact_metadata_hash)
 * assert computed_artifact_hash == contract_class.artifact_hash
 * ```
 * @param fn - Function to check membership proof for.
 * @param contractClass - In which contract class the function is expected to be.
 */
export declare function isValidPrivateFunctionMembershipProof(fn: ExecutablePrivateFunctionWithMembershipProof, contractClass: Pick<ContractClassPublic, 'privateFunctionsRoot' | 'artifactHash'>): Promise<boolean>;
//# sourceMappingURL=private_function_membership_proof.d.ts.map