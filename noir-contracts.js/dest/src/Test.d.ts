import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EthAddressLike, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const TestContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Test;
 */
export declare class TestContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<TestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<TestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<TestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** set_constant(value: field) */
        set_constant: ((value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_view_notes(storage_slot: field, active_or_nullified: boolean) */
        call_view_notes: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_arbitrary_recipient_public(content: field, recipient: struct) */
        create_l2_to_l1_message_arbitrary_recipient_public: ((content: FieldLike, recipient: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_nullifier_public(amount: field, secret_hash: field) */
        create_nullifier_public: ((amount: FieldLike, secret_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_private_global_vars(chain_id: field, version: field) */
        assert_private_global_vars: ((chain_id: FieldLike, version: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_header_private(header_hash: field) */
        assert_header_private: ((header_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_random(kindaSeed: field) */
        get_random: ((kindaSeed: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_message_from_arbitrary_sender_public(msg_key: field, content: field, secret: field, sender: struct) */
        consume_message_from_arbitrary_sender_public: ((msg_key: FieldLike, content: FieldLike, secret: FieldLike, sender: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_constant() */
        get_constant: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_view_notes_many(storage_slot: field, active_or_nullified: boolean) */
        call_view_notes_many: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_destroy_note(storage_slot: field) */
        call_destroy_note: ((storage_slot: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_time_equal(time: field) */
        is_time_equal: ((time: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_msg_sender() */
        emit_msg_sender: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_unencrypted(value: field) */
        emit_unencrypted: ((value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_public_global_vars(chain_id: field, version: field, block_number: field, timestamp: field, coinbase: struct, fee_recipient: struct) */
        assert_public_global_vars: ((chain_id: FieldLike, version: FieldLike, block_number: FieldLike, timestamp: FieldLike, coinbase: EthAddressLike, fee_recipient: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_mint_public_message(to: struct, amount: field, canceller: struct, msg_key: field, secret: field) */
        consume_mint_public_message: ((to: AztecAddressLike, amount: FieldLike, canceller: EthAddressLike, msg_key: FieldLike, secret: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_nullifier(nullifier: field) */
        emit_nullifier: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_message_from_arbitrary_sender_private(msg_key: field, content: field, secret: field, sender: struct) */
        consume_message_from_arbitrary_sender_private: ((msg_key: FieldLike, content: FieldLike, secret: FieldLike, sender: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_create_note(value: field, owner: struct, storage_slot: field) */
        call_create_note: ((value: FieldLike, owner: AztecAddressLike, storage_slot: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_portal_contract_address(aztec_address: struct) */
        get_portal_contract_address: ((aztec_address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_mint_private_message(secret_hash_for_redeeming_minted_notes: field, amount: field, canceller: struct, msg_key: field, secret_for_L1_to_L2_message_consumption: field) */
        consume_mint_private_message: ((secret_hash_for_redeeming_minted_notes: FieldLike, amount: FieldLike, canceller: EthAddressLike, msg_key: FieldLike, secret_for_L1_to_L2_message_consumption: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_this_portal_address() */
        get_this_portal_address: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_this_address() */
        get_this_address: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_public(amount: field, secret_hash: field) */
        create_l2_to_l1_message_public: ((amount: FieldLike, secret_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_get_notes(storage_slot: field, active_or_nullified: boolean) */
        call_get_notes: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_public_key(address: struct) */
        get_public_key: ((address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_code_gen(a_field: field, a_bool: boolean, a_number: integer, an_array: array, a_struct: struct, a_deep_struct: struct) */
        test_code_gen: ((a_field: FieldLike, a_bool: boolean, a_number: bigint | number, an_array: FieldLike[], a_struct: {
            amount: FieldLike;
            secret_hash: FieldLike;
        }, a_deep_struct: {
            a_field: FieldLike;
            a_bool: boolean;
            a_note: {
                amount: FieldLike;
                secret_hash: FieldLike;
            };
            many_notes: {
                amount: FieldLike;
                secret_hash: FieldLike;
            }[];
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_array_as_unencrypted_log(fields: array) */
        emit_array_as_unencrypted_log: ((fields: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_header_public(header_hash: field) */
        assert_header_public: ((header_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_get_notes_many(storage_slot: field, active_or_nullified: boolean) */
        call_get_notes_many: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_arbitrary_recipient_private(content: field, recipient: struct) */
        create_l2_to_l1_message_arbitrary_recipient_private: ((content: FieldLike, recipient: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Test.d.ts.map