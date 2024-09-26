import { type FunctionCall, type Tx, type TxExecutionRequest } from '@aztec/circuit-types';
import {
  AztecAddress,
  computePartialAddress,
  getContractClassFromArtifact,
  getContractInstanceFromDeployParams,
} from '@aztec/circuits.js';
import { type ContractArtifact, type FunctionArtifact, getInitializer } from '@aztec/foundation/abi';
import { type Fr } from '@aztec/foundation/fields';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';

import { type Wallet } from '../account/index.js';
import { deployInstance } from '../deployment/deploy_instance.js';
import { registerContractClass } from '../deployment/register_class.js';
import { type ExecutionRequestInit } from '../entrypoint/entrypoint.js';
import { BaseContractInteraction, type SendMethodOptions } from './base_contract_interaction.js';
import { type Contract } from './contract.js';
import { type ContractBase } from './contract_base.js';
import { ContractFunctionInteraction } from './contract_function_interaction.js';
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

// TODO(@spalladino): Add unit tests for this class!

/**
 * Contract interaction for deployment. Handles class registration, public instance deployment,
 * and initialization of the contract. Extends the BaseContractInteraction class.
 */
export class DeployMethod<TContract extends ContractBase = Contract> extends BaseContractInteraction {
  /** The contract instance to be deployed. */
  private instance?: ContractInstanceWithAddress = undefined;

  /** Constructor function to call. */
  private constructorArtifact: FunctionArtifact | undefined;

  /** Cached call to request() */
  private functionCalls?: ExecutionRequestInit;

  constructor(
    private publicKeysHash: Fr,
    wallet: Wallet,
    private artifact: ContractArtifact,
    private postDeployCtor: (address: AztecAddress, wallet: Wallet) => Promise<TContract>,
    private args: any[] = [],
    constructorNameOrArtifact?: string | FunctionArtifact,
  ) {
    super(wallet);
    this.constructorArtifact = getInitializer(artifact, constructorNameOrArtifact);
  }

  /**
   * Create a contract deployment transaction, given the deployment options.
   * This function internally calls `request()` and `sign()` methods to prepare
   * the transaction for deployment. The resulting signed transaction can be
   * later sent using the `send()` method.
   *
   * @param options - An object containing optional deployment settings, contractAddressSalt, and from.
   * @returns A Promise resolving to an object containing the signed transaction data and other relevant information.
   */
  public async create(options: DeployOptions = {}): Promise<TxExecutionRequest> {
    if (!this.txRequest) {
      this.txRequest = await this.wallet.createTxExecutionRequest(await this.request(options));
    }

    console.log('[create DeployMethod] txRequest.origin: ', this.txRequest.origin.toString());
    return this.txRequest;
  }

  // REFACTOR: Having a `request` method with different semantics than the ones in the other
  // derived ContractInteractions is confusing. We should unify the flow of all ContractInteractions.

