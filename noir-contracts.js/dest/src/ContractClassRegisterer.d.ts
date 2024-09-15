import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, FunctionSelectorLike, PublicKey, Wallet, WrappedFieldLike } from '@aztec/aztec.js';
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
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<ContractClassRegistererContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** register(artifact_hash: field, private_functions_root: field, public_bytecode_commitment: field, packed_public_bytecode: array) */
        register: ((artifact_hash: FieldLike, private_functions_root: FieldLike, public_bytecode_commitment: FieldLike, packed_public_bytecode: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** broadcast_unconstrained_function(contract_class_id: struct, artifact_metadata_hash: field, private_functions_artifact_tree_root: field, artifact_function_tree_sibling_path: array, function_data: struct) */
        broadcast_unconstrained_function: ((contract_class_id: WrappedFieldLike, artifact_metadata_hash: FieldLike, private_functions_artifact_tree_root: FieldLike, artifact_function_tree_sibling_path: FieldLike[], function_data: {
            selector: FunctionSelectorLike;
            metadata_hash: FieldLike;
            bytecode: FieldLike[];
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** broadcast_private_function(contract_class_id: struct, artifact_metadata_hash: field, unconstrained_functions_artifact_tree_root: field, private_function_tree_sibling_path: array, artifact_function_tree_sibling_path: array, function_data: struct) */
        broadcast_private_function: ((contract_class_id: WrappedFieldLike, artifact_metadata_hash: FieldLike, unconstrained_functions_artifact_tree_root: FieldLike, private_function_tree_sibling_path: FieldLike[], artifact_function_tree_sibling_path: FieldLike[], function_data: {
            selector: FunctionSelectorLike;
            metadata_hash: FieldLike;
            vk_hash: FieldLike;
            bytecode: FieldLike[];
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=ContractClassRegisterer.d.ts.map