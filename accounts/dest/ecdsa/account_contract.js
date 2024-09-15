import { AuthWitness } from '@aztec/circuit-types';
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
import { DefaultAccountContract } from '../defaults/account_contract.js';
import { EcdsaAccountContractArtifact } from './artifact.js';
/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export class EcdsaAccountContract extends DefaultAccountContract {
    constructor(signingPrivateKey) {
        super(EcdsaAccountContractArtifact);
        this.signingPrivateKey = signingPrivateKey;
    }
    async getDeploymentArgs() {
        const signingPublicKey = await new Ecdsa().computePublicKey(this.signingPrivateKey);
        return [signingPublicKey.subarray(0, 32), signingPublicKey.subarray(32, 64)];
    }
    getAuthWitnessProvider(_address) {
        return new EcdsaAuthWitnessProvider(this.signingPrivateKey);
    }
}
/** Creates auth witnesses using ECDSA signatures. */
class EcdsaAuthWitnessProvider {
    constructor(signingPrivateKey) {
        this.signingPrivateKey = signingPrivateKey;
    }
    async createAuthWit(messageHash) {
        const ecdsa = new Ecdsa();
        const signature = await ecdsa.constructSignature(messageHash.toBuffer(), this.signingPrivateKey);
        return Promise.resolve(new AuthWitness(messageHash, [...signature.r, ...signature.s]));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9jb250cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lY2RzYS9hY2NvdW50X2NvbnRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQXdCLE1BQU0sc0JBQXNCLENBQUM7QUFDekUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSXhELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsc0JBQXNCO0lBQzlELFlBQW9CLGlCQUF5QjtRQUMzQyxLQUFLLENBQUMsNEJBQWdELENBQUMsQ0FBQztRQUR0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7SUFFN0MsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEYsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxRQUF5QjtRQUM5QyxPQUFPLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGO0FBRUQscURBQXFEO0FBQ3JELE1BQU0sd0JBQXdCO0lBQzVCLFlBQW9CLGlCQUF5QjtRQUF6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7SUFBRyxDQUFDO0lBRWpELEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBZTtRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNqRyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0YifQ==