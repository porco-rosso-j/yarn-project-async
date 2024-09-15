import { makeHalfFullTuple, makeTuple } from '@aztec/foundation/array';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { toBufferBE } from '@aztec/foundation/bigint-buffer';
import { EthAddress } from '@aztec/foundation/eth-address';
import { SchnorrSignature } from '../barretenberg/index.js';
import { ARCHIVE_HEIGHT, ARGS_LENGTH, AppendOnlyTreeSnapshot, AvmCircuitInputs, AvmContractInstanceHint, AvmExecutionHints, AvmExternalCallHint, AvmKeyValueHint, BaseOrMergeRollupPublicInputs, BaseParityInputs, BaseRollupInputs, CallContext, CallRequest, CallerContext, CombineHints, CombinedAccumulatedData, CombinedConstantData, ConstantRollupData, ContractStorageRead, ContractStorageUpdateRequest, EncryptedLogHash, Fr, FunctionData, FunctionSelector, GrumpkinScalar, KeyValidationRequest, KeyValidationRequestAndGenerator, L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, L2ToL1Message, LogHash, MAX_ENCRYPTED_LOGS_PER_CALL, MAX_ENCRYPTED_LOGS_PER_TX, MAX_KEY_VALIDATION_REQUESTS_PER_CALL, MAX_KEY_VALIDATION_REQUESTS_PER_TX, MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_CALL, MAX_NOTE_HASHES_PER_TX, MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, MAX_NOTE_HASH_READ_REQUESTS_PER_TX, MAX_NULLIFIERS_PER_CALL, MAX_NULLIFIERS_PER_TX, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_CALL, MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_DATA_HINTS, MAX_PUBLIC_DATA_READS_PER_CALL, MAX_PUBLIC_DATA_READS_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_TX, MaxBlockNumber, MembershipWitness, MergeRollupInputs, NESTED_RECURSIVE_PROOF_LENGTH, NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_TREE_HEIGHT, NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP, NUM_BASE_PARITY_PER_ROOT_PARITY, NUM_MSGS_PER_BASE_PARITY, NoteHash, NoteLogHash, Nullifier, NullifierLeafPreimage, NullifierNonExistentReadRequestHintsBuilder, NullifierReadRequestHintsBuilder, PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH, PUBLIC_DATA_TREE_HEIGHT, ParityPublicInputs, PartialPrivateTailPublicInputsForPublic, PartialPrivateTailPublicInputsForRollup, PartialStateReference, Point, PreviousRollupData, PrivateCallRequest, PrivateCallStackItem, PrivateCircuitPublicInputs, PrivateKernelTailCircuitPublicInputs, Proof, PublicAccumulatedData, PublicCallData, PublicCallRequest, PublicCallStackItem, PublicCircuitPublicInputs, PublicDataHint, PublicDataRead, PublicDataReadRequestHintsBuilder, PublicDataTreeLeaf, PublicDataTreeLeafPreimage, PublicDataUpdateRequest, PublicKernelCircuitPrivateInputs, PublicKernelCircuitPublicInputs, PublicKernelData, PublicKernelTailCircuitPrivateInputs, RECURSIVE_PROOF_LENGTH, ReadRequest, RevertCode, RollupTypes, RootParityInput, RootParityInputs, RootRollupInputs, RootRollupPublicInputs, ScopedKeyValidationRequestAndGenerator, ScopedReadRequest, StateDiffHints, StateReference, TxContext, TxRequest, VK_TREE_HEIGHT, Vector, VerificationKey, VerificationKeyAsFields, VerificationKeyData, computeContractClassId, computePublicBytecodeCommitment, makeRecursiveProof, packBytecode, } from '../index.js';
import { ContentCommitment, NUM_BYTES_PER_SHA256 } from '../structs/content_commitment.js';
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
 * Creates an arbitrary side effect object with the given seed.
 * @param seed - The seed to use for generating the object.
 * @returns A side effect object.
 */
function makeLogHash(seed) {
    return new LogHash(fr(seed), seed + 1, fr(seed + 2));
}
function makeEncryptedLogHash(seed) {
    return new EncryptedLogHash(fr(seed), seed + 1, fr(seed + 2), fr(seed + 3));
}
function makeNoteLogHash(seed) {
    return new NoteLogHash(fr(seed + 3), seed + 1, fr(seed + 2), seed);
}
function makeNoteHash(seed) {
    return new NoteHash(fr(seed), seed + 1);
}
function makeNullifier(seed) {
    return new Nullifier(fr(seed), seed + 1, fr(seed + 2));
}
/**
 * Creates an arbitrary tx context with the given seed.
 * @param seed - The seed to use for generating the tx context.
 * @returns A tx context.
 */
export function makeTxContext(seed = 1) {
    // @todo @LHerskind should probably take value for chainId as it will be verified later.
    return new TxContext(new Fr(seed), Fr.ZERO, makeGasSettings());
}
/**
 * Creates arbitrary constant data with the given seed.
 * @param seed - The seed to use for generating the constant data.
 * @returns A constant data object.
 */
export function makeConstantData(seed = 1) {
    return new CombinedConstantData(makeHeader(seed, undefined), makeTxContext(seed + 4), new Fr(seed + 1), makeGlobalVariables(seed + 5));
}
/**
 * Creates a default instance of gas settings. No seed value is used to ensure we allocate a sensible amount of gas for testing.
 */
export function makeGasSettings() {
    return GasSettings.default();
}
/**
 * Creates arbitrary selector from the given seed.
 * @param seed - The seed to use for generating the selector.
 * @returns A selector.
 */
export function makeSelector(seed) {
    return new FunctionSelector(seed);
}
function makeReadRequest(n) {
    return new ReadRequest(new Fr(BigInt(n)), n + 1);
}
function makeScopedReadRequest(n) {
    return new ScopedReadRequest(makeReadRequest(n), AztecAddress.fromBigInt(BigInt(n + 2)));
}
/**
 * Creates arbitrary KeyValidationRequest from the given seed.
 * @param seed - The seed to use for generating the KeyValidationRequest.
 * @returns A KeyValidationRequest.
 */
