import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EthAddressLike, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const UniswapContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Uniswap;
 */
export declare class UniswapContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<UniswapContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<UniswapContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<UniswapContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** swap_private(input_asset: struct, input_asset_bridge: struct, input_amount: field, output_asset_bridge: struct, nonce_for_unshield_approval: field, uniswap_fee_tier: field, minimum_output_amount: field, secret_hash_for_redeeming_minted_notes: field, secret_hash_for_L1_to_l2_message: field, deadline_for_L1_to_l2_message: field, canceller_for_L1_to_L2_message: struct, caller_on_L1: struct) */
        swap_private: ((input_asset: AztecAddressLike, input_asset_bridge: AztecAddressLike, input_amount: FieldLike, output_asset_bridge: AztecAddressLike, nonce_for_unshield_approval: FieldLike, uniswap_fee_tier: FieldLike, minimum_output_amount: FieldLike, secret_hash_for_redeeming_minted_notes: FieldLike, secret_hash_for_L1_to_l2_message: FieldLike, deadline_for_L1_to_l2_message: FieldLike, canceller_for_L1_to_L2_message: EthAddressLike, caller_on_L1: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** swap_public(sender: struct, input_asset_bridge: struct, input_amount: field, output_asset_bridge: struct, nonce_for_transfer_approval: field, uniswap_fee_tier: field, minimum_output_amount: field, recipient: struct, secret_hash_for_L1_to_l2_message: field, deadline_for_L1_to_l2_message: field, canceller_for_L1_to_L2_message: struct, caller_on_L1: struct, nonce_for_swap_approval: field) */
        swap_public: ((sender: AztecAddressLike, input_asset_bridge: AztecAddressLike, input_amount: FieldLike, output_asset_bridge: AztecAddressLike, nonce_for_transfer_approval: FieldLike, uniswap_fee_tier: FieldLike, minimum_output_amount: FieldLike, recipient: AztecAddressLike, secret_hash_for_L1_to_l2_message: FieldLike, deadline_for_L1_to_l2_message: FieldLike, canceller_for_L1_to_L2_message: EthAddressLike, caller_on_L1: EthAddressLike, nonce_for_swap_approval: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_valid_public(message_hash: field) */
        is_valid_public: ((message_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nonce_for_burn_approval() */
        nonce_for_burn_approval: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Uniswap.d.ts.map