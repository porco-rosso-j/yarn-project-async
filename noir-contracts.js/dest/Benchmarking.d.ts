import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const BenchmarkingContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Benchmarking;
 */
export declare class BenchmarkingContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<BenchmarkingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<BenchmarkingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<BenchmarkingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof BenchmarkingContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<BenchmarkingContract['methods'][M]>): DeployMethod<BenchmarkingContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'notes' | 'balances'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** increment_balance(owner: struct, value: field) */
        increment_balance: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** recreate_note(owner: struct, outgoing_viewer: struct, index: integer) */
        recreate_note: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, index: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_note(owner: struct, outgoing_viewer: struct, value: field) */
        create_note: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** broadcast(owner: struct) */
        broadcast: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Benchmarking.d.ts.map