function makeKeyValidationRequests(seed) {
    return new KeyValidationRequest(makePoint(seed), fr(seed + 2));
}
/**
 * Creates arbitrary KeyValidationRequestAndGenerator from the given seed.
 * @param seed - The seed to use for generating the KeyValidationRequestAndGenerator.
 * @returns A KeyValidationRequestAndGenerator.
 */
function makeKeyValidationRequestAndGenerators(seed) {
    return new KeyValidationRequestAndGenerator(makeKeyValidationRequests(seed), fr(seed + 4));
}
/**
 * Creates arbitrary scoped ScopedKeyValidationRequestAndGenerator from the given seed.
 * @param seed - The seed to use for generating the ScopedKeyValidationRequestAndGenerator.
 * @returns A ScopedKeyValidationRequestAndGenerator.
 */
function makeScopedKeyValidationRequestAndGenerators(seed) {
    return new ScopedKeyValidationRequestAndGenerator(makeKeyValidationRequestAndGenerators(seed), makeAztecAddress(seed + 4));
}
/**
 * Creates arbitrary public data update request.
 * @param seed - The seed to use for generating the public data update request.
 * @returns A public data update request.
 */
export function makePublicDataUpdateRequest(seed = 1) {
    return new PublicDataUpdateRequest(fr(seed), fr(seed + 1), seed + 2);
}
/**
 * Creates empty public data update request.
 * @returns An empty public data update request.
 */
export function makeEmptyPublicDataUpdateRequest() {
    return new PublicDataUpdateRequest(fr(0), fr(0), 0);
}
/**
 * Creates arbitrary public data read.
 * @param seed - The seed to use for generating the public data read.
 * @returns A public data read.
 */
export function makePublicDataRead(seed = 1) {
    return new PublicDataRead(fr(seed), fr(seed + 1));
}
/**
 * Creates empty public data read.
 * @returns An empty public data read.
 */
export function makeEmptyPublicDataRead() {
    return new PublicDataRead(fr(0), fr(0));
}
/**
 * Creates arbitrary contract storage update request.
 * @param seed - The seed to use for generating the contract storage update request.
 * @returns A contract storage update request.
 */
export function makeContractStorageUpdateRequest(seed = 1) {
    return new ContractStorageUpdateRequest(fr(seed), fr(seed + 1), seed + 2);
}
/**
 * Creates arbitrary contract storage read.
 * @param seed - The seed to use for generating the contract storage read.
 * @returns A contract storage read.
 */
export function makeContractStorageRead(seed = 1) {
    return new ContractStorageRead(fr(seed), fr(seed + 1), seed + 2);
}
export function makeValidationRequests(seed = 1) {
    return new ValidationRequests(makeRollupValidationRequests(seed), makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, makeScopedReadRequest, seed + 0x80), makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_TX, makeScopedReadRequest, seed + 0x90), makeTuple(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, makeScopedReadRequest, seed + 0x95), makeTuple(MAX_KEY_VALIDATION_REQUESTS_PER_TX, makeScopedKeyValidationRequestAndGenerators, seed + 0x100), makeTuple(MAX_PUBLIC_DATA_READS_PER_TX, makePublicDataRead, seed + 0xe00));
}
export function makeRollupValidationRequests(seed = 1) {
    return new RollupValidationRequests(new MaxBlockNumber(true, new Fr(seed + 0x31415)));
}
export function makeCombinedConstantData(seed = 1) {
    return new CombinedConstantData(makeHeader(seed), makeTxContext(seed + 0x100), new Fr(seed + 0x200), makeGlobalVariables(seed + 0x300));
}
/**
 * Creates arbitrary accumulated data.
 * @param seed - The seed to use for generating the accumulated data.
 * @returns An accumulated data.
 */
export function makeCombinedAccumulatedData(seed = 1, full = false) {
    const tupleGenerator = full ? makeTuple : makeHalfFullTuple;
    return new CombinedAccumulatedData(tupleGenerator(MAX_NOTE_HASHES_PER_TX, fr, seed + 0x120, Fr.zero), tupleGenerator(MAX_NULLIFIERS_PER_TX, fr, seed + 0x200, Fr.zero), tupleGenerator(MAX_L2_TO_L1_MSGS_PER_TX, fr, seed + 0x600, Fr.zero), fr(seed + 0x700), // note encrypted logs hash
    fr(seed + 0x800), // encrypted logs hash
    fr(seed + 0x900), // unencrypted logs hash
    fr(seed + 0xa00), // note_encrypted_log_preimages_length
    fr(seed + 0xb00), // encrypted_log_preimages_length
    fr(seed + 0xc00), // unencrypted_log_preimages_length
    tupleGenerator(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataUpdateRequest, seed + 0xd00, PublicDataUpdateRequest.empty), makeGas(seed + 0xe00));
}
export function makeGas(seed = 1) {
    return new Gas(seed, seed + 1);
}
/**
 * Creates arbitrary accumulated data.
 * @param seed - The seed to use for generating the accumulated data.
 * @returns An accumulated data.
 */
export function makePublicAccumulatedData(seed = 1, full = false) {
    const tupleGenerator = full ? makeTuple : makeHalfFullTuple;
    return new PublicAccumulatedData(tupleGenerator(MAX_NOTE_HASHES_PER_TX, makeNoteHash, seed + 0x120, NoteHash.empty), tupleGenerator(MAX_NULLIFIERS_PER_TX, makeNullifier, seed + 0x200, Nullifier.empty), tupleGenerator(MAX_L2_TO_L1_MSGS_PER_TX, fr, seed + 0x600, Fr.zero), tupleGenerator(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, makeLogHash, seed + 0x700, LogHash.empty), // note encrypted logs hashes
    tupleGenerator(MAX_ENCRYPTED_LOGS_PER_TX, makeLogHash, seed + 0x800, LogHash.empty), // encrypted logs hashes
    tupleGenerator(MAX_UNENCRYPTED_LOGS_PER_TX, makeLogHash, seed + 0x900, LogHash.empty), // unencrypted logs hashes
    tupleGenerator(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataUpdateRequest, seed + 0xd00, PublicDataUpdateRequest.empty), tupleGenerator(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, makeCallRequest, seed + 0x500, CallRequest.empty), makeGas(seed + 0x600));
}
/**
 * Creates arbitrary call context.
 * @param seed - The seed to use for generating the call context.
 * @param storageContractAddress - The storage contract address set on the call context.
 * @returns A call context.
 */
