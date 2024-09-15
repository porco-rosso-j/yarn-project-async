import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, FunctionSelectorLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const DelegatorContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Delegator;
 */
export declare class DelegatorContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<DelegatorContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<DelegatorContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<DelegatorContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** view_private_value(amount: field, owner: struct) */
        view_private_value: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** public_delegate_set_value(targetContract: struct, targetSelector: struct, args: array) */
        public_delegate_set_value: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** view_public_value() */
        view_public_value: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** private_delegate_set_value(targetContract: struct, targetSelector: struct, args: array) */
        private_delegate_set_value: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueued_delegate_set_value(targetContract: struct, targetSelector: struct, args: array) */
        enqueued_delegate_set_value: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Delegator.d.ts.map