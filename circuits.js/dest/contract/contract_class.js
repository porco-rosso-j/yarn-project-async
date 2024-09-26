import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { computeArtifactHash } from './artifact_hash.js';
import { computeContractClassIdWithPreimage } from './contract_class_id.js';
import { packBytecode } from './public_bytecode.js';
const cmpFunctionArtifacts = (a, b) => a.selector.toField().cmp(b.selector.toField());
/** Creates a ContractClass from a contract compilation artifact. */
export async function getContractClassFromArtifact(artifact) {
    const artifactHash = 'artifactHash' in artifact ? artifact.artifactHash : await computeArtifactHash(artifact);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3RfY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnRCxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNySCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFnQyxrQ0FBa0MsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUtwRCxNQUFNLG9CQUFvQixHQUFHLENBQTJDLENBQUksRUFBRSxDQUFJLEVBQUUsRUFBRSxDQUNwRixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFakQsb0VBQW9FO0FBQ3BFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsNEJBQTRCLENBQ2hELFFBQXFEO0lBRXJELE1BQU0sWUFBWSxHQUFHLGNBQWMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUcsTUFBTSxlQUFlLEdBQXFDLFFBQVEsQ0FBQyxTQUFTO1NBQ3pFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUNuRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUN0RSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7S0FDckIsQ0FBQyxDQUFDO1NBQ0YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFOUIsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJELE1BQU0sZ0JBQWdCLEdBQXNDLFFBQVEsQ0FBQyxTQUFTO1NBQzNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUNwRCxHQUFHLENBQUMsMkNBQTJDLENBQUM7U0FDaEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFOUIsTUFBTSxhQUFhLEdBQWtCO1FBQ25DLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWTtRQUNaLGVBQWU7UUFDZixjQUFjO1FBQ2QsZ0JBQWdCO0tBQ2pCLENBQUM7SUFDRixPQUFPLEVBQUUsR0FBRyxhQUFhLEVBQUUsR0FBRyxDQUFDLE1BQU0sa0NBQWtDLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzVGLENBQUM7QUFFRCxNQUFNLFVBQVUsMkNBQTJDLENBQ3pELENBQW1CO0lBRW5CLE9BQU87UUFDTCxRQUFRLEVBQUUsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3RFLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDLENBQUMsZUFBZ0IsQ0FBQztLQUN2RCxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyx3QkFBZ0M7SUFDekUsNkVBQTZFO0lBQzdFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztBQUNqQixDQUFDIn0=