import { Fr, type GrumpkinScalar, Point } from '@aztec/foundation/fields';
/**
 * Grumpkin elliptic curve operations.
 */
export declare class Grumpkin {
    static generator: Point;
    /**
     * Point generator
     * @returns The generator for the curve.
     */
    generator(): Point;
    /**
     * Multiplies a point by a scalar (adds the point `scalar` amount of times).
     * @param point - Point to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Result of the multiplication.
     */
    mul(point: Point, scalar: GrumpkinScalar): Promise<Point>;
    /**
     * Add two points.
     * @param a - Point a in the addition
     * @param b - Point b to add to a
     * @returns Result of the addition.
     */
    add(a: Point, b: Point): Promise<Point>;
    /**
     * Multiplies a set of points by a scalar.
     * @param points - Points to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Points multiplied by the scalar.
     */
    batchMul(points: Point[], scalar: GrumpkinScalar): void;
    /**
     * Gets a random field element.
     * @returns Random field element.
     */
    getRandomFr(): Fr;
    /**
     * Converts a 512 bits long buffer to a field.
     * @param uint512Buf - The buffer to convert.
     * @returns Buffer representation of the field element.
     */
    reduce512BufferToFr(uint512Buf: Buffer): Fr;
}
//# sourceMappingURL=index.d.ts.map