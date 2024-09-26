import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const PrivateTokenContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract PrivateToken;
 */
export declare class PrivateTokenContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<PrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number): DeployMethod<PrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number): DeployMethod<PrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof PrivateTokenContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<PrivateTokenContract['methods'][M]>): DeployMethod<PrivateTokenContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'admin' | 'minters' | 'balances' | 'total_supply' | 'symbol' | 'name' | 'decimals'>;
    static get notes(): ContractNotes<'TokenNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_admin(new_admin: struct) */
        set_admin: ((new_admin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer_from(from: struct, to: struct, amount: field, nonce: field) */
        transfer_from: ((from: AztecAddressLike, to: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_decimals() */
        public_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_name() */
        public_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** admin() */
        admin: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** total_supply() */
        total_supply: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_decimals() */
        private_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** balance_of_private(owner: struct) */
        balance_of_private: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_symbol() */
        public_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_get_name() */
        un_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** privately_mint_private_note(amount: field) */
        privately_mint_private_note: ((amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer(to: struct, amount: field) */
        transfer: ((to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_get_decimals() */
        un_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_minter(minter: struct) */
        is_minter: ((minter: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(admin: struct, name: string, symbol: string, decimals: integer) */
        constructor: ((admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_get_symbol() */
        un_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** balance_of_unconstrained(owner_npk_m_hash: field) */
        balance_of_unconstrained: ((owner_npk_m_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** assert_minter_and_mint(minter: struct, amount: field) */
        assert_minter_and_mint: ((minter: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_symbol() */
        private_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_minter(minter: struct, approve: boolean) */
        set_minter: ((minter: AztecAddressLike, approve: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_name() */
        private_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** setup_refund(fee_payer_npk_m_hash: field, user: struct, funded_amount: field, user_randomness: field, fee_payer_randomness: field) */
        setup_refund: ((fee_payer_npk_m_hash: FieldLike, user: AztecAddressLike, funded_amount: FieldLike, user_randomness: FieldLike, fee_payer_randomness: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=PrivateToken.d.ts.map