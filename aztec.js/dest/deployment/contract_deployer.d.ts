import { type ContractArtifact } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { type Wallet } from '../account/wallet.js';
import { DeployMethod } from '../contract/deploy_method.js';
import { Contract } from '../contract/index.js';
/**
 * A class for deploying contract.
 * @remarks Keeping this around even though we have Aztec.nr contract types because it can be useful for non-TS users.
 */
export declare class ContractDeployer {
    private artifact;
    private wallet;
    private publicKeysHash?;
    private constructorName?;
    constructor(artifact: ContractArtifact, wallet: Wallet, publicKeysHash?: Fr | undefined, constructorName?: string | undefined);
    /**
     * Deploy a contract using the provided ABI and constructor arguments.
     * This function creates a new DeployMethod instance that can be used to send deployment transactions
     * and query deployment status. The method accepts any number of constructor arguments, which will
     * be passed to the contract's constructor during deployment.
     *
     * @param args - The constructor arguments for the contract being deployed.
     * @returns A DeployMethod instance configured with the ABI, PXE, and constructor arguments.
     */
    deploy(...args: any[]): DeployMethod<Contract>;
}
//# sourceMappingURL=contract_deployer.d.ts.map