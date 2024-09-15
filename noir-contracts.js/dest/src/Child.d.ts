import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, EthAddressLike, FieldLike, FunctionSelectorLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const ChildContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract Child;
 */
export declare class ChildContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<ChildContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<ChildContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<ChildContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** pubGetValue(base_value: field) */
        pubGetValue: ((base_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pubSetValue(new_value: field) */
        pubSetValue: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** valueInternal(input: field) */
        valueInternal: ((input: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** setValueTwiceWithNestedFirst() */
        setValueTwiceWithNestedFirst: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pubIncValueInternal(new_value: field) */
        pubIncValueInternal: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** setValueTwiceWithNestedLast() */
        setValueTwiceWithNestedLast: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** privateGetValue(amount: field, owner: struct) */
        privateGetValue: ((amount: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** check_sender(call_context: struct) */
        check_sender: ((call_context: {
            msg_sender: AztecAddressLike;
            storage_contract_address: AztecAddressLike;
            portal_contract_address: EthAddressLike;
            function_selector: FunctionSelectorLike;
            is_delegate_call: boolean;
            is_static_call: boolean;
            is_contract_deployment: boolean;
            start_side_effect_counter: bigint | number;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** value(input: field) */
        value: ((input: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** pubIncValue(new_value: field) */
        pubIncValue: ((new_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** privateSetValue(new_value: field, owner: struct) */
        privateSetValue: ((new_value: FieldLike, owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=Child.d.ts.map