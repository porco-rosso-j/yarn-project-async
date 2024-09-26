import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet, WrappedFieldLike } from '@aztec/aztec.js';
export declare const ContractClassRegistererContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract ContractClassRegisterer;
 */
export declare class ContractClassRegistererContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ContractClassRegistererContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ContractClassRegistererContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<ContractClassRegistererContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof ContractClassRegistererContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<ContractClassRegistererContract['methods'][M]>): DeployMethod<ContractClassRegistererContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** broadcast_private_function(contract_class_id: struct, artifact_metadata_hash: field, unconstrained_functions_artifact_tree_root: field, private_function_tree_sibling_path: array, private_function_tree_leaf_index: field, artifact_function_tree_sibling_path: array, artifact_function_tree_leaf_index: field, function_data: struct) */
        broadcast_private_function: ((contract_class_id: WrappedFieldLike, artifact_metadata_hash: FieldLike, unconstrained_functions_artifact_tree_root: FieldLike, private_function_tree_sibling_path: FieldLike[], private_function_tree_leaf_index: FieldLike, artifact_function_tree_sibling_path: FieldLike[], artifact_function_tree_leaf_index: FieldLike, function_data: {
            selector: FunctionSelectorLike;
            metadata_hash: FieldLike;
            vk_hash: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** register(artifact_hash: field, private_functions_root: field, public_bytecode_commitment: field) */
        register: ((artifact_hash: FieldLike, private_functions_root: FieldLike, public_bytecode_commitment: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** broadcast_unconstrained_function(contract_class_id: struct, artifact_metadata_hash: field, private_functions_artifact_tree_root: field, artifact_function_tree_sibling_path: array, artifact_function_tree_leaf_index: field, function_data: struct) */
        broadcast_unconstrained_function: ((contract_class_id: WrappedFieldLike, artifact_metadata_hash: FieldLike, private_functions_artifact_tree_root: FieldLike, artifact_function_tree_sibling_path: FieldLike[], artifact_function_tree_leaf_index: FieldLike, function_data: {
            selector: FunctionSelectorLike;
            metadata_hash: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=ContractClassRegisterer.d.ts.map