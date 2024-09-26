import { AztecAddress, REGISTERER_CONTRACT_ADDRESS } from '@aztec/circuits.js';
import { getCanonicalProtocolContract } from '../protocol_contract.js';
import { ContractClassRegistererArtifact } from './artifact.js';
/** Returns the canonical deployment of the class registerer contract. */
export async function getCanonicalClassRegisterer() {
    const contract = await getCanonicalProtocolContract(ContractClassRegistererArtifact, 1);
    if (!contract.address.equals(ClassRegistererAddress)) {
        throw new Error(`Incorrect address for class registerer (got ${contract.address.toString()} but expected ${ClassRegistererAddress.toString()}).`);
    }
    return contract;
}
export const ClassRegistererAddress = AztecAddress.fromBigInt(REGISTERER_CONTRACT_ADDRESS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xhc3MtcmVnaXN0ZXJlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0UsT0FBTyxFQUF5Qiw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRSx5RUFBeUU7QUFDekUsTUFBTSxDQUFDLEtBQUssVUFBVSwyQkFBMkI7SUFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSw0QkFBNEIsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDO1FBQ3JELE1BQU0sSUFBSSxLQUFLLENBQ2IsK0NBQStDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUNqSSxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUMifQ==