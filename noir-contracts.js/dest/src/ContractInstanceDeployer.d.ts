import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EthAddressLike, FieldLike, PublicKey, Wallet, WrappedFieldLike } from '@aztec/aztec.js';
export declare const ContractInstanceDeployerContractArtifact: ContractArtifact;
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
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<ContractInstanceDeployerContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** deploy(salt: field, contract_class_id: struct, initialization_hash: field, portal_contract_address: struct, public_keys_hash: struct, universal_deploy: boolean) */
        deploy: ((salt: FieldLike, contract_class_id: WrappedFieldLike, initialization_hash: FieldLike, portal_contract_address: EthAddressLike, public_keys_hash: WrappedFieldLike, universal_deploy: boolean) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=ContractInstanceDeployer.d.ts.map