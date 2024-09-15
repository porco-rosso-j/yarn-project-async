/**
 * Secp256k1 elliptic curve operations.
 */
export declare class Secp256k1 {
    static generator: Buffer;
    /**
     * Point generator
     * @returns The generator for the curve.
     */
    generator(): Buffer;
    /**
     * Multiplies a point by a scalar (adds the point `scalar` amount of time).
     * @param point - Point to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Result of the multiplication.
     */
    mul(point: Uint8Array, scalar: Uint8Array): void;
    /**
     * Gets a random field element.
     * @returns Random field element.
     */
    getRandomFr(): void;
    /**
     * Converts a 512 bits long buffer to a field.
     * @param uint512Buf - The buffer to convert.
     * @returns Buffer representation of the field element.
     */
    reduce512BufferToFr(uint512Buf: Buffer): void;
}
//# sourceMappingURL=index.d.ts.map