import { type FieldsOf } from '@aztec/foundation/array';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { type Bufferable } from '@aztec/foundation/serialize';
import { type ContractClassPublic, type ExecutablePrivateFunctionWithMembershipProof, type UnconstrainedFunctionWithMembershipProof } from '@aztec/types/contracts';
import { SchnorrSignature } from '../barretenberg/index.js';
import { AppendOnlyTreeSnapshot, AvmCircuitInputs, AvmContractInstanceHint, AvmExecutionHints, AvmExternalCallHint, AvmKeyValueHint, BaseOrMergeRollupPublicInputs, BaseParityInputs, BaseRollupInputs, CallContext, CallRequest, CallerContext, CombineHints, CombinedAccumulatedData, CombinedConstantData, ConstantRollupData, ContractStorageRead, ContractStorageUpdateRequest, Fr, FunctionSelector, GrumpkinScalar, L2ToL1Message, MembershipWitness, MergeRollupInputs, ParityPublicInputs, PartialStateReference, Point, PreviousRollupData, PrivateCallStackItem, PrivateCircuitPublicInputs, PrivateKernelTailCircuitPublicInputs, Proof, PublicAccumulatedData, PublicCallData, PublicCallRequest, PublicCallStackItem, PublicCircuitPublicInputs, PublicDataRead, PublicDataTreeLeaf, PublicDataTreeLeafPreimage, PublicDataUpdateRequest, PublicKernelCircuitPrivateInputs, PublicKernelCircuitPublicInputs, PublicKernelData, PublicKernelTailCircuitPrivateInputs, RootParityInput, RootParityInputs, RootRollupInputs, RootRollupPublicInputs, StateDiffHints, StateReference, TxContext, TxRequest, Vector, VerificationKey, VerificationKeyAsFields } from '../index.js';
import { ContentCommitment } from '../structs/content_commitment.js';
import { Gas } from '../structs/gas.js';
import { GasFees } from '../structs/gas_fees.js';
import { GasSettings } from '../structs/gas_settings.js';
import { GlobalVariables } from '../structs/global_variables.js';
import { Header } from '../structs/header.js';
import { KernelCircuitPublicInputs } from '../structs/kernel/kernel_circuit_public_inputs.js';
import { KernelData } from '../structs/kernel/kernel_data.js';
import { RollupValidationRequests } from '../structs/rollup_validation_requests.js';
import { ValidationRequests } from '../structs/validation_requests.js';
/**
 * Creates an arbitrary tx context with the given seed.
 * @param seed - The seed to use for generating the tx context.
 * @returns A tx context.
 */
export declare function makeTxContext(seed?: number): TxContext;
/**
 * Creates arbitrary constant data with the given seed.
 * @param seed - The seed to use for generating the constant data.
 * @returns A constant data object.
 */
export declare function makeConstantData(seed?: number): CombinedConstantData;
/**
 * Creates a default instance of gas settings. No seed value is used to ensure we allocate a sensible amount of gas for testing.
 */
export declare function makeGasSettings(): GasSettings;
/**
 * Creates arbitrary selector from the given seed.
 * @param seed - The seed to use for generating the selector.
 * @returns A selector.
 */
export declare function makeSelector(seed: number): FunctionSelector;
/**
 * Creates arbitrary public data update request.
 * @param seed - The seed to use for generating the public data update request.
 * @returns A public data update request.
 */
export declare function makePublicDataUpdateRequest(seed?: number): PublicDataUpdateRequest;
/**
 * Creates empty public data update request.
 * @returns An empty public data update request.
 */
export declare function makeEmptyPublicDataUpdateRequest(): PublicDataUpdateRequest;
/**
 * Creates arbitrary public data read.
 * @param seed - The seed to use for generating the public data read.
 * @returns A public data read.
 */
export declare function makePublicDataRead(seed?: number): PublicDataRead;
/**
 * Creates empty public data read.
 * @returns An empty public data read.
 */
