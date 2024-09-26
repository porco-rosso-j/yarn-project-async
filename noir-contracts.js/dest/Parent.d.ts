import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const ParentContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Parent;
 */
export declare class ParentContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<ParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof ParentContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<ParentContract['methods'][M]>): DeployMethod<ParentContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'current_value' | 'a_map_with_private_values'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** enqueue_call_to_pub_entry_point(target_contract: struct, target_selector: struct, target_value: field) */
        enqueue_call_to_pub_entry_point: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, target_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_calls_to_pub_entry_point(target_contract: struct, target_selector: struct, target_value: field) */
        enqueue_calls_to_pub_entry_point: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, target_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pub_entry_point_twice(target_contract: struct, target_selector: struct, init_value: field) */
        pub_entry_point_twice: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, init_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_static_call(target_contract: struct, target_selector: struct, args: array) */
        private_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_calls_to_child_with_nested_last(target_contract: struct, target_selector: struct) */
        enqueue_calls_to_child_with_nested_last: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_static_call_to_pub_function(target_contract: struct, target_selector: struct, args: array) */
        enqueue_static_call_to_pub_function: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_call_to_child_twice(target_contract: struct, target_selector: struct, target_value: field) */
        enqueue_call_to_child_twice: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, target_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_nested_static_call(target_contract: struct, target_selector: struct, args: array) */
        public_nested_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** entry_point(target_contract: struct, target_selector: struct) */
        entry_point: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pub_entry_point(target_contract: struct, target_selector: struct, init_value: field) */
        pub_entry_point: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, init_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_static_call(target_contract: struct, target_selector: struct, args: array) */
        public_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_static_nested_call_to_pub_function(target_contract: struct, target_selector: struct, args: array) */
        enqueue_static_nested_call_to_pub_function: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_calls_to_child_with_nested_first(target_contract: struct, target_selector: struct) */
        enqueue_calls_to_child_with_nested_first: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_call(target_contract: struct, target_selector: struct, args: array) */
        private_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_nested_static_call(target_contract: struct, target_selector: struct, args: array) */
        private_nested_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_call_to_child(target_contract: struct, target_selector: struct, target_value: field) */
        enqueue_call_to_child: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, target_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Parent.d.ts.map