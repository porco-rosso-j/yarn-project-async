import { Fr } from '@aztec/foundation/fields';
import { type ContractClass } from '@aztec/types/contracts';
/**
 * Returns the id of a contract class computed as its hash.
 *
 * ```
 * version = 1
 * private_function_leaves = private_functions.map(fn => pedersen([fn.function_selector as Field, fn.vk_hash], GENERATOR__FUNCTION_LEAF))
 * private_functions_root = merkleize(private_function_leaves)
 * bytecode_commitment = calculate_commitment(packed_bytecode)
 * contract_class_id = pedersen([version, artifact_hash, private_functions_root, bytecode_commitment], GENERATOR__CLASS_IDENTIFIER)
 * ```
 * @param contractClass - Contract class.
 * @returns The identifier.
 */
export declare function computeContractClassId(contractClass: ContractClass | ContractClassIdPreimage): Promise<Fr>;
/** Computes a contract class id and returns it along with its preimage. */
export declare function computeContractClassIdWithPreimage(contractClass: ContractClass | ContractClassIdPreimage): Promise<ContractClassIdPreimage & {
    id: Fr;
}>;
/** Returns the preimage of a contract class id given a contract class. */
export declare function computeContractClassIdPreimage(contractClass: ContractClass): Promise<ContractClassIdPreimage>;
/** Preimage of a contract class id. */
export type ContractClassIdPreimage = {
    artifactHash: Fr;
    privateFunctionsRoot: Fr;
    publicBytecodeCommitment: Fr;
};
export declare function computePublicBytecodeCommitment(_bytecode: Buffer): Fr;
//# sourceMappingURL=contract_class_id.d.ts.map