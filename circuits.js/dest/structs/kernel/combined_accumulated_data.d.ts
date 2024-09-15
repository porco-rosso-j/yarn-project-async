import { type FieldsOf } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX } from '../../constants.gen.js';
import { Gas } from '../gas.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
/**
 * Data that is accumulated during the execution of the transaction.
 */
export declare class CombinedAccumulatedData {
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes: Tuple<Fr, typeof MAX_NOTE_HASHES_PER_TX>;
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers: Tuple<Fr, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs: Tuple<Fr, typeof MAX_L2_TO_L1_MSGS_PER_TX>;
    /**
     * Accumulated encrypted note logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHash: Fr;
    /**
     * Accumulated encrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHash: Fr;
    /**
     * Accumulated unencrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHash: Fr;
    /**
     * Total accumulated length of the encrypted note log preimages emitted in all the previous kernel iterations
     */
    noteEncryptedLogPreimagesLength: Fr;
    /**
     * Total accumulated length of the encrypted log preimages emitted in all the previous kernel iterations
     */
    encryptedLogPreimagesLength: Fr;
    /**
     * Total accumulated length of the unencrypted log preimages emitted in all the previous kernel iterations
     */
    unencryptedLogPreimagesLength: Fr;
    /**
     * All the public data update requests made in this transaction.
     */
    publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /** Gas used during this transaction */
    gasUsed: Gas;
    constructor(
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes: Tuple<Fr, typeof MAX_NOTE_HASHES_PER_TX>, 
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers: Tuple<Fr, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs: Tuple<Fr, typeof MAX_L2_TO_L1_MSGS_PER_TX>, 
    /**
     * Accumulated encrypted note logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHash: Fr, 
    /**
     * Accumulated encrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHash: Fr, 
    /**
     * Accumulated unencrypted logs hash from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHash: Fr, 
    /**
     * Total accumulated length of the encrypted note log preimages emitted in all the previous kernel iterations
     */
    noteEncryptedLogPreimagesLength: Fr, 
    /**
     * Total accumulated length of the encrypted log preimages emitted in all the previous kernel iterations
     */
    encryptedLogPreimagesLength: Fr, 
    /**
     * Total accumulated length of the unencrypted log preimages emitted in all the previous kernel iterations
     */
    unencryptedLogPreimagesLength: Fr, 
    /**
     * All the public data update requests made in this transaction.
     */
    publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /** Gas used during this transaction */
    gasUsed: Gas);
    getSize(): number;
    static getFields(fields: FieldsOf<CombinedAccumulatedData>): readonly [[Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], Fr, Fr, Fr, Fr, Fr, Fr, [PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest, PublicDataUpdateRequest], Gas];
    static from(fields: FieldsOf<CombinedAccumulatedData>): CombinedAccumulatedData;
    toBuffer(): Buffer;
    toString(): string;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CombinedAccumulatedData;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str: string): CombinedAccumulatedData;
    static empty(): CombinedAccumulatedData;
    [inspect.custom](): string;
}
//# sourceMappingURL=combined_accumulated_data.d.ts.map