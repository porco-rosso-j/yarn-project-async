import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, EventSelector, FieldLike, Fr, L1EventPayload, Wallet } from '@aztec/aztec.js';
export declare const TestLogContractArtifact: ContractArtifact;
export type ExampleEvent1 = {
    value2: Fr;
    value3: Fr;
};
export type ExampleEvent0 = {
    value0: Fr;
    value1: Fr;
};
/**
 * Type-safe interface for contract TestLog;
 */
export declare class TestLogContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<TestLogContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<TestLogContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<TestLogContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof TestLogContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<TestLogContract['methods'][M]>): DeployMethod<TestLogContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'example_set'>;
    static get notes(): ContractNotes<'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** emit_unencrypted_events(preimages: array) */
        emit_unencrypted_events: ((preimages: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** emit_encrypted_events(other: struct, randomness: array, preimages: array) */
        emit_encrypted_events: ((other: AztecAddressLike, randomness: FieldLike[], preimages: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_incoming_log_body_ciphertext(secret: struct, point: struct, randomness: field, event_type_id: field, preimage: array) */
        compute_incoming_log_body_ciphertext: ((secret: {
            lo: FieldLike;
            hi: FieldLike;
        }, point: {
            x: FieldLike;
            y: FieldLike;
            is_infinite: boolean;
        }, randomness: FieldLike, event_type_id: FieldLike, preimage: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
    private static decodeEvent;
    static get events(): {
        ExampleEvent1: {
            decode: (payload: L1EventPayload | undefined) => ExampleEvent1 | undefined;
            eventSelector: EventSelector;
            fieldNames: string[];
        };
        ExampleEvent0: {
            decode: (payload: L1EventPayload | undefined) => ExampleEvent0 | undefined;
            eventSelector: EventSelector;
            fieldNames: string[];
        };
    };
}
//# sourceMappingURL=TestLog.d.ts.map