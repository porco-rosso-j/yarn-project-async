import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, FunctionSelectorLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const PendingCommitmentsContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract PendingCommitments;
 */
export declare class PendingCommitmentsContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<PendingCommitmentsContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<PendingCommitmentsContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<PendingCommitmentsContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** test_insert2_then_get2_then_nullify2_all_in_nested_calls(amount: field, owner: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert2_then_get2_then_nullify2_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert_then_get_then_nullify_flat(amount: field, owner: struct) */
        test_insert_then_get_then_nullify_flat: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert2_then_get2_then_nullify1_all_in_nested_calls(amount: field, owner: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct) */
        test_insert2_then_get2_then_nullify1_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_bad_get_then_insert_flat(amount: field, owner: struct) */
        test_bad_get_then_insert_flat: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert_then_get_then_nullify_all_in_nested_calls(amount: field, owner: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct, get_note_zero_fn_selector: struct) */
        test_insert_then_get_then_nullify_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike, get_note_zero_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** insert_note(amount: field, owner: struct) */
        insert_note: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** dummy(amount: field, owner: struct) */
        dummy: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_insert1_then_get2_then_nullify2_all_in_nested_calls(amount: field, owner: struct, insert_fn_selector: struct, get_then_nullify_fn_selector: struct, get_note_zero_fn_selector: struct) */
        test_insert1_then_get2_then_nullify2_all_in_nested_calls: ((amount: FieldLike, owner: AztecAddressLike, insert_fn_selector: FunctionSelectorLike, get_then_nullify_fn_selector: FunctionSelectorLike, get_note_zero_fn_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_then_nullify_note(expected_value: field, owner: struct) */
        get_then_nullify_note: ((expected_value: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_note_zero_balance(owner: struct) */
        get_note_zero_balance: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=PendingCommitments.d.ts.map