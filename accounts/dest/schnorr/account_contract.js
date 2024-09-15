import { AuthWitness } from '@aztec/circuit-types';
import { Schnorr } from '@aztec/circuits.js/barretenberg';
import { DefaultAccountContract } from '../defaults/account_contract.js';
import { SchnorrAccountContractArtifact } from './artifact.js';
/**
 * Account contract that authenticates transactions using Schnorr signatures
 * verified against a Grumpkin public key stored in an immutable encrypted note.
 */
export class SchnorrAccountContract extends DefaultAccountContract {
    constructor(signingPrivateKey) {
        super(SchnorrAccountContractArtifact);
        this.signingPrivateKey = signingPrivateKey;
    }
    async getDeploymentArgs() {
        const signingPublicKey = new Schnorr().computePublicKey(this.signingPrivateKey);
        return [signingPublicKey.x, signingPublicKey.y];
    }
    getAuthWitnessProvider(_address) {
        return new SchnorrAuthWitnessProvider(this.signingPrivateKey);
    }
}
/** Creates auth witnesses using Schnorr signatures. */
class SchnorrAuthWitnessProvider {
    constructor(signingPrivateKey) {
        this.signingPrivateKey = signingPrivateKey;
    }
    createAuthWit(messageHash) {
        const schnorr = new Schnorr();
        const signature = schnorr.constructSignature(messageHash.toBuffer(), this.signingPrivateKey).toBuffer();
        return Promise.resolve(new AuthWitness(messageHash, [...signature]));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hub3JyL2FjY291bnRfY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBNkMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDekUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9EOzs7R0FHRztBQUNILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxzQkFBc0I7SUFDaEUsWUFBb0IsaUJBQWlDO1FBQ25ELEtBQUssQ0FBQyw4QkFBa0QsQ0FBQyxDQUFDO1FBRHhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0I7SUFFckQsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHNCQUFzQixDQUFDLFFBQXlCO1FBQzlDLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0Y7QUFFRCx1REFBdUQ7QUFDdkQsTUFBTSwwQkFBMEI7SUFDOUIsWUFBb0IsaUJBQWlDO1FBQWpDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0I7SUFBRyxDQUFDO0lBRXpELGFBQWEsQ0FBQyxXQUFlO1FBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGIn0=