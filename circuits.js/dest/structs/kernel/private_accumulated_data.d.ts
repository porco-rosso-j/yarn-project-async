import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { ScopedL2ToL1Message } from '../l2_to_l1_message.js';
import { NoteLogHash, ScopedEncryptedLogHash, ScopedLogHash } from '../log_hash.js';
import { ScopedNoteHash } from '../note_hash.js';
import { ScopedNullifier } from '../nullifier.js';
import { ScopedPrivateCallRequest } from '../private_call_request.js';
/**
 * Specific accumulated data structure for the final ordering private kernel circuit. It is included
 *  in the final public inputs of private kernel circuit.
 */
export declare class PrivateAccumulatedData {
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes: Tuple<ScopedNoteHash, typeof MAX_NOTE_HASHES_PER_TX>;
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers: Tuple<ScopedNullifier, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs: Tuple<ScopedL2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_TX>;
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes: Tuple<NoteLogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_TX>;
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes: Tuple<ScopedEncryptedLogHash, typeof MAX_ENCRYPTED_LOGS_PER_TX>;
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<ScopedLogHash, typeof MAX_UNENCRYPTED_LOGS_PER_TX>;
    /**
     * Current private call stack.
     */
    privateCallStack: Tuple<ScopedPrivateCallRequest, typeof MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX>;
    /**
     * Current public call stack.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>;
    constructor(
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes: Tuple<ScopedNoteHash, typeof MAX_NOTE_HASHES_PER_TX>, 
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers: Tuple<ScopedNullifier, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs: Tuple<ScopedL2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_TX>, 
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes: Tuple<NoteLogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_TX>, 
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes: Tuple<ScopedEncryptedLogHash, typeof MAX_ENCRYPTED_LOGS_PER_TX>, 
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<ScopedLogHash, typeof MAX_UNENCRYPTED_LOGS_PER_TX>, 
    /**
     * Current private call stack.
     */
    privateCallStack: Tuple<ScopedPrivateCallRequest, typeof MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX>, 
    /**
     * Current public call stack.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>);
    toBuffer(): Buffer;
    toString(): string;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateAccumulatedData;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str: string): PrivateAccumulatedData;
    static empty(): PrivateAccumulatedData;
}
//# sourceMappingURL=private_accumulated_data.d.ts.map