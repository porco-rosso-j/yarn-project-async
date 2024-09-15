import { poseidon2Hash } from '../crypto/index.js';
import { BufferReader, FieldReader, serializeToBuffer } from '../serialize/index.js';
import { Fr } from './fields.js';
/**
 * Represents a Point on an elliptic curve with x and y coordinates.
 * The Point class provides methods for creating instances from different input types,
 * converting instances to various output formats, and checking the equality of points.
 */
export class Point {
    constructor(
    /**
     * The point's x coordinate
     */
    x, 
    /**
     * The point's y coordinate
     */
    y, 
    /**
     * Whether the point is at infinity
     */
    isInfinite) {
        this.x = x;
        this.y = y;
        this.isInfinite = isInfinite;
        /** Used to differentiate this class from AztecAddress */
        this.kind = 'point';
        // TODO(#7386): check if on curve
    }
    /**
     * Generate a random Point instance.
     *
     * @returns A randomly generated Point instance.
     */
    static random() {
        // TODO make this return an actual point on curve.
        return new Point(Fr.random(), Fr.random(), false);
    }
    /**
     * Create a Point instance from a given buffer or BufferReader.
     * The input 'buffer' should have exactly 64 bytes representing the x and y coordinates.
     *
     * @param buffer - The buffer or BufferReader containing the x and y coordinates of the point.
     * @returns A Point instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(Fr.fromBuffer(reader), Fr.fromBuffer(reader), false);
    }
    /**
     * Create a Point instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 128 hex characters representing the x and y coordinates.
     * Throws an error if the input length is invalid or coordinate values are out of range.
     *
     * @param address - The hex-encoded string representing the Point coordinates.
     * @returns A Point instance.
     */
    static fromString(address) {
        return this.fromBuffer(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    /**
     * Returns the contents of the point as an array of 2 fields.
     * @returns The point as an array of 2 fields
     */
    toFields() {
        return [this.x, this.y, new Fr(this.isInfinite)];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new this(reader.readField(), reader.readField(), reader.readBoolean());
    }
    /**
     * Returns the contents of the point as BigInts.
     * @returns The point as BigInts
     */
    toBigInts() {
        return {
            x: this.x.toBigInt(),
            y: this.y.toBigInt(),
            isInfinite: this.isInfinite ? 1n : 0n,
        };
    }
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
    toBuffer() {
        if (this.isInfinite) {
            throw new Error('Cannot serialize infinite point without isInfinite flag');
        }
        const buf = serializeToBuffer([this.x, this.y]);
        if (buf.length !== Point.SIZE_IN_BYTES) {
            throw new Error(`Invalid buffer length for Point: ${buf.length}`);
        }
        return buf;
    }
    /**
     * Convert the Point instance to a hexadecimal string representation.
     * The output string is prefixed with '0x' and consists of exactly 128 hex characters,
     * representing the concatenated x and y coordinates of the point.
     *
     * @returns A hex-encoded string representing the Point instance.
     */
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    /**
     * Generate a short string representation of the Point instance.
     * The returned string includes the first 10 and last 4 characters of the full string representation,
     * with '...' in between to indicate truncation. This is useful for displaying or logging purposes
     * when the full string representation may be too long.
     *
     * @returns A truncated string representation of the Point instance.
     */
    toShortString() {
        const str = this.toString();
        return `${str.slice(0, 10)}...${str.slice(-4)}`;
    }
    toNoirStruct() {
        /* eslint-disable camelcase */
        return { x: this.x, y: this.y, is_infinite: this.isInfinite };
        /* eslint-enable camelcase */
    }
    /**
     * Check if two Point instances are equal by comparing their buffer values.
     * Returns true if the buffer values are the same, and false otherwise.
     *
     * @param rhs - The Point instance to compare with the current instance.
     * @returns A boolean indicating whether the two Point instances are equal.
     */
    equals(rhs) {
        return this.x.equals(rhs.x) && this.y.equals(rhs.y);
    }
    isZero() {
        return this.x.isZero() && this.y.isZero();
    }
    hash() {
        return poseidon2Hash(this.toFields());
    }
    /**
     * Check if this is point at infinity.
     * Check this is consistent with how bb is encoding the point at infinity
     */
    get inf() {
        return this.x.isZero() && this.y.isZero() && this.isInfinite;
    }
    isOnGrumpkin() {
        // TODO: Check this against how bb handles curve check and infinity point check
        if (this.inf) {
            return true;
        }
        // p.y * p.y == p.x * p.x * p.x - 17
        const A = new Fr(17);
        const lhs = this.y.square();
        const rhs = this.x.square().mul(this.x).sub(A);
        return lhs.equals(rhs);
    }
}
Point.ZERO = new Point(Fr.ZERO, Fr.ZERO, false);
Point.SIZE_IN_BYTES = Fr.SIZE_IN_BYTES * 2;
/**
 * Does this object look like a point?
 * @param obj - Object to test if it is a point.
 * @returns Whether it looks like a point.
 */
export function isPoint(obj) {
    if (!obj) {
        return false;
    }
    const point = obj;
    return point.kind === 'point' && point.x !== undefined && point.y !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmllbGRzL3BvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFakM7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBT2hCO0lBQ0U7O09BRUc7SUFDYSxDQUFLO0lBQ3JCOztPQUVHO0lBQ2EsQ0FBSztJQUNyQjs7T0FFRztJQUNhLFVBQW1CO1FBUm5CLE1BQUMsR0FBRCxDQUFDLENBQUk7UUFJTCxNQUFDLEdBQUQsQ0FBQyxDQUFJO1FBSUwsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQWZyQyx5REFBeUQ7UUFDekMsU0FBSSxHQUFHLE9BQU8sQ0FBQztRQWdCN0IsaUNBQWlDO0lBQ25DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLE1BQU07UUFDWCxrREFBa0Q7UUFDbEQsT0FBTyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFN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