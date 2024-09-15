import { type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type CompleteAddress, type GrumpkinScalar } from '@aztec/circuit-types';
import { DefaultAccountContract } from '../defaults/account_contract.js';
/**
 * Account contract that authenticates transactions using Schnorr signatures
 * verified against a Grumpkin public key stored in an immutable encrypted note.
 */
export declare class SchnorrAccountContract extends DefaultAccountContract {
    private signingPrivateKey;
    constructor(signingPrivateKey: GrumpkinScalar);
    getDeploymentArgs(): Promise<Buffer[]>;
    getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider;
}
//# sourceMappingURL=account_contract.d.ts.map