export declare function makeEmptyPublicDataRead(): PublicDataRead;
/**
 * Creates arbitrary contract storage update request.
 * @param seed - The seed to use for generating the contract storage update request.
 * @returns A contract storage update request.
 */
export declare function makeContractStorageUpdateRequest(seed?: number): ContractStorageUpdateRequest;
/**
 * Creates arbitrary contract storage read.
 * @param seed - The seed to use for generating the contract storage read.
 * @returns A contract storage read.
 */
export declare function makeContractStorageRead(seed?: number): ContractStorageRead;
export declare function makeValidationRequests(seed?: number): ValidationRequests;
export declare function makeRollupValidationRequests(seed?: number): RollupValidationRequests;
export declare function makeCombinedConstantData(seed?: number): CombinedConstantData;
/**
 * Creates arbitrary accumulated data.
 * @param seed - The seed to use for generating the accumulated data.
 * @returns An accumulated data.
 */
export declare function makeCombinedAccumulatedData(seed?: number, full?: boolean): CombinedAccumulatedData;
export declare function makeGas(seed?: number): Gas;
/**
 * Creates arbitrary accumulated data.
 * @param seed - The seed to use for generating the accumulated data.
 * @returns An accumulated data.
 */
export declare function makePublicAccumulatedData(seed?: number, full?: boolean): PublicAccumulatedData;
/**
 * Creates arbitrary call context.
 * @param seed - The seed to use for generating the call context.
 * @param storageContractAddress - The storage contract address set on the call context.
 * @returns A call context.
 */
export declare function makeCallContext(seed?: number, overrides?: Partial<FieldsOf<CallContext>>): CallContext;
/**
 * Creates arbitrary public circuit public inputs.
 * @param seed - The seed to use for generating the public circuit public inputs.
 * @param storageContractAddress - The storage contract address set on the call context.
 * @returns Public circuit public inputs.
 */
export declare function makePublicCircuitPublicInputs(seed?: number, storageContractAddress?: AztecAddress, full?: boolean): PublicCircuitPublicInputs;
/**
 * Creates arbitrary public kernel circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Public kernel circuit public inputs.
 */
export declare function makePublicKernelCircuitPublicInputs(seed?: number, fullAccumulatedData?: boolean): PublicKernelCircuitPublicInputs;
/**
 * Creates arbitrary private kernel tail circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Private kernel tail circuit public inputs.
 */
export declare function makePrivateKernelTailCircuitPublicInputs(seed?: number, isForPublic?: boolean): PrivateKernelTailCircuitPublicInputs;
/**
 * Creates arbitrary public kernel circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Public kernel circuit public inputs.
 */
export declare function makeKernelCircuitPublicInputs(seed?: number, fullAccumulatedData?: boolean): KernelCircuitPublicInputs;
/**
 * Creates a public call request for testing.
 * @param seed - The seed.
 * @returns Public call request.
 */
export declare function makePublicCallRequest(seed?: number): PublicCallRequest;
/**
 * Creates arbitrary/mocked membership witness where the sibling paths is an array of fields in an ascending order starting from `start`.
 * @param size - The size of the membership witness.
 * @param start - The start of the membership witness.
 * @returns A membership witness.
 */
export declare function makeMembershipWitness<N extends number>(size: N, start: number): MembershipWitness<N>;
/**
 * Creates arbitrary/mocked verification key in fields format.
 * @returns A verification key as fields object
 */
export declare function makeVerificationKeyAsFields(): VerificationKeyAsFields;
/**
 * Creates arbitrary/mocked verification key.
 * @returns A verification key object
 */
export declare function makeVerificationKey(): VerificationKey;
/**
 * Creates an arbitrary point in a curve.
 * @param seed - Seed to generate the point values.
 * @returns A point.
 */
export declare function makePoint(seed?: number): Point;
/**
 * Creates an arbitrary grumpkin scalar.
 * @param seed - Seed to generate the values.
 * @returns A GrumpkinScalar.
 */
