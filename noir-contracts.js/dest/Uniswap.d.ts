import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, EthAddressLike, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
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
    static deploy(wallet: Wallet, portal_address: EthAddressLike): DeployMethod<UniswapContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, portal_address: EthAddressLike): DeployMethod<UniswapContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof UniswapContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<UniswapContract['methods'][M]>): DeployMethod<UniswapContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'admin' | 'minters' | 'balances' | 'total_supply' | 'pending_shields' | 'public_balances' | 'symbol' | 'name' | 'decimals'>;
    static get notes(): ContractNotes<'TransparentNote' | 'TokenNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** swap_private(input_asset: struct, input_asset_bridge: struct, input_amount: field, output_asset_bridge: struct, nonce_for_unshield_approval: field, uniswap_fee_tier: field, minimum_output_amount: field, secret_hash_for_redeeming_minted_notes: field, secret_hash_for_L1_to_l2_message: field, caller_on_L1: struct) */
        swap_private: ((input_asset: AztecAddressLike, input_asset_bridge: AztecAddressLike, input_amount: FieldLike, output_asset_bridge: AztecAddressLike, nonce_for_unshield_approval: FieldLike, uniswap_fee_tier: FieldLike, minimum_output_amount: FieldLike, secret_hash_for_redeeming_minted_notes: FieldLike, secret_hash_for_L1_to_l2_message: FieldLike, caller_on_L1: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** swap_public(sender: struct, input_asset_bridge: struct, input_amount: field, output_asset_bridge: struct, nonce_for_transfer_approval: field, uniswap_fee_tier: field, minimum_output_amount: field, recipient: struct, secret_hash_for_L1_to_l2_message: field, caller_on_L1: struct, nonce_for_swap_approval: field) */
        swap_public: ((sender: AztecAddressLike, input_asset_bridge: AztecAddressLike, input_amount: FieldLike, output_asset_bridge: AztecAddressLike, nonce_for_transfer_approval: FieldLike, uniswap_fee_tier: FieldLike, minimum_output_amount: FieldLike, recipient: AztecAddressLike, secret_hash_for_L1_to_l2_message: FieldLike, caller_on_L1: EthAddressLike, nonce_for_swap_approval: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(portal_address: struct) */
        constructor: ((portal_address: EthAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Uniswap.d.ts.map