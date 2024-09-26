import { MAX_PACKED_PUBLIC_BYTECODE_SIZE_IN_FIELDS, getContractClassFromArtifact } from '@aztec/circuits.js';
import { bufferAsFields } from '@aztec/foundation/abi';
import { getRegistererContract } from './protocol_contracts.js';
/** Sets up a call to register a contract class given its artifact. */
export async function registerContractClass(wallet, artifact) {
    const { artifactHash, privateFunctionsRoot, publicBytecodeCommitment, packedBytecode } = await getContractClassFromArtifact(artifact);
    console.log('[registerContractClass] artifactHash: ', artifactHash.toString());
    console.log('[registerContractClass] privateFunctionsRoot: ', privateFunctionsRoot.toString());
    console.log('[registerContractClass] publicBytecodeCommitment: ', publicBytecodeCommitment.toString());
    // console.log('[registerContractClass] packedBytecode: ', packedBytecode.toString());
    const encodedBytecode = bufferAsFields(packedBytecode, MAX_PACKED_PUBLIC_BYTECODE_SIZE_IN_FIELDS);
    const registerer = await getRegistererContract(wallet);
    console.log('[registerContractClass] registerer: ', registerer.address.toString());
    await wallet.addCapsule(encodedBytecode);
    return registerer.methods.register(artifactHash, privateFunctionsRoot, publicBytecodeCommitment);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVwbG95bWVudC9yZWdpc3Rlcl9jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RyxPQUFPLEVBQXlCLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSTlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWhFLHNFQUFzRTtBQUN0RSxNQUFNLENBQUMsS0FBSyxVQUFVLHFCQUFxQixDQUN6QyxNQUFjLEVBQ2QsUUFBMEI7SUFFMUIsTUFBTSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsR0FDcEYsTUFBTSw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUvQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUUsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMvRixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkcsc0ZBQXNGO0lBQ3RGLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxjQUFjLEVBQUUseUNBQXlDLENBQUMsQ0FBQztJQUNsRyxNQUFNLFVBQVUsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ25HLENBQUMifQ==