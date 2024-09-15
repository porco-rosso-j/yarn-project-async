import { makeTuple } from '@aztec/foundation/array';
import { arraySerializedSizeOfNonEmpty } from '@aztec/foundation/collection';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_KEY_VALIDATION_REQUESTS_PER_TX, MAX_NOTE_HASH_READ_REQUESTS_PER_TX, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_PUBLIC_DATA_READS_PER_TX, } from '../constants.gen.js';
import { PublicDataRead } from './public_data_read_request.js';
import { ScopedReadRequest } from './read_request.js';
import { RollupValidationRequests } from './rollup_validation_requests.js';
import { ScopedKeyValidationRequestAndGenerator } from './scoped_key_validation_request_and_generator.js';
/**
 * Validation requests accumulated during the execution of the transaction.
 */
export class ValidationRequests {
    constructor(
    /**
     * Validation requests that cannot be fulfilled in the current context (private or public), and must be instead be
     * forwarded to the rollup for it to take care of them.
     */
    forRollup, 
    /**
     * All the read requests made in this transaction.
     */
    noteHashReadRequests, 
    /**
     * All the nullifier read requests made in this transaction.
     */
    nullifierReadRequests, 
    /**
     * The nullifier read requests made in this transaction.
     */
    nullifierNonExistentReadRequests, 
    /**
     * All the key validation requests made in this transaction.
     */
    scopedKeyValidationRequestsAndGenerators, 
    /**
     * All the public data reads made in this transaction.
     */
    publicDataReads) {
        this.forRollup = forRollup;
        this.noteHashReadRequests = noteHashReadRequests;
        this.nullifierReadRequests = nullifierReadRequests;
        this.nullifierNonExistentReadRequests = nullifierNonExistentReadRequests;
        this.scopedKeyValidationRequestsAndGenerators = scopedKeyValidationRequestsAndGenerators;
        this.publicDataReads = publicDataReads;
    }
    getSize() {
        return (this.forRollup.getSize() +
            arraySerializedSizeOfNonEmpty(this.noteHashReadRequests) +
            arraySerializedSizeOfNonEmpty(this.nullifierReadRequests) +
            arraySerializedSizeOfNonEmpty(this.nullifierNonExistentReadRequests) +
            arraySerializedSizeOfNonEmpty(this.scopedKeyValidationRequestsAndGenerators) +
            arraySerializedSizeOfNonEmpty(this.publicDataReads));
    }
    toBuffer() {
        return serializeToBuffer(this.forRollup, this.noteHashReadRequests, this.nullifierReadRequests, this.nullifierNonExistentReadRequests, this.scopedKeyValidationRequestsAndGenerators, this.publicDataReads);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ValidationRequests(reader.readObject(RollupValidationRequests), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_KEY_VALIDATION_REQUESTS_PER_TX, ScopedKeyValidationRequestAndGenerator), reader.readArray(MAX_PUBLIC_DATA_READS_PER_TX, PublicDataRead));
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ValidationRequests(reader.readObject(RollupValidationRequests), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, ScopedReadRequest), reader.readArray(MAX_KEY_VALIDATION_REQUESTS_PER_TX, ScopedKeyValidationRequestAndGenerator), reader.readArray(MAX_PUBLIC_DATA_READS_PER_TX, PublicDataRead));
    }
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str) {
        return ValidationRequests.fromBuffer(Buffer.from(str, 'hex'));
    }
    static empty() {
        return new ValidationRequests(RollupValidationRequests.empty(), makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, ScopedReadRequest.empty), makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_TX, ScopedReadRequest.empty), makeTuple(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, ScopedReadRequest.empty), makeTuple(MAX_KEY_VALIDATION_REQUESTS_PER_TX, ScopedKeyValidationRequestAndGenerator.empty), makeTuple(MAX_PUBLIC_DATA_READS_PER_TX, PublicDataRead.empty));
    }
    [inspect.custom]() {
        return `ValidationRequests {
  forRollup: ${inspect(this.forRollup)},
  noteHashReadRequests: [${this.noteHashReadRequests
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  nullifierReadRequests: [${this.nullifierReadRequests
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  nullifierNonExistentReadRequests: [${this.nullifierNonExistentReadRequests
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  scopedKeyValidationRequestsAndGenerators: [${this.scopedKeyValidationRequestsAndGenerators
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}],
  publicDataReads: [${this.publicDataReads
            .filter(x => !x.isEmpty())
            .map(h => inspect(h))
            .join(', ')}]
}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbl9yZXF1ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3ZhbGlkYXRpb25fcmVxdWVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQ0wsa0NBQWtDLEVBQ2xDLGtDQUFrQyxFQUNsQywrQ0FBK0MsRUFDL0Msa0NBQWtDLEVBQ2xDLDRCQUE0QixHQUM3QixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUUxRzs7R0FFRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7SUFDRTs7O09BR0c7SUFDSSxTQUFtQztJQUMxQzs7T0FFRztJQUNJLG9CQUF5RjtJQUNoRzs7T0FFRztJQUNJLHFCQUEwRjtJQUNqRzs7T0FFRztJQUNJLGdDQUdOO0lBQ0Q7O09BRUc7SUFDSSx3Q0FHTjtJQUNEOztPQUVHO0lBQ0ksZUFBMkU7UUExQjNFLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBSW5DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUU7UUFJekYsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFxRTtRQUkxRixxQ0FBZ0MsR0FBaEMsZ0NB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