export declare function makeGrumpkinScalar(seed?: number): GrumpkinScalar;
/**
 * Makes arbitrary public kernel data.
 * @param seed - The seed to use for generating the previous kernel data.
 * @param kernelPublicInputs - The public kernel public inputs to use for generating the public kernel data.
 * @returns A previous kernel data.
 */
export declare function makePublicKernelData(seed?: number, kernelPublicInputs?: PublicKernelCircuitPublicInputs): PublicKernelData;
/**
 * Makes arbitrary public kernel data.
 * @param seed - The seed to use for generating the previous kernel data.
 * @param kernelPublicInputs - The public kernel public inputs to use for generating the public kernel data.
 * @returns A previous kernel data.
 */
export declare function makeRollupKernelData(seed?: number, kernelPublicInputs?: KernelCircuitPublicInputs): KernelData;
/**
 * Makes arbitrary proof.
 * @param seed - The seed to use for generating/mocking the proof.
 * @returns A proof.
 */
export declare function makeProof(seed?: number): Proof;
/**
 * Makes arbitrary call stack item.
 * @param seed - The seed to use for generating the call stack item.
 * @returns A call stack item.
 */
export declare function makeCallerContext(seed?: number): CallerContext;
/**
 * Makes arbitrary call stack item.
 * @param seed - The seed to use for generating the call stack item.
 * @returns A call stack item.
 */
export declare function makeCallRequest(seed?: number): CallRequest;
/**
 * Makes arbitrary public call stack item.
 * @param seed - The seed to use for generating the public call stack item.
 * @returns A public call stack item.
 */
export declare function makePublicCallStackItem(seed?: number, full?: boolean): PublicCallStackItem;
/**
 * Makes arbitrary public call data.
 * @param seed - The seed to use for generating the public call data.
 * @returns A public call data.
 */
export declare function makePublicCallData(seed?: number, full?: boolean): PublicCallData;
/**
 * Makes arbitrary public kernel inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @returns Public kernel inputs.
 */
export declare function makePublicKernelCircuitPrivateInputs(seed?: number): PublicKernelCircuitPrivateInputs;
export declare function makeCombineHints(seed?: number): CombineHints;
/**
 * Makes arbitrary public kernel tail inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @returns Public kernel inputs.
 */
export declare function makePublicKernelTailCircuitPrivateInputs(seed?: number): PublicKernelTailCircuitPrivateInputs;
/**
 * Makes arbitrary public kernel private inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @param tweak - An optional function to tweak the output before computing hashes.
 * @returns Public kernel inputs.
 */
export declare function makePublicKernelInputsWithTweak(seed?: number, tweak?: (publicKernelInputs: PublicKernelCircuitPrivateInputs) => void): Promise<PublicKernelCircuitPrivateInputs>;
/**
 * Makes arbitrary tx request.
 * @param seed - The seed to use for generating the tx request.
 * @returns A tx request.
 */
export declare function makeTxRequest(seed?: number): TxRequest;
/**
 * Makes arbitrary private call stack item.
 * @param seed - The seed to use for generating the private call stack item.
 * @returns A private call stack item.
 */
export declare function makePrivateCallStackItem(seed?: number): PrivateCallStackItem;
/**
 * Makes arbitrary private circuit public inputs.
 * @param seed - The seed to use for generating the private circuit public inputs.
 * @returns A private circuit public inputs.
 */
export declare function makePrivateCircuitPublicInputs(seed?: number): PrivateCircuitPublicInputs;
/**
 * Makes global variables.
 * @param seed - The seed to use for generating the global variables.
 * @param blockNumber - The block number to use for generating the global variables.
 * If blockNumber is undefined, it will be set to seed + 2.
 * @returns Global variables.
 */
