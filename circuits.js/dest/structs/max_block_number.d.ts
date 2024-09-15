import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
/**
 * Maximum block number.
 */
export declare class MaxBlockNumber {
    /**
     * Whether a max block number was requested.
     */
    isSome: boolean;
    /**
     * The requested max block number, if isSome is true.
     */
    value: Fr;
    constructor(
    /**
     * Whether a max block number was requested.
     */
    isSome: boolean, 
    /**
     * The requested max block number, if isSome is true.
     */
    value: Fr);
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserializes MaxBlockNumber from a buffer or reader.
     * @param buffer - Buffer to read from.
     * @returns The MaxBlockNumber.
     */
    static fromBuffer(buffer: Buffer | BufferReader): MaxBlockNumber;
    static fromFields(fields: Fr[] | FieldReader): MaxBlockNumber;
    static empty(): MaxBlockNumber;
    isEmpty(): boolean;
    /**
     * Create a new instance from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A new instance.
     */
    static from(fields: FieldsOf<MaxBlockNumber>): MaxBlockNumber;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<MaxBlockNumber>): readonly [boolean, Fr];
}
//# sourceMappingURL=max_block_number.d.ts.map