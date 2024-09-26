import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const AuthRegistryContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract AuthRegistry;
 */
export declare class AuthRegistryContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<AuthRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<AuthRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<AuthRegistryContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof AuthRegistryContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<AuthRegistryContract['methods'][M]>): DeployMethod<AuthRegistryContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'reject_all' | 'approved_actions'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** is_consumable(on_behalf_of: struct, message_hash: field) */
        is_consumable: ((on_behalf_of: AztecAddressLike, message_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_authorized(message_hash: field, authorize: boolean) */
        set_authorized: ((message_hash: FieldLike, authorize: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_authorized_private(approver: struct, message_hash: field, authorize: boolean) */
        set_authorized_private: ((approver: AztecAddressLike, message_hash: FieldLike, authorize: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** unconstrained_is_consumable(on_behalf_of: struct, message_hash: field) */
        unconstrained_is_consumable: ((on_behalf_of: AztecAddressLike, message_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_reject_all(reject: boolean) */
        set_reject_all: ((reject: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** consume(on_behalf_of: struct, inner_hash: field) */
        consume: ((on_behalf_of: AztecAddressLike, inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_reject_all(on_behalf_of: struct) */
        is_reject_all: ((on_behalf_of: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=AuthRegistry.d.ts.map