export declare function makeGlobalVariables(seed?: number, blockNumber?: number | undefined): GlobalVariables;
export declare function makeGasFees(seed?: number): GasFees;
/**
 * Makes constant base rollup data.
 * @param seed - The seed to use for generating the constant base rollup data.
 * @param blockNumber - The block number to use for generating the global variables.
 * @returns A constant base rollup data.
 */
export declare function makeConstantBaseRollupData(seed?: number, globalVariables?: GlobalVariables | undefined): ConstantRollupData;
/**
 * Makes arbitrary append only tree snapshot.
 * @param seed - The seed to use for generating the append only tree snapshot.
 * @returns An append only tree snapshot.
 */
export declare function makeAppendOnlyTreeSnapshot(seed?: number): AppendOnlyTreeSnapshot;
/**
 * Makes arbitrary eth address.
 * @param seed - The seed to use for generating the eth address.
 * @returns An eth address.
 */
export declare function makeEthAddress(seed?: number): EthAddress;
/**
 * Creates a buffer of a given size filled with a given value.
 * @param size - The size of the buffer to create.
 * @param fill - The value to fill the buffer with.
 * @returns A buffer of a given size filled with a given value.
 */
export declare function makeBytes(size?: number, fill?: number): Buffer;
/**
 * Makes arbitrary aztec address.
 * @param seed - The seed to use for generating the aztec address.
 * @returns An aztec address.
 */
export declare function makeAztecAddress(seed?: number): AztecAddress;
/**
 * Makes arbitrary Schnorr signature.
 * @param seed - The seed to use for generating the Schnorr signature.
 * @returns A Schnorr signature.
 */
export declare function makeSchnorrSignature(seed?: number): SchnorrSignature;
/**
 * Makes arbitrary base or merge rollup circuit public inputs.
 * @param seed - The seed to use for generating the base rollup circuit public inputs.
 * @param blockNumber - The block number to use for generating the base rollup circuit public inputs.
 * @returns A base or merge rollup circuit public inputs.
 */
export declare function makeBaseOrMergeRollupPublicInputs(seed?: number, globalVariables?: GlobalVariables | undefined): BaseOrMergeRollupPublicInputs;
/**
 * Makes arbitrary previous rollup data.
 * @param seed - The seed to use for generating the previous rollup data.
 * @param globalVariables - The global variables to use when generating the previous rollup data.
 * @returns A previous rollup data.
 */
export declare function makePreviousRollupData(seed?: number, globalVariables?: GlobalVariables | undefined): PreviousRollupData;
/**
 * Makes root rollup inputs.
 * @param seed - The seed to use for generating the root rollup inputs.
 * @param blockNumber - The block number to use for generating the root rollup inputs.
 * @returns A root rollup inputs.
 */
export declare function makeRootRollupInputs(seed?: number, globalVariables?: GlobalVariables): RootRollupInputs;
export declare function makeRootParityInput<PROOF_LENGTH extends number>(proofSize: PROOF_LENGTH, seed?: number): RootParityInput<PROOF_LENGTH>;
export declare function makeParityPublicInputs(seed?: number): ParityPublicInputs;
export declare function makeBaseParityInputs(seed?: number): BaseParityInputs;
export declare function makeRootParityInputs(seed?: number): RootParityInputs;
/**
 * Makes root rollup public inputs.
 * @param seed - The seed to use for generating the root rollup public inputs.
 * @param blockNumber - The block number to use in the global variables of a header.
 * @returns A root rollup public inputs.
 */
export declare function makeRootRollupPublicInputs(seed?: number, blockNumber?: number | undefined): RootRollupPublicInputs;
/**
 * Makes content commitment
 */
export declare function makeContentCommitment(seed?: number, txsEffectsHash?: Buffer | undefined): ContentCommitment;
/**
 * Makes header.
 */
export declare function makeHeader(seed?: number, blockNumber?: number | undefined, txsEffectsHash?: Buffer | undefined): Header;
/**
 * Makes arbitrary state reference.
 * @param seed - The seed to use for generating the state reference.
 * @returns A state reference.
 */