  /**
   * Returns an array of function calls that represent this operation. Useful as a building
   * block for constructing batch requests.
   * @param options - Deployment options.
   * @returns An array of function calls.
   * @remarks This method does not have the same return type as the `request` in the ContractInteraction object,
   * it returns a promise for an array instead of a function call directly.
   */
  public async request(options: DeployOptions = {}): Promise<ExecutionRequestInit> {
    console.log('request called');
    if (!this.functionCalls) {
      // TODO: Should we add the contracts to the DB here, or once the tx has been sent or mined?
      // Note that we need to run this registerContract here so it's available when computeFeeOptionsFromEstimatedGas
      // runs, since it needs the contract to have been registered in order to estimate gas for its initialization,
      // in case the initializer is public. This hints at the need of having "transient" contracts scoped to a
      // simulation, so we can run the simulation with a set of contracts, but only "commit" them to the wallet
      // once this tx has gone through.
      console.log('registering contract');
      const instance = await this.getInstance(options);
      console.log('[request] instance address: ', instance.address.toString());
      // console.log('[request] instance contractClassId: ', instance.contractClassId.toString());
      // console.log('[request] instance deployer: ', instance.deployer.toString());
      // console.log('[request] instance publicKeysHash: ', instance.publicKeysHash.toString());
      // console.log('[request] instance initializationHash: ', instance.initializationHash.toString());
      // console.log('[request] instance salt: ', instance.salt.toString());
      // console.log('[request] instance version: ', instance.version.toString());
      // console.log('[request] artifact: ', this.artifact.name);
      await this.wallet.registerContract({ artifact: this.artifact, instance: instance });

      const deployment = await this.getDeploymentFunctionCalls(options);
      const bootstrap = await this.getInitializeFunctionCalls(options);

      if (deployment.calls.length + bootstrap.calls.length === 0) {
        throw new Error(`No function calls needed to deploy contract ${this.artifact.name}`);
      }

      const request = {
        calls: [...deployment.calls, ...bootstrap.calls],
        authWitnesses: [...(deployment.authWitnesses ?? []), ...(bootstrap.authWitnesses ?? [])],
        packedArguments: [...(deployment.packedArguments ?? []), ...(bootstrap.packedArguments ?? [])],
        fee: options.fee,
      };

      console.log('[request] options.estimateGas: ', options.estimateGas);
      if (options.estimateGas) {
        // Why do we call this seemingly idempotent getter method here, without using its return value?
        // This call pushes a capsule required for contract class registration under the hood. And since
        // capsules are a stack, when we run the simulation for estimating gas, we consume the capsule
        // that was meant for the actual call. So we need to push it again here. Hopefully this design
        // will go away soon.
        await this.getDeploymentFunctionCalls(options);
        request.fee = await this.getFeeOptionsFromEstimatedGas(request);
      }

      this.functionCalls = request;
    }

    // console.log('this.functionCalls name in request: ', this.functionCalls.calls[0].name);

    return this.functionCalls;
  }

  /**
   * Returns calls for registration of the class and deployment of the instance, depending on the provided options.
   * @param options - Deployment options.
   * @returns A function call array with potentially requests to the class registerer and instance deployer.
   */
  protected async getDeploymentFunctionCalls(options: DeployOptions = {}): Promise<ExecutionRequestInit> {
    const calls: FunctionCall[] = [];

    // Set contract instance object so it's available for populating the DeploySendTx object
    const instance = await this.getInstance(options);
    console.log('[getDeploymentFunctionCalls] instance address: ', instance.address.toString());

    // Obtain contract class from artifact and check it matches the reported one by the instance.
    // TODO(@spalladino): We're unnecessarily calculating the contract class multiple times here.
    const contractClass = await getContractClassFromArtifact(this.artifact);
    // console.log('[getDeploymentFunctionCalls] contractClass.artifactHash: ', contractClass.artifactHash.toString());
    // console.log('[getDeploymentFunctionCalls] contractClass.id: ', contractClass.id.toString());
    // console.log(
    //   '[getDeploymentFunctionCalls] contractClass.publicBytecodeCommitment: ',
    //   contractClass.publicBytecodeCommitment.toString(),
    // );
    // console.log(
    //   '[getDeploymentFunctionCalls] contractClass.privateFunctionsRoot: ',
    //   contractClass.privateFunctionsRoot.toString(),
    // );
    // console.log('[getDeploymentFunctionCalls] contractClass.packedBytecode: ', contractClass.packedBytecode.toString());

    if (!instance.contractClassId.equals(contractClass.id)) {
      throw new Error(
        `Contract class mismatch when deploying contract: got ${instance.contractClassId.toString()} from instance and ${contractClass.id.toString()} from artifact`,
      );
    }

    // Register the contract class if it hasn't been published already.
    console.log('[getDeploymentFunctionCalls] options.skipClassRegistration: ', options.skipClassRegistration);
    if (!options.skipClassRegistration) {
      if (await this.wallet.isContractClassPubliclyRegistered(contractClass.id)) {
        this.log.debug(
          `Skipping registration of already registered contract class ${contractClass.id.toString()} for ${instance.address.toString()}`,
        );
      } else {
        this.log.info(
          `Creating request for registering contract class ${contractClass.id.toString()} as part of deployment for ${instance.address.toString()}`,
        );
        calls.push((await registerContractClass(this.wallet, this.artifact)).request());
      }
    }

    // Deploy the contract via the instance deployer.
    console.log('[getDeploymentFunctionCalls] options.skipPublicDeployment: ', options.skipPublicDeployment);
    if (!options.skipPublicDeployment) {
      calls.push((await deployInstance(this.wallet, instance)).request());
    }

    // console.log('[getDeploymentFunctionCalls] calls: ', calls[0].name);

    return {
      calls,
    };
  }

