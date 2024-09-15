import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, type Tuple } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_KEY_VALIDATION_REQUESTS_PER_TX, MAX_NOTE_HASH_READ_REQUESTS_PER_TX, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_PUBLIC_DATA_READS_PER_TX } from '../constants.gen.js';
import { PublicDataRead } from './public_data_read_request.js';
import { ScopedReadRequest } from './read_request.js';
import { RollupValidationRequests } from './rollup_validation_requests.js';
import { ScopedKeyValidationRequestAndGenerator } from './scoped_key_validation_request_and_generator.js';
/**
 * Validation requests accumulated during the execution of the transaction.
 */
export declare class ValidationRequests {
    /**
     * Validation requests that cannot be fulfilled in the current context (private or public), and must be instead be
     * forwarded to the rollup for it to take care of them.
     */
    forRollup: RollupValidationRequests;
    /**
     * All the read requests made in this transaction.
     */
    noteHashReadRequests: Tuple<ScopedReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX>;
    /**
     * All the nullifier read requests made in this transaction.
     */
    nullifierReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>;
    /**
     * The nullifier read requests made in this transaction.
     */
    nullifierNonExistentReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX>;
    /**
     * All the key validation requests made in this transaction.
     */
    scopedKeyValidationRequestsAndGenerators: Tuple<ScopedKeyValidationRequestAndGenerator, typeof MAX_KEY_VALIDATION_REQUESTS_PER_TX>;
    /**
     * All the public data reads made in this transaction.
     */
    publicDataReads: Tuple<PublicDataRead, typeof MAX_PUBLIC_DATA_READS_PER_TX>;
    constructor(
    /**
     * Validation requests that cannot be fulfilled in the current context (private or public), and must be instead be
     * forwarded to the rollup for it to take care of them.
     */
    forRollup: RollupValidationRequests, 
    /**
     * All the read requests made in this transaction.
     */
    noteHashReadRequests: Tuple<ScopedReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX>, 
    /**
     * All the nullifier read requests made in this transaction.
     */
    nullifierReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>, 
    /**
     * The nullifier read requests made in this transaction.
     */
    nullifierNonExistentReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX>, 
    /**
     * All the key validation requests made in this transaction.
     */
    scopedKeyValidationRequestsAndGenerators: Tuple<ScopedKeyValidationRequestAndGenerator, typeof MAX_KEY_VALIDATION_REQUESTS_PER_TX>, 
    /**
     * All the public data reads made in this transaction.
     */
    publicDataReads: Tuple<PublicDataRead, typeof MAX_PUBLIC_DATA_READS_PER_TX>);
    getSize(): number;
    toBuffer(): Buffer;
    toString(): string;
    static fromFields(fields: Fr[] | FieldReader): ValidationRequests;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): ValidationRequests;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str: string): ValidationRequests;
    static empty(): ValidationRequests;
    [inspect.custom](): string;
}
//# sourceMappingURL=validation_requests.d.ts.map