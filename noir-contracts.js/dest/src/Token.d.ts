import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const TokenContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Token;
 */
export declare class TokenContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<TokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number): DeployMethod<TokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number): DeployMethod<TokenContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** un_get_decimals() */
        un_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** mint_private(amount: field, secret_hash: field) */
        mint_private: ((amount: FieldLike, secret_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** redeem_shield(to: struct, amount: field, secret: field) */
        redeem_shield: ((to: AztecAddressLike, amount: FieldLike, secret: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_admin(new_admin: struct) */
        set_admin: ((new_admin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** is_minter(minter: struct) */
        is_minter: ((minter: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(admin: struct, name: string, symbol: string, decimals: integer) */
        constructor: ((admin: AztecAddressLike, name: string, symbol: string, decimals: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** total_supply() */
        total_supply: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_get_name() */
        un_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_symbol() */
        public_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** burn(from: struct, amount: field, nonce: field) */
        burn: ((from: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** mint_public(to: struct, amount: field) */
        mint_public: ((to: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer(from: struct, to: struct, amount: field, nonce: field) */
        transfer: ((from: AztecAddressLike, to: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** un_get_symbol() */
        un_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_symbol() */
        private_get_symbol: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_decimals() */
        private_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer_public(from: struct, to: struct, amount: field, nonce: field) */
        transfer_public: ((from: AztecAddressLike, to: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_decimals() */
        public_get_decimals: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** burn_public(from: struct, amount: field, nonce: field) */
        burn_public: ((from: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** balance_of_public(owner: struct) */
        balance_of_public: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** shield(from: struct, amount: field, secret_hash: field, nonce: field) */
        shield: ((from: AztecAddressLike, amount: FieldLike, secret_hash: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_get_name() */
        public_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** set_minter(minter: struct, approve: boolean) */
        set_minter: ((minter: AztecAddressLike, approve: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** balance_of_private(owner: struct) */
        balance_of_private: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** unshield(from: struct, to: struct, amount: field, nonce: field) */
        unshield: ((from: AztecAddressLike, to: AztecAddressLike, amount: FieldLike, nonce: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_get_name() */
        private_get_name: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** admin() */
        admin: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Token.d.ts.map