import { AztecAddress, CANONICAL_KEY_REGISTRY_ADDRESS } from '@aztec/circuits.js';
import { getCanonicalProtocolContract } from '../protocol_contract.js';
import { KeyRegistryArtifact } from './artifact.js';
/** Returns the canonical deployment of the public key registry. */
export async function getCanonicalKeyRegistry() {
    const contract = await getCanonicalProtocolContract(KeyRegistryArtifact, 1);
    if (!contract.address.equals(KeyRegistryAddress)) {
        throw new Error(`Incorrect address for key registry (got ${contract.address.toString()} but expected ${KeyRegistryAddress.toString()}). Check CANONICAL_KEY_REGISTRY_ADDRESS is set to the correct value in the constants files and run the protocol-contracts package tests.`);
    }
    return contract;
}
export async function getCanonicalKeyRegistryAddress() {
    return (await getCanonicalKeyRegistry()).address;
}
export const KeyRegistryAddress = AztecAddress.fromBigInt(CANONICAL_KEY_REGISTRY_ADDRESS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMva2V5LXJlZ2lzdHJ5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRixPQUFPLEVBQXlCLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBELG1FQUFtRTtBQUNuRSxNQUFNLENBQUMsS0FBSyxVQUFVLHVCQUF1QjtJQUMzQyxNQUFNLFFBQVEsR0FBRyxNQUFNLDRCQUE0QixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTVFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FDYiwyQ0FBMkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSwwSUFBMEksQ0FDL1AsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSw4QkFBOEI7SUFDbEQsT0FBTyxDQUFDLE1BQU0sdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUNuRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDIn0=