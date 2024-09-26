import { AztecAddress, CANONICAL_AUTH_REGISTRY_ADDRESS } from '@aztec/circuits.js';
import { getCanonicalProtocolContract } from '../protocol_contract.js';
import { AuthRegistryArtifact } from './artifact.js';
/** Returns the canonical deployment of the auth registry. */
export async function getCanonicalAuthRegistry() {
    const contract = await getCanonicalProtocolContract(AuthRegistryArtifact, 1);
    if (!contract.address.equals(AuthRegistryAddress)) {
        throw new Error(`Incorrect address for auth registry (got ${contract.address.toString()} but expected ${AuthRegistryAddress.toString()}). Check CANONICAL_AUTH_REGISTRY_ADDRESS is set to the correct value in the constants files and run the protocol-contracts package tests.`);
    }
    return contract;
}
export async function getCanonicalAuthRegistryAddress() {
    return (await getCanonicalAuthRegistry()).address;
}
export const AuthRegistryAddress = AztecAddress.fromBigInt(CANONICAL_AUTH_REGISTRY_ADDRESS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLCtCQUErQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbkYsT0FBTyxFQUF5Qiw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRCw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLEtBQUssVUFBVSx3QkFBd0I7SUFDNUMsTUFBTSxRQUFRLEdBQUcsTUFBTSw0QkFBNEIsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1FBQ2xELE1BQU0sSUFBSSxLQUFLLENBQ2IsNENBQTRDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsMklBQTJJLENBQ2xRLENBQUM7SUFDSixDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsK0JBQStCO0lBQ25ELE9BQU8sQ0FBQyxNQUFNLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDcEQsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsK0JBQStCLENBQUMsQ0FBQyJ9