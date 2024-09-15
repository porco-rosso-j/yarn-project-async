import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EthAddressLike, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const TokenBridgeContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract TokenBridge;
 */
export declare class TokenBridgeContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<TokenBridgeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, token: AztecAddressLike): DeployMethod<TokenBridgeContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, token: AztecAddressLike): DeployMethod<TokenBridgeContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** get_token() */
        get_token: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(token: struct) */
        constructor: ((token: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** claim_private(secret_hash_for_redeeming_minted_notes: field, amount: field, canceller: struct, msg_key: field, secret_for_L1_to_L2_message_consumption: field) */
        claim_private: ((secret_hash_for_redeeming_minted_notes: FieldLike, amount: FieldLike, canceller: EthAddressLike, msg_key: FieldLike, secret_for_L1_to_L2_message_consumption: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** exit_to_l1_public(recipient: struct, amount: field, callerOnL1: struct, nonce: field) */
        exit_to_l1_public: ((recipient: EthAddressLike, amount: FieldLike, callerOnL1: EthAddressLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** exit_to_l1_private(token: struct, recipient: struct, amount: field, callerOnL1: struct, nonce: field) */
        exit_to_l1_private: ((token: AztecAddressLike, recipient: EthAddressLike, amount: FieldLike, callerOnL1: EthAddressLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** claim_public(to: struct, amount: field, canceller: struct, msg_key: field, secret: field) */
        claim_public: ((to: AztecAddressLike, amount: FieldLike, canceller: EthAddressLike, msg_key: FieldLike, secret: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** token() */
        token: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=TokenBridge.d.ts.map