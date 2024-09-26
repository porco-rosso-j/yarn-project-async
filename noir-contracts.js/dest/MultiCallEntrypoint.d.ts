import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, Fr, FunctionSelectorLike, Wallet } from '@aztec/aztec.js';
export declare const MultiCallEntrypointContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract MultiCallEntrypoint;
 */
export declare class MultiCallEntrypointContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<MultiCallEntrypointContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<MultiCallEntrypointContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<MultiCallEntrypointContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof MultiCallEntrypointContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<MultiCallEntrypointContract['methods'][M]>): DeployMethod<MultiCallEntrypointContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** entrypoint(app_payload: struct) */
        entrypoint: ((app_payload: {
            function_calls: {
                args_hash: FieldLike;
                function_selector: FunctionSelectorLike;
                target_address: AztecAddressLike;
                is_public: boolean;
                is_static: boolean;
            }[];
            nonce: FieldLike;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=MultiCallEntrypoint.d.ts.map