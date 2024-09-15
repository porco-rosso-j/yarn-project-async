import { type Tx, type TxExecutionRequest } from '@aztec/circuit-types';
import { AztecAddress } from '@aztec/circuits.js';
import { type ContractArtifact, type FunctionArtifact } from '@aztec/foundation/abi';
import { type Fr } from '@aztec/foundation/fields';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
import { type Wallet } from '../account/index.js';
import { type ExecutionRequestInit } from '../entrypoint/entrypoint.js';
import { BaseContractInteraction, type SendMethodOptions } from './base_contract_interaction.js';
import { type Contract } from './contract.js';
import { type ContractBase } from './contract_base.js';
import { DeploySentTx } from './deploy_sent_tx.js';
/**
 * Options for deploying a contract on the Aztec network.
 * Allows specifying a contract address salt, and additional send method options.
 */
export type DeployOptions = {
    /** An optional salt value used to deterministically calculate the contract address. */
    contractAddressSalt?: Fr;
    /** Set to true to *not* include the sender in the address computation. */
    universalDeploy?: boolean;
    /** Skip contract class registration. */
    skipClassRegistration?: boolean;
    /** Skip public deployment, instead just privately initialize the contract. */
    skipPublicDeployment?: boolean;
    /** Skip contract initialization. */
    skipInitialization?: boolean;
} & SendMethodOptions;
/**
 * Contract interaction for deployment. Handles class registration, public instance deployment,
 * and initialization of the contract. Extends the BaseContractInteraction class.
 */
export declare class DeployMethod<TContract extends ContractBase = Contract> extends BaseContractInteraction {
    private publicKeysHash;
    private artifact;
    private postDeployCtor;
    private args;
    /** The contract instance to be deployed. */
    private instance?;
    /** Constructor function to call. */
    private constructorArtifact;
    /** Cached call to request() */
    private functionCalls?;
    constructor(publicKeysHash: Fr, wallet: Wallet, artifact: ContractArtifact, postDeployCtor: (address: AztecAddress, wallet: Wallet) => Promise<TContract>, args?: any[], constructorNameOrArtifact?: string | FunctionArtifact);
    /**
     * Create a contract deployment transaction, given the deployment options.
     * This function internally calls `request()` and `sign()` methods to prepare
     * the transaction for deployment. The resulting signed transaction can be
     * later sent using the `send()` method.
     *
     * @param options - An object containing optional deployment settings, contractAddressSalt, and from.
     * @returns A Promise resolving to an object containing the signed transaction data and other relevant information.
     */
    create(options?: DeployOptions): Promise<TxExecutionRequest>;
    /**
     * Returns an array of function calls that represent this operation. Useful as a building
     * block for constructing batch requests.
     * @param options - Deployment options.
     * @returns An array of function calls.
     * @remarks This method does not have the same return type as the `request` in the ContractInteraction object,
     * it returns a promise for an array instead of a function call directly.
     */
    request(options?: DeployOptions): Promise<ExecutionRequestInit>;
    /**
     * Returns calls for registration of the class and deployment of the instance, depending on the provided options.
     * @param options - Deployment options.
     * @returns A function call array with potentially requests to the class registerer and instance deployer.
     */
    protected getDeploymentFunctionCalls(options?: DeployOptions): Promise<ExecutionRequestInit>;
    /**
     * Returns the calls necessary to initialize the contract.
     * @param options - Deployment options.
     * @returns - An array of function calls.
     */
    protected getInitializeFunctionCalls(options: DeployOptions): Promise<ExecutionRequestInit>;
    /**
     * Send the contract deployment transaction using the provided options.
     * This function extends the 'send' method from the ContractFunctionInteraction class,
     * allowing us to send a transaction specifically for contract deployment.
     *
     * @param options - An object containing various deployment options such as contractAddressSalt and from.
     * @returns A SentTx object that returns the receipt and the deployed contract instance.
     */
    send(options?: DeployOptions): Promise<DeploySentTx<TContract>>;
    /**
     * Builds the contract instance to be deployed and returns it.
     *
     * @param options - An object containing various deployment options.
     * @returns An instance object.
     */
    getInstance(options?: DeployOptions): Promise<ContractInstanceWithAddress>;
    /**
     * Prove the request.
     * @param options - Deployment options.
     * @returns The proven tx.
     */
    prove(options: DeployOptions): Promise<Tx>;
    /**
     * Estimates gas cost for this deployment operation.
     * @param options - Options.
     */
    estimateGas(options?: Omit<DeployOptions, 'estimateGas' | 'skipPublicSimulation'>): Promise<Pick<import("@aztec/circuits.js").GasSettings, "gasLimits" | "teardownGasLimits">>;
    /** Return this deployment address. */
    get address(): AztecAddress | undefined;
    /** Returns the partial address for this deployment. */
    get partialAddress(): Promise<Fr> | undefined;
}
//# sourceMappingURL=deploy_method.d.ts.map