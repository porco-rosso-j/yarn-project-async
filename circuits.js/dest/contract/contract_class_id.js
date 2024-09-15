import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { GeneratorIndex } from '../constants.gen.js';
import { computePrivateFunctionsRoot } from './private_function.js';
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
export async function computeContractClassId(contractClass) {
    return (await computeContractClassIdWithPreimage(contractClass)).id;
}
/** Computes a contract class id and returns it along with its preimage. */
export async function computeContractClassIdWithPreimage(contractClass) {
    const artifactHash = contractClass.artifactHash;
    const privateFunctionsRoot = 'privateFunctionsRoot' in contractClass
        ? contractClass.privateFunctionsRoot
        : await computePrivateFunctionsRoot(contractClass.privateFunctions);
    const publicBytecodeCommitment = 'publicBytecodeCommitment' in contractClass
        ? contractClass.publicBytecodeCommitment
        : computePublicBytecodeCommitment(contractClass.packedBytecode);
    const id = await pedersenHash([artifactHash, privateFunctionsRoot, publicBytecodeCommitment], GeneratorIndex.CONTRACT_LEAF);
    return { id, artifactHash, privateFunctionsRoot, publicBytecodeCommitment };
}
/** Returns the preimage of a contract class id given a contract class. */
export async function computeContractClassIdPreimage(contractClass) {
    const privateFunctionsRoot = await computePrivateFunctionsRoot(contractClass.privateFunctions);
    const publicBytecodeCommitment = computePublicBytecodeCommitment(contractClass.packedBytecode);
    return { artifactHash: contractClass.artifactHash, privateFunctionsRoot, publicBytecodeCommitment };
}
// TODO(#5860): Replace with actual implementation
// Changed to work with canonical contracts that may have non-deterministic noir compiles and we want to keep the address constant
export function computePublicBytecodeCommitment(_bytecode) {
    return new Fr(5);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfY2xhc3NfaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3RfY2xhc3NfaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUc5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEU7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxhQUFzRDtJQUNqRyxPQUFPLENBQUMsTUFBTSxrQ0FBa0MsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN0RSxDQUFDO0FBRUQsMkVBQTJFO0FBQzNFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsa0NBQWtDLENBQ3RELGFBQXNEO0lBRXRELE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDaEQsTUFBTSxvQkFBb0IsR0FDeEIsc0JBQXNCLElBQUksYUFBYTtRQUNyQyxDQUFDLENBQUMsYUFBYSxDQUFDLG9CQUFvQjtRQUNwQyxDQUFDLENBQUUsTUFBTSwyQkFBMkIsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN6RSxNQUFNLHdCQUF3QixHQUM1QiwwQkFBMEIsSUFBSSxhQUFhO1FBQ3pDLENBQUMsQ0FBQyxhQUFhLENBQUMsd0JBQXdCO1FBQ3hDLENBQUMsQ0FBRSwrQkFBK0IsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQzNCLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDLEVBQzlELGNBQWMsQ0FBQyxhQUFhLENBQzdCLENBQUM7SUFDRixPQUFPLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxDQUFDO0FBQzlFLENBQUM7QUFFRCwwRUFBMEU7QUFDMUUsTUFBTSxDQUFDLEtBQUssVUFBVSw4QkFBOEIsQ0FBQyxhQUE0QjtJQUMvRSxNQUFNLG9CQUFvQixHQUFHLE1BQU0sMkJBQTJCLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0YsTUFBTSx3QkFBd0IsR0FBRywrQkFBK0IsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0YsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixFQUFFLENBQUM7QUFDdEcsQ0FBQztBQVNELGtEQUFrRDtBQUNsRCxrSUFBa0k7QUFDbEksTUFBTSxVQUFVLCtCQUErQixDQUFDLFNBQWlCO0lBQy9ELE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyJ9