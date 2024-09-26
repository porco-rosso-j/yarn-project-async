import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const DocsExampleContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract DocsExample;
 */
export declare class DocsExampleContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<DocsExampleContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<DocsExampleContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<DocsExampleContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof DocsExampleContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<DocsExampleContract['methods'][M]>): DeployMethod<DocsExampleContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'leader' | 'legendary_card' | 'profiles' | 'set' | 'private_immutable' | 'shared_immutable' | 'minters' | 'public_immutable'>;
    static get notes(): ContractNotes<'CardNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** get_shared_immutable() */
        get_shared_immutable: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_imm_card() */
        get_imm_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_leader() */
        get_leader: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** match_shared_immutable(account: struct, points: integer) */
        match_shared_immutable: ((account: AztecAddressLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_shared_immutable_constrained_private() */
        get_shared_immutable_constrained_private: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** increase_legendary_points() */
        increase_legendary_points: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_priv_imm_initialized() */
        is_priv_imm_initialized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** simple_macro_example_expanded(a: field, b: field) */
        simple_macro_example_expanded: ((a: FieldLike, b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_note(amount: field, comparator: integer) */
        read_note: ((amount: FieldLike, comparator: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_shared_immutable_constrained_private_indirect() */
        get_shared_immutable_constrained_private_indirect: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_public_immutable(points: integer) */
        initialize_public_immutable: ((points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** update_legendary_card(randomness: field, points: integer) */
        update_legendary_card: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_private(randomness: field, points: integer) */
        initialize_private: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_legendary_initialized() */
        is_legendary_initialized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** spend_public_authwit(inner_hash: field) */
        spend_public_authwit: ((inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_shared_immutable_constrained_public_multiple() */
        get_shared_immutable_constrained_public_multiple: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_notes(amounts: array) */
        insert_notes: ((amounts: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_shared_immutable(points: integer) */
        initialize_shared_immutable: ((points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** simple_macro_example(a: field, b: field) */
        simple_macro_example: ((a: FieldLike, b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_shared_immutable_constrained_public_indirect() */
        get_shared_immutable_constrained_public_indirect: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_shared_immutable_constrained_public() */
        get_shared_immutable_constrained_public: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** view_imm_card() */
        view_imm_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_public_immutable() */
        get_public_immutable: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** verify_private_authwit(inner_hash: field) */
        verify_private_authwit: ((inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note(amount: integer, randomness: field) */
        insert_note: ((amount: bigint | number, randomness: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_legendary_card() */
        get_legendary_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_private_immutable(randomness: field, points: integer) */
        initialize_private_immutable: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=DocsExample.d.ts.map