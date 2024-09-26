import { getContractClassFromArtifact, getContractInstanceFromDeployParams, } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
/** Returns the canonical deployment a given artifact. */
export async function getCanonicalProtocolContract(artifact, salt, constructorArgs = []) {
    // TODO(@spalladino): This computes the contract class from the artifact twice.
    const contractClass = await getContractClassFromArtifact(artifact);
    const instance = await getContractInstanceFromDeployParams(artifact, {
        constructorArgs,
        salt: new Fr(salt),
    });
    return {
        instance,
        contractClass,
        artifact,
        address: instance.address,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9jb2xfY29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvdG9jb2xfY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLDRCQUE0QixFQUM1QixtQ0FBbUMsR0FDcEMsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFlOUMseURBQXlEO0FBQ3pELE1BQU0sQ0FBQyxLQUFLLFVBQVUsNEJBQTRCLENBQ2hELFFBQTBCLEVBQzFCLElBQTBCLEVBQzFCLGtCQUF5QixFQUFFO0lBRTNCLCtFQUErRTtJQUMvRSxNQUFNLGFBQWEsR0FBRyxNQUFNLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sUUFBUSxHQUFHLE1BQU0sbUNBQW1DLENBQUMsUUFBUSxFQUFFO1FBQ25FLGVBQWU7UUFDZixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO0tBQ25CLENBQUMsQ0FBQztJQUNILE9BQU87UUFDTCxRQUFRO1FBQ1IsYUFBYTtRQUNiLFFBQVE7UUFDUixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87S0FDMUIsQ0FBQztBQUNKLENBQUMifQ==