import { type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type CompleteAddress, type GrumpkinScalar } from '@aztec/circuit-types';
import { DefaultAccountContract } from '../defaults/account_contract.js';
/**
 * Account contract that authenticates transactions using Schnorr signatures verified against
 * the note encryption key, relying on a single private key for both encryption and authentication.
 */
export declare class SingleKeyAccountContract extends DefaultAccountContract {
    private encryptionPrivateKey;
    constructor(encryptionPrivateKey: GrumpkinScalar);
    getDeploymentArgs(): Promise<any[] | undefined>;
    getAuthWitnessProvider(account: CompleteAddress): AuthWitnessProvider;
}
//# sourceMappingURL=account_contract.d.ts.map