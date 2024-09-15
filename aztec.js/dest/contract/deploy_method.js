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
        if (!this.functionCalls) {
            // TODO: Should we add the contracts to the DB here, or once the tx has been sent or mined?
            // Note that we need to run this registerContract here so it's available when computeFeeOptionsFromEstimatedGas
            // runs, since it needs the contract to have been registered in order to estimate gas for its initialization,
            // in case the initializer is public. This hints at the need of having "transient" contracts scoped to a
            // simulation, so we can run the simulation with a set of contracts, but only "commit" them to the wallet
            // once this tx has gone through.
            await this.wallet.registerContract({ artifact: this.artifact, instance: await this.getInstance(options) });
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
        // Obtain contract class from artifact and check it matches the reported one by the instance.
        // TODO(@spalladino): We're unnecessarily calculating the contract class multiple times here.
        const contractClass = await getContractClassFromArtifact(this.artifact);
        if (!instance.contractClassId.equals(contractClass.id)) {
            throw new Error(`Contract class mismatch when deploying contract: got ${instance.contractClassId.toString()} from instance and ${contractClass.id.toString()} from artifact`);
        }
        // Register the contract class if it hasn't been published already.
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
        if (!options.skipPublicDeployment) {
            calls.push(deployInstance(this.wallet, instance).request());
        }
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
        const instance = await this.getInstance(options);
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
    prove(options) {
        return super.prove(options);
    }
    /**
     * Estimates gas cost for this deployment operation.
     * @param options - Options.
     */
    estimateGas(options) {
        return super.estimateGas(options);
    }
    /** Return this deployment address. */
    get address() {
        return this.instance?.address;
    }
    /** Returns the partial address for this deployment. */
    get partialAddress() {
        return this.instance && computePartialAddress(this.instance);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X21ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9kZXBsb3lfbWV0aG9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLDRCQUE0QixFQUM1QixtQ0FBbUMsR0FDcEMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQWdELGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3JHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFHakcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBbUJuRCxvREFBb0Q7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLFlBQXdELFNBQVEsdUJBQXVCO0lBVWxHLFlBQ1UsY0FBa0IsRUFDMUIsTUFBYyxFQUNOLFFBQTBCLEVBQzFCLGNBQTZFLEVBQzdFLE9BQWMsRUFBRSxFQUN4Qix5QkFBcUQ7UUFFckQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBUE4sbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFFbEIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQStEO1FBQzdFLFNBQUksR0FBSixJQUFJLENBQVk7UUFkMUIsNENBQTRDO1FBQ3BDLGFBQVEsR0FBaUMsU0FBUyxDQUFDO1FBaUJ6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FB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