export function makeCallContext(seed = 0, overrides = {}) {
    return CallContext.from({
        msgSender: makeAztecAddress(seed),
        storageContractAddress: makeAztecAddress(seed + 1),
        functionSelector: makeSelector(seed + 3),
        isStaticCall: false,
        isDelegateCall: false,
        ...overrides,
    });
}
/**
 * Creates arbitrary public circuit public inputs.
 * @param seed - The seed to use for generating the public circuit public inputs.
 * @param storageContractAddress - The storage contract address set on the call context.
 * @returns Public circuit public inputs.
 */
export function makePublicCircuitPublicInputs(seed = 0, storageContractAddress, full = false) {
    const tupleGenerator = full ? makeTuple : makeHalfFullTuple;
    return new PublicCircuitPublicInputs(makeCallContext(seed, { storageContractAddress: storageContractAddress ?? makeAztecAddress(seed) }), fr(seed + 0x100), fr(seed + 0x200), tupleGenerator(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x300, ReadRequest.empty), tupleGenerator(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x400, ReadRequest.empty), tupleGenerator(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x420, ReadRequest.empty), tupleGenerator(MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x440, ReadRequest.empty), tupleGenerator(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, makeContractStorageUpdateRequest, seed + 0x400, ContractStorageUpdateRequest.empty), tupleGenerator(MAX_PUBLIC_DATA_READS_PER_CALL, makeContractStorageRead, seed + 0x500, ContractStorageRead.empty), tupleGenerator(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, fr, seed + 0x600, Fr.zero), tupleGenerator(MAX_NOTE_HASHES_PER_CALL, makeNoteHash, seed + 0x700, NoteHash.empty), tupleGenerator(MAX_NULLIFIERS_PER_CALL, makeNullifier, seed + 0x800, Nullifier.empty), tupleGenerator(MAX_L2_TO_L1_MSGS_PER_CALL, makeL2ToL1Message, seed + 0x900, L2ToL1Message.empty), fr(seed + 0xa00), fr(seed + 0xa01), tupleGenerator(MAX_UNENCRYPTED_LOGS_PER_CALL, makeLogHash, seed + 0x901, LogHash.empty), makeHeader(seed + 0xa00, undefined), makeGlobalVariables(seed + 0xa01), makeAztecAddress(seed + 0xb01), RevertCode.OK, makeGas(seed + 0xc00), makeGas(seed + 0xc00), fr(0));
}
/**
 * Creates arbitrary public kernel circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Public kernel circuit public inputs.
 */
export function makePublicKernelCircuitPublicInputs(seed = 1, fullAccumulatedData = true) {
    const tupleGenerator = fullAccumulatedData ? makeTuple : makeHalfFullTuple;
    return new PublicKernelCircuitPublicInputs(makeValidationRequests(seed), makePublicAccumulatedData(seed, fullAccumulatedData), makePublicAccumulatedData(seed, fullAccumulatedData), makeConstantData(seed + 0x100), RevertCode.OK, tupleGenerator(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, makeCallRequest, seed + 0x600, CallRequest.empty), makeAztecAddress(seed + 0x700));
}
/**
 * Creates arbitrary private kernel tail circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Private kernel tail circuit public inputs.
 */
export function makePrivateKernelTailCircuitPublicInputs(seed = 1, isForPublic = true) {
    const forPublic = isForPublic
        ? new PartialPrivateTailPublicInputsForPublic(ValidationRequests.empty(), makePublicAccumulatedData(seed + 0x100, false), makePublicAccumulatedData(seed + 0x200, false), makeHalfFullTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, makeCallRequest, seed + 0x400, CallRequest.empty))
        : undefined;
    const forRollup = !isForPublic
        ? new PartialPrivateTailPublicInputsForRollup(makeRollupValidationRequests(seed), makeCombinedAccumulatedData(seed + 0x100))
        : undefined;
    return new PrivateKernelTailCircuitPublicInputs(makeConstantData(seed + 0x300), RevertCode.OK, makeAztecAddress(seed + 0x700), forPublic, forRollup);
}
/**
 * Creates arbitrary public kernel circuit public inputs.
 * @param seed - The seed to use for generating the kernel circuit public inputs.
 * @returns Public kernel circuit public inputs.
 */
export function makeKernelCircuitPublicInputs(seed = 1, fullAccumulatedData = true) {
    return new KernelCircuitPublicInputs(makeRollupValidationRequests(seed), makeCombinedAccumulatedData(seed, fullAccumulatedData), makeConstantData(seed + 0x100), makePartialStateReference(seed + 0x200), RevertCode.OK, makeAztecAddress(seed + 0x700));
}
/**
 * Creates a public call request for testing.
 * @param seed - The seed.
 * @returns Public call request.
 */
export function makePublicCallRequest(seed = 1) {
    const childCallContext = makeCallContext(seed + 0x2, { storageContractAddress: makeAztecAddress(seed) });
    const parentCallContext = makeCallContext(seed + 0x3, { storageContractAddress: childCallContext.msgSender });
    return new PublicCallRequest(makeAztecAddress(seed), makeSelector(seed + 0x1), childCallContext, parentCallContext, seed + 0x4, makeTuple(ARGS_LENGTH, fr, seed + 0x10));
}
/**
 * Creates arbitrary/mocked membership witness where the sibling paths is an array of fields in an ascending order starting from `start`.
 * @param size - The size of the membership witness.
 * @param start - The start of the membership witness.
 * @returns A membership witness.
 */
