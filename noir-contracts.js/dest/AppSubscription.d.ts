import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const AppSubscriptionContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract AppSubscription;
 */
export declare class AppSubscriptionContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<AppSubscriptionContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, target_address: AztecAddressLike, subscription_recipient_address: AztecAddressLike, subscription_token_address: AztecAddressLike, subscription_price: FieldLike, gas_token_address: AztecAddressLike, gas_token_limit_per_tx: FieldLike): DeployMethod<AppSubscriptionContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, target_address: AztecAddressLike, subscription_recipient_address: AztecAddressLike, subscription_token_address: AztecAddressLike, subscription_price: FieldLike, gas_token_address: AztecAddressLike, gas_token_limit_per_tx: FieldLike): DeployMethod<AppSubscriptionContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof AppSubscriptionContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<AppSubscriptionContract['methods'][M]>): DeployMethod<AppSubscriptionContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'balances' | 'portal_address'>;
    static get notes(): ContractNotes<'TransparentNote' | 'TokenNote' | 'SubscriptionNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** subscribe(subscriber_address: struct, nonce: field, expiry_block_number: field, tx_count: field) */
        subscribe: ((subscriber_address: AztecAddressLike, nonce: FieldLike, expiry_block_number: FieldLike, tx_count: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_initialized(subscriber_address: struct) */
        is_initialized: ((subscriber_address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(target_address: struct, subscription_recipient_address: struct, subscription_token_address: struct, subscription_price: field, gas_token_address: struct, gas_token_limit_per_tx: field) */
        constructor: ((target_address: AztecAddressLike, subscription_recipient_address: AztecAddressLike, subscription_token_address: AztecAddressLike, subscription_price: FieldLike, gas_token_address: AztecAddressLike, gas_token_limit_per_tx: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** entrypoint(payload: struct, user_address: struct) */
        entrypoint: ((payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
                is_static: boolean;
            }[];
            nonce: FieldLike;
        }, user_address: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=AppSubscription.d.ts.map