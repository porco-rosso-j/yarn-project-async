import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const ReaderContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Reader;
 */
export declare class ReaderContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ReaderContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ReaderContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<ReaderContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** check_name_private(who: struct, what: string) */
        check_name_private: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_name(who: struct) */
        get_name: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_name_public(who: struct, what: string) */
        check_name_public: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_symbol_private(who: struct, what: string) */
        check_symbol_private: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_decimals_private(who: struct, what: integer) */
        check_decimals_private: ((who: AztecAddressLike, what: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_decimals_public(who: struct, what: integer) */
        check_decimals_public: ((who: AztecAddressLike, what: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_decimals(who: struct) */
        get_decimals: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_symbol(who: struct) */
        get_symbol: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_symbol_public(who: struct, what: string) */
        check_symbol_public: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Reader.d.ts.map