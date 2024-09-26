import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const StaticParentContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract StaticParent;
 */
export declare class StaticParentContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<StaticParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<StaticParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<StaticParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof StaticParentContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<StaticParentContract['methods'][M]>): DeployMethod<StaticParentContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'current_value' | 'a_private_value'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** private_nested_static_call(target_contract: struct, target_selector: struct, args: array) */
        private_nested_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_call(target_contract: struct, target_selector: struct, arg: field) */
        public_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, arg: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_call(target_contract: struct, target_selector: struct, args: array) */
        private_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_call(target_contract: struct, target_selector: struct, args: array) */
        enqueue_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_static_nested_call_to_pub_function(target_contract: struct, target_selector: struct, args: array) */
        enqueue_static_nested_call_to_pub_function: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_value_from_child(target_contract: struct, value: field, owner: struct) */
        private_get_value_from_child: ((target_contract: AztecAddressLike, value: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_static_call(target_contract: struct, target_selector: struct, args: array) */
        private_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_static_call(target_contract: struct, target_selector: struct, args: array) */
        public_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_call_3_args(target_contract: struct, target_selector: struct, args: array) */
        private_call_3_args: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_public_get_value_from_child(target_contract: struct, value: field) */
        enqueue_public_get_value_from_child: ((target_contract: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_static_call_3_args(target_contract: struct, target_selector: struct, args: array) */
        private_static_call_3_args: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_nested_static_call(target_contract: struct, target_selector: struct, args: array) */
        public_nested_static_call: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueue_static_call_to_pub_function(target_contract: struct, target_selector: struct, args: array) */
        enqueue_static_call_to_pub_function: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_nested_static_call_3_args(target_contract: struct, target_selector: struct, args: array) */
        private_nested_static_call_3_args: ((target_contract: AztecAddressLike, target_selector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_value_from_child(target_contract: struct, value: field) */
        public_get_value_from_child: ((target_contract: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=StaticParent.d.ts.map