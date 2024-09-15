import { makeTuple } from '@aztec/foundation/array';
import { arraySerializedSizeOfNonEmpty } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX, } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { Gas } from '../gas.js';
import { LogHash } from '../log_hash.js';
import { NoteHash } from '../note_hash.js';
import { Nullifier } from '../nullifier.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
export class PublicAccumulatedData {
    constructor(
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes, 
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers, 
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs, 
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes, 
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes, 
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes, 
    /**
     * All the public data update requests made in this transaction.
     */
    publicDataUpdateRequests, 
    /**
     * Current public call stack.
     */
    publicCallStack, 
    /** Gas used so far by the transaction. */
    gasUsed) {
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.noteEncryptedLogsHashes = noteEncryptedLogsHashes;
        this.encryptedLogsHashes = encryptedLogsHashes;
        this.unencryptedLogsHashes = unencryptedLogsHashes;
        this.publicDataUpdateRequests = publicDataUpdateRequests;
        this.publicCallStack = publicCallStack;
        this.gasUsed = gasUsed;
    }
    getSize() {
        return (arraySerializedSizeOfNonEmpty(this.noteHashes) +
            arraySerializedSizeOfNonEmpty(this.nullifiers) +
            arraySerializedSizeOfNonEmpty(this.l2ToL1Msgs) +
            arraySerializedSizeOfNonEmpty(this.noteEncryptedLogsHashes) +
            arraySerializedSizeOfNonEmpty(this.encryptedLogsHashes) +
            arraySerializedSizeOfNonEmpty(this.unencryptedLogsHashes) +
            arraySerializedSizeOfNonEmpty(this.publicDataUpdateRequests) +
            arraySerializedSizeOfNonEmpty(this.publicCallStack) +
            this.gasUsed.toBuffer().length);
    }
    toBuffer() {
        return serializeToBuffer(this.noteHashes, this.nullifiers, this.l2ToL1Msgs, this.noteEncryptedLogsHashes, this.encryptedLogsHashes, this.unencryptedLogsHashes, this.publicDataUpdateRequests, this.publicCallStack, this.gasUsed);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    isEmpty() {
        return (this.noteHashes.every(x => x.isEmpty()) &&
            this.nullifiers.every(x => x.isEmpty()) &&
            this.l2ToL1Msgs.every(x => x.isZero()) &&
            this.noteEncryptedLogsHashes.every(x => x.isEmpty()) &&
            this.encryptedLogsHashes.every(x => x.isEmpty()) &&
            this.unencryptedLogsHashes.every(x => x.isEmpty()) &&
            this.publicDataUpdateRequests.every(x => x.isEmpty()) &&
            this.publicCallStack.every(x => x.isEmpty()) &&
            this.gasUsed.isEmpty());
    }
    [inspect.custom]() {
        // print out the non-empty fields
        return `PublicAccumulatedData {
  noteHashes: [${this.noteHashes
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  nullifiers: [${this.nullifiers
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  l2ToL1Msgs: [${this.l2ToL1Msgs
            .filter(x => !x.isZero())
            .map(h => inspect(h))
            .join(', ')}],
  noteEncryptedLogsHashes: [${this.noteEncryptedLogsHashes
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  encryptedLogsHashes: [${this.encryptedLogsHashes
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  unencryptedLogsHashes: [${this.unencryptedLogsHashes
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  publicDataUpdateRequests: [${this.publicDataUpdateRequests
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  publicCallStack: [${this.publicCallStack
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  gasUsed: [${inspect(this.gasUsed)}]
}`;
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(reader.readArray(MAX_NOTE_HASHES_PER_TX, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_TX, Nullifier), reader.readArray(MAX_L2_TO_L1_MSGS_PER_TX, Fr), reader.readArray(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_ENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest), reader.readObject(Gas));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new this(reader.readArray(MAX_NOTE_HASHES_PER_TX, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_TX, Nullifier), reader.readFieldArray(MAX_L2_TO_L1_MSGS_PER_TX), reader.readArray(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_ENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_TX, LogHash), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest), reader.readObject(Gas));
    }
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str) {
        return this.fromBuffer(Buffer.from(str, 'hex'));
    }
    static empty() {
        return new this(makeTuple(MAX_NOTE_HASHES_PER_TX, NoteHash.empty), makeTuple(MAX_NULLIFIERS_PER_TX, Nullifier.empty), makeTuple(MAX_L2_TO_L1_MSGS_PER_TX, Fr.zero), makeTuple(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, LogHash.empty), makeTuple(MAX_ENCRYPTED_LOGS_PER_TX, LogHash.empty), makeTuple(MAX_UNENCRYPTED_LOGS_PER_TX, LogHash.empty), makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest.empty), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest.empty), Gas.empty());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FjY3VtdWxhdGVkX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwvcHVibGljX2FjY3VtdWxhdGVkX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qix3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsbUNBQW1DLEVBQ25DLHNDQUFzQyxFQUN0QywyQkFBMkIsR0FDNUIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUUzRSxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDO0lBQ0U7O09BRUc7SUFDYSxVQUEwRDtJQUMxRTs7T0FFRztJQUNhLFVBQTBEO0lBQzFFOztPQUVHO0lBQ2EsVUFBc0Q7SUFDdEU7OztPQUdHO0lB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