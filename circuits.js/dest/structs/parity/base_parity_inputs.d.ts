import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP, NUM_MSGS_PER_BASE_PARITY } from '../../constants.gen.js';
export declare class BaseParityInputs {
    /** Aggregated proof of all the parity circuit iterations. */
    readonly msgs: Tuple<Fr, typeof NUM_MSGS_PER_BASE_PARITY>;
    /** Root of the VK tree */
    readonly vkTreeRoot: Fr;
    constructor(
    /** Aggregated proof of all the parity circuit iterations. */
    msgs: Tuple<Fr, typeof NUM_MSGS_PER_BASE_PARITY>, 
    /** Root of the VK tree */
    vkTreeRoot: Fr);
    static fromSlice(array: Tuple<Fr, typeof NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP>, index: number, vkTreeRoot: Fr): BaseParityInputs;
    /** Serializes the inputs to a buffer. */
    toBuffer(): Buffer;
    /** Serializes the inputs to a hex string. */
    toString(): string;
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     */
    static fromBuffer(buffer: Buffer | BufferReader): BaseParityInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - The hex string to deserialize from.
     * @returns - The deserialized inputs.
     */
    static fromString(str: string): BaseParityInputs;
}
//# sourceMappingURL=base_parity_inputs.d.ts.map