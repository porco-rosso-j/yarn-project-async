import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, FieldLike, Fr, Wallet } from '@aztec/aztec.js';
export declare const StatefulTestContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract StatefulTest;
 */
export declare class StatefulTestContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<StatefulTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike): DeployMethod<StatefulTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike): DeployMethod<StatefulTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof StatefulTestContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<StatefulTestContract['methods'][M]>): DeployMethod<StatefulTestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'notes' | 'public_values'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** create_note(owner: struct, outgoing_viewer: struct, value: field) */
        create_note: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** increment_public_value(owner: struct, value: field) */
        increment_public_value: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** destroy_and_create(recipient: struct, amount: field) */
        destroy_and_create: ((recipient: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(owner: struct, outgoing_viewer: struct, value: field) */
        constructor: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** destroy_and_create_no_init_check(recipient: struct, amount: field) */
        destroy_and_create_no_init_check: ((recipient: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** wrong_constructor() */
        wrong_constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_public_value(owner: struct) */
        get_public_value: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_constructor(owner: struct, _ignored_arg: struct, value: field) */
        public_constructor: ((owner: AztecAddressLike, _ignored_arg: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** increment_public_value_no_init_check(owner: struct, value: field) */
        increment_public_value_no_init_check: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** summed_values(owner: struct) */
        summed_values: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** create_note_no_init_check(owner: struct, outgoing_viewer: struct, value: field) */
        create_note_no_init_check: ((owner: AztecAddressLike, outgoing_viewer: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=StatefulTest.d.ts.map