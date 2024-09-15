import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, type Tuple } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { Gas } from '../gas.js';
import { LogHash } from '../log_hash.js';
import { NoteHash } from '../note_hash.js';
import { Nullifier } from '../nullifier.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
export declare class PublicAccumulatedData {
    /**
     * The new note hashes made in this transaction.
     */
    readonly noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_TX>;
    /**
     * The new nullifiers made in this transaction.
     */
    readonly nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    readonly l2ToL1Msgs: Tuple<Fr, typeof MAX_L2_TO_L1_MSGS_PER_TX>;
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    readonly noteEncryptedLogsHashes: Tuple<LogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_TX>;
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    readonly encryptedLogsHashes: Tuple<LogHash, typeof MAX_ENCRYPTED_LOGS_PER_TX>;
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    readonly unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_TX>;
    /**
     * All the public data update requests made in this transaction.
     */
    readonly publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /**
     * Current public call stack.
     */
    readonly publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>;
    /** Gas used so far by the transaction. */
    readonly gasUsed: Gas;
    constructor(
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_TX>, 
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs: Tuple<Fr, typeof MAX_L2_TO_L1_MSGS_PER_TX>, 
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes: Tuple<LogHash, typeof MAX_NOTE_ENCRYPTED_LOGS_PER_TX>, 
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes: Tuple<LogHash, typeof MAX_ENCRYPTED_LOGS_PER_TX>, 
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_TX>, 
    /**
     * All the public data update requests made in this transaction.
     */
    publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /**
     * Current public call stack.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>, 
    /** Gas used so far by the transaction. */
    gasUsed: Gas);
    getSize(): number;
    toBuffer(): Buffer;
    toString(): string;
    isEmpty(): boolean;
    [inspect.custom](): string;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicAccumulatedData;
    static fromFields(fields: Fr[] | FieldReader): PublicAccumulatedData;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str: string): PublicAccumulatedData;
    static empty(): PublicAccumulatedData;
}
//# sourceMappingURL=public_accumulated_data.d.ts.map