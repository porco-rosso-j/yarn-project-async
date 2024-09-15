import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, FunctionSelectorLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const SchnorrAccountContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract SchnorrAccount;
 */
export declare class SchnorrAccountContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<SchnorrAccountContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, signing_pub_key_x: FieldLike, signing_pub_key_y: FieldLike): DeployMethod<SchnorrAccountContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, signing_pub_key_x: FieldLike, signing_pub_key_y: FieldLike): DeployMethod<SchnorrAccountContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** constructor(signing_pub_key_x: field, signing_pub_key_y: field) */
        constructor: ((signing_pub_key_x: FieldLike, signing_pub_key_y: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** entrypoint(app_payload: struct, fee_payload: struct) */
        entrypoint: ((app_payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
            }[];
            nonce: FieldLike;
        }, fee_payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
            }[];
            nonce: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_valid_public(message_hash: field) */
        is_valid_public: ((message_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_valid(message_hash: field) */
        is_valid: ((message_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=SchnorrAccount.d.ts.map