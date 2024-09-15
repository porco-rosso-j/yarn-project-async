import { FunctionSelector, encodeArguments } from '@aztec/foundation/abi';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { GeneratorIndex } from '../constants.gen.js';
import { computeVarArgsHash } from '../hash/hash.js';
import { computeAddress } from '../keys/index.js';
// TODO(@spalladino): Review all generator indices in this file
/**
 * Returns the deployment address for a given contract instance as defined on the [Protocol Specs](../../../../docs/docs/protocol-specs/addresses-and-keys/specification.md).
 * ```
 * salted_initialization_hash = pedersen([salt, initialization_hash, deployer], GENERATOR__SALTED_INITIALIZATION_HASH)
 * partial_address = pedersen([contract_class_id, salted_initialization_hash], GENERATOR__CONTRACT_PARTIAL_ADDRESS_V1)
 * address = poseidon2Hash([public_keys_hash, partial_address, GENERATOR__CONTRACT_ADDRESS_V1])
 * ```
 * @param instance - A contract instance for which to calculate the deployment address.
 */
export async function computeContractAddressFromInstance(instance) {
    const partialAddress = await computePartialAddress(instance);
    const publicKeysHash = instance.publicKeysHash;
    return computeAddress(publicKeysHash, partialAddress);
}
/**
 * Computes the partial address defined as the hash of the contract class id and salted initialization hash.
 * @param instance - Contract instance for which to calculate the partial address.
 */
export async function computePartialAddress(instance) {
    const saltedInitializationHash = 'saltedInitializationHash' in instance
        ? instance.saltedInitializationHash
        : await computeSaltedInitializationHash(instance);
    return await pedersenHash([instance.contractClassId, saltedInitializationHash], GeneratorIndex.PARTIAL_ADDRESS);
}
/**
 * Computes the salted initialization hash for an address, defined as the hash of the salt and initialization hash.
 * @param instance - Contract instance for which to compute the salted initialization hash.
 */
export async function computeSaltedInitializationHash(instance) {
    return await pedersenHash([instance.salt, instance.initializationHash, instance.deployer], GeneratorIndex.PARTIAL_ADDRESS);
}
/**
 * Computes the initialization hash for an instance given its constructor function and arguments.
 * @param initFn - Constructor function or empty if no initialization is expected.
 * @param args - Unencoded arguments, will be encoded as fields according to the constructor function abi.
 * @returns The hash, or zero if no initialization function is provided.
 */
export async function computeInitializationHash(initFn, args) {
    if (!initFn) {
        return Fr.ZERO;
    }
    const selector = FunctionSelector.fromNameAndParameters(initFn.name, initFn.parameters);
    const flatArgs = encodeArguments(initFn, args);
    return await computeInitializationHashFromEncodedArgs(selector, flatArgs);
}
/**
 * Computes the initialization hash for an instance given its constructor function selector and encoded arguments.
 * @param initFn - Constructor function selector.
 * @param args - Encoded arguments.
 * @returns The hash.
 */
export async function computeInitializationHashFromEncodedArgs(initFn, encodedArgs) {
    const argsHash = await computeVarArgsHash(encodedArgs);
    return await pedersenHash([initFn, argsHash], GeneratorIndex.CONSTRUCTOR);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdF9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUc5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxELCtEQUErRDtBQUUvRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsa0NBQWtDLENBQ3RELFFBRXNHO0lBRXRHLE1BQU0sY0FBYyxHQUFHLE1BQU0scUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0QsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUMvQyxPQUFPLGNBQWMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUscUJBQXFCLENBQ3pDLFFBRXlEO0lBRXpELE1BQU0sd0JBQXdCLEdBQzVCLDBCQUEwQixJQUFJLFFBQVE7UUFDcEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0I7UUFDbkMsQ0FBQyxDQUFDLE1BQU0sK0JBQStCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFdEQsT0FBTyxNQUFNLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDbEgsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsK0JBQStCLENBQ25ELFFBQTRFO0lBRTVFLE9BQU8sTUFBTSxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdILENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUseUJBQXlCLENBQUMsTUFBK0IsRUFBRSxJQUFXO0lBQzFGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztJQUNqQixDQUFDO0lBQ0QsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEYsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLE1BQU0sd0NBQXdDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsd0NBQXdDLENBQUMsTUFBd0IsRUFBRSxXQUFpQjtJQUN4RyxNQUFNLFFBQVEsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sTUFBTSxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzVFLENBQUMifQ==