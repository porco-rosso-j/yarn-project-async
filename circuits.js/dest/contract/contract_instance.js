import { FunctionSelector, getDefaultInitializer, } from '@aztec/foundation/abi';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { getContractClassFromArtifact } from '../contract/contract_class.js';
import { computeContractClassId } from '../contract/contract_class_id.js';
import { computeContractAddressFromInstance, computeInitializationHash, computeInitializationHashFromEncodedArgs, } from './contract_address.js';
/**
 * Generates a Contract Instance from the deployment params.
 * @param artifact - The account contract build artifact.
 * @param opts - Options for the deployment.
 * @returns - The contract instance
 */
export async function getContractInstanceFromDeployParams(artifact, opts) {
    const args = opts.constructorArgs ?? [];
    const salt = opts.salt ?? Fr.random();
    const constructorArtifact = getConstructorArtifact(artifact, opts.constructorArtifact);
    const deployer = opts.deployer ?? AztecAddress.ZERO;
    const contractClass = await getContractClassFromArtifact(artifact);
    const contractClassId = await computeContractClassId(contractClass);
    const initializationHash = constructorArtifact && opts?.skipArgsDecoding
        ? await computeInitializationHashFromEncodedArgs(FunctionSelector.fromNameAndParameters(constructorArtifact?.name, constructorArtifact?.parameters), args)
        : await computeInitializationHash(constructorArtifact, args);
    const publicKeysHash = opts.publicKeysHash ?? Fr.ZERO;
    const instance = {
        contractClassId,
        initializationHash,
        publicKeysHash,
        salt,
        deployer,
        version: 1,
    };
    return { ...instance, address: await computeContractAddressFromInstance(instance) };
}
function getConstructorArtifact(artifact, requestedConstructorArtifact) {
    if (typeof requestedConstructorArtifact === 'string') {
        const found = artifact.functions.find(fn => fn.name === requestedConstructorArtifact);
        if (!found) {
            throw new Error(`No constructor found with name ${requestedConstructorArtifact}`);
        }
        return found;
    }
    return requestedConstructorArtifact ?? getDefaultInitializer(artifact);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3RfaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLGdCQUFnQixFQUNoQixxQkFBcUIsR0FDdEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzlDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFFLE9BQU8sRUFDTCxrQ0FBa0MsRUFDbEMseUJBQXlCLEVBQ3pCLHdDQUF3QyxHQUN6QyxNQUFNLHVCQUF1QixDQUFDO0FBRS9COzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxtQ0FBbUMsQ0FDdkQsUUFBMEIsRUFDMUIsSUFPQztJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO0lBQ3hDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLE1BQU0sbUJBQW1CLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQztJQUNwRCxNQUFNLGFBQWEsR0FBRyxNQUFNLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sZUFBZSxHQUFHLE1BQU0sc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEUsTUFBTSxrQkFBa0IsR0FDdEIsbUJBQW1CLElBQUksSUFBSSxFQUFFLGdCQUFnQjtRQUMzQyxDQUFDLENBQUMsTUFBTSx3Q0FBd0MsQ0FDNUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxFQUNsRyxJQUFJLENBQ0w7UUFDSCxDQUFDLENBQUMsTUFBTSx5QkFBeUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFFdEQsTUFBTSxRQUFRLEdBQXFCO1FBQ2pDLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLElBQUk7UUFDSixRQUFRO1FBQ1IsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBRUYsT0FBTyxFQUFFLEdBQUcsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLGtDQUFrQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7QUFDdEYsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQzdCLFFBQTBCLEVBQzFCLDRCQUFtRTtJQUVuRSxJQUFJLE9BQU8sNEJBQTRCLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLDRCQUE0QixDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPLDRCQUE0QixJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pFLENBQUMifQ==