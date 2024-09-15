import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { computeArtifactHash } from './artifact_hash.js';
import { computeContractClassIdWithPreimage } from './contract_class_id.js';
import { packBytecode } from './public_bytecode.js';
const cmpFunctionArtifacts = (a, b) => a.selector.toField().cmp(b.selector.toField());
/** Creates a ContractClass from a contract compilation artifact. */
export async function getContractClassFromArtifact(artifact) {
    const artifactHash = 'artifactHash' in artifact ? artifact.artifactHash : computeArtifactHash(artifact);
    const publicFunctions = artifact.functions
        .filter(f => f.functionType === FunctionType.PUBLIC)
        .map(f => ({
        selector: FunctionSelector.fromNameAndParameters(f.name, f.parameters),
        bytecode: f.bytecode,
    }))
        .sort(cmpFunctionArtifacts);
    const packedBytecode = packBytecode(publicFunctions);
    const privateFunctions = artifact.functions
        .filter(f => f.functionType === FunctionType.PRIVATE)
        .map(getContractClassPrivateFunctionFromArtifact)
        .sort(cmpFunctionArtifacts);
    const contractClass = {
        version: 1,
        artifactHash,
        publicFunctions,
        packedBytecode,
        privateFunctions,
    };
    return { ...contractClass, ...(await computeContractClassIdWithPreimage(contractClass)) };
}
export function getContractClassPrivateFunctionFromArtifact(f) {
    return {
        selector: FunctionSelector.fromNameAndParameters(f.name, f.parameters),
        vkHash: computeVerificationKeyHash(f.verificationKey),
    };
}
/**
 * Calculates the hash of a verification key.
 * Returns zero for consistency with Noir.
 */
export function computeVerificationKeyHash(_verificationKeyInBase64) {
    // return Fr.fromBuffer(hashVK(Buffer.from(verificationKeyInBase64, 'hex')));
    return Fr.ZERO;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3RfY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnRCxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNySCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFnQyxrQ0FBa0MsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUtwRCxNQUFNLG9CQUFvQixHQUFHLENBQTJDLENBQUksRUFBRSxDQUFJLEVBQUUsRUFBRSxDQUNwRixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFakQsb0VBQW9FO0FBQ3BFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsNEJBQTRCLENBQ2hELFFBQXFEO0lBRXJELE1BQU0sWUFBWSxHQUFHLGNBQWMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hHLE1BQU0sZUFBZSxHQUFxQyxRQUFRLENBQUMsU0FBUztTQUN6RSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUM7U0FDbkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDdEUsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO0tBQ3JCLENBQUMsQ0FBQztTQUNGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTlCLE1BQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVyRCxNQUFNLGdCQUFnQixHQUFzQyxRQUFRLENBQUMsU0FBUztTQUMzRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDcEQsR0FBRyxDQUFDLDJDQUEyQyxDQUFDO1NBQ2hELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTlCLE1BQU0sYUFBYSxHQUFrQjtRQUNuQyxPQUFPLEVBQUUsQ0FBQztRQUNWLFlBQVk7UUFDWixlQUFlO1FBQ2YsY0FBYztRQUNkLGdCQUFnQjtLQUNqQixDQUFDO0lBQ0YsT0FBTyxFQUFFLEdBQUcsYUFBYSxFQUFFLEdBQUcsQ0FBQyxNQUFNLGtDQUFrQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUM1RixDQUFDO0FBRUQsTUFBTSxVQUFVLDJDQUEyQyxDQUN6RCxDQUFtQjtJQUVuQixPQUFPO1FBQ0wsUUFBUSxFQUFFLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUN0RSxNQUFNLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLGVBQWdCLENBQUM7S0FDdkQsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsd0JBQWdDO0lBQ3pFLDZFQUE2RTtJQUM3RSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDakIsQ0FBQyJ9