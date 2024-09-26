import { AztecAddress, GAS_TOKEN_ADDRESS } from '@aztec/circuits.js';
import { getCanonicalProtocolContract } from '../protocol_contract.js';
import { GasTokenArtifact } from './artifact.js';
/** Returns the canonical deployment of the gas token. */
export async function getCanonicalGasToken() {
    const contract = await getCanonicalProtocolContract(GasTokenArtifact, 1);
    if (!contract.address.equals(GasTokenAddress)) {
        throw new Error(`Incorrect address for gas token (got ${contract.address.toString()} but expected ${GasTokenAddress.toString()}).`);
    }
    return contract;
}
export const GasTokenAddress = AztecAddress.fromBigInt(GAS_TOKEN_ADDRESS);
export { GasTokenArtifact };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2FzLXRva2VuL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRSxPQUFPLEVBQXlCLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELHlEQUF5RDtBQUN6RCxNQUFNLENBQUMsS0FBSyxVQUFVLG9CQUFvQjtJQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLDRCQUE0QixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0NBQXdDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksQ0FDbkgsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyJ9