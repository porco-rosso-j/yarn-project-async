import { Fr } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * Packs a set of values into a hash.
 */
export declare class PackedValues {
    /**
     *  Raw values.
     */
    readonly values: Fr[];
    /**
     * The hash of the raw values
     */
    readonly hash: Fr;
    private constructor();
    static fromValues(values: Fr[]): Promise<PackedValues>;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): PackedValues;
}
//# sourceMappingURL=packed_values.d.ts.map