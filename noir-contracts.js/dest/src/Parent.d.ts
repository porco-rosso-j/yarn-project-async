import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, FunctionSelectorLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const ParentContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Parent;
 */
export declare class ParentContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ParentContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<ParentContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** enqueueStaticCallToPubFunction(targetContract: struct, targetSelector: struct, args: array) */
        enqueueStaticCallToPubFunction: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** privateStaticCall(targetContract: struct, targetSelector: struct, args: array) */
        privateStaticCall: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pubEntryPoint(targetContract: struct, targetSelector: struct, initValue: field) */
        pubEntryPoint: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, initValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallToChild(targetContract: struct, targetSelector: struct, targetValue: field) */
        enqueueCallToChild: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, targetValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pubEntryPointTwice(targetContract: struct, targetSelector: struct, initValue: field) */
        pubEntryPointTwice: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, initValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallsToChildWithNestedLast(targetContract: struct, targetSelector: struct) */
        enqueueCallsToChildWithNestedLast: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallToPubEntryPoint(targetContract: struct, targetSelector: struct, targetValue: field) */
        enqueueCallToPubEntryPoint: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, targetValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallsToPubEntryPoint(targetContract: struct, targetSelector: struct, targetValue: field) */
        enqueueCallsToPubEntryPoint: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, targetValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallsToChildWithNestedFirst(targetContract: struct, targetSelector: struct) */
        enqueueCallsToChildWithNestedFirst: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** enqueueCallToChildTwice(targetContract: struct, targetSelector: struct, targetValue: field) */
        enqueueCallToChildTwice: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, targetValue: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** publicStaticCall(targetContract: struct, targetSelector: struct, args: array) */
        publicStaticCall: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike, args: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** entryPoint(targetContract: struct, targetSelector: struct) */
        entryPoint: ((targetContract: AztecAddressLike, targetSelector: FunctionSelectorLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Parent.d.ts.map