import { type Tuple } from '../serialize/types.js';
import { Fr } from './fields.js';
/**
 * Class to wrap a single point coordinate.
 * This class handles the complexities of representing point coordinates as 32 byte buffers as well as fields.
 * The coordinate value is split across 2 fields to ensure that the max size of a field is not breached.
 * This is achieved by placing the most significant byte of the lower field into the least significant byte of the higher field.
 * Calls to 'toBuffer' or 'toBigInt' undo this change and simply return the original 32 byte value.
 * Calls to 'toFieldsBuffer' will return a 64 bytes buffer containing the serialized fields.
 */
export declare class Coordinate {
    /**
     * The fields of the coordinate value. Least significant limb at index 0.
     */
    fields: Tuple<Fr, 2>;
    static ZERO: Coordinate;
    constructor(
    /**
     * The fields of the coordinate value. Least significant limb at index 0.
     */
    fields: Tuple<Fr, 2>);
    /**
     * Converts the coordinate data into a tuple of fields
     * @returns A tuple of the coordinate fields
     */
    toFields(): Tuple<Fr, 2>;
    /**
     * Generates a random coordinate value
     * @returns The random coordinate
     */
    static random(): Coordinate;
    /**
     * serializes the object to buffer of 2 fields.
     * @returns A buffer serialization of the object.
     */
    toFieldsBuffer(): Buffer;
    /**
     * serializes the coordinate to a single 32 byte buffer.
     * @returns A buffer serialization of the object.
     */
    toBuffer(): Buffer;
    /**
     * Returns true if this coordinate is equal to the one provided
     * @param other - The coordinate against which to compare
     * @returns True if the coordinates are the same, false otherwise
     */
    equals(other: Coordinate): boolean;
    /**
     * Returns the coordinate's value as a bigint
     * @returns The coordinate value as a bigint
     */
    toBigInt(): bigint;
    /**
     * Creates a coordinate object from a 32 byte coordinate value
     * @param coordinate - A buffer containing the 32 byte coordinate value
     * @returns The new coordinate object
     */
    static fromBuffer(coordinate: Buffer): Coordinate;
    /**
     * Creates a coordinate object from a field
     * @param coordinate - The field containing the coordinate
     * @returns The new coordinate object
     */
    static fromField(coordinate: Fr): Coordinate;
}
//# sourceMappingURL=coordinate.d.ts.map