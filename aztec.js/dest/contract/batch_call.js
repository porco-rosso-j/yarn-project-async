import { FunctionType, decodeReturnValues } from '@aztec/foundation/abi';
import { BaseContractInteraction } from './base_contract_interaction.js';
/** A batch of function calls to be sent as a single transaction through a wallet. */
export class BatchCall extends BaseContractInteraction {
    constructor(wallet, calls) {
        super(wallet);
        this.calls = calls;
    }
    /**
     * Create a transaction execution request that represents this batch, encoded and authenticated by the
     * user's wallet, ready to be simulated.
     * @param opts - An optional object containing additional configuration for the transaction.
     * @returns A Promise that resolves to a transaction instance.
     */
    async create(opts) {
        if (!this.txRequest) {
            const calls = this.calls;
            const fee = opts?.estimateGas ? await this.getFeeOptionsFromEstimatedGas({ calls, fee: opts?.fee }) : opts?.fee;
            this.txRequest = await this.wallet.createTxExecutionRequest({ calls, fee });
        }
        return this.txRequest;
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
        const { calls, unconstrained } = this.calls.reduce((acc, current, index) => {
            if (current.type === FunctionType.UNCONSTRAINED) {
                acc.unconstrained.push([current, index]);
            }
            else {
                acc.calls.push([
                    current,
                    index,
                    current.type === FunctionType.PRIVATE ? acc.privateIndex++ : acc.publicIndex++,
                ]);
            }
            return acc;
        }, { calls: [], unconstrained: [], publicIndex: 0, privateIndex: 0 });
        const txRequest = await this.wallet.createTxExecutionRequest({ calls: calls.map(indexedCall => indexedCall[0]) });
        const unconstrainedCalls = unconstrained.map(async (indexedCall) => {
            const call = indexedCall[0];
            return [await this.wallet.simulateUnconstrained(call.name, call.args, call.to, options?.from), indexedCall[1]];
        });
        const [unconstrainedResults, simulatedTx] = await Promise.all([
            Promise.all(unconstrainedCalls),
            this.wallet.simulateTx(txRequest, true, options?.from),
        ]);
        const results = [];
        unconstrainedResults.forEach(([result, index]) => {
            results[index] = result;
        });
        calls.forEach(([call, callIndex, resultIndex]) => {
            // As account entrypoints are private, for private functions we retrieve the return values from the first nested call
            // since we're interested in the first set of values AFTER the account entrypoint
            // For public functions we retrieve the first values directly from the public output.
            const rawReturnValues = call.type == FunctionType.PRIVATE
                ? simulatedTx.privateReturnValues?.nested?.[resultIndex].values
                : simulatedTx.publicOutput?.publicReturnValues?.[resultIndex].values;
            results[callIndex] = rawReturnValues ? decodeReturnValues(call.returnTypes, rawReturnValues) : [];
        });
        return results;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF0Y2hfY2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9iYXRjaF9jYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQTBCLE1BQU0sZ0NBQWdDLENBQUM7QUFHakcscUZBQXFGO0FBQ3JGLE1BQU0sT0FBTyxTQUFVLFNBQVEsdUJBQXVCO0lBQ3BELFlBQVksTUFBYyxFQUFZLEtBQXFCO1FBQ3pELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQURzQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUUzRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQXdCO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7WUFDaEgsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBaUMsRUFBRTtRQUN2RCxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLElB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