import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
/**
 * Essential members and functions of all SideEffect variants
 */
export interface SideEffectType {
    /** The actual value associated with the SideEffect */
    value: Fr;
    /** The counter associated with the SideEffect */
    counter: Fr;
    /** Convert to a buffer */
    toBuffer(): Buffer;
    /** Convert to a field array */
    toFields(): Fr[];
    /** Are all of the fields of the SideEffect zero? */
    isEmpty(): boolean;
}
/**
 * Side-effect object consisting of a value and a counter.
 * cpp/src/aztec3/circuits/abis/side_effects.hpp.
 */
export declare class SideEffect implements SideEffectType {
    /**
     * The value of the side-effect object.
     */
    value: Fr;
    /**
     * The side-effect counter.
     */
    counter: Fr;
    constructor(
    /**
     * The value of the side-effect object.
     */
    value: Fr, 
    /**
     * The side-effect counter.
     */
    counter: Fr);
    toString(): string;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): SideEffect;
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    isEmpty(): boolean;
    /**
     * Checks whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    static isEmpty(sideEffect: SideEffect): boolean;
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with both value and counter being zero.
     */
    static empty(): SideEffect;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of SideEffect.
     */
    static fromBuffer(buffer: Buffer | BufferReader): SideEffect;
}
//# sourceMappingURL=side_effects.d.ts.map