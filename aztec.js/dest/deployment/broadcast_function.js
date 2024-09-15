import { ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS, computeVerificationKeyHash, createPrivateFunctionMembershipProof, createUnconstrainedFunctionMembershipProof, getContractClassFromArtifact, } from '@aztec/circuits.js';
import { FunctionType, bufferAsFields } from '@aztec/foundation/abi';
import { padArrayEnd } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { getRegistererContract } from './protocol_contracts.js';
/**
 * Sets up a call to broadcast a private function's bytecode via the ClassRegisterer contract.
 * Note that this is not required for users to call the function, but is rather a convenience to make
 * this code publicly available so dapps or wallets do not need to redistribute it.
 * @param wallet - Wallet to send the transaction.
 * @param artifact - Contract artifact that contains the function to be broadcast.
 * @param selector - Selector of the function to be broadcast.
 * @returns A ContractFunctionInteraction object that can be used to send the transaction.
 */
export async function broadcastPrivateFunction(wallet, artifact, selector) {
    const contractClass = await getContractClassFromArtifact(artifact);
    const privateFunctionArtifact = artifact.functions.find(fn => selector.equals(fn));
    if (!privateFunctionArtifact) {
        throw new Error(`Private function with selector ${selector.toString()} not found`);
    }
    const { artifactTreeSiblingPath, artifactTreeLeafIndex, artifactMetadataHash, functionMetadataHash, unconstrainedFunctionsArtifactTreeRoot, privateFunctionTreeSiblingPath, privateFunctionTreeLeafIndex, } = await createPrivateFunctionMembershipProof(selector, artifact);
    const vkHash = computeVerificationKeyHash(privateFunctionArtifact.verificationKey);
    const bytecode = bufferAsFields(privateFunctionArtifact.bytecode, MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS);
    await wallet.addCapsule(bytecode);
    const registerer = getRegistererContract(wallet);
    return Promise.resolve(registerer.methods.broadcast_private_function(contractClass.id, artifactMetadataHash, unconstrainedFunctionsArtifactTreeRoot, privateFunctionTreeSiblingPath, privateFunctionTreeLeafIndex, padArrayEnd(artifactTreeSiblingPath, Fr.ZERO, ARTIFACT_FUNCTION_TREE_MAX_HEIGHT), artifactTreeLeafIndex, 
    // eslint-disable-next-line camelcase
    { selector, metadata_hash: functionMetadataHash, vk_hash: vkHash }));
}
/**
 * Sets up a call to broadcast an unconstrained function's bytecode via the ClassRegisterer contract.
 * Note that this is not required for users to call the function, but is rather a convenience to make
 * this code publicly available so dapps or wallets do not need to redistribute it.
 * @param wallet - Wallet to send the transaction.
 * @param artifact - Contract artifact that contains the function to be broadcast.
 * @param selector - Selector of the function to be broadcast.
 * @returns A ContractFunctionInteraction object that can be used to send the transaction.
 */
export async function broadcastUnconstrainedFunction(wallet, artifact, selector) {
    const contractClass = await getContractClassFromArtifact(artifact);
    const functionArtifactIndex = artifact.functions.findIndex(fn => fn.functionType === FunctionType.UNCONSTRAINED && selector.equals(fn));
    if (functionArtifactIndex < 0) {
        throw new Error(`Unconstrained function with selector ${selector.toString()} not found`);
    }
    const functionArtifact = artifact.functions[functionArtifactIndex];
    const { artifactMetadataHash, artifactTreeLeafIndex, artifactTreeSiblingPath, functionMetadataHash, privateFunctionsArtifactTreeRoot, } = createUnconstrainedFunctionMembershipProof(selector, artifact);
    const bytecode = bufferAsFields(functionArtifact.bytecode, MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS);
    await wallet.addCapsule(bytecode);
    const registerer = getRegistererContract(wallet);
    return registerer.methods.broadcast_unconstrained_function(contractClass.id, artifactMetadataHash, privateFunctionsArtifactTreeRoot, padArrayEnd(artifactTreeSiblingPath, Fr.ZERO, ARTIFACT_FUNCTION_TREE_MAX_HEIGHT), artifactTreeLeafIndex, 
    // eslint-disable-next-line camelcase
    { selector, metadata_hash: functionMetadataHash });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvYWRjYXN0X2Z1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlcGxveW1lbnQvYnJvYWRjYXN0X2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMsdURBQXVELEVBQ3ZELDBCQUEwQixFQUMxQixvQ0FBb0MsRUFDcEMsMENBQTBDLEVBQzFDLDRCQUE0QixHQUM3QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBZ0QsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFJOUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFaEU7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLHdCQUF3QixDQUM1QyxNQUFjLEVBQ2QsUUFBMEIsRUFDMUIsUUFBMEI7SUFFMUIsTUFBTSxhQUFhLEdBQUcsTUFBTSw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRSxNQUFNLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25GLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELE1BQU0sRUFDSix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixvQkFBb0IsRUFDcEIsc0NBQXNDLEVBQ3RDLDhCQUE4QixFQUM5Qiw0QkFBNEIsR0FD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