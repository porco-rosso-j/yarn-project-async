import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const SlowTreeContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract SlowTree;
 */
export declare class SlowTreeContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<SlowTreeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<SlowTreeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<SlowTreeContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_read_leaf_at(address: struct, key: field) */
        un_read_leaf_at: ((address: AztecAddressLike, key: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_read_root(address: struct) */
        un_read_root: ((address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** update_at_public(p: struct) */
        update_at_public: ((p: {
            index: FieldLike;
            new_value: FieldLike;
            before: {
                value: FieldLike;
                sibling_path: FieldLike[];
            };
            after: {
                value: FieldLike;
                sibling_path: FieldLike[];
            };
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** update_at_private(index: field, new_value: field) */
        update_at_private: ((index: FieldLike, new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_at(index: field) */
        read_at: ((index: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_at_pub(key: field) */
        read_at_pub: ((key: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** initialize() */
        initialize: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** read_leaf_at_pub(key: field) */
        read_leaf_at_pub: ((key: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=SlowTree.d.ts.map