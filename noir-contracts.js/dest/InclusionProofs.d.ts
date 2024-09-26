import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const InclusionProofsContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract InclusionProofs;
 */
export declare class InclusionProofsContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<InclusionProofsContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, public_value: FieldLike): DeployMethod<InclusionProofsContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, public_value: FieldLike): DeployMethod<InclusionProofsContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof InclusionProofsContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<InclusionProofsContract['methods'][M]>): DeployMethod<InclusionProofsContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'private_values' | 'public_value' | 'public_unused_value'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** test_note_validity(owner: struct, use_block_number: boolean, block_number: integer, nullified: boolean) */
        test_note_validity: ((owner: AztecAddressLike, use_block_number: boolean, block_number: bigint | number, nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(public_value: field) */
        constructor: ((public_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** nullify_note(owner: struct) */
        nullify_note: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** push_nullifier_public(nullifier: field) */
        push_nullifier_public: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_nullifier_inclusion_from_public(nullifier: field) */
        test_nullifier_inclusion_from_public: ((nullifier: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_storage_historical_read(expected: field, use_block_number: boolean, block_number: integer) */
        test_storage_historical_read: ((expected: FieldLike, use_block_number: boolean, block_number: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_contract_inclusion(contract_address: struct, block_number: integer, test_deployment: boolean, test_initialization: boolean) */
        test_contract_inclusion: ((contract_address: AztecAddressLike, block_number: bigint | number, test_deployment: boolean, test_initialization: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_nullifier_inclusion(nullifier: field, use_block_number: boolean, block_number: integer) */
        test_nullifier_inclusion: ((nullifier: FieldLike, use_block_number: boolean, block_number: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_storage_historical_read_unset_slot(block_number: integer) */
        test_storage_historical_read_unset_slot: ((block_number: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_note_inclusion_fail_case(owner: struct, use_block_number: boolean, block_number: integer) */
        test_note_inclusion_fail_case: ((owner: AztecAddressLike, use_block_number: boolean, block_number: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_note(owner: struct, value: field) */
        create_note: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_note_not_nullified(owner: struct, use_block_number: boolean, block_number: integer, fail_case: boolean) */
        test_note_not_nullified: ((owner: AztecAddressLike, use_block_number: boolean, block_number: bigint | number, fail_case: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_note_inclusion(owner: struct, use_block_number: boolean, block_number: integer, nullified: boolean) */
        test_note_inclusion: ((owner: AztecAddressLike, use_block_number: boolean, block_number: bigint | number, nullified: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** test_contract_non_inclusion(contract_address: struct, block_number: integer, test_deployment: boolean, test_initialization: boolean) */
        test_contract_non_inclusion: ((contract_address: AztecAddressLike, block_number: bigint | number, test_deployment: boolean, test_initialization: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=InclusionProofs.d.ts.map