import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const EcdsaAccountContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract EcdsaAccount;
 */
export declare class EcdsaAccountContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<EcdsaAccountContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]): DeployMethod<EcdsaAccountContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]): DeployMethod<EcdsaAccountContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof EcdsaAccountContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<EcdsaAccountContract['methods'][M]>): DeployMethod<EcdsaAccountContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'public_key'>;
    static get notes(): ContractNotes<'EcdsaPublicKeyNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** entrypoint(app_payload: struct, fee_payload: struct) */
        entrypoint: ((app_payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
                is_static: boolean;
            }[];
            nonce: FieldLike;
        }, fee_payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
                is_static: boolean;
            }[];
            nonce: FieldLike;
            is_fee_payer: boolean;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(signing_pub_key_x: array, signing_pub_key_y: array) */
        constructor: ((signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** verify_private_authwit(inner_hash: field) */
        verify_private_authwit: ((inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=EcdsaAccount.d.ts.map