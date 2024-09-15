import { type FunctionAbi, FunctionSelector } from '@aztec/foundation/abi';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type ContractInstance } from '@aztec/types/contracts';
/**
 * Returns the deployment address for a given contract instance as defined on the [Protocol Specs](../../../../docs/docs/protocol-specs/addresses-and-keys/specification.md).
 * ```
 * salted_initialization_hash = pedersen([salt, initialization_hash, deployer], GENERATOR__SALTED_INITIALIZATION_HASH)
 * partial_address = pedersen([contract_class_id, salted_initialization_hash], GENERATOR__CONTRACT_PARTIAL_ADDRESS_V1)
 * address = poseidon2Hash([public_keys_hash, partial_address, GENERATOR__CONTRACT_ADDRESS_V1])
 * ```
 * @param instance - A contract instance for which to calculate the deployment address.
 */
export declare function computeContractAddressFromInstance(instance: ContractInstance | ({
    contractClassId: Fr;
    saltedInitializationHash: Fr;
} & Pick<ContractInstance, 'publicKeysHash'>)): Promise<AztecAddress>;
/**
 * Computes the partial address defined as the hash of the contract class id and salted initialization hash.
 * @param instance - Contract instance for which to calculate the partial address.
 */
export declare function computePartialAddress(instance: Pick<ContractInstance, 'contractClassId' | 'initializationHash' | 'salt' | 'deployer'> | {
    contractClassId: Fr;
    saltedInitializationHash: Fr;
}): Promise<Fr>;
/**
 * Computes the salted initialization hash for an address, defined as the hash of the salt and initialization hash.
 * @param instance - Contract instance for which to compute the salted initialization hash.
 */
export declare function computeSaltedInitializationHash(instance: Pick<ContractInstance, 'initializationHash' | 'salt' | 'deployer'>): Promise<Fr>;
/**
 * Computes the initialization hash for an instance given its constructor function and arguments.
 * @param initFn - Constructor function or empty if no initialization is expected.
 * @param args - Unencoded arguments, will be encoded as fields according to the constructor function abi.
 * @returns The hash, or zero if no initialization function is provided.
 */
export declare function computeInitializationHash(initFn: FunctionAbi | undefined, args: any[]): Promise<Fr>;
/**
 * Computes the initialization hash for an instance given its constructor function selector and encoded arguments.
 * @param initFn - Constructor function selector.
 * @param args - Encoded arguments.
 * @returns The hash.
 */
export declare function computeInitializationHashFromEncodedArgs(initFn: FunctionSelector, encodedArgs: Fr[]): Promise<Fr>;
//# sourceMappingURL=contract_address.d.ts.map