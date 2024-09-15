import { makeTuple } from '@aztec/foundation/array';
import { isArrayEmpty } from '@aztec/foundation/collection';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields, } from '@aztec/foundation/serialize';
import { GeneratorIndex, MAX_ENCRYPTED_LOGS_PER_CALL, MAX_KEY_VALIDATION_REQUESTS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_CALL, MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, MAX_NOTE_HASHES_PER_CALL, MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, MAX_NULLIFIERS_PER_CALL, MAX_NULLIFIER_READ_REQUESTS_PER_CALL, MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_CALL, PRIVATE_CIRCUIT_PUBLIC_INPUTS_LENGTH, } from '../constants.gen.js';
import { Header } from '../structs/header.js';
import { isEmptyArray } from '../utils/index.js';
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
export class PrivateCircuitPublicInputs {
    constructor(
    /**
     * Context of the call corresponding to this private circuit execution.
     */
    callContext, 
    /**
     * Pedersen hash of function arguments.
     */
    argsHash, 
    /**
     * Pedersen hash of the return values of the corresponding function call.
     */
    returnsHash, 
    /**
     * The side-effect counter under which all side effects are non-revertible.
     */
    minRevertibleSideEffectCounter, 
    /**
     * Whether the caller of the function is the fee payer.
     */
    isFeePayer, 
    /**
     * The maximum block number in which this transaction can be included and be valid.
     */
    maxBlockNumber, 
    /**
     * Read requests created by the corresponding function call.
     */
    noteHashReadRequests, 
    /**
     * Nullifier read requests created by the corresponding function call.
     */
    nullifierReadRequests, 
    /**
     * Key validation requests and generators created by the corresponding function call.
     */
    keyValidationRequestsAndGenerators, 
    /**
     * New note hashes created by the corresponding function call.
     */
    noteHashes, 
    /**
     * New nullifiers created by the corresponding function call.
     */
    nullifiers, 
    /**
     * Private call requests made within the current kernel iteration.
     */
    privateCallRequests, 
    /**
     * Public call stack at the current kernel iteration.
     */
    publicCallStackHashes, 
    /**
     * Hash of the public teardown function.
     */
    publicTeardownFunctionHash, 
    /**
     * New L2 to L1 messages created by the corresponding function call.
     */
    l2ToL1Msgs, 
    /**
     * The side effect counter at the start of this call.
     */
    startSideEffectCounter, 
    /**
     * The end side effect counter for this call.
     */
    endSideEffectCounter, 
    /**
     * Hash of the encrypted note logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes, 
    /**
     * Hash of the encrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes, 
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes, 
    /**
     * Header of a block whose state is used during private execution (not the block the transaction is included in).
     */
    historicalHeader, 
    /**
     * Transaction context.
     *
     * Note: The chainId and version in the txContext are not redundant to the values in self.historical_header.global_variables because
     * they can be different in case of a protocol upgrade. In such a situation we could be using header from a block
     * before the upgrade took place but be using the updated protocol to execute and prove the transaction.
     */
    txContext) {
        this.callContext = callContext;
        this.argsHash = argsHash;
        this.returnsHash = returnsHash;
        this.minRevertibleSideEffectCounter = minRevertibleSideEffectCounter;
        this.isFeePayer = isFeePayer;
        this.maxBlockNumber = maxBlockNumber;
        this.noteHashReadRequests = noteHashReadRequests;
        this.nullifierReadRequests = nullifierReadRequests;
        this.keyValidationRequestsAndGenerators = keyValidationRequestsAndGenerators;
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.privateCallRequests = privateCallRequests;
        this.publicCallStackHashes = publicCallStackHashes;
        this.publicTeardownFunctionHash = publicTeardownFunctionHash;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.startSideEffectCounter = startSideEffectCounter;
        this.endSideEffectCounter = endSideEffectCounter;
        this.noteEncryptedLogsHashes = noteEncryptedLogsHashes;
        this.encryptedLogsHashes = encryptedLogsHashes;
        this.unencryptedLogsHashes = unencryptedLogsHashes;
        this.historicalHeader = historicalHeader;
        this.txContext = txContext;
    }
    /**
     * Create PrivateCircuitPublicInputs from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PrivateCircuitPublicInputs object.
     */
    static from(fields) {
        return new PrivateCircuitPublicInputs(...PrivateCircuitPublicInputs.getFields(fields));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateCircuitPublicInputs(reader.readObject(CallContext), reader.readObject(Fr), reader.readObject(Fr), reader.readObject(Fr), reader.readBoolean(), reader.readObject(MaxBlockNumber), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_KEY_VALIDATION_REQUESTS_PER_CALL, KeyValidationRequestAndGenerator), reader.readArray(MAX_NOTE_HASHES_PER_CALL, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_CALL, Nullifier), reader.readArray(MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, PrivateCallRequest), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, Fr), reader.readObject(Fr), reader.readArray(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message), reader.readObject(Fr), reader.readObject(Fr), reader.readArray(MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, NoteLogHash), reader.readArray(MAX_ENCRYPTED_LOGS_PER_CALL, EncryptedLogHash), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash), reader.readObject(Header), reader.readObject(TxContext));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PrivateCircuitPublicInputs(reader.readObject(CallContext), reader.readField(), reader.readField(), reader.readField(), reader.readBoolean(), reader.readObject(MaxBlockNumber), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_KEY_VALIDATION_REQUESTS_PER_CALL, KeyValidationRequestAndGenerator), reader.readArray(MAX_NOTE_HASHES_PER_CALL, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_CALL, Nullifier), reader.readArray(MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, PrivateCallRequest), reader.readFieldArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL), reader.readField(), reader.readArray(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message), reader.readField(), reader.readField(), reader.readArray(MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, NoteLogHash), reader.readArray(MAX_ENCRYPTED_LOGS_PER_CALL, EncryptedLogHash), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash), reader.readObject(Header), reader.readObject(TxContext));
    }
    /**
     * Create an empty PrivateCircuitPublicInputs.
     * @returns An empty PrivateCircuitPublicInputs object.
     */
    static empty() {
        return new PrivateCircuitPublicInputs(CallContext.empty(), Fr.ZERO, Fr.ZERO, Fr.ZERO, false, MaxBlockNumber.empty(), makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_KEY_VALIDATION_REQUESTS_PER_CALL, KeyValidationRequestAndGenerator.empty), makeTuple(MAX_NOTE_HASHES_PER_CALL, NoteHash.empty), makeTuple(MAX_NULLIFIERS_PER_CALL, Nullifier.empty), makeTuple(MAX_PRIVATE_CALL_STACK_LENGTH_PER_CALL, PrivateCallRequest.empty), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, Fr.zero), Fr.ZERO, makeTuple(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message.empty), Fr.ZERO, Fr.ZERO, makeTuple(MAX_NOTE_ENCRYPTED_LOGS_PER_CALL, NoteLogHash.empty), makeTuple(MAX_ENCRYPTED_LOGS_PER_CALL, EncryptedLogHash.empty), makeTuple(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash.empty), Header.empty(), TxContext.empty());
    }
    isEmpty() {
        const isZeroArray = (arr) => isArrayEmpty(arr, item => item.isZero());
        return (this.callContext.isEmpty() &&
            this.argsHash.isZero() &&
            this.returnsHash.isZero() &&
            this.minRevertibleSideEffectCounter.isZero() &&
            !this.isFeePayer &&
            this.maxBlockNumber.isEmpty() &&
            isEmptyArray(this.noteHashReadRequests) &&
            isEmptyArray(this.nullifierReadRequests) &&
            isEmptyArray(this.keyValidationRequestsAndGenerators) &&
            isEmptyArray(this.noteHashes) &&
            isEmptyArray(this.nullifiers) &&
            isEmptyArray(this.privateCallRequests) &&
            isZeroArray(this.publicCallStackHashes) &&
            this.publicTeardownFunctionHash.isZero() &&
            isEmptyArray(this.l2ToL1Msgs) &&
            isEmptyArray(this.noteEncryptedLogsHashes) &&
            isEmptyArray(this.encryptedLogsHashes) &&
            isEmptyArray(this.unencryptedLogsHashes) &&
            this.historicalHeader.isEmpty() &&
            this.txContext.isEmpty());
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [
            fields.callContext,
            fields.argsHash,
            fields.returnsHash,
            fields.minRevertibleSideEffectCounter,
            fields.isFeePayer,
            fields.maxBlockNumber,
            fields.noteHashReadRequests,
            fields.nullifierReadRequests,
            fields.keyValidationRequestsAndGenerators,
            fields.noteHashes,
            fields.nullifiers,
            fields.privateCallRequests,
            fields.publicCallStackHashes,
            fields.publicTeardownFunctionHash,
            fields.l2ToL1Msgs,
            fields.startSideEffectCounter,
            fields.endSideEffectCounter,
            fields.noteEncryptedLogsHashes,
            fields.encryptedLogsHashes,
            fields.unencryptedLogsHashes,
            fields.historicalHeader,
            fields.txContext,
        ];
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...PrivateCircuitPublicInputs.getFields(this));
    }
    /**
     * Serialize this as a field array.
     */
    toFields() {
        const fields = serializeToFields(...PrivateCircuitPublicInputs.getFields(this));
        if (fields.length !== PRIVATE_CIRCUIT_PUBLIC_INPUTS_LENGTH) {
            throw new Error(`Invalid number of fields for PrivateCircuitPublicInputs. Expected ${PRIVATE_CIRCUIT_PUBLIC_INPUTS_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.PRIVATE_CIRCUIT_PUBLIC_INPUTS);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9jaXJjdWl0X3B1YmxpY19pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wcml2YXRlX2NpcmN1aXRfcHVibGljX2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUNMLFlBQVksRUFDWixXQUFXLEVBRVgsaUJBQWlCLEVBQ2pCLGlCQUFpQixHQUNsQixNQUFNLDZCQUE2QixDQUFDO0FBR3JDLE9BQU8sRUFDTCxjQUFjLEVBQ2QsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQywwQkFBMEIsRUFDMUIsZ0NBQWdDLEVBQ2hDLHdCQUF3QixFQUN4QixvQ0FBb0MsRUFDcEMsdUJBQXVCLEVBQ3ZCLG9DQUFvQyxFQUNwQyxzQ0FBc0MsRUFDdEMscUNBQXFDLEVBQ3JDLDZCQUE2QixFQUM3QixvQ0FBb0MsR0FDckMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxF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