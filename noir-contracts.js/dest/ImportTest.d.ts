import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const ImportTestContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract ImportTest;
 */
export declare class ImportTestContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ImportTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ImportTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<ImportTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof ImportTestContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<ImportTestContract['methods'][M]>): DeployMethod<ImportTestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'example_constant' | 'example_set'>;
    static get notes(): ContractNotes<'ValueNote' | 'TestNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** pub_call_public_fn(target: struct) */
        pub_call_public_fn: ((target: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_no_args(target: struct) */
        call_no_args: ((target: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** main_contract(target: struct) */
        main_contract: ((target: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_public_fn(target: struct) */
        call_public_fn: ((target: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=ImportTest.d.ts.map