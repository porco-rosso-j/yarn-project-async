import { FunctionSelector, FunctionType, decodeReturnValues, encodeArguments, } from '@aztec/foundation/abi';
import { BaseContractInteraction } from './base_contract_interaction.js';
/**
 * This is the class that is returned when calling e.g. `contract.methods.myMethod(arg0, arg1)`.
 * It contains available interactions one can call on a method, including view.
 */
export class ContractFunctionInteraction extends BaseContractInteraction {
    constructor(wallet, contractAddress, functionDao, args) {
        super(wallet);
        this.contractAddress = contractAddress;
        this.functionDao = functionDao;
        this.args = args;
        if (args.some(arg => arg === undefined || arg === null)) {
            throw new Error('All function interaction arguments must be defined and not null. Received: ' + args);
        }
    }
    /**
     * Create a transaction execution request that represents this call, encoded and authenticated by the
     * user's wallet, ready to be simulated.
     * @param opts - An optional object containing additional configuration for the transaction.
     * @returns A Promise that resolves to a transaction instance.
     */
    async create(opts) {
        if (this.functionDao.functionType === FunctionType.UNCONSTRAINED) {
            throw new Error("Can't call `create` on an unconstrained function.");
        }
        if (!this.txRequest) {
            const calls = [this.request()];
            const fee = opts?.estimateGas ? await this.getFeeOptionsFromEstimatedGas({ calls, fee: opts?.fee }) : opts?.fee;
            this.txRequest = await this.wallet.createTxExecutionRequest({ calls, fee });
        }
        return this.txRequest;
    }
    /**
     * Returns an execution request that represents this operation. Useful as a building
     * block for constructing batch requests.
     * @returns An execution request wrapped in promise.
     */
    request() {
        const args = encodeArguments(this.functionDao, this.args);
        return {
            name: this.functionDao.name,
            args,
            selector: FunctionSelector.fromNameAndParameters(this.functionDao.name, this.functionDao.parameters),
            type: this.functionDao.functionType,
            to: this.contractAddress,
            isStatic: this.functionDao.isStatic,
            returnTypes: this.functionDao.returnTypes,
        };
    }
    /**
     * Simulate a transaction and get its return values
     * Differs from prove in a few important ways:
     * 1. It returns the values of the function execution
     * 2. It supports `unconstrained`, `private` and `public` functions
     *
     * @param options - An optional object containing additional configuration for the transaction.
     * @returns The result of the transaction as returned by the contract function.
     */
    async simulate(options = {}) {
        if (this.functionDao.functionType == FunctionType.UNCONSTRAINED) {
            return await this.wallet.simulateUnconstrained(this.functionDao.name, this.args, this.contractAddress, options?.from);
        }
        const txRequest = await this.create();
        const simulatedTx = await this.wallet.simulateTx(txRequest, true, options?.from);
        // As account entrypoints are private, for private functions we retrieve the return values from the first nested call
        // since we're interested in the first set of values AFTER the account entrypoint
        // For public functions we retrieve the first values directly from the public output.
        const rawReturnValues = this.functionDao.functionType == FunctionType.PRIVATE
            ? simulatedTx.privateReturnValues?.nested?.[0].values
            : simulatedTx.publicOutput?.publicReturnValues?.[0].values;
        return rawReturnValues ? decodeReturnValues(this.functionDao.returnTypes, rawReturnValues) : [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfZnVuY3Rpb25faW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3RfZnVuY3Rpb25faW50ZXJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUVMLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLGVBQWUsR0FDaEIsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQixPQUFPLEVBQUUsdUJBQXVCLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFnQmpHOzs7R0FHRztBQUNILE1BQU0sT0FBTywyQkFBNEIsU0FBUSx1QkFBdUI7SUFDdEUsWUFDRSxNQUFjLEVBQ0osZUFBNkIsRUFDN0IsV0FBd0IsRUFDeEIsSUFBVztRQUVyQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFKSixvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFPO1FBR3JCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4RyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUF3QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJ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