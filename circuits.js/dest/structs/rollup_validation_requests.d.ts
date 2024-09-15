import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { MaxBlockNumber } from './max_block_number.js';
/**
 * Validation requests directed at the rollup, accumulated during the execution of the transaction.
 */
export declare class RollupValidationRequests {
    /**
     * The largest block number in which this transaction can be included.
     */
    maxBlockNumber: MaxBlockNumber;
    constructor(
    /**
     * The largest block number in which this transaction can be included.
     */
    maxBlockNumber: MaxBlockNumber);
    getSize(): number;
    toBuffer(): Buffer;
    toString(): string;
    static fromFields(fields: Fr[] | FieldReader): RollupValidationRequests;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): RollupValidationRequests;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str: string): RollupValidationRequests;
    static empty(): RollupValidationRequests;
}
//# sourceMappingURL=rollup_validation_requests.d.ts.map