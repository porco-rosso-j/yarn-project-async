import { CompleteAddress } from '@aztec/circuit-types';
import { deriveKeys, getContractInstanceFromDeployParams } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { DefaultWaitOpts } from '../contract/sent_tx.js';
import { DefaultMultiCallEntrypoint } from '../entrypoint/default_multi_call_entrypoint.js';
import { waitForAccountSynch } from '../utils/account.js';
import { AccountWalletWithSecretKey, SignerlessWallet } from '../wallet/index.js';
import { DeployAccountMethod } from './deploy_account_method.js';
import { DeployAccountSentTx } from './deploy_account_sent_tx.js';
/**
 * Manages a user account. Provides methods for calculating the account's address, deploying the account contract,
 * and creating and registering the user wallet in the PXE Service.
 */
export class AccountManager {
    constructor(pxe, secretKey, accountContract, salt) {
        this.pxe = pxe;
        this.secretKey = secretKey;
        this.accountContract = accountContract;
        this.salt = salt !== undefined ? new Fr(salt) : Fr.random();
    }
    async getPublicKeysHash() {
        if (!this.publicKeysHash) {
            this.publicKeysHash = await (await deriveKeys(this.secretKey)).publicKeys.hash();
        }
        return this.publicKeysHash;
    }
    /**
     * Returns the entrypoint for this account as defined by its account contract.
     * @returns An entrypoint.
     */
    async getAccount() {
        const nodeInfo = await this.pxe.getNodeInfo();
        const completeAddress = this.getCompleteAddress();
        return this.accountContract.getInterface(await completeAddress, nodeInfo);
    }
    /**
     * Gets the calculated complete address associated with this account.
     * Does not require the account to be deployed or registered.
     * @returns The address, partial address, and encryption public key.
     */
    async getCompleteAddress() {
        if (!this.completeAddress) {
            const instance = await this.getInstance();
            this.completeAddress = await CompleteAddress.fromSecretKeyAndInstance(this.secretKey, instance);
        }
        return this.completeAddress;
    }
    /**
     * Returns the contract instance definition associated with this account.
     * Does not require the account to be deployed or registered.
     * @returns ContractInstance instance.
     */
    async getInstance() {
        if (!this.instance) {
            this.instance = await getContractInstanceFromDeployParams(this.accountContract.getContractArtifact(), {
                constructorArgs: await this.accountContract.getDeploymentArgs(),
                salt: this.salt,
                publicKeysHash: await this.getPublicKeysHash(),
            });
        }
        return this.instance;
    }
    /**
     * Returns a Wallet instance associated with this account. Use it to create Contract
     * instances to be interacted with from this account.
     * @returns A Wallet instance.
     */
    async getWallet() {
        const entrypoint = await this.getAccount();
        return new AccountWalletWithSecretKey(this.pxe, entrypoint, this.secretKey, this.salt);
    }
    /**
     * Registers this account in the PXE Service and returns the associated wallet. Registering
     * the account on the PXE Service is required for managing private state associated with it.
     * Use the returned wallet to create Contract instances to be interacted with from this account.
     * @param opts - Options to wait for the account to be synched.
     * @returns A Wallet instance.
     */
    async register(opts = DefaultWaitOpts) {
        await this.pxe.registerContract({
            artifact: this.accountContract.getContractArtifact(),
            instance: await this.getInstance(),
        });
        await this.pxe.registerAccount(this.secretKey, (await this.getCompleteAddress()).partialAddress);
        await waitForAccountSynch(this.pxe, await this.getCompleteAddress(), opts);
        return this.getWallet();
    }
    /**
     * Returns the pre-populated deployment method to deploy the account contract that backs this account.
     * Typically you will not need this method and can call `deploy` directly. Use this for having finer
     * grained control on when to create, simulate, and send the deployment tx.
     * @returns A DeployMethod instance that deploys this account contract.
     */
    async getDeployMethod() {
        if (!this.deployMethod) {
            if (!this.isDeployable()) {
                throw new Error(`Account contract ${this.accountContract.getContractArtifact().name} does not require deployment.`);
            }
            await this.pxe.registerAccount(this.secretKey, (await this.getCompleteAddress()).partialAddress);
            const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
            const deployWallet = new SignerlessWallet(this.pxe, new DefaultMultiCallEntrypoint(chainId, protocolVersion));
            // We use a signerless wallet with the multi call entrypoint in order to make multiple calls in one go
            // If we used getWallet, the deployment would get routed via the account contract entrypoint
            // and it can't be used unless the contract is initialized
            const args = (await this.accountContract.getDeploymentArgs()) ?? [];
            this.deployMethod = new DeployAccountMethod(this.accountContract.getAuthWitnessProvider(await this.getCompleteAddress()), await this.getPublicKeysHash(), deployWallet, this.accountContract.getContractArtifact(), args, 'constructor', 'entrypoint');
        }
        return this.deployMethod;
    }
    /**
     * Deploys the account contract that backs this account.
     * Does not register the associated class nor publicly deploy the instance by default.
     * Uses the salt provided in the constructor or a randomly generated one.
     * Registers the account in the PXE Service before deploying the contract.
     * @param opts - Fee options to be used for the deployment.
     * @returns A SentTx object that can be waited to get the associated Wallet.
     */
    deploy(opts) {
        const sentTx = this.getDeployMethod()
            .then(deployMethod => deployMethod.send({
            contractAddressSalt: this.salt,
            skipClassRegistration: opts?.skipClassRegistration ?? true,
            skipPublicDeployment: opts?.skipPublicDeployment ?? true,
            skipInitialization: opts?.skipInitialization ?? false,
            universalDeploy: true,
            fee: opts?.fee,
            estimateGas: opts?.estimateGas,
        }))
            .then(tx => tx.getTxHash());
        return new DeployAccountSentTx(this.pxe, sentTx, this.getWallet());
    }
    /**
     * Deploys the account contract that backs this account if needed and awaits the tx to be mined.
     * Uses the salt provided in the constructor or a randomly generated one. If no initialization
     * is required it skips the transaction, and only registers the account in the PXE Service.
     * @param opts - Options to wait for the tx to be mined.
     * @returns A Wallet instance.
     */
    async waitSetup(opts = DefaultWaitOpts) {
        await (this.isDeployable() ? this.deploy().wait(opts) : this.register());
        return this.getWallet();
    }
    /**
     * Returns whether this account contract has a constructor and needs deployment.
     */
    isDeployable() {
        return this.accountContract.getDeploymentArgs() !== undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWNjb3VudF9tYW5hZ2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckYsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTzlDLE9BQU8sRUFBRSxlQUFlLEVBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDNUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFVbEU7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFVekIsWUFBb0IsR0FBUSxFQUFVLFNBQWEsRUFBVSxlQUFnQyxFQUFFLElBQVc7UUFBdEYsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQUk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDM0YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFUyxLQUFLLENBQUMsaUJBQWlCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekIs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