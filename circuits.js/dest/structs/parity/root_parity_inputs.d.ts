import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { NUM_BASE_PARITY_PER_ROOT_PARITY, RECURSIVE_PROOF_LENGTH } from '../../constants.gen.js';
import { RootParityInput } from './root_parity_input.js';
export declare class RootParityInputs {
    /** Public inputs of children and their proofs. */
    readonly children: Tuple<RootParityInput<typeof RECURSIVE_PROOF_LENGTH>, typeof NUM_BASE_PARITY_PER_ROOT_PARITY>;
    constructor(
    /** Public inputs of children and their proofs. */
    children: Tuple<RootParityInput<typeof RECURSIVE_PROOF_LENGTH>, typeof NUM_BASE_PARITY_PER_ROOT_PARITY>);
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
     * @returns A new RootParityInputs instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): RootParityInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new RootParityInputs instance.
     */
    static fromString(str: string): RootParityInputs;
}
//# sourceMappingURL=root_parity_inputs.d.ts.map