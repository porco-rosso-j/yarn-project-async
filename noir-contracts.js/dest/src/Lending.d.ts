import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const LendingContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Lending;
 */
export declare class LendingContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<LendingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<LendingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<LendingContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** get_position(owner: struct) */
        get_position: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** borrow_public(to: struct, amount: field) */
        borrow_public: ((to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_assets() */
        get_assets: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** deposit_public(amount: field, nonce: field, on_behalf_of: field, collateral_asset: struct) */
        deposit_public: ((amount: FieldLike, nonce: FieldLike, on_behalf_of: FieldLike, collateral_asset: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** withdraw_public(to: struct, amount: field) */
        withdraw_public: ((to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** withdraw_private(secret: field, to: struct, amount: field) */
        withdraw_private: ((secret: FieldLike, to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** init(oracle: struct, loan_to_value: field, collateral_asset: struct, stable_coin: struct) */
        init: ((oracle: AztecAddressLike, loan_to_value: FieldLike, collateral_asset: AztecAddressLike, stable_coin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** update_accumulator() */
        update_accumulator: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_asset(assetId: field) */
        get_asset: ((assetId: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** repay_public(amount: field, nonce: field, owner: struct, stable_coin: struct) */
        repay_public: ((amount: FieldLike, nonce: FieldLike, owner: AztecAddressLike, stable_coin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** deposit_private(from: struct, amount: field, nonce: field, secret: field, on_behalf_of: field, collateral_asset: struct) */
        deposit_private: ((from: AztecAddressLike, amount: FieldLike, nonce: FieldLike, secret: FieldLike, on_behalf_of: FieldLike, collateral_asset: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** borrow_private(secret: field, to: struct, amount: field) */
        borrow_private: ((secret: FieldLike, to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** repay_private(from: struct, amount: field, nonce: field, secret: field, on_behalf_of: field, stable_coin: struct) */
        repay_private: ((from: AztecAddressLike, amount: FieldLike, nonce: FieldLike, secret: FieldLike, on_behalf_of: FieldLike, stable_coin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Lending.d.ts.map