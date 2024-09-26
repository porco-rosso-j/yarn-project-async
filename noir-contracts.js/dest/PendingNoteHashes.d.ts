import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const PendingNoteHashesContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract PendingNoteHashes;
 */
export declare class PendingNoteHashesContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<PendingNoteHashesContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<PendingNoteHashesContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<PendingNoteHashesContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof PendingNoteHashesContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<PendingNoteHashesContract['methods'][M]>): DeployMethod<PendingNoteHashesContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'balances'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** test_insert1_then_get2_then_nullify2_all_in_nested_calls(amount: field, owner: struct, outgoing_viewer: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert1_then_get2_then_nullify2_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note_extra_emit(amount: field, owner: struct, outgoing_viewer: struct) */
        insert_note_extra_emit: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note(amount: field, owner: struct, outgoing_viewer: struct) */
        insert_note: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note_static_randomness(amount: field, owner: struct, outgoing_viewer: struct) */
        insert_note_static_randomness: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_emit_bad_note_log(owner: struct, outgoing_viewer: struct) */
        test_emit_bad_note_log: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_note_zero_balance(owner: struct) */
        get_note_zero_balance: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_bad_get_then_insert_flat(amount: field, owner: struct) */
        test_bad_get_then_insert_flat: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_then_nullify_note(expected_value: field, owner: struct) */
        get_then_nullify_note: ((expected_value: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** recursively_destroy_and_create_notes(owner: struct, outgoing_viewer: struct, executions_left: integer) */
        recursively_destroy_and_create_notes: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, executions_left: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert2_then_get2_then_nullify1_all_in_nested_calls(amount: field, owner: struct, outgoing_viewer: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert2_then_get2_then_nullify1_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** dummy(amount: field, owner: struct, outgoing_viewer: struct) */
        dummy: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert2_then_get2_then_nullify2_all_in_nested_calls(amount: field, owner: struct, outgoing_viewer: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert2_then_get2_then_nullify2_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_recursively_create_notes(owner: struct, outgoing_viewer: struct, how_many_recursions: integer) */
        test_recursively_create_notes: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, how_many_recursions: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert_then_get_then_nullify_all_in_nested_calls(amount: field, owner: struct, outgoing_viewer: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert_then_get_then_nullify_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert_then_get_then_nullify_flat(amount: field, owner: struct, outgoing_viewer: struct) */
        test_insert_then_get_then_nullify_flat: ((amount: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=PendingNoteHashes.d.ts.map