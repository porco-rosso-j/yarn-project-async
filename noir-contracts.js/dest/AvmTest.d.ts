import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractStorageLayout, DeployMethod, EthAddressLike, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const AvmTestContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract AvmTest;
 */
export declare class AvmTestContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<AvmTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<AvmTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<AvmTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof AvmTestContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<AvmTestContract['methods'][M]>): DeployMethod<AvmTestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'single' | 'list' | 'map'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** get_transaction_fee() */
        get_transaction_fee: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** variable_base_msm() */
        variable_base_msm: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** keccak_hash(data: array) */
        keccak_hash: ((data: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** send_l2_to_l1_msg(recipient: struct, content: field) */
        send_l2_to_l1_msg: ((recipient: EthAddressLike, content: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_version() */
        get_version: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** poseidon2_hash(data: array) */
        poseidon2_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** l1_to_l2_msg_exists(msg_hash: field, msg_leaf_index: field) */
        l1_to_l2_msg_exists: ((msg_hash: FieldLike, msg_leaf_index: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_address() */
        get_address: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_different_nullifier_in_nested_call(nestedAddress: struct, nullifier: field) */
        create_different_nullifier_in_nested_call: ((nestedAddress: AztecAddressLike, nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_opcode_u8() */
        set_opcode_u8: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_storage_list() */
        read_storage_list: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nested_call_to_add(arg_a: field, arg_b: field) */
        nested_call_to_add: ((arg_a: FieldLike, arg_b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nested_call_to_add_with_gas(arg_a: field, arg_b: field, l2_gas: field, da_gas: field) */
        nested_call_to_add_with_gas: ((arg_a: FieldLike, arg_b: FieldLike, l2_gas: FieldLike, da_gas: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** note_hash_exists(note_hash: field, leaf_index: field) */
        note_hash_exists: ((note_hash: FieldLike, leaf_index: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nullifier_collision(nullifier: field) */
        nullifier_collision: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assertion_failure() */
        assertion_failure: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** sha256_hash(data: array) */
        sha256_hash: ((data: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_args_hash(_a: integer, _fields: array) */
        get_args_hash: ((_a: bigint | number, _fields: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_unencrypted_log() */
        emit_unencrypted_log: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_opcode_u64() */
        set_opcode_u64: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nullifier_exists(nullifier: field) */
        nullifier_exists: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_storage_map(to: struct, amount: integer) */
        set_storage_map: ((to: AztecAddressLike, amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_storage_address() */
        get_storage_address: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_timestamp(expected_timestamp: integer) */
        assert_timestamp: ((expected_timestamp: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_selector() */
        check_selector: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_public_from_private() */
        enqueue_public_from_private: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_storage_list(a: field, b: field) */
        set_storage_list: ((a: FieldLike, b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_chain_id() */
        get_chain_id: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nested_static_call_to_add(arg_a: field, arg_b: field) */
        nested_static_call_to_add: ((arg_a: FieldLike, arg_b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_block_number() */
        get_block_number: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** debug_logging() */
        debug_logging: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** add_args_return(arg_a: field, arg_b: field) */
        add_args_return: ((arg_a: FieldLike, arg_b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** helper_with_failed_assertion() */
        helper_with_failed_assertion: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_storage_single(a: field) */
        set_storage_single: ((a: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** add_u128(a: struct, b: struct) */
        add_u128: ((a: {
            lo: FieldLike;
            hi: FieldLike;
        }, b: {
            lo: FieldLike;
            hi: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** inner_helper_with_failed_assertion() */
        inner_helper_with_failed_assertion: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_storage_single() */
        read_storage_single: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_opcode_small_field() */
        set_opcode_small_field: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** add_storage_map(to: struct, amount: integer) */
        add_storage_map: ((to: AztecAddressLike, amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pedersen_hash(data: array) */
        pedersen_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** new_nullifier(nullifier: field) */
        new_nullifier: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** modulo2(a: integer) */
        modulo2: ((a: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_read_storage_single(a: field) */
        set_read_storage_single: ((a: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pedersen_hash_with_index(data: array) */
        pedersen_hash_with_index: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** u128_from_integer_overflow() */
        u128_from_integer_overflow: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_function_selector() */
        get_function_selector: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_same(arg_a: field, arg_b: field) */
        assert_same: ((arg_a: FieldLike, arg_b: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nested_static_call_to_set_storage() */
        nested_static_call_to_set_storage: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_storage_map(address: struct) */
        read_storage_map: ((address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** elliptic_curve_add_and_double() */
        elliptic_curve_add_and_double: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_opcode_u32() */
        set_opcode_u32: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_nullifier_exists(nullifier: field) */
        assert_nullifier_exists: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_fee_per_da_gas() */
        get_fee_per_da_gas: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_l2_gas_left() */
        get_l2_gas_left: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** to_radix_le(input: field) */
        to_radix_le: ((input: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_sender() */
        get_sender: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_timestamp() */
        get_timestamp: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** u128_addition_overflow() */
        u128_addition_overflow: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_fee_per_l2_gas() */
        get_fee_per_l2_gas: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_da_gas_left() */
        get_da_gas_left: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_nullifier_and_check(nullifier: field) */
        emit_nullifier_and_check: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_same_nullifier_in_nested_call(nestedAddress: struct, nullifier: field) */
        create_same_nullifier_in_nested_call: ((nestedAddress: AztecAddressLike, nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** new_note_hash(note_hash: field) */
        new_note_hash: ((note_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_get_contract_instance_raw() */
        test_get_contract_instance_raw: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_opcode_big_field() */
        set_opcode_big_field: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_get_contract_instance() */
        test_get_contract_instance: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=AvmTest.d.ts.map