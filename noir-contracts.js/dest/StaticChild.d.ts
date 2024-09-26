import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const StaticChildContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract StaticChild;
 */
export declare class StaticChildContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<StaticChildContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<StaticChildContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<StaticChildContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof StaticChildContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<StaticChildContract['methods'][M]>): DeployMethod<StaticChildContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'current_value' | 'a_private_value'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** pub_set_value(new_value: field) */
        pub_set_value: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_set_value(new_value: field, owner: struct, outgoing_viewer: struct) */
        private_set_value: ((new_value: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pub_get_value(base_value: field) */
        pub_get_value: ((base_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pub_illegal_inc_value(new_value: field) */
        pub_illegal_inc_value: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pub_inc_value(new_value: field) */
        pub_inc_value: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_illegal_set_value(new_value: field, owner: struct) */
        private_illegal_set_value: ((new_value: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_value(amount: field, owner: struct) */
        private_get_value: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=StaticChild.d.ts.map