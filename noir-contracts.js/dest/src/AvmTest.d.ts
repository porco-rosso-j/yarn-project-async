import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const AvmTestContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract AvmTest;
 */
export declare class AvmTestContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<AvmTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<AvmTestContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<AvmTestContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** avm_getFeePerL2Gas() */
        avm_getFeePerL2Gas: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_pedersen_hash(data: array) */
        avm_pedersen_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getSender() */
        avm_getSender: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_setOpcodeUint8() */
        avm_setOpcodeUint8: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_keccak_hash(data: array) */
        avm_keccak_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_sha256_hash(data: array) */
        avm_sha256_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getStorageAddress() */
        avm_getStorageAddress: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getPortal() */
        avm_getPortal: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getChainId() */
        avm_getChainId: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getVersion() */
        avm_getVersion: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_addArgsReturn(argA: field, argB: field) */
        avm_addArgsReturn: ((argA: FieldLike, argB: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getFeePerDaGas() */
        avm_getFeePerDaGas: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getOrigin() */
        avm_getOrigin: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getTimestamp() */
        avm_getTimestamp: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getFeePerL1Gas() */
        avm_getFeePerL1Gas: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getBlockNumber() */
        avm_getBlockNumber: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_poseidon_hash(data: array) */
        avm_poseidon_hash: ((data: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_getAddress() */
        avm_getAddress: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_setOpcodeUint64() */
        avm_setOpcodeUint64: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_setOpcodeUint32() */
        avm_setOpcodeUint32: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** avm_setOpcodeSmallField() */
        avm_setOpcodeSmallField: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=AvmTest.d.ts.map