import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EventSelector, FieldLike, Fr, L1EventPayload, Wallet, WrappedFieldLike } from '@aztec/aztec.js';
export declare const ContractInstanceDeployerContractArtifact: ContractArtifact;
export type ContractInstanceDeployed = {
    DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE: Fr;
    address: Fr;
    version: Fr;
    salt: Fr;
    contract_class_id: Fr;
    initialization_hash: Fr;
    public_keys_hash: Fr;
    deployer: Fr;
};
/**
 * Type-safe interface for contract ContractInstanceDeployer;
 */
export declare class ContractInstanceDeployerContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ContractInstanceDeployerContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ContractInstanceDeployerContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet): DeployMethod<ContractInstanceDeployerContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof ContractInstanceDeployerContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<ContractInstanceDeployerContract['methods'][M]>): DeployMethod<ContractInstanceDeployerContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** deploy(salt: field, contract_class_id: struct, initialization_hash: field, public_keys_hash: struct, universal_deploy: boolean) */
        deploy: ((salt: FieldLike, contract_class_id: WrappedFieldLike, initialization_hash: FieldLike, public_keys_hash: WrappedFieldLike, universal_deploy: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
    private static decodeEvent;
    static get events(): {
        ContractInstanceDeployed: {
            decode: (payload: L1EventPayload | undefined) => ContractInstanceDeployed | undefined;
            eventSelector: EventSelector;
            fieldNames: string[];
        };
    };
}
//# sourceMappingURL=ContractInstanceDeployer.d.ts.map