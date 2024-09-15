import { type Fr } from '@aztec/circuits.js';
import { type ContractArtifact, type FunctionArtifact } from '@aztec/foundation/abi';
import { type AuthWitnessProvider } from '../account/interface.js';
import { type Wallet } from '../account/wallet.js';
import { type ExecutionRequestInit } from '../api/entrypoint.js';
import { DeployMethod, type DeployOptions } from '../contract/deploy_method.js';
/**
 * Contract interaction for deploying an account contract. Handles fee preparation and contract initialization.
 */
export declare class DeployAccountMethod extends DeployMethod {
    #private;
    constructor(authWitnessProvider: AuthWitnessProvider, publicKeysHash: Fr, wallet: Wallet, artifact: ContractArtifact, args?: any[], constructorNameOrArtifact?: string | FunctionArtifact, feePaymentNameOrArtifact?: string | FunctionArtifact);
    protected getInitializeFunctionCalls(options: DeployOptions): Promise<ExecutionRequestInit>;
}
//# sourceMappingURL=deploy_account_method.d.ts.map