import { AztecAddress, computePartialAddress, getContractClassFromArtifact, getContractInstanceFromDeployParams, } from '@aztec/circuits.js';
import { getInitializer } from '@aztec/foundation/abi';
import { deployInstance } from '../deployment/deploy_instance.js';
import { registerContractClass } from '../deployment/register_class.js';
import { BaseContractInteraction } from './base_contract_interaction.js';
import { ContractFunctionInteraction } from './contract_function_interaction.js';
import { DeploySentTx } from './deploy_sent_tx.js';
// TODO(@spalladino): Add unit tests for this class!
/**
 * Contract interaction for deployment. Handles class registration, public instance deployment,
 * and initialization of the contract. Extends the BaseContractInteraction class.
 */
export class DeployMethod extends BaseContractInteraction {
    constructor(publicKeysHash, wallet, artifact, postDeployCtor, args = [], constructorNameOrArtifact) {
        super(wallet);
        this.publicKeysHash = publicKeysHash;
        this.artifact = artifact;
        this.postDeployCtor = postDeployCtor;
        this.args = args;
        /** The contract instance to be deployed. */
        this.instance = undefined;
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
    async create(options = {}) {
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
    async request(options = {}) {
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
            console.log('[request] instance contractClassId: ', instance.contractClassId.toString());
            console.log('[request] instance deployer: ', instance.deployer.toString());
            console.log('[request] instance publicKeysHash: ', instance.publicKeysHash.toString());
            console.log('[request] instance initializationHash: ', instance.initializationHash.toString());
            console.log('[request] instance salt: ', instance.salt.toString());
            console.log('[request] instance version: ', instance.version.toString());
            console.log('[request] artifact: ', this.artifact.name);
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
    async getDeploymentFunctionCalls(options = {}) {
        const calls = [];
        // Set contract instance object so it's available for populating the DeploySendTx object
        const instance = await this.getInstance(options);
        console.log('[getDeploymentFunctionCalls] instance address: ', instance.address.toString());
        // Obtain contract class from artifact and check it matches the reported one by the instance.
        // TODO(@spalladino): We're unnecessarily calculating the contract class multiple times here.
        const contractClass = await getContractClassFromArtifact(this.artifact);
        console.log('[getDeploymentFunctionCalls] contractClass.artifactHash: ', contractClass.artifactHash.toString());
        console.log('[getDeploymentFunctionCalls] contractClass.id: ', contractClass.id.toString());
        console.log('[getDeploymentFunctionCalls] contractClass.publicBytecodeCommitment: ', contractClass.publicBytecodeCommitment.toString());
        console.log('[getDeploymentFunctionCalls] contractClass.privateFunctionsRoot: ', contractClass.privateFunctionsRoot.toString());
        console.log('[getDeploymentFunctionCalls] contractClass.packedBytecode: ', contractClass.packedBytecode.toString());
        if (!instance.contractClassId.equals(contractClass.id)) {
            throw new Error(`Contract class mismatch when deploying contract: got ${instance.contractClassId.toString()} from instance and ${contractClass.id.toString()} from artifact`);
        }
        // Register the contract class if it hasn't been published already.
        console.log('[getDeploymentFunctionCalls] options.skipClassRegistration: ', options.skipClassRegistration);
        if (!options.skipClassRegistration) {
            if (await this.wallet.isContractClassPubliclyRegistered(contractClass.id)) {
                this.log.debug(`Skipping registration of already registered contract class ${contractClass.id.toString()} for ${instance.address.toString()}`);
            }
            else {
                this.log.info(`Creating request for registering contract class ${contractClass.id.toString()} as part of deployment for ${instance.address.toString()}`);
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
    async getInitializeFunctionCalls(options) {
        const { address } = await this.getInstance(options);
        console.log('[getInitializeFunctionCalls] address: ', address.toString());
        const calls = [];
        if (this.constructorArtifact && !options.skipInitialization) {
            const constructorCall = new ContractFunctionInteraction(this.wallet, address, this.constructorArtifact, this.args);
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
    async send(options = {}) {
        const txHashPromise = (await super.send(options)).getTxHash();
        // if (this.instance) {
        //   console.log('[send] this.instance address: ', this.instance.address.toString());
        // }
        // const instance = this.instance ? this.instance : await this.getInstance(options);
        const instance = await this.getInstance(options);
        console.log('[send] instance address: ', instance.address.toString());
        console.log('[send] instance contractClassId: ', instance.contractClassId.toString());
        console.log('[send] instance deployer: ', instance.deployer.toString());
        console.log('[send] instance publicKeysHash: ', instance.publicKeysHash.toString());
        console.log('[send] instance initializationHash: ', instance.initializationHash.toString());
        console.log('[send] instance salt: ', instance.salt.toString());
        console.log('[send] instance version: ', instance.version.toString());
        console.log('[send] artifact: ', this.artifact.name);
        this.log.debug(`Sent deployment tx of ${this.artifact.name} contract with deployment address ${instance.address.toString()}`);
        return new DeploySentTx(this.wallet, txHashPromise, this.postDeployCtor, instance);
    }
    /**
     * Builds the contract instance to be deployed and returns it.
     *
     * @param options - An object containing various deployment options.
     * @returns An instance object.
     */
    async getInstance(options = {}) {
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
    async prove(options) {
        return await super.prove(options);
    }
    /**
     * Estimates gas cost for this deployment operation.
     * @param options - Options.
     */
    async estimateGas(options) {
        return await super.estimateGas(options);
    }
    /** Return this deployment address. */
    get address() {
        return this.instance?.address;
    }
    /** Returns the partial address for this deployment. */
    get partialAddress() {
        console.log('get partialAddress called in DeployMethod: ', this.instance?.address.toString());
        this.log.debug('get partialAddress called in DeployMethod');
        return this.instance && computePartialAddress(this.instance);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X21ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9kZXBsb3lfbWV0aG9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLDRCQUE0QixFQUM1QixtQ0FBbUMsR0FDcEMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQWdELGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3JHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFHakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUJuRCxvREFBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQXdELFNBQVEsdUJBQXVCO0lBVWxHLFlBQ1UsY0FBa0IsRUFDMUIsTUFBYyxFQUNOLFFBQTBCLEVBQzFCLGNBQTZFLEVBQzdFLE9BQWMsRUFBRSxFQUN4Qix5QkFBcUQ7UUFFckQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBUE4sbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFFbEIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQStEO1FBQzdFLFNBQUksR0FBSixJQUFJLENBQVk7UUFkMUIsNENBQTRDO1FBQ3BDLGFBQVEsR0FBaUMsU0FBUyxDQUFDO1FBaUJ6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FB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