  /**
   * Returns the calls necessary to initialize the contract.
   * @param options - Deployment options.
   * @returns - An array of function calls.
   */
  protected async getInitializeFunctionCalls(options: DeployOptions): Promise<ExecutionRequestInit> {
    const { address } = await this.getInstance(options);
    console.log('[getInitializeFunctionCalls] address: ', address.toString());
    const calls: FunctionCall[] = [];
    if (this.constructorArtifact && !options.skipInitialization) {
      const constructorCall = new ContractFunctionInteraction(
        this.wallet,
        address,
        this.constructorArtifact,
        this.args,
      );
      calls.push(constructorCall.request());
    }
    return Promise.resolve({
      calls,
    });
  }

  /**
   * Send the contract deployment transaction using the provided options.
   * This function extends the 'send' method from the ContractFunctionInteraction class,
   * allowing us to send a transaction specifically for contract deployment.
   *
   * @param options - An object containing various deployment options such as contractAddressSalt and from.
   * @returns A SentTx object that returns the receipt and the deployed contract instance.
   */
  public override async send(options: DeployOptions = {}): Promise<DeploySentTx<TContract>> {
    const txHashPromise = (await super.send(options)).getTxHash();
    // if (this.instance) {
    //   console.log('[send] this.instance address: ', this.instance.address.toString());
    // }
    // const instance = this.instance ? this.instance : await this.getInstance(options);
    const instance = await this.getInstance(options);
    console.log('[send] instance address: ', instance.address.toString());
    // console.log('[send] instance contractClassId: ', instance.contractClassId.toString());
    // console.log('[send] instance deployer: ', instance.deployer.toString());
    // console.log('[send] instance publicKeysHash: ', instance.publicKeysHash.toString());
    // console.log('[send] instance initializationHash: ', instance.initializationHash.toString());
    // console.log('[send] instance salt: ', instance.salt.toString());
    // console.log('[send] instance version: ', instance.version.toString());
    // console.log('[send] artifact: ', this.artifact.name);

    this.log.debug(
      `Sent deployment tx of ${this.artifact.name} contract with deployment address ${instance.address.toString()}`,
    );
    return new DeploySentTx(this.wallet, txHashPromise, this.postDeployCtor, instance);
  }

  /**
   * Builds the contract instance to be deployed and returns it.
   *
   * @param options - An object containing various deployment options.
   * @returns An instance object.
   */
  public async getInstance(options: DeployOptions = {}): Promise<ContractInstanceWithAddress> {
    if (!this.instance) {
      this.instance = await getContractInstanceFromDeployParams(this.artifact, {
        constructorArgs: this.args,
        salt: options.contractAddressSalt,
        publicKeysHash: this.publicKeysHash,
        constructorArtifact: this.constructorArtifact,
        deployer: options.universalDeploy ? AztecAddress.ZERO : this.wallet.getAddress(),
      });
    }
    return this.instance;
  }

  /**
   * Prove the request.
   * @param options - Deployment options.
   * @returns The proven tx.
   */
  public override async prove(options: DeployOptions): Promise<Tx> {
    return await super.prove(options);
  }

  /**
   * Estimates gas cost for this deployment operation.
   * @param options - Options.
   */
  public override async estimateGas(options?: Omit<DeployOptions, 'estimateGas' | 'skipPublicSimulation'>) {
    return await super.estimateGas(options);
  }

  /** Return this deployment address. */
  public get address() {
    return this.instance?.address;
  }

  /** Returns the partial address for this deployment. */
  public get partialAddress() {
    console.log('get partialAddress called in DeployMethod: ', this.instance?.address.toString());
    this.log.debug('get partialAddress called in DeployMethod');
    return this.instance && computePartialAddress(this.instance);
  }
  // public async getPartialAddress(): Promise<ReturnType<typeof computePartialAddress> | undefined> {
  //   if (this.instance) {
  //     return await computePartialAddress(this.instance);
  //   }
  //   return undefined;
  // }
}
