import { AuthWitness } from '@aztec/circuit-types';
import { Schnorr } from '@aztec/circuits.js/barretenberg';
import { DefaultAccountContract } from '../defaults/account_contract.js';
import { SchnorrSingleKeyAccountContractArtifact } from './artifact.js';
/**
 * Account contract that authenticates transactions using Schnorr signatures verified against
 * the note encryption key, relying on a single private key for both encryption and authentication.
 */
export class SingleKeyAccountContract extends DefaultAccountContract {
    constructor(encryptionPrivateKey) {
        super(SchnorrSingleKeyAccountContractArtifact);
        this.encryptionPrivateKey = encryptionPrivateKey;
    }
    getDeploymentArgs() {
        return Promise.resolve(undefined);
    }
    getAuthWitnessProvider(account) {
        return new SingleKeyAuthWitnessProvider(this.encryptionPrivateKey, account);
    }
}
/**
 * Creates auth witnesses using Schnorr signatures and including the partial address and public key
 * in the witness, so verifiers do not need to store the public key and can instead validate it
 * by reconstructing the current address.
 */
class SingleKeyAuthWitnessProvider {
    constructor(privateKey, account) {
        this.privateKey = privateKey;
        this.account = account;
    }
    createAuthWit(messageHash) {
        const schnorr = new Schnorr();
        const signature = schnorr.constructSignature(messageHash.toBuffer(), this.privateKey);
        const witness = [...this.account.publicKeys.toFields(), ...signature.toBuffer(), this.account.partialAddress];
        return Promise.resolve(new AuthWitness(messageHash, witness));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaW5nbGVfa2V5L2FjY291bnRfY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBNkMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDekUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFOzs7R0FHRztBQUNILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxzQkFBc0I7SUFDbEUsWUFBb0Isb0JBQW9DO1FBQ3RELEtBQUssQ0FBQyx1Q0FBMkQsQ0FBQyxDQUFDO1FBRGpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBZ0I7SUFFeEQsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsc0JBQXNCLENBQUMsT0FBd0I7UUFDN0MsT0FBTyxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0Y7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSw0QkFBNEI7SUFDaEMsWUFBb0IsVUFBMEIsRUFBVSxPQUF3QjtRQUE1RCxlQUFVLEdBQVYsVUFBVSxDQUFnQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWlCO0lBQUcsQ0FBQztJQUVwRixhQUFhLENBQUMsV0FBZTtRQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlHLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0YifQ==