export declare function makeStateReference(seed?: number): StateReference;
/**
 * Makes arbitrary L2 to L1 message.
 * @param seed - The seed to use for generating the state reference.
 * @returns L2 to L1 message.
 */
export declare function makeL2ToL1Message(seed?: number): L2ToL1Message;
/**
 * Makes arbitrary partial state reference.
 * @param seed - The seed to use for generating the partial state reference.
 * @returns A partial state reference.
 */
export declare function makePartialStateReference(seed?: number): PartialStateReference;
/**
 * Makes arbitrary merge rollup inputs.
 * @param seed - The seed to use for generating the merge rollup inputs.
 * @returns A merge rollup inputs.
 */
export declare function makeMergeRollupInputs(seed?: number): MergeRollupInputs;
/**
 * Makes arbitrary public data tree leaves.
 * @param seed - The seed to use for generating the public data tree leaf.
 * @returns A public data tree leaf.
 */
export declare function makePublicDataTreeLeaf(seed?: number): PublicDataTreeLeaf;
/**
 * Makes arbitrary public data tree leaf preimages.
 * @param seed - The seed to use for generating the public data tree leaf preimage.
 * @returns A public data tree leaf preimage.
 */
export declare function makePublicDataTreeLeafPreimage(seed?: number): PublicDataTreeLeafPreimage;
/**
 * Creates an instance of StateDiffHints with arbitrary values based on the provided seed.
 * @param seed - The seed to use for generating the hints.
 * @returns A StateDiffHints object.
 */
export declare function makeStateDiffHints(seed?: number): StateDiffHints;
/**
 * Makes arbitrary base rollup inputs.
 * @param seed - The seed to use for generating the base rollup inputs.
 * @returns A base rollup inputs.
 */
export declare function makeBaseRollupInputs(seed?: number): BaseRollupInputs;
export declare function makeExecutablePrivateFunctionWithMembershipProof(seed?: number): ExecutablePrivateFunctionWithMembershipProof;
export declare function makeUnconstrainedFunctionWithMembershipProof(seed?: number): UnconstrainedFunctionWithMembershipProof;
export declare function makeContractClassPublic(seed?: number): Promise<ContractClassPublic>;
export declare function makeArray<T extends Bufferable>(length: number, fn: (i: number) => T, offset?: number): T[];
export declare function makeVector<T extends Bufferable>(length: number, fn: (i: number) => T, offset?: number): Vector<T>;
/**
 * Makes arbitrary AvmKeyValueHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmKeyValueHint.
 */
export declare function makeAvmKeyValueHint(seed?: number): AvmKeyValueHint;
/**
 * Makes arbitrary AvmExternalCallHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmExternalCallHint.
 */
export declare function makeAvmExternalCallHint(seed?: number): AvmExternalCallHint;
/**
 * Makes arbitrary AvmContractInstanceHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmContractInstanceHint.
 */
export declare function makeAvmContractInstanceHint(seed?: number): AvmContractInstanceHint;
/**
 * Creates arbitrary AvmExecutionHints.
 * @param seed - The seed to use for generating the hints.
 * @returns the execution hints.
 */
export declare function makeAvmExecutionHints(seed?: number, overrides?: Partial<FieldsOf<AvmExecutionHints>>): AvmExecutionHints;
/**
 * Creates arbitrary AvmCircuitInputs.
 * @param seed - The seed to use for generating the hints.
 * @returns the execution hints.
 */
export declare function makeAvmCircuitInputs(seed?: number, overrides?: Partial<FieldsOf<AvmCircuitInputs>>): AvmCircuitInputs;
/**
 * TODO: Since the max value check is currently disabled this function is pointless. Should it be removed?
 * Test only. Easy to identify big endian field serialize.
 * @param n - The number.
 * @returns The field.
 */
export declare function fr(n: number): Fr;
//# sourceMappingURL=factories.d.ts.map