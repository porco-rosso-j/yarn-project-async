import type { FunctionCall, TxExecutionRequest } from '@aztec/circuit-types';
import { type AztecAddress, type GasSettings } from '@aztec/circuits.js';
import { type FunctionAbi } from '@aztec/foundation/abi';
import { type Wallet } from '../account/wallet.js';
import { BaseContractInteraction, type SendMethodOptions } from './base_contract_interaction.js';
export { SendMethodOptions };
/**
 * Represents the options for simulating a contract function interaction.
 * Allows specifying the address from which the view method should be called.
 * Disregarded for simulation of public functions
 */
export type SimulateMethodOptions = {
    /** The sender's Aztec address. */
    from?: AztecAddress;
    /** Gas settings for the simulation. */
    gasSettings?: GasSettings;
};
/**
 * This is the class that is returned when calling e.g. `contract.methods.myMethod(arg0, arg1)`.
 * It contains available interactions one can call on a method, including view.
 */
export declare class ContractFunctionInteraction extends BaseContractInteraction {
    protected contractAddress: AztecAddress;
    protected functionDao: FunctionAbi;
    protected args: any[];
    constructor(wallet: Wallet, contractAddress: AztecAddress, functionDao: FunctionAbi, args: any[]);
    /**
     * Create a transaction execution request that represents this call, encoded and authenticated by the
     * user's wallet, ready to be simulated.
     * @param opts - An optional object containing additional configuration for the transaction.
     * @returns A Promise that resolves to a transaction instance.
     */
    create(opts?: SendMethodOptions): Promise<TxExecutionRequest>;
    /**
     * Returns an execution request that represents this operation. Useful as a building
     * block for constructing batch requests.
     * @returns An execution request wrapped in promise.
     */
    request(): FunctionCall;
    /**
     * Simulate a transaction and get its return values
     * Differs from prove in a few important ways:
     * 1. It returns the values of the function execution
     * 2. It supports `unconstrained`, `private` and `public` functions
     *
     * @param options - An optional object containing additional configuration for the transaction.
     * @returns The result of the transaction as returned by the contract function.
     */
    simulate(options?: SimulateMethodOptions): Promise<any>;
}
//# sourceMappingURL=contract_function_interaction.d.ts.map