export function makeMembershipWitness(size, start) {
    return new MembershipWitness(size, BigInt(start), makeTuple(size, fr, start));
}
/**
 * Creates arbitrary/mocked verification key in fields format.
 * @returns A verification key as fields object
 */
export function makeVerificationKeyAsFields() {
    return VerificationKeyAsFields.makeFake();
}
/**
 * Creates arbitrary/mocked verification key.
 * @returns A verification key object
 */
export function makeVerificationKey() {
    return VerificationKey.makeFake();
}
/**
 * Creates an arbitrary point in a curve.
 * @param seed - Seed to generate the point values.
 * @returns A point.
 */
export function makePoint(seed = 1) {
    return new Point(fr(seed), fr(seed + 1), false);
}
/**
 * Creates an arbitrary grumpkin scalar.
 * @param seed - Seed to generate the values.
 * @returns A GrumpkinScalar.
 */
export function makeGrumpkinScalar(seed = 1) {
    return GrumpkinScalar.fromHighLow(fr(seed), fr(seed + 1));
}
/**
 * Makes arbitrary public kernel data.
 * @param seed - The seed to use for generating the previous kernel data.
 * @param kernelPublicInputs - The public kernel public inputs to use for generating the public kernel data.
 * @returns A previous kernel data.
 */
export function makePublicKernelData(seed = 1, kernelPublicInputs) {
    return new PublicKernelData(kernelPublicInputs ?? makePublicKernelCircuitPublicInputs(seed, true), makeRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH, seed + 0x80), VerificationKeyData.makeFake(), 0x42, makeTuple(VK_TREE_HEIGHT, fr, 0x1000));
}
/**
 * Makes arbitrary public kernel data.
 * @param seed - The seed to use for generating the previous kernel data.
 * @param kernelPublicInputs - The public kernel public inputs to use for generating the public kernel data.
 * @returns A previous kernel data.
 */
export function makeRollupKernelData(seed = 1, kernelPublicInputs) {
    return new KernelData(kernelPublicInputs ?? makeKernelCircuitPublicInputs(seed, true), makeRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH, seed + 0x80), VerificationKeyData.makeFake(), 0x42, makeTuple(VK_TREE_HEIGHT, fr, 0x1000));
}
/**
 * Makes arbitrary proof.
 * @param seed - The seed to use for generating/mocking the proof.
 * @returns A proof.
 */
export function makeProof(seed = 1) {
    return new Proof(Buffer.alloc(16, seed), 0);
}
/**
 * Makes arbitrary call stack item.
 * @param seed - The seed to use for generating the call stack item.
 * @returns A call stack item.
 */
export function makeCallerContext(seed = 1) {
    return new CallerContext(makeAztecAddress(seed), makeAztecAddress(seed + 0x1), false);
}
/**
 * Makes arbitrary call stack item.
 * @param seed - The seed to use for generating the call stack item.
 * @returns A call stack item.
 */
export function makeCallRequest(seed = 1) {
    return new CallRequest(fr(seed), makeAztecAddress(seed + 0x1), makeCallerContext(seed + 0x2), fr(0), fr(0));
}
function makePrivateCallRequest(seed = 1) {
    return new PrivateCallRequest(makeAztecAddress(seed), makeCallContext(seed + 0x1), new FunctionData(makeSelector(seed + 0x2), /*isPrivate=*/ true), fr(seed + 0x3), fr(seed + 0x4), makeCallerContext(seed + 0x5), seed + 0x10, seed + 0x11);
}
/**
 * Makes arbitrary public call stack item.
 * @param seed - The seed to use for generating the public call stack item.
 * @returns A public call stack item.
 */
export function makePublicCallStackItem(seed = 1, full = false) {
    const callStackItem = new PublicCallStackItem(makeAztecAddress(seed), 
    // in the public kernel, function can't be a constructor or private
    new FunctionData(makeSelector(seed + 0x1), /*isPrivate=*/ false), makePublicCircuitPublicInputs(seed + 0x10, undefined, full), false);
    callStackItem.publicInputs.callContext.storageContractAddress = callStackItem.contractAddress;
    return callStackItem;
}
/**
 * Makes arbitrary public call data.
 * @param seed - The seed to use for generating the public call data.
 * @returns A public call data.
 */
export function makePublicCallData(seed = 1, full = false) {
    const publicCallData = new PublicCallData(makePublicCallStackItem(seed, full), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, makeCallRequest, seed + 0x300), makeProof(), fr(seed + 1));
    return publicCallData;
}
/**
 * Makes arbitrary public kernel inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @returns Public kernel inputs.
 */
export function makePublicKernelCircuitPrivateInputs(seed = 1) {
    return new PublicKernelCircuitPrivateInputs(makePublicKernelData(seed), makePublicCallData(seed + 0x1000));
}
export function makeCombineHints(seed = 1) {
    return CombineHints.from({
        sortedNoteHashes: makeTuple(MAX_NOTE_HASHES_PER_TX, makeNoteHash, seed + 0x100),
        sortedNoteHashesIndexes: makeTuple(MAX_NOTE_HASHES_PER_TX, i => i, seed + 0x200),
        sortedUnencryptedLogsHashes: makeTuple(MAX_UNENCRYPTED_LOGS_PER_TX, makeLogHash, seed + 0x300),
        sortedUnencryptedLogsHashesIndexes: makeTuple(MAX_UNENCRYPTED_LOGS_PER_TX, i => i, seed + 0x400),
        sortedPublicDataUpdateRequests: makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataUpdateRequest, seed + 0x300),
        sortedPublicDataUpdateRequestsIndexes: makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, i => i, seed + 0x400),
        dedupedPublicDataUpdateRequests: makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataUpdateRequest, seed + 0x500),
        dedupedPublicDataUpdateRequestsRuns: makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, i => i, seed + 0x600),
    });
}
/**
 * Makes arbitrary public kernel tail inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @returns Public kernel inputs.
 */
export function makePublicKernelTailCircuitPrivateInputs(seed = 1) {
    return new PublicKernelTailCircuitPrivateInputs(makePublicKernelData(seed), NullifierReadRequestHintsBuilder.empty(MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX), NullifierNonExistentReadRequestHintsBuilder.empty(), makeTuple(MAX_PUBLIC_DATA_HINTS, PublicDataHint.empty, seed + 0x100), PublicDataReadRequestHintsBuilder.empty(), makePartialStateReference(seed + 0x200), makeCombineHints(seed + 0x300));
}
/**
 * Makes arbitrary public kernel private inputs.
 * @param seed - The seed to use for generating the public kernel inputs.
 * @param tweak - An optional function to tweak the output before computing hashes.
 * @returns Public kernel inputs.
 */
export async function makePublicKernelInputsWithTweak(seed = 1, tweak) {
    const kernelCircuitPublicInputs = makePublicKernelCircuitPublicInputs(seed, false);
    const previousKernel = makePublicKernelData(seed, kernelCircuitPublicInputs);
    const publicCall = makePublicCallData(seed + 0x1000);
    const publicKernelInputs = new PublicKernelCircuitPrivateInputs(previousKernel, publicCall);
    if (tweak) {
        tweak(publicKernelInputs);
    }
    // Set the call stack item for this circuit iteration at the top of the call stack
    publicKernelInputs.previousKernel.publicInputs.end.publicCallStack[MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX - 1] =
        new CallRequest(await publicCall.callStackItem.getCompressed().hash(), publicCall.callStackItem.publicInputs.callContext.msgSender, makeCallerContext(seed + 0x100), Fr.ZERO, Fr.ZERO);
    return publicKernelInputs;
}
/**
 * Makes arbitrary tx request.
 * @param seed - The seed to use for generating the tx request.
 * @returns A tx request.
 */
export function makeTxRequest(seed = 1) {
    return TxRequest.from({
        origin: makeAztecAddress(seed),
        functionData: new FunctionData(makeSelector(seed + 0x100), /*isPrivate=*/ true),
        argsHash: fr(seed + 0x200),
        txContext: makeTxContext(seed + 0x400),
    });
}
/**
 * Makes arbitrary private call stack item.
 * @param seed - The seed to use for generating the private call stack item.
 * @returns A private call stack item.
 */
export function makePrivateCallStackItem(seed = 1) {
    return new PrivateCallStackItem(makeAztecAddress(seed), new FunctionData(makeSelector(seed + 0x1), /*isPrivate=*/ true), makePrivateCircuitPublicInputs(seed + 0x10));
}
/**
 * Makes arbitrary private circuit public inputs.
 * @param seed - The seed to use for generating the private circuit public inputs.
 * @returns A private circuit public inputs.
 */
export function makePrivateCircuitPublicInputs(seed = 0) {
    return PrivateCircuitPublicInputs.from({
        maxBlockNumber: new MaxBlockNumber(true, new Fr(seed + 0x31415)),
        callContext: makeCallContext(seed, { isDelegateCall: true, isStaticCall: true }),
        argsHash: fr(seed + 0x100),
        returnsHash: fr(seed + 0x200),
        minRevertibleSideEffectCounter: fr(0),
        noteHashReadRequests: makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x300),
        nullifierReadRequests: makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, makeReadRequest, seed + 0x310),
        keyValidationRequestsAndGenerators: makeTuple(MAX_KEY_VALIDATION_REQUESTS_PER_CALL, makeKeyValidationRequestAndGenerators, seed + 0x320),
        noteHashes: makeTuple(MAX_NOTE_HASHES_PER_CALL, makeNoteHash, seed + 0x400),
        nullifiers: makeTuple(MAX_NULLIFIERS_PER_CALL, makeNullifier, seed + 0x500),
        privateCallRequests: makeTuple(MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, makePrivateCallRequest, seed + 0x600),
        publicCallStackHashes: makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, fr, seed + 0x700),
        publicTeardownFunctionHash: fr(seed + 0x800),
        l2ToL1Msgs: makeTuple(MAX_L2_TO_L1_MSGS_PER_CALL, makeL2ToL1Message, seed + 0x800),
        startSideEffectCounter: fr(seed + 0x849),
        endSideEffectCounter: fr(seed + 0x850),
        noteEncryptedLogsHashes: makeTuple(MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, makeNoteLogHash, seed + 0x875),
        encryptedLogsHashes: makeTuple(MAX_ENCRYPTED_LOGS_PER_CALL, makeEncryptedLogHash, seed + 0x900),
        unencryptedLogsHashes: makeTuple(MAX_UNENCRYPTED_LOGS_PER_CALL, makeLogHash, seed + 0xa00),
        historicalHeader: makeHeader(seed + 0xd00, undefined),
        txContext: makeTxContext(seed + 0x1400),
        isFeePayer: false,
    });
}
/**
 * Makes global variables.
 * @param seed - The seed to use for generating the global variables.
 * @param blockNumber - The block number to use for generating the global variables.
 * If blockNumber is undefined, it will be set to seed + 2.
 * @returns Global variables.
 */
export function makeGlobalVariables(seed = 1, blockNumber = undefined) {
    if (blockNumber !== undefined) {
        return new GlobalVariables(fr(seed), fr(seed + 1), fr(blockNumber), fr(seed + 3), EthAddress.fromField(fr(seed + 4)), AztecAddress.fromField(fr(seed + 5)), makeGasFees(seed + 6));
    }
    return new GlobalVariables(fr(seed), fr(seed + 1), fr(seed + 2), fr(seed + 3), EthAddress.fromField(fr(seed + 4)), AztecAddress.fromField(fr(seed + 5)), makeGasFees(seed + 6));
}
export function makeGasFees(seed = 1) {
    return new GasFees(fr(seed), fr(seed + 1));
}
/**
 * Makes constant base rollup data.
 * @param seed - The seed to use for generating the constant base rollup data.
 * @param blockNumber - The block number to use for generating the global variables.
 * @returns A constant base rollup data.
 */
export function makeConstantBaseRollupData(seed = 1, globalVariables = undefined) {
    return ConstantRollupData.from({
        lastArchive: makeAppendOnlyTreeSnapshot(seed + 0x300),
        vkTreeRoot: fr(seed + 0x401),
        globalVariables: globalVariables ?? makeGlobalVariables(seed + 0x402),
    });
}
/**
 * Makes arbitrary append only tree snapshot.
 * @param seed - The seed to use for generating the append only tree snapshot.
 * @returns An append only tree snapshot.
 */
export function makeAppendOnlyTreeSnapshot(seed = 1) {
    return new AppendOnlyTreeSnapshot(fr(seed), seed);
}
/**
 * Makes arbitrary eth address.
 * @param seed - The seed to use for generating the eth address.
 * @returns An eth address.
 */
export function makeEthAddress(seed = 1) {
    return EthAddress.fromField(fr(seed));
}
/**
 * Creates a buffer of a given size filled with a given value.
 * @param size - The size of the buffer to create.
 * @param fill - The value to fill the buffer with.
 * @returns A buffer of a given size filled with a given value.
 */
export function makeBytes(size = 32, fill = 1) {
    return Buffer.alloc(size, fill);
}
/**
 * Makes arbitrary aztec address.
 * @param seed - The seed to use for generating the aztec address.
 * @returns An aztec address.
 */
export function makeAztecAddress(seed = 1) {
    return AztecAddress.fromField(fr(seed));
}
/**
 * Makes arbitrary Schnorr signature.
 * @param seed - The seed to use for generating the Schnorr signature.
 * @returns A Schnorr signature.
 */
export function makeSchnorrSignature(seed = 1) {
    return new SchnorrSignature(Buffer.alloc(SchnorrSignature.SIZE, seed));
}
/**
 * Makes arbitrary base or merge rollup circuit public inputs.
 * @param seed - The seed to use for generating the base rollup circuit public inputs.
 * @param blockNumber - The block number to use for generating the base rollup circuit public inputs.
 * @returns A base or merge rollup circuit public inputs.
 */
export function makeBaseOrMergeRollupPublicInputs(seed = 0, globalVariables = undefined) {
    return new BaseOrMergeRollupPublicInputs(RollupTypes.Base, 1, makeConstantBaseRollupData(seed + 0x200, globalVariables), makePartialStateReference(seed + 0x300), makePartialStateReference(seed + 0x400), fr(seed + 0x901), fr(seed + 0x902), fr(seed + 0x903));
}
/**
 * Makes arbitrary previous rollup data.
 * @param seed - The seed to use for generating the previous rollup data.
 * @param globalVariables - The global variables to use when generating the previous rollup data.
 * @returns A previous rollup data.
 */
export function makePreviousRollupData(seed = 0, globalVariables = undefined) {
    return new PreviousRollupData(makeBaseOrMergeRollupPublicInputs(seed, globalVariables), makeRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH, seed + 0x50), VerificationKeyAsFields.makeFake(), makeMembershipWitness(VK_TREE_HEIGHT, seed + 0x120));
}
/**
 * Makes root rollup inputs.
 * @param seed - The seed to use for generating the root rollup inputs.
 * @param blockNumber - The block number to use for generating the root rollup inputs.
 * @returns A root rollup inputs.
 */
export function makeRootRollupInputs(seed = 0, globalVariables) {
    return new RootRollupInputs([makePreviousRollupData(seed, globalVariables), makePreviousRollupData(seed + 0x1000, globalVariables)], makeRootParityInput(NESTED_RECURSIVE_PROOF_LENGTH, seed + 0x2000), makeTuple(NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP, fr, 0x2100), makeTuple(L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, fr, 0x2100), makeAppendOnlyTreeSnapshot(seed + 0x2200), makeAppendOnlyTreeSnapshot(seed + 0x2200), makeTuple(ARCHIVE_HEIGHT, fr, 0x2400));
}
export function makeRootParityInput(proofSize, seed = 0) {
    return new RootParityInput(makeRecursiveProof(proofSize, seed), VerificationKeyAsFields.makeFake(seed + 0x100), makeTuple(VK_TREE_HEIGHT, fr, 0x200), makeParityPublicInputs(seed + 0x300));
}
export function makeParityPublicInputs(seed = 0) {
    return new ParityPublicInputs(new Fr(BigInt(seed + 0x200)), new Fr(BigInt(seed + 0x300)), new Fr(BigInt(seed + 0x400)));
}
export function makeBaseParityInputs(seed = 0) {
    return new BaseParityInputs(makeTuple(NUM_MSGS_PER_BASE_PARITY, fr, seed + 0x3000), new Fr(seed + 0x4000));
}
export function makeRootParityInputs(seed = 0) {
    return new RootParityInputs(makeTuple(NUM_BASE_PARITY_PER_ROOT_PARITY, () => makeRootParityInput(RECURSIVE_PROOF_LENGTH), seed + 0x4100));
}
/**
 * Makes root rollup public inputs.
 * @param seed - The seed to use for generating the root rollup public inputs.
 * @param blockNumber - The block number to use in the global variables of a header.
 * @returns A root rollup public inputs.
 */
export function makeRootRollupPublicInputs(seed = 0, blockNumber = undefined) {
    return RootRollupPublicInputs.from({
        archive: makeAppendOnlyTreeSnapshot(seed + 0x100),
        header: makeHeader(seed + 0x200, blockNumber),
        vkTreeRoot: fr(seed + 0x300),
    });
}
/**
 * Makes content commitment
 */
export function makeContentCommitment(seed = 0, txsEffectsHash = undefined) {
    return new ContentCommitment(new Fr(seed), txsEffectsHash ?? toBufferBE(BigInt(seed + 0x100), NUM_BYTES_PER_SHA256), toBufferBE(BigInt(seed + 0x200), NUM_BYTES_PER_SHA256), toBufferBE(BigInt(seed + 0x300), NUM_BYTES_PER_SHA256));
}
/**
 * Makes header.
 */
export function makeHeader(seed = 0, blockNumber = undefined, txsEffectsHash = undefined) {
    return new Header(makeAppendOnlyTreeSnapshot(seed + 0x100), makeContentCommitment(seed + 0x200, txsEffectsHash), makeStateReference(seed + 0x600), makeGlobalVariables((seed += 0x700), blockNumber), fr(seed + 0x800));
}
/**
 * Makes arbitrary state reference.
 * @param seed - The seed to use for generating the state reference.
 * @returns A state reference.
 */
export function makeStateReference(seed = 0) {
    return new StateReference(makeAppendOnlyTreeSnapshot(seed), makePartialStateReference(seed + 1));
}
/**
 * Makes arbitrary L2 to L1 message.
 * @param seed - The seed to use for generating the state reference.
 * @returns L2 to L1 message.
 */
export function makeL2ToL1Message(seed = 0) {
    const recipient = EthAddress.fromField(new Fr(seed));
    const content = new Fr(seed + 1);
    return new L2ToL1Message(recipient, content, seed + 2);
}
/**
 * Makes arbitrary partial state reference.
 * @param seed - The seed to use for generating the partial state reference.
 * @returns A partial state reference.
 */
export function makePartialStateReference(seed = 0) {
    return new PartialStateReference(makeAppendOnlyTreeSnapshot(seed), makeAppendOnlyTreeSnapshot(seed + 1), makeAppendOnlyTreeSnapshot(seed + 2));
}
/**
 * Makes arbitrary merge rollup inputs.
 * @param seed - The seed to use for generating the merge rollup inputs.
 * @returns A merge rollup inputs.
 */
export function makeMergeRollupInputs(seed = 0) {
    return new MergeRollupInputs([makePreviousRollupData(seed), makePreviousRollupData(seed + 0x1000)]);
}
/**
 * Makes arbitrary public data tree leaves.
 * @param seed - The seed to use for generating the public data tree leaf.
 * @returns A public data tree leaf.
 */
export function makePublicDataTreeLeaf(seed = 0) {
    return new PublicDataTreeLeaf(new Fr(seed), new Fr(seed + 1));
}
/**
 * Makes arbitrary public data tree leaf preimages.
 * @param seed - The seed to use for generating the public data tree leaf preimage.
 * @returns A public data tree leaf preimage.
 */
export function makePublicDataTreeLeafPreimage(seed = 0) {
    return new PublicDataTreeLeafPreimage(new Fr(seed), new Fr(seed + 1), new Fr(seed + 2), BigInt(seed + 3));
}
/**
 * Creates an instance of StateDiffHints with arbitrary values based on the provided seed.
 * @param seed - The seed to use for generating the hints.
 * @returns A StateDiffHints object.
 */
export function makeStateDiffHints(seed = 1) {
    const nullifierPredecessorPreimages = makeTuple(MAX_NULLIFIERS_PER_TX, x => new NullifierLeafPreimage(fr(x), fr(x + 0x100), BigInt(x + 0x200)), seed + 0x1000);
    const nullifierPredecessorMembershipWitnesses = makeTuple(MAX_NULLIFIERS_PER_TX, x => makeMembershipWitness(NULLIFIER_TREE_HEIGHT, x), seed + 0x2000);
    const sortedNullifiers = makeTuple(MAX_NULLIFIERS_PER_TX, fr, seed + 0x3000);
    const sortedNullifierIndexes = makeTuple(MAX_NULLIFIERS_PER_TX, i => i, seed + 0x4000);
    const noteHashSubtreeSiblingPath = makeTuple(NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, fr, seed + 0x5000);
    const nullifierSubtreeSiblingPath = makeTuple(NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, fr, seed + 0x6000);
    const publicDataSiblingPath = makeTuple(PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH, fr, 0x8000);
    return new StateDiffHints(nullifierPredecessorPreimages, nullifierPredecessorMembershipWitnesses, sortedNullifiers, sortedNullifierIndexes, noteHashSubtreeSiblingPath, nullifierSubtreeSiblingPath, publicDataSiblingPath);
}
/**
 * Makes arbitrary base rollup inputs.
 * @param seed - The seed to use for generating the base rollup inputs.
 * @returns A base rollup inputs.
 */
export function makeBaseRollupInputs(seed = 0) {
    const kernelData = makeRollupKernelData(seed);
    const start = makePartialStateReference(seed + 0x100);
    const stateDiffHints = makeStateDiffHints(seed + 0x600);
    const sortedPublicDataWrites = makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataTreeLeaf, seed + 0x8000);
    const sortedPublicDataWritesIndexes = makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, i => i, 0);
    const lowPublicDataWritesPreimages = makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, makePublicDataTreeLeafPreimage, seed + 0x8200);
    const lowPublicDataWritesMembershipWitnesses = makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, i => makeMembershipWitness(PUBLIC_DATA_TREE_HEIGHT, i), seed + 0x8400);
    const archiveRootMembershipWitness = makeMembershipWitness(ARCHIVE_HEIGHT, seed + 0x9000);
    const constants = makeConstantBaseRollupData(0x100);
    const feePayerGasTokenBalanceReadHint = PublicDataHint.empty();
    return BaseRollupInputs.from({
        kernelData,
        start,
        stateDiffHints,
        sortedPublicDataWrites,
        sortedPublicDataWritesIndexes,
        lowPublicDataWritesPreimages,
        lowPublicDataWritesMembershipWitnesses,
        archiveRootMembershipWitness,
        constants,
        feePayerGasTokenBalanceReadHint,
    });
}
export function makeExecutablePrivateFunctionWithMembershipProof(seed = 0) {
    return {
        selector: makeSelector(seed),
        bytecode: makeBytes(100, seed + 1),
        artifactTreeSiblingPath: makeTuple(3, fr, seed + 2),
        artifactTreeLeafIndex: seed + 2,
        privateFunctionTreeSiblingPath: makeTuple(3, fr, seed + 3),
        privateFunctionTreeLeafIndex: seed + 3,
        artifactMetadataHash: fr(seed + 4),
        functionMetadataHash: fr(seed + 5),
        unconstrainedFunctionsArtifactTreeRoot: fr(seed + 6),
        vkHash: fr(seed + 7),
    };
}
export function makeUnconstrainedFunctionWithMembershipProof(seed = 0) {
    return {
        selector: makeSelector(seed),
        bytecode: makeBytes(100, seed + 1),
        artifactTreeSiblingPath: makeTuple(3, fr, seed + 2),
        artifactTreeLeafIndex: seed + 2,
        artifactMetadataHash: fr(seed + 4),
        functionMetadataHash: fr(seed + 5),
        privateFunctionsArtifactTreeRoot: fr(seed + 6),
    };
}
export async function makeContractClassPublic(seed = 0) {
    const artifactHash = fr(seed + 1);
    const publicFunctions = makeTuple(3, makeContractClassPublicFunction, seed + 2);
    const privateFunctionsRoot = fr(seed + 3);
    const packedBytecode = packBytecode(publicFunctions);
    const publicBytecodeCommitment = computePublicBytecodeCommitment(packedBytecode);
    const id = await computeContractClassId({ artifactHash, privateFunctionsRoot, publicBytecodeCommitment });
    return {
        id,
        artifactHash,
        packedBytecode,
        privateFunctionsRoot,
        publicFunctions,
        privateFunctions: [],
        unconstrainedFunctions: [],
        version: 1,
    };
}
function makeContractClassPublicFunction(seed = 0) {
    return {
        selector: FunctionSelector.fromField(fr(seed + 1)),
        bytecode: makeBytes(100, seed + 2),
    };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function makeContractClassPrivateFunction(seed = 0) {
    return {
        selector: FunctionSelector.fromField(fr(seed + 1)),
        vkHash: fr(seed + 2),
    };
}
export function makeArray(length, fn, offset = 0) {
    return Array.from({ length }, (_, i) => fn(i + offset));
}
export function makeVector(length, fn, offset = 0) {
    return new Vector(makeArray(length, fn, offset));
}
/**
 * Makes arbitrary AvmKeyValueHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmKeyValueHint.
 */
export function makeAvmKeyValueHint(seed = 0) {
    return new AvmKeyValueHint(new Fr(seed), new Fr(seed + 1));
}
/**
 * Makes arbitrary AvmExternalCallHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmExternalCallHint.
 */
export function makeAvmExternalCallHint(seed = 0) {
    return new AvmExternalCallHint(new Fr(seed % 2), makeArray((seed % 100) + 10, i => new Fr(i), seed + 0x1000), new Gas(seed + 0x200, seed), new Fr(seed + 0x300));
}
/**
 * Makes arbitrary AvmContractInstanceHint.
 * @param seed - The seed to use for generating the state reference.
 * @returns AvmContractInstanceHint.
 */
export function makeAvmContractInstanceHint(seed = 0) {
    return new AvmContractInstanceHint(new Fr(seed), new Fr(seed + 0x1), new Fr(seed + 0x2), new Fr(seed + 0x3), new Fr(seed + 0x4), new Fr(seed + 0x5), new Fr(seed + 0x6));
}
/**
 * Creates arbitrary AvmExecutionHints.
 * @param seed - The seed to use for generating the hints.
 * @returns the execution hints.
 */
export function makeAvmExecutionHints(seed = 0, overrides = {}) {
    const lengthOffset = 10;
    const lengthSeedMod = 10;
    const baseLength = lengthOffset + (seed % lengthSeedMod);
    return AvmExecutionHints.from({
        storageValues: makeVector(baseLength, makeAvmKeyValueHint, seed + 0x4200),
        noteHashExists: makeVector(baseLength + 1, makeAvmKeyValueHint, seed + 0x4300),
        nullifierExists: makeVector(baseLength + 2, makeAvmKeyValueHint, seed + 0x4400),
        l1ToL2MessageExists: makeVector(baseLength + 3, makeAvmKeyValueHint, seed + 0x4500),
        externalCalls: makeVector(baseLength + 4, makeAvmExternalCallHint, seed + 0x4600),
        contractInstances: makeVector(baseLength + 5, makeAvmContractInstanceHint, seed + 0x4700),
        ...overrides,
    });
}
/**
 * Creates arbitrary AvmCircuitInputs.
 * @param seed - The seed to use for generating the hints.
 * @returns the execution hints.
 */
export function makeAvmCircuitInputs(seed = 0, overrides = {}) {
    return AvmCircuitInputs.from({
        functionName: `function${seed}`,
        bytecode: makeBytes((seed % 100) + 100, seed),
        calldata: makeArray((seed % 100) + 10, i => new Fr(i), seed + 0x1000),
        publicInputs: makePublicCircuitPublicInputs(seed + 0x2000),
        avmHints: makeAvmExecutionHints(seed + 0x3000),
        ...overrides,
    });
}
/**
 * TODO: Since the max value check is currently disabled this function is pointless. Should it be removed?
 * Test only. Easy to identify big endian field serialize.
 * @param n - The number.
 * @returns The field.
 */
export function fr(n) {
    return new Fr(BigInt(n));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RzL2ZhY3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBVTNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFDTCxjQUFjLEVBQ2QsV0FBVyxFQUNYLHNCQUFzQixFQUN0QixnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLDZCQUE2QixFQUM3QixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxXQUFXLEVBQ1gsYUFBYSxFQUNiLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsNEJBQTRCLEVBQzVCLGdCQUFnQixFQUNoQixFQUFFLEVBQ0YsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyx3Q0FBd0MsRUFDeEMsYUFBYSxFQUNiLE9BQU8sRUFDUCwyQkFBMkIsRUFDM0IseUJBQXlCLEVBQ3pCLG9DQUFvQyxFQUNwQyxrQ0FBa0MsRUFDbEMsdUNBQXVDLEVBQ3ZDLDBCQUEwQixFQUMxQix3QkFBd0IsRUFDeEIsZ0NBQWdDLEVBQ2hDLDhCQUE4QixFQUM5Qix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLG9DQUFvQyxFQUNwQyxrQ0FBa0MsRUFDbEMsdUJBQXVCLEVBQ3ZCLHFC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