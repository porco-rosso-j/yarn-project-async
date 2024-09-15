import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
import { type ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
import { type Wallet } from '../wallet/index.js';
/**
 * Sets up a call to the canonical deployer contract to publicly deploy a contract instance.
 * @param wallet - The wallet to use for the deployment.
 * @param instance - The instance to deploy.
 */
export declare function deployInstance(wallet: Wallet, instance: ContractInstanceWithAddress): ContractFunctionInteraction;
//# sourceMappingURL=deploy_instance.d.ts.map