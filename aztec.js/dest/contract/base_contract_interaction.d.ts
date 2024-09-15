import { type Tx, type TxExecutionRequest } from '@aztec/circuit-types';
import { GasSettings } from '@aztec/circuits.js';
import { type Wallet } from '../account/wallet.js';
import { type ExecutionRequestInit, type FeeOptions } from '../entrypoint/entrypoint.js';
import { SentTx } from './sent_tx.js';
/**
 * Represents options for calling a (constrained) function in a contract.
 * Allows the user to specify the sender address and nonce for a transaction.
 */
export type SendMethodOptions = {
    /** Wether to skip the simulation of the public part of the transaction. */
    skipPublicSimulation?: boolean;
    /** The fee options for the transaction. */
    fee?: FeeOptions;
    /** Whether to run an initial simulation of the tx with high gas limit to figure out actual gas settings (will default to true later down the road). */
    estimateGas?: boolean;
};
/**
 * Base class for an interaction with a contract, be it a deployment, a function call, or a batch.
 * Implements the sequence create/simulate/send.
 */
export declare abstract class BaseContractInteraction {
    protected wallet: Wallet;
    protected tx?: Tx;
    protected txRequest?: TxExecutionRequest;
    protected log: import("@aztec/foundation/log").Logger;
    constructor(wallet: Wallet);
    /**
     * Create a transaction execution request ready to be simulated.
     * @param options - An optional object containing additional configuration for the transaction.
     * @returns A transaction execution request.
     */
    abstract create(options?: SendMethodOptions): Promise<TxExecutionRequest>;
    /**
     * Proves a transaction execution request and returns a tx object ready to be sent.
     * @param options - optional arguments to be used in the creation of the transaction
     * @returns The resulting transaction
     */
    prove(options?: SendMethodOptions): Promise<Tx>;
    /**
     * Sends a transaction to the contract function with the specified options.
     * This function throws an error if called on an unconstrained function.
     * It creates and signs the transaction if necessary, and returns a SentTx instance,
     * which can be used to track the transaction status, receipt, and events.
     * @param options - An optional object containing 'from' property representing
     * the AztecAddress of the sender. If not provided, the default address is used.
     * @returns A SentTx instance for tracking the transaction status and information.
     */
    send(options?: SendMethodOptions): Promise<SentTx>;
    /**
     * Estimates gas for a given tx request and returns gas limits for it.
     * @param opts - Options.
     * @returns Gas limits.
     */
    estimateGas(opts?: Omit<SendMethodOptions, 'estimateGas' | 'skipPublicSimulation'>): Promise<Pick<GasSettings, 'gasLimits' | 'teardownGasLimits'>>;
    /**
     * Helper method to return fee options based on the user opts, estimating tx gas if needed.
     * @param request - Request to execute for this interaction.
     * @returns Fee options for the actual transaction.
     */
    protected getFeeOptionsFromEstimatedGas(request: ExecutionRequestInit): Promise<{
        gasSettings: GasSettings;
        paymentMethod: import("../index.js").FeePaymentMethod;
    } | undefined>;
}
//# sourceMappingURL=base_contract_interaction.d.ts.map