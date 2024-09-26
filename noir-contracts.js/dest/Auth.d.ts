import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const AuthContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Auth;
 */
export declare class AuthContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<AuthContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, admin: AztecAddressLike): DeployMethod<AuthContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, admin: AztecAddressLike): DeployMethod<AuthContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof AuthContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<AuthContract['methods'][M]>): DeployMethod<AuthContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'admin' | 'authorized'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** do_private_authorized_thing() */
        do_private_authorized_thing: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_authorized_delay() */
        get_authorized_delay: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_authorized_delay(new_delay: integer) */
        set_authorized_delay: ((new_delay: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_authorized_in_private() */
        get_authorized_in_private: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(admin: struct) */
        constructor: ((admin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_scheduled_authorized() */
        get_scheduled_authorized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_authorized() */
        get_authorized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_authorized(authorized: struct) */
        set_authorized: ((authorized: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Auth.d.ts.map