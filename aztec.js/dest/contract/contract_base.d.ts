import { type ContractArtifact, type ContractNote, type FieldLayout, FunctionSelector } from '@aztec/foundation/abi';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
import { type Wallet } from '../account/index.js';
import { ContractFunctionInteraction } from './contract_function_interaction.js';
/**
 * Type representing a contract method that returns a ContractFunctionInteraction instance
 * and has a readonly 'selector' property of type Buffer. Takes any number of arguments.
 */
export type ContractMethod = ((...args: any[]) => ContractFunctionInteraction) & {
    /**
     * The unique identifier for a contract function in bytecode.
     */
    readonly selector: FunctionSelector;
};
/**
 * Type representing the storage layout of a contract.
 */
export type ContractStorageLayout<T extends string> = {
    [K in T]: FieldLayout;
};
/**
 * Type representing the notes used in a contract.
 */
export type ContractNotes<T extends string> = {
    [K in T]: ContractNote;
};
/**
 * Abstract implementation of a contract extended by the Contract class and generated contract types.
 */
export declare class ContractBase {
    /** The deployed contract instance definition. */
    readonly instance: ContractInstanceWithAddress;
    /** The Application Binary Interface for the contract. */
    readonly artifact: ContractArtifact;
    /** The wallet used for interacting with this contract. */
    protected wallet: Wallet;
    /**
     * An object containing contract methods mapped to their respective names.
     */
    methods: {
        [name: string]: ContractMethod;
    };
    protected constructor(
    /** The deployed contract instance definition. */
    instance: ContractInstanceWithAddress, 
    /** The Application Binary Interface for the contract. */
    artifact: ContractArtifact, 
    /** The wallet used for interacting with this contract. */
    wallet: Wallet);
    /** Address of the contract. */
    get address(): import("@aztec/circuits.js").AztecAddress;
    /** Partial address of the contract. */
    get partialAddress(): Promise<import("@aztec/circuits.js").Fr>;
    /**
     * Creates a new instance of the contract wrapper attached to a different wallet.
     * @param wallet - Wallet to use for sending txs.
     * @returns A new contract instance.
     */
    withWallet(wallet: Wallet): this;
}
//# sourceMappingURL=contract_base.d.ts.map