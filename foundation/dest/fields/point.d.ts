import { BufferReader, FieldReader } from '../serialize/index.js';
import { Fr } from './fields.js';
/**
 * Represents a Point on an elliptic curve with x and y coordinates.
 * The Point class provides methods for creating instances from different input types,
 * converting instances to various output formats, and checking the equality of points.
 */
export declare class Point {
    /**
     * The point's x coordinate
     */
    readonly x: Fr;
    /**
     * The point's y coordinate
     */
    readonly y: Fr;
    /**
     * Whether the point is at infinity
     */
    readonly isInfinite: boolean;
    static ZERO: Point;
    static SIZE_IN_BYTES: number;
    /** Used to differentiate this class from AztecAddress */
    readonly kind = "point";
    constructor(
    /**
     * The point's x coordinate
     */
    x: Fr, 
    /**
     * The point's y coordinate
     */
    y: Fr, 
    /**
     * Whether the point is at infinity
     */
    isInfinite: boolean);
    /**
     * Generate a random Point instance.
     *
     * @returns A randomly generated Point instance.
     */
    static random(): Point;
    /**
     * Create a Point instance from a given buffer or BufferReader.
     * The input 'buffer' should have exactly 64 bytes representing the x and y coordinates.
     *
     * @param buffer - The buffer or BufferReader containing the x and y coordinates of the point.
     * @returns A Point instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): Point;
    /**
     * Create a Point instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 128 hex characters representing the x and y coordinates.
     * Throws an error if the input length is invalid or coordinate values are out of range.
     *
     * @param address - The hex-encoded string representing the Point coordinates.
     * @returns A Point instance.
     */
    static fromString(address: string): Point;
    /**
     * Returns the contents of the point as an array of 2 fields.
     * @returns The point as an array of 2 fields
     */
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): Point;
    /**
     * Returns the contents of the point as BigInts.
     * @returns The point as BigInts
     */
    toBigInts(): {
        x: bigint;
        y: bigint;
        isInfinite: bigint;
    };
    /**
     * Converts the Point instance to a Buffer representation of the coordinates.
     * @returns A Buffer representation of the Point instance.
     * @dev Note that toBuffer does not include the isInfinite flag and other serialization methods do (e.g. toFields).
     * This is because currently when we work with point as bytes we don't want to populate the extra bytes for
     * isInfinite flag because:
     * 1. Our Grumpkin BB API currently does not handle point at infinity,
     * 2. we use toBuffer when serializing notes and events and there we only work with public keys and point at infinity
     *   is not considered a valid public key and the extra byte would raise DA cost.
     */
    toBuffer(): Buffer;
    /**
     * Convert the Point instance to a hexadecimal string representation.
     * The output string is prefixed with '0x' and consists of exactly 128 hex characters,
     * representing the concatenated x and y coordinates of the point.
     *
     * @returns A hex-encoded string representing the Point instance.
     */
    toString(): string;
    /**
     * Generate a short string representation of the Point instance.
     * The returned string includes the first 10 and last 4 characters of the full string representation,
     * with '...' in between to indicate truncation. This is useful for displaying or logging purposes
     * when the full string representation may be too long.
     *
     * @returns A truncated string representation of the Point instance.
     */
    toShortString(): string;
    toNoirStruct(): {
        x: Fr;
        y: Fr;
        is_infinite: boolean;
    };
    /**
     * Check if two Point instances are equal by comparing their buffer values.
     * Returns true if the buffer values are the same, and false otherwise.
     *
     * @param rhs - The Point instance to compare with the current instance.
     * @returns A boolean indicating whether the two Point instances are equal.
     */
    equals(rhs: Point): boolean;
    isZero(): boolean;
    hash(): Promise<Fr>;
    /**
     * Check if this is point at infinity.
     * Check this is consistent with how bb is encoding the point at infinity
     */
    get inf(): boolean;
    isOnGrumpkin(): boolean;
}
/**
 * Does this object look like a point?
 * @param obj - Object to test if it is a point.
 * @returns Whether it looks like a point.
 */
export declare function isPoint(obj: object): obj is Point;
//# sourceMappingURL=point.d.ts.map