import { GasSettings } from '@aztec/circuits.js';
import { createDebugLogger } from '@aztec/foundation/log';
import { getGasLimits } from './get_gas_limits.js';
import { SentTx } from './sent_tx.js';
/**
 * Base class for an interaction with a contract, be it a deployment, a function call, or a batch.
 * Implements the sequence create/simulate/send.
 */
export class BaseContractInteraction {
    constructor(wallet) {
        this.wallet = wallet;
        this.log = createDebugLogger('aztec:js:contract_interaction');
    }
    /**
     * Proves a transaction execution request and returns a tx object ready to be sent.
     * @param options - optional arguments to be used in the creation of the transaction
     * @returns The resulting transaction
     */
    async prove(options = {}) {
        const txRequest = this.txRequest ?? (await this.create(options));
        this.tx = await this.wallet.proveTx(txRequest, !options.skipPublicSimulation);
        return this.tx;
    }
    /**
     * Sends a transaction to the contract function with the specified options.
     * This function throws an error if called on an unconstrained function.
     * It creates and signs the transaction if necessary, and returns a SentTx instance,
     * which can be used to track the transaction status, receipt, and events.
     * @param options - An optional object containing 'from' property representing
     * the AztecAddress of the sender. If not provided, the default address is used.
     * @returns A SentTx instance for tracking the transaction status and information.
     */
    async send(options = {}) {
        const promise = (async () => {
            const tx = this.tx ?? (await this.prove(options));
            return this.wallet.sendTx(tx);
        })();
        return new SentTx(this.wallet, promise);
    }
    /**
     * Estimates gas for a given tx request and returns gas limits for it.
     * @param opts - Options.
     * @returns Gas limits.
     */
    async estimateGas(opts) {
        // REFACTOR: both `this.txRequest = undefined` below are horrible, we should not be caching stuff that doesn't need to be.
        // This also hints at a weird interface for create/request/estimate/send etc.
        // Ensure we don't accidentally use a version of tx request that has estimateGas set to true, leading to an infinite loop.
        this.txRequest = undefined;
        const txRequest = await this.create({ ...opts, estimateGas: false });
        // Ensure we don't accidentally cache a version of tx request that has estimateGas forcefully set to false.
        this.txRequest = undefined;
        const simulationResult = await this.wallet.simulateTx(txRequest, true);
        const { totalGas: gasLimits, teardownGas: teardownGasLimits } = getGasLimits(simulationResult, (opts?.fee?.gasSettings ?? GasSettings.default()).teardownGasLimits);
        return { gasLimits, teardownGasLimits };
    }
    /**
     * Helper method to return fee options based on the user opts, estimating tx gas if needed.
     * @param request - Request to execute for this interaction.
     * @returns Fee options for the actual transaction.
     */
    async getFeeOptionsFromEstimatedGas(request) {
        const fee = request.fee;
        if (fee) {
            const txRequest = await this.wallet.createTxExecutionRequest(request);
            const simulationResult = await this.wallet.simulateTx(txRequest, true);
            const { totalGas: gasLimits, teardownGas: teardownGasLimits } = getGasLimits(simulationResult, fee.gasSettings.teardownGasLimits);
            this.log.debug(`Estimated gas limits for tx: DA=${gasLimits.daGas} L2=${gasLimits.l2Gas} teardownDA=${teardownGasLimits.daGas} teardownL2=${teardownGasLimits.l2Gas}`);
            const gasSettings = GasSettings.default({ ...fee.gasSettings, gasLimits, teardownGasLimits });
            return { ...fee, gasSettings };
        }
        return fee;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9jb250cmFjdF9pbnRlcmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9iYXNlX2NvbnRyYWN0X2ludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUkxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQWV0Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQWdCLHVCQUF1QjtJQU0zQyxZQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUYxQixRQUFHLEdBQUcsaUJBQWlCLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUU1QixDQUFDO0lBU3hDOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQTZCLEVBQUU7UUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM5RSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUE2QixFQUFFO1FBQy9DLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVMLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxXQUFXLENBQ3RCLElBQXNFO1FBRXRFLDBIQUEwSDtRQUMxSCw2RUFBNkU7UUFFN0UsMEhBQTBIO1FBQzFILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLDJHQUEyRztRQUMzRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLFlBQVksQ0FDMUUsZ0JBQWdCLEVBQ2hCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQ3BFLENBQUM7UUFDRixPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxLQUFLLENBQUMsNkJBQTZCLENBQUMsT0FBNkI7UUFDekUsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4QixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1IsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsWUFBWSxDQUMxRSxnQkFBZ0IsRUFDaEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FDbEMsQ0FBQztZQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUNaLG1DQUFtQyxTQUFTLENBQUMsS0FBSyxPQUFPLFNBQVMsQ0FBQyxLQUFLLGVBQWUsaUJBQWlCLENBQUMsS0FBSyxlQUFlLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUN2SixDQUFDO1lBQ0YsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQzlGLE9BQU8sRUFBRSxHQUFHLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YifQ==