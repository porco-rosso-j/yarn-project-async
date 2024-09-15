import { Fr } from '../fields/fields.js';
/**
 * For serializing an array of fixed length buffers.
 * @param arr - Array of bufferable.
 * @param prefixLength - The length of the prefix (denominated in bytes).
 * @returns The serialized buffers.
 */
export declare function serializeArrayOfBufferableToVector(objs: Bufferable[], prefixLength?: number): Buffer;
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
 * Deserializes an array from a vector on an element-by-element basis.
 * @param deserialize - A function used to deserialize each element of the vector.
 * @param vector - The vector to deserialize.
 * @param offset - The position in the vector to start deserializing from.
 * @returns Deserialized array and how many bytes we advanced by.
 */
export declare function deserializeArrayFromVector<T>(deserialize: DeserializeFn<T>, vector: Buffer, offset?: number): {
    /**
     * The deserialized array.
     */
    elem: T[];
    /**
     * How many bytes we advanced by.
     */
    adv: number;
};
/**
 * Cast a uint8 array to a number.
 * @param array - The uint8 array.
 * @returns The number.
 */
export declare function uint8ArrayToNum(array: Uint8Array): number;
/**
 * Serializes a boolean to a buffer.
 * @param value - Value to serialize.
 * @returns The serialized boolean.
 */
export declare function boolToBuffer(value: boolean, bufferSize?: number): Buffer;
/**
 * Deserialize the 256-bit number at address `offset`.
 * @param buf - The buffer.
 * @param offset - The address.
 * @returns The deserialized 256-bit field.
 */
export declare function deserializeField(buf: Buffer, offset?: number): {
    elem: Buffer;
    adv: number;
};
/** A type that can be written to a buffer. */
export type Bufferable = boolean | Buffer | number | bigint | string | {
    /**
     * Serialize to a buffer.
     */
    toBuffer: () => Buffer;
} | Bufferable[];
/** A type that can be converted to a Field or a Field array. */
export type Fieldable = Fr | boolean | number | bigint | Buffer | {
    /**
     * Serialize to a field.
     * @dev Duplicate to `toField` but left as is as it is used in AVM codebase.
     */
    toFr: () => Fr;
} | {
    /** Serialize to a field. */
    toField: () => Fr;
} | {
    /** Serialize to an array of fields. */
    toFields: () => Fr[];
} | Fieldable[];
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns A buffer list with the concatenation of all fields.
 */
export declare function serializeToBufferArray(...objs: Bufferable[]): Buffer[];
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns An array of fields with the concatenation of all fields.
 */
export declare function serializeToFields(...objs: Fieldable[]): Fr[];
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns A single buffer with the concatenation of all fields.
 */
export declare function serializeToBuffer(...objs: Bufferable[]): Buffer;
/**
 * Returns a user-friendly JSON representation of an object, showing buffers as hex strings.
 * @param obj - Object to json-stringify.
 * @returns A JSON string.
 */
export declare function toFriendlyJSON(obj: object): string;
/**
 * Serialize a BigInt value into a Buffer of specified width.
 * The function converts the input BigInt into its big-endian representation and stores it in a Buffer of the given width.
 * If the width is not provided, a default value of 32 bytes will be used. It is important to provide an appropriate width
 * to avoid truncation or incorrect serialization of large BigInt values.
 *
 * @param n - The BigInt value to be serialized.
 * @param width - The width (in bytes) of the output Buffer, optional with default value 32.
 * @returns A Buffer containing the serialized BigInt value in big-endian format.
 */
export declare function serializeBigInt(n: bigint, width?: number): Buffer;
/**
 * Deserialize a big integer from a buffer, given an offset and width.
 * Reads the specified number of bytes from the buffer starting at the offset, converts it to a big integer, and returns the deserialized result along with the number of bytes read (advanced).
 *
 * @param buf - The buffer containing the big integer to be deserialized.
 * @param offset - The position in the buffer where the big integer starts. Defaults to 0.
 * @param width - The number of bytes to read from the buffer for the big integer. Defaults to 32.
 * @returns An object containing the deserialized big integer value ('elem') and the number of bytes advanced ('adv').
 */
export declare function deserializeBigInt(buf: Buffer, offset?: number, width?: number): {
    elem: bigint;
    adv: number;
};
/**
 * Serializes a Date object into a Buffer containing its timestamp as a big integer value.
 * The resulting Buffer has a fixed width of 8 bytes, representing a 64-bit big-endian integer.
 * This function is useful for converting date values into a binary format that can be stored or transmitted easily.
 *
 * @param date - The Date object to be serialized.
 * @returns A Buffer containing the serialized timestamp of the input Date object.
 */
export declare function serializeDate(date: Date): Buffer;
/**
 * Deserialize a boolean value from a given buffer at the specified offset.
 * Reads a single byte at the provided offset in the buffer and returns
 * the deserialized boolean value along with the number of bytes read (adv).
 *
 * @param buf - The buffer containing the serialized boolean value.
 * @param offset - The position in the buffer to start reading the boolean value.
 * @returns An object containing the deserialized boolean value (elem) and the number of bytes read (adv).
 */
export declare function deserializeBool(buf: Buffer, offset?: number): {
    elem: number;
    adv: number;
};
/**
 * Deserialize a 4-byte unsigned integer from a buffer, starting at the specified offset.
 * The deserialization reads 4 bytes from the given buffer and converts it into a number.
 * Returns an object containing the deserialized unsigned integer and the number of bytes advanced (4).
 *
 * @param buf - The buffer containing the serialized unsigned integer.
 * @param offset - The starting position in the buffer to deserialize from (default is 0).
 * @returns An object with the deserialized unsigned integer as 'elem' and the number of bytes advanced ('adv') as 4.
 */
export declare function deserializeUInt32(buf: Buffer, offset?: number): {
    elem: number;
    adv: number;
};
/**
 * Deserialize a signed 32-bit integer from a buffer at the given offset.
 * The input 'buf' should be a Buffer containing binary data, and 'offset' should be the position in the buffer
 * where the signed 32-bit integer starts. Returns an object with both the deserialized integer (elem) and the
 * number of bytes advanced in the buffer (adv, always equal to 4).
 *
 * @param buf - The buffer containing the binary data.
 * @param offset - Optional, the position in the buffer where the signed 32-bit integer starts (default is 0).
 * @returns An object with the deserialized integer as 'elem' and the number of bytes advanced as 'adv'.
 */
export declare function deserializeInt32(buf: Buffer, offset?: number): {
    elem: number;
    adv: number;
};
export {};
//# sourceMappingURL=serialize.d.ts.map