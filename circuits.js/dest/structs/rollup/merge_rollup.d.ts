import { BufferReader } from '@aztec/foundation/serialize';
import { PreviousRollupData } from './previous_rollup_data.js';
/**
 * Represents inputs of the merge rollup circuit.
 */
export declare class MergeRollupInputs {
    /**
     * Previous rollup data from the 2 merge or base rollup circuits that preceded this merge rollup circuit.
     */
    previousRollupData: [PreviousRollupData, PreviousRollupData];
    constructor(
    /**
     * Previous rollup data from the 2 merge or base rollup circuits that preceded this merge rollup circuit.
     */
    previousRollupData: [PreviousRollupData, PreviousRollupData]);
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new MergeRollupInputs instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): MergeRollupInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new MergeRollupInputs instance.
     */
    static fromString(str: string): MergeRollupInputs;
}
//# sourceMappingURL=merge_rollup.d.ts.map