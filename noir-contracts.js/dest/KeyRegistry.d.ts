import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet, WrappedFieldLike } from '@aztec/aztec.js';
export declare const KeyRegistryContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract KeyRegistry;
 */
export declare class KeyRegistryContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<KeyRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<KeyRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<KeyRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof KeyRegistryContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<KeyRegistryContract['methods'][M]>): DeployMethod<KeyRegistryContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'npk_m_x_registry' | 'npk_m_y_registry' | 'ivpk_m_x_registry' | 'ivpk_m_y_registry' | 'ovpk_m_x_registry' | 'ovpk_m_y_registry' | 'tpk_m_x_registry' | 'tpk_m_y_registry'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** rotate_npk_m(address: struct, new_npk_m: struct, nonce: field) */
        rotate_npk_m: ((address: AztecAddressLike, new_npk_m: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** register_npk_and_ivpk(address: struct, partial_address: struct, keys: struct) */
        register_npk_and_ivpk: ((address: AztecAddressLike, partial_address: WrappedFieldLike, keys: {
            npk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            ivpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            ovpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            tpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** register_ovpk_and_tpk(address: struct, partial_address: struct, keys: struct) */
        register_ovpk_and_tpk: ((address: AztecAddressLike, partial_address: WrappedFieldLike, keys: {
            npk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            ivpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            ovpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
            tpk_m: {
                x: FieldLike;
                y: FieldLike;
                is_infinite: boolean;
            };
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=KeyRegistry.d.ts.map