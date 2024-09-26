import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const EasyPrivateTokenContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract EasyPrivateToken;
 */
export declare class EasyPrivateTokenContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<EasyPrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, initial_supply: bigint | number, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike): DeployMethod<EasyPrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, initial_supply: bigint | number, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike): DeployMethod<EasyPrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof EasyPrivateTokenContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<EasyPrivateTokenContract['methods'][M]>): DeployMethod<EasyPrivateTokenContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'balances'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** constructor(initial_supply: integer, owner: struct, outgoing_viewer: struct) */
        constructor: ((initial_supply: bigint | number, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer(amount: integer, sender: struct, recipient: struct, outgoing_viewer: struct) */
        transfer: ((amount: bigint | number, sender: AztecAddressLike, recipient: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** mint(amount: integer, owner: struct, outgoing_viewer: struct) */
        mint: ((amount: bigint | number, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_balance(owner: struct) */
        get_balance: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=EasyPrivateToken.d.ts.map