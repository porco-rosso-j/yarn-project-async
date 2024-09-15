import { makeTuple } from '@aztec/foundation/array';
import { arraySerializedSizeOfNonEmpty } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, } from '../../constants.gen.js';
import { Gas } from '../gas.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
/**
 * Data that is accumulated during the execution of the transaction.
 */
export class CombinedAccumulatedData {
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
     * Accumulated encrypted note logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHash, 
    /**
     * Accumulated encrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHash, 
    /**
     * Accumulated unencrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHash, 
    /**
     * Total accumulated length of the encrypted note log preimages emitted in all the previous kernel iterations
     */
    noteEncryptedLogPreimagesLength, 
    /**
     * Total accumulated length of the encrypted log preimages emitted in all the previous kernel iterations
     */
    encryptedLogPreimagesLength, 
    /**
     * Total accumulated length of the unencrypted log preimages emitted in all the previous kernel iterations
     */
    unencryptedLogPreimagesLength, 
    /**
     * All the public data update requests made in this transaction.
     */
    publicDataUpdateRequests, 
    /** Gas used during this transaction */
    gasUsed) {
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.noteEncryptedLogsHash = noteEncryptedLogsHash;
        this.encryptedLogsHash = encryptedLogsHash;
        this.unencryptedLogsHash = unencryptedLogsHash;
        this.noteEncryptedLogPreimagesLength = noteEncryptedLogPreimagesLength;
        this.encryptedLogPreimagesLength = encryptedLogPreimagesLength;
        this.unencryptedLogPreimagesLength = unencryptedLogPreimagesLength;
        this.publicDataUpdateRequests = publicDataUpdateRequests;
        this.gasUsed = gasUsed;
    }
    getSize() {
        return (arraySerializedSizeOfNonEmpty(this.noteHashes) +
            arraySerializedSizeOfNonEmpty(this.nullifiers) +
            arraySerializedSizeOfNonEmpty(this.l2ToL1Msgs) +
            this.noteEncryptedLogsHash.size +
            this.encryptedLogsHash.size +
            this.unencryptedLogsHash.size +
            this.noteEncryptedLogPreimagesLength.size +
            this.encryptedLogPreimagesLength.size +
            this.unencryptedLogPreimagesLength.size +
            arraySerializedSizeOfNonEmpty(this.publicDataUpdateRequests) +
            this.gasUsed.toBuffer().length);
    }
    static getFields(fields) {
        return [
            fields.noteHashes,
            fields.nullifiers,
            fields.l2ToL1Msgs,
            fields.noteEncryptedLogsHash,
            fields.encryptedLogsHash,
            fields.unencryptedLogsHash,
            fields.noteEncryptedLogPreimagesLength,
            fields.encryptedLogPreimagesLength,
            fields.unencryptedLogPreimagesLength,
            fields.publicDataUpdateRequests,
            fields.gasUsed,
        ];
    }
    static from(fields) {
        return new CombinedAccumulatedData(...CombinedAccumulatedData.getFields(fields));
    }
    toBuffer() {
        return serializeToBuffer(...CombinedAccumulatedData.getFields(this));
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CombinedAccumulatedData(reader.readArray(MAX_NOTE_HASHES_PER_TX, Fr), reader.readArray(MAX_NULLIFIERS_PER_TX, Fr), reader.readArray(MAX_L2_TO_L1_MSGS_PER_TX, Fr), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest), reader.readObject(Gas));
    }
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str) {
        return CombinedAccumulatedData.fromBuffer(Buffer.from(str, 'hex'));
    }
    static empty() {
        return new CombinedAccumulatedData(makeTuple(MAX_NOTE_HASHES_PER_TX, Fr.zero), makeTuple(MAX_NULLIFIERS_PER_TX, Fr.zero), makeTuple(MAX_L2_TO_L1_MSGS_PER_TX, Fr.zero), Fr.zero(), Fr.zero(), Fr.zero(), Fr.zero(), Fr.zero(), Fr.zero(), makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest.empty), Gas.empty());
    }
    [inspect.custom]() {
        return `CombinedAccumulatedData {
      noteHashes: [${this.noteHashes
            .filter(x => !x.isZero())
            .map(x => inspect(x))
            .join(', ')}],
      nullifiers: [${this.nullifiers
            .filter(x => !x.isZero())
            .map(x => inspect(x))
            .join(', ')}],
      l2ToL1Msgs: [${this.l2ToL1Msgs
            .filter(x => !x.isZero())
            .map(x => inspect(x))
            .join(', ')}],
      noteEncryptedLogsHash: ${this.noteEncryptedLogsHash.toString()},
      encryptedLogsHash: ${this.encryptedLogsHash.toString()},
      unencryptedLogsHash: ${this.unencryptedLogsHash.toString()},
      noteEncryptedLogPreimagesLength: ${this.noteEncryptedLogPreimagesLength.toString()},
      encryptedLogPreimagesLength: ${this.encryptedLogPreimagesLength.toString()},
      unencryptedLogPreimagesLength: ${this.unencryptedLogPreimagesLength.toString()},
      publicDataUpdateRequests: [${this.publicDataUpdateRequests
            .filter(x => !x.isEmpty())
            .map(x => inspect(x))
            .join(', ')}],
      gasUsed: ${inspect(this.gasUsed)}
    }`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZWRfYWNjdW11bGF0ZWRfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9jb21iaW5lZF9hY2N1bXVsYXRlZF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0UsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixzQ0FBc0MsR0FDdkMsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTNFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQztJQUNFOztPQUVHO0lBQ0ksVUFBb0Q7SUFDM0Q7O09BRUc7SUFDSSxVQUFtRDtJQUMxRDs7T0FFRztJQUNJLFVBQXNEO0lBQzdEOzs7T0FHRztJQUNJLHFCQUF5QjtJQUNoQzs7O09BR0c7SUFDSSxpQkFBcUI7SUFDNUI7OztPQUdHO0lBQ0ksbUJBQXVCO0lBQzlCOztPQUVHO0lBQ0ksK0JBQW1DO0lBQzFDOztPQUVHO0lBQ0ksMkJBQStCO0lBQ3RDOztPQUVHO0lBQ0ksNkJBQWlDO0lBQ3hDOztPQUVHO0lBQ0ksd0JBQXVHO0lBRTlHLHVDQUF1QztJQUNoQyxPQUFZO1FBMUNaLGVBQVUsR0FBVixVQUFVLENBQTBDO1FBSXBELGVBQVUs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