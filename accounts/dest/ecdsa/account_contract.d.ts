import { type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type CompleteAddress } from '@aztec/circuit-types';
import { DefaultAccountContract } from '../defaults/account_contract.js';
/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export declare class EcdsaAccountContract extends DefaultAccountContract {
    private signingPrivateKey;
    constructor(signingPrivateKey: Buffer);
    getDeploymentArgs(): Promise<any[] | undefined>;
    getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider;
}
//# sourceMappingURL=account_contract.d.ts.map