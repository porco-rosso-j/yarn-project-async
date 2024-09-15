import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
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
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<DocsExampleContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** get_stable() */
        get_stable: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** view_imm_card() */
        view_imm_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_notes(amounts: array) */
        insert_notes: ((amounts: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** increase_legendary_points() */
        increase_legendary_points: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_private(randomness: field, points: integer) */
        initialize_private: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_legendary_initialized() */
        is_legendary_initialized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_imm_initialized() */
        is_imm_initialized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note(amount: integer, randomness: field) */
        insert_note: ((amount: bigint | number, randomness: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** simple_macro_example_expanded(a: field, b: field) */
        simple_macro_example_expanded: ((a: FieldLike, b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_imm_card() */
        get_imm_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_leader() */
        get_leader: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_note(amount: field, comparator: integer) */
        read_note: ((amount: FieldLike, comparator: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** update_legendary_card(randomness: field, points: integer) */
        update_legendary_card: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_stable(points: integer) */
        initialize_stable: ((points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** match_stable(account: struct, points: integer) */
        match_stable: ((account: AztecAddressLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_legendary_card() */
        get_legendary_card: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize_immutable_singleton(randomness: field, points: integer) */
        initialize_immutable_singleton: ((randomness: FieldLike, points: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** simple_macro_example(a: field, b: field) */
        simple_macro_example: ((a: FieldLike, b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=DocsExample.d.ts.map