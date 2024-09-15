import { CompleteAddress, type PXE } from '@aztec/circuit-types';
import { Fr } from '@aztec/foundation/fields';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
import { type AccountContract } from '../account/contract.js';
import { type Salt } from '../account/index.js';
import { type AccountInterface } from '../account/interface.js';
import { type DeployOptions } from '../contract/deploy_method.js';
import { type WaitOpts } from '../contract/sent_tx.js';
import { AccountWalletWithSecretKey } from '../wallet/index.js';
import { DeployAccountMethod } from './deploy_account_method.js';
import { DeployAccountSentTx } from './deploy_account_sent_tx.js';
/**
 * Options to deploy an account contract.
 */
export type DeployAccountOptions = Pick<DeployOptions, 'fee' | 'skipClassRegistration' | 'skipPublicDeployment' | 'estimateGas' | 'skipInitialization'>;
/**
 * Manages a user account. Provides methods for calculating the account's address, deploying the account contract,
 * and creating and registering the user wallet in the PXE Service.
 */
export declare class AccountManager {
    private pxe;
    private secretKey;
    private accountContract;
    /** Deployment salt for the account contract. */
    readonly salt: Fr;
    private completeAddress?;
    private instance?;
    private publicKeysHash?;
    private deployMethod?;
    constructor(pxe: PXE, secretKey: Fr, accountContract: AccountContract, salt?: Salt);
    protected getPublicKeysHash(): Promise<Fr>;
    /**
     * Returns the entrypoint for this account as defined by its account contract.
     * @returns An entrypoint.
     */
    getAccount(): Promise<AccountInterface>;
    /**
     * Gets the calculated complete address associated with this account.
     * Does not require the account to be deployed or registered.
     * @returns The address, partial address, and encryption public key.
     */
    getCompleteAddress(): Promise<CompleteAddress>;
    /**
     * Returns the contract instance definition associated with this account.
     * Does not require the account to be deployed or registered.
     * @returns ContractInstance instance.
     */
    getInstance(): Promise<ContractInstanceWithAddress>;
    /**
     * Returns a Wallet instance associated with this account. Use it to create Contract
     * instances to be interacted with from this account.
     * @returns A Wallet instance.
     */
    getWallet(): Promise<AccountWalletWithSecretKey>;
    /**
     * Registers this account in the PXE Service and returns the associated wallet. Registering
     * the account on the PXE Service is required for managing private state associated with it.
     * Use the returned wallet to create Contract instances to be interacted with from this account.
     * @param opts - Options to wait for the account to be synched.
     * @returns A Wallet instance.
     */
    register(opts?: WaitOpts): Promise<AccountWalletWithSecretKey>;
    /**
     * Returns the pre-populated deployment method to deploy the account contract that backs this account.
     * Typically you will not need this method and can call `deploy` directly. Use this for having finer
     * grained control on when to create, simulate, and send the deployment tx.
     * @returns A DeployMethod instance that deploys this account contract.
     */
    getDeployMethod(): Promise<DeployAccountMethod>;
    /**
     * Deploys the account contract that backs this account.
     * Does not register the associated class nor publicly deploy the instance by default.
     * Uses the salt provided in the constructor or a randomly generated one.
     * Registers the account in the PXE Service before deploying the contract.
     * @param opts - Fee options to be used for the deployment.
     * @returns A SentTx object that can be waited to get the associated Wallet.
     */
    deploy(opts?: DeployAccountOptions): DeployAccountSentTx;
    /**
     * Deploys the account contract that backs this account if needed and awaits the tx to be mined.
     * Uses the salt provided in the constructor or a randomly generated one. If no initialization
     * is required it skips the transaction, and only registers the account in the PXE Service.
     * @param opts - Options to wait for the tx to be mined.
     * @returns A Wallet instance.
     */
    waitSetup(opts?: WaitOpts): Promise<AccountWalletWithSecretKey>;
    /**
     * Returns whether this account contract has a constructor and needs deployment.
     */
    isDeployable(): boolean;
}
//# sourceMappingURL=index.d.ts.map