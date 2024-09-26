import { AztecAddress, DEPLOYER_CONTRACT_ADDRESS } from '@aztec/circuits.js';
import { getCanonicalProtocolContract } from '../protocol_contract.js';
import { ContractInstanceDeployerArtifact } from './artifact.js';
/** Returns the canonical deployment of the instance deployer contract. */
export async function getCanonicalInstanceDeployer() {
    const contract = await getCanonicalProtocolContract(ContractInstanceDeployerArtifact, 1);
    if (!contract.address.equals(InstanceDeployerAddress)) {
        throw new Error(`Incorrect address for contract deployer (got ${contract.address.toString()} but expected ${InstanceDeployerAddress.toString()}).`);
    }
    return contract;
}
export const InstanceDeployerAddress = AztecAddress.fromBigInt(DEPLOYER_CONTRACT_ADDRESS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5zdGFuY2UtZGVwbG95ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdFLE9BQU8sRUFBeUIsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakUsMEVBQTBFO0FBQzFFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsNEJBQTRCO0lBQ2hELE1BQU0sUUFBUSxHQUFHLE1BQU0sNEJBQTRCLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQztRQUN0RCxNQUFNLElBQUksS0FBSyxDQUNiLGdEQUFnRCxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsdUJBQXVCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FDbkksQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDIn0=