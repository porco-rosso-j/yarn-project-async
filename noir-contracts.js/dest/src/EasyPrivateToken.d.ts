import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
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
    static deploy(wallet: Wallet, initial_supply: bigint | number, owner: AztecAddressLike): DeployMethod<EasyPrivateTokenContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, initial_supply: bigint | number, owner: AztecAddressLike): DeployMethod<EasyPrivateTokenContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** getBalance(owner: struct) */
        getBalance: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(initial_supply: integer, owner: struct) */
        constructor: ((initial_supply: bigint | number, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** mint(amount: integer, owner: struct) */
        mint: ((amount: bigint | number, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** transfer(amount: integer, sender: struct, recipient: struct) */
        transfer: ((amount: bigint | number, sender: AztecAddressLike, recipient: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=EasyPrivateToken.d.ts.map