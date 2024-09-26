import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, EthAddressLike, EventSelector, FieldLike, Fr, L1EventPayload, Wallet } from '@aztec/aztec.js';
export declare const TestContractArtifact: ContractArtifact;
export type ExampleEvent = {
    value0: Fr;
    value1: Fr;
    value2: Fr;
    value3: Fr;
    value4: Fr;
};
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
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<TestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof TestContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<TestContract['methods'][M]>): DeployMethod<TestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'example_constant' | 'example_set'>;
    static get notes(): ContractNotes<'ValueNote' | 'TestNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** deploy_contract(target: struct) */
        deploy_contract: ((target: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_public_global_vars(chain_id: field, version: field, block_number: field, timestamp: integer, fee_per_da_gas: field, fee_per_l2_gas: field) */
        assert_public_global_vars: ((chain_id: FieldLike, version: FieldLike, block_number: FieldLike, timestamp: bigint | number, fee_per_da_gas: FieldLike, fee_per_l2_gas: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_create_note(value: field, owner: struct, outgoing_viewer: struct, storage_slot: field) */
        call_create_note: ((value: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, storage_slot: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_view_notes(storage_slot: field, active_or_nullified: boolean) */
        call_view_notes: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_unencrypted(value: field) */
        emit_unencrypted: ((value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_header_private(header_hash: field) */
        assert_header_private: ((header_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** encrypt_with_padding(input: array, iv: array, key: array) */
        encrypt_with_padding: ((input: (bigint | number)[], iv: (bigint | number)[], key: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_shared_mutable_private_getter_for_registry_contract(storage_slot_of_shared_mutable: field, address_to_get_in_registry: struct) */
        test_shared_mutable_private_getter_for_registry_contract: ((storage_slot_of_shared_mutable: FieldLike, address_to_get_in_registry: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_message_from_arbitrary_sender_public(content: field, secret: field, sender: struct, message_leaf_index: field) */
        consume_message_from_arbitrary_sender_public: ((content: FieldLike, secret: FieldLike, sender: EthAddressLike, message_leaf_index: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_this_address() */
        get_this_address: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_time_equal(time: integer) */
        is_time_equal: ((time: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_destroy_note(storage_slot: field) */
        call_destroy_note: ((storage_slot: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_note_from_secret(secret: field) */
        consume_note_from_secret: ((secret: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_mint_private_message(secret_hash_for_redeeming_minted_notes: field, amount: field, secret_for_L1_to_L2_message_consumption: field, portal_address: struct) */
        consume_mint_private_message: ((secret_hash_for_redeeming_minted_notes: FieldLike, amount: FieldLike, secret_for_L1_to_L2_message_consumption: FieldLike, portal_address: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_message_from_arbitrary_sender_private(content: field, secret: field, sender: struct) */
        consume_message_from_arbitrary_sender_private: ((content: FieldLike, secret: FieldLike, sender: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_outgoing_log_body_ciphertext(eph_sk: struct, recipient: struct, recipient_ivpk_app: struct, ovsk_app: struct) */
        compute_outgoing_log_body_ciphertext: ((eph_sk: {
            lo: FieldLike;
            hi: FieldLike;
        }, recipient: AztecAddressLike, recipient_ivpk_app: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }, ovsk_app: {
            lo: FieldLike;
            hi: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_nullifier_public(nullifier: field) */
        emit_nullifier_public: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_arbitrary_recipient_public(content: field, recipient: struct) */
        create_l2_to_l1_message_arbitrary_recipient_public: ((content: FieldLike, recipient: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_constant() */
        get_constant: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_random(kinda_seed: field) */
        get_random: ((kinda_seed: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_nullifier_key_freshness(address: struct, public_nullifying_key: struct) */
        test_nullifier_key_freshness: ((address: AztecAddressLike, public_nullifying_key: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_header_ciphertext(secret: struct, point: struct) */
        compute_note_header_ciphertext: ((secret: {
            lo: FieldLike;
            hi: FieldLike;
        }, point: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_setting_fee_payer() */
        test_setting_fee_payer: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_view_notes_many(storage_slot: field, active_or_nullified: boolean) */
        call_view_notes_many: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_master_incoming_viewing_public_key(address: struct) */
        get_master_incoming_viewing_public_key: ((address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_arbitrary_recipient_private(content: field, recipient: struct) */
        create_l2_to_l1_message_arbitrary_recipient_private: ((content: FieldLike, recipient: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_nullifier(nullifier: field) */
        emit_nullifier: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_array_as_encrypted_log(fields: array, owner: struct, outgoing_viewer: struct, nest: boolean) */
        emit_array_as_encrypted_log: ((fields: FieldLike[], owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, nest: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** encrypt(input: array, iv: array, key: array) */
        encrypt: ((input: (bigint | number)[], iv: (bigint | number)[], key: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_incoming_log_body_ciphertext(secret: struct, point: struct, storage_slot: field, value: field) */
        compute_incoming_log_body_ciphertext: ((secret: {
            lo: FieldLike;
            hi: FieldLike;
        }, point: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }, storage_slot: FieldLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_private_global_vars(chain_id: field, version: field) */
        assert_private_global_vars: ((chain_id: FieldLike, version: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_setting_teardown() */
        test_setting_teardown: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_encrypted_logs_nested(value: field, owner: struct, outgoing_viewer: struct) */
        emit_encrypted_logs_nested: ((value: FieldLike, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_constant(value: field) */
        set_constant: ((value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_l2_to_l1_message_public(amount: field, secret_hash: field, portal_address: struct) */
        create_l2_to_l1_message_public: ((amount: FieldLike, secret_hash: FieldLike, portal_address: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_tx_max_block_number(max_block_number: integer, enqueue_public_call: boolean) */
        set_tx_max_block_number: ((max_block_number: bigint | number, enqueue_public_call: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
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
        /** call_get_notes(storage_slot: field, active_or_nullified: boolean) */
        call_get_notes: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume_mint_public_message(to: struct, amount: field, secret: field, message_leaf_index: field, portal_address: struct) */
        consume_mint_public_message: ((to: AztecAddressLike, amount: FieldLike, secret: FieldLike, message_leaf_index: FieldLike, portal_address: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_shared_mutable_private_getter(contract_address_to_read: struct, storage_slot_of_shared_mutable: field) */
        test_shared_mutable_private_getter: ((contract_address_to_read: AztecAddressLike, storage_slot_of_shared_mutable: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** call_get_notes_many(storage_slot: field, active_or_nullified: boolean) */
        call_get_notes_many: ((storage_slot: FieldLike, active_or_nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_ovsk_app(ovpk_m_hash: field) */
        get_ovsk_app: ((ovpk_m_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
    private static decodeEvent;
    static get events(): {
        ExampleEvent: {
            decode: (payload: L1EventPayload | undefined) => ExampleEvent | undefined;
            eventSelector: EventSelector;
            fieldNames: string[];
        };
    };
}
//# sourceMappingURL=Test.d.ts.map