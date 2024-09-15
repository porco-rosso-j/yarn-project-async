import { Buffer } from 'buffer';
/**
 * For serializing an array of fixed length buffers.
 * TODO move to foundation pkg.
 * @param arr - Array of bufffers.
 * @returns The serialized buffers.
 */
export declare function serializeBufferArrayToVector(arr: Buffer[]): Buffer;
/**
 * Helper function for deserializeArrayFromVector.
 */
type DeserializeFn<T> = (buf: Buffer, offset: number) => {
    /**
     * The deserialized type.
     */
    elem: T;
    /**
     * How many bytes to advance by.
     */
    adv: number;
};
/**
 * For deserializing numbers to 32-bit little-endian form.
 * TODO move to foundation pkg.
 * @param n - The number.
 * @returns The endian-corrected number.
 */
export declare function deserializeArrayFromVector<T>(deserialize: DeserializeFn<T>, vector: Buffer, offset?: number): {
    elem: T[];
    adv: number;
};
/**
 * For serializing numbers to 32 bit little-endian form.
 * TODO move to foundation pkg.
 * @param n - The number.
 * @returns The endian-corrected number.
 */
export declare function numToUInt32LE(n: number, bufferSize?: number): Buffer;
/**
 * Deserialize the 256-bit number at address `offset`.
 * @param buf - The buffer.
 * @param offset - The address.
 * @returns The derserialized 256-bit field.
 */
export declare function deserializeField(buf: Buffer, offset?: number): {
    elem: Buffer;
    adv: number;
};
export {};
//# sourceMappingURL=serialize.d.ts.map