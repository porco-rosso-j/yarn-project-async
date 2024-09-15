import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { MAX_ENCRYPTED_LOGS_PER_CALL, MAX_KEY_VALIDATION_REQUESTS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_CALL, MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, MAX_NOTE_HASHES_PER_CALL, MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, MAX_NULLIFIERS_PER_CALL, MAX_NULLIFIER_READ_REQUESTS_PER_CALL, MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_CALL } from '../constants.gen.js';
import { Header } from '../structs/header.js';
import { CallContext } from './call_context.js';
import { KeyValidationRequestAndGenerator } from './key_validation_request_and_generator.js';
import { L2ToL1Message } from './l2_to_l1_message.js';
import { EncryptedLogHash, LogHash, NoteLogHash } from './log_hash.js';
import { MaxBlockNumber } from './max_block_number.js';
import { NoteHash } from './note_hash.js';
import { Nullifier } from './nullifier.js';
import { PrivateCallRequest } from './private_call_request.js';
import { ReadRequest } from './read_request.js';
import { TxContext } from './tx_context.js';
/**
 * Public inputs to a private circuit.
 */
export declare class PrivateCircuitPublicInputs {
    /**
     * Context of the call corresponding to this private circuit execution.
     */
    callContext: CallContext;
    /**
     * Pedersen hash of function arguments.
     */
    argsHash: Fr;
    /**
     * Pedersen hash of the return values of the corresponding function call.
     */
    returnsHash: Fr;
    /**
     * The side-effect counter under which all side effects are non-revertible.
     */
    minRevertibleSideEffectCounter: Fr;
    /**
     * Whether the caller of the function is the fee payer.
     */
    isFeePayer: boolean;
    /**
     * The maximum block number in which this transaction can be included and be valid.
     */
    maxBlockNumber: MaxBlockNumber;
    /**
     * Read requests created by the corresponding function call.
     */
    noteHashReadRequests: Tuple<ReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_CALL>;
    /**
     * Nullifier read requests created by the corresponding function call.
     */
    nullifierReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_CALL>;
    /**
     * Key validation requests and generators created by the corresponding function call.
     */
    keyValidationRequestsAndGenerators: Tuple<KeyValidationRequestAndGenerator, typeof MAX_KEY_VALIDATION_REQUESTS_PER_CALL>;
    /**
     * New note hashes created by the corresponding function call.
     */
    noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_CALL>;
    /**
     * New nullifiers created by the corresponding function call.
     */
    nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_CALL>;
    /**
     * Private call requests made within the current kernel iteration.
     */
    privateCallRequests: Tuple<PrivateCallRequest, typeof MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL>;
    /**
     * Public call stack at the current kernel iteration.
     */
    publicCallStackHashes: Tuple<Fr, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>;
    /**
     * Hash of the public teardown function.
     */
    publicTeardownFunctionHash: Fr;
    /**
     * New L2 to L1 messages created by the corresponding function call.
     */
    l2ToL1Msgs: Tuple<L2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_CALL>;
    /**
     * The side effect counter at the start of this call.
     */
    startSideEffectCounter: Fr;
    /**
     * The end side effect counter for this call.
     */
    endSideEffectCounter: Fr;
    /**
     * Hash of the encrypted note logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes: Tuple<NoteLogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_CALL>;
    /**
     * Hash of the encrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes: Tuple<EncryptedLogHash, typeof MAX_ENCRYPTED_LOGS_PER_CALL>;
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_CALL>;
    /**
     * Header of a block whose state is used during private execution (not the block the transaction is included in).
     */
    historicalHeader: Header;
    /**
     * Transaction context.
     *
     * Note: The chainId and version in the txContext are not redundant to the values in self.historical_header.global_variables because
     * they can be different in case of a protocol upgrade. In such a situation we could be using header from a block
     * before the upgrade took place but be using the updated protocol to execute and prove the transaction.
     */
    txContext: TxContext;
    constructor(
    /**
     * Context of the call corresponding to this private circuit execution.
     */
    callContext: CallContext, 
    /**
     * Pedersen hash of function arguments.
     */
    argsHash: Fr, 
    /**
     * Pedersen hash of the return values of the corresponding function call.
     */
    returnsHash: Fr, 
    /**
     * The side-effect counter under which all side effects are non-revertible.
     */
    minRevertibleSideEffectCounter: Fr, 
    /**
     * Whether the caller of the function is the fee payer.
     */
    isFeePayer: boolean, 
    /**
     * The maximum block number in which this transaction can be included and be valid.
     */
    maxBlockNumber: MaxBlockNumber, 
    /**
     * Read requests created by the corresponding function call.
     */
    noteHashReadRequests: Tuple<ReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_CALL>, 
    /**
     * Nullifier read requests created by the corresponding function call.
     */
    nullifierReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_CALL>, 
    /**
     * Key validation requests and generators created by the corresponding function call.
     */
    keyValidationRequestsAndGenerators: Tuple<KeyValidationRequestAndGenerator, typeof MAX_KEY_VALIDATION_REQUESTS_PER_CALL>, 
    /**
     * New note hashes created by the corresponding function call.
     */
    noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_CALL>, 
    /**
     * New nullifiers created by the corresponding function call.
     */
    nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_CALL>, 
    /**
     * Private call requests made within the current kernel iteration.
     */
    privateCallRequests: Tuple<PrivateCallRequest, typeof MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL>, 
    /**
     * Public call stack at the current kernel iteration.
     */
    publicCallStackHashes: Tuple<Fr, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>, 
    /**
     * Hash of the public teardown function.
     */
    publicTeardownFunctionHash: Fr, 
    /**
     * New L2 to L1 messages created by the corresponding function call.
     */
    l2ToL1Msgs: Tuple<L2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_CALL>, 
    /**
     * The side effect counter at the start of this call.
     */
    startSideEffectCounter: Fr, 
    /**
     * The end side effect counter for this call.
     */
    endSideEffectCounter: Fr, 
    /**
     * Hash of the encrypted note logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes: Tuple<NoteLogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_CALL>, 
    /**
     * Hash of the encrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes: Tuple<EncryptedLogHash, typeof MAX_ENCRYPTED_LOGS_PER_CALL>, 
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_CALL>, 
    /**
     * Header of a block whose state is used during private execution (not the block the transaction is included in).
     */
    historicalHeader: Header, 
    /**
     * Transaction context.
     *
     * Note: The chainId and version in the txContext are not redundant to the values in self.historical_header.global_variables because
     * they can be different in case of a protocol upgrade. In such a situation we could be using header from a block
     * before the upgrade took place but be using the updated protocol to execute and prove the transaction.
     */
    txContext: TxContext);
    /**
     * Create PrivateCircuitPublicInputs from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PrivateCircuitPublicInputs object.
     */
    static from(fields: FieldsOf<PrivateCircuitPublicInputs>): PrivateCircuitPublicInputs;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateCircuitPublicInputs;
    static fromFields(fields: Fr[] | FieldReader): PrivateCircuitPublicInputs;
    /**
     * Create an empty PrivateCircuitPublicInputs.
     * @returns An empty PrivateCircuitPublicInputs object.
     */
    static empty(): PrivateCircuitPublicInputs;
    isEmpty(): boolean;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<PrivateCircuitPublicInputs>): readonly [CallContext, Fr, Fr, Fr, boolean, MaxBlockNumber, [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator, KeyValidationRequestAndGenerator], [NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash], [Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier], [PrivateCallRequest, PrivateCallRequest, PrivateCallRequest, PrivateCallRequest], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], Fr, [L2ToL1Message, L2ToL1Message], Fr, Fr, [NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash, NoteLogHash], [EncryptedLogHash, EncryptedLogHash, EncryptedLogHash, EncryptedLogHash], [LogHash, LogHash, LogHash, LogHash], Header, TxContext];
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serialize this as a field array.
     */
    toFields(): Fr[];
    hash(): Promise<Fr>;
}
//# sourceMappingURL=private_circuit_public_inputs.d.ts.map