import { Fr } from '../fields/fields.js';
import { type Tuple } from './types.js';
/**
 * Convert a boolean value to its corresponding byte representation in a Buffer of size 1.
 * The function takes a boolean value and writes it into a new buffer as either 1 (true) or 0 (false).
 * This method is useful for converting a boolean value into a binary format that can be stored or transmitted easily.
 *
 * @param b - The boolean value to be converted.
 * @returns A Buffer containing the byte representation of the input boolean value.
 */
export declare function boolToByte(b: boolean): Buffer;
/**
 * @param n - The input number to be converted to a big-endian unsigned 16-bit integer Buffer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 2).
 * @returns A Buffer containing the big-endian unsigned 16-bit integer representation of the input number.
 */
export declare function numToUInt16BE(n: number, bufferSize?: number): Buffer;
/**
 * Convert a number into a 4-byte little-endian unsigned integer buffer.
 * The input number is serialized as an unsigned 32-bit integer in little-endian byte order,
 * and returned as a Buffer of specified size (defaults to 4).
 * If the provided bufferSize is greater than 4, the additional bytes will be padded with zeros.
 *
 * @param n - The number to be converted into a little-endian unsigned integer buffer.
 * @param bufferSize - Optional, the size of the output buffer (default value is 4).
 * @returns A Buffer containing the serialized little-endian unsigned integer representation of the input number.
 */
export declare function numToUInt32LE(n: number, bufferSize?: number): Buffer;
/**
 * Convert a number to a big-endian unsigned 32-bit integer Buffer.
 * This function takes a number and an optional buffer size as input and creates a Buffer with the specified size (defaults to 4) containing the big-endian representation of the input number as an unsigned 32-bit integer. Note that the bufferSize should be greater than or equal to 4, otherwise the output Buffer might truncate the serialized value.
 *
 * @param n - The input number to be converted to a big-endian unsigned 32-bit integer Buffer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 4).
 * @returns A Buffer containing the big-endian unsigned 32-bit integer representation of the input number.
 */
export declare function numToUInt32BE(n: number, bufferSize?: number): Buffer;
/**
 * Serialize a number into a big-endian signed 32-bit integer Buffer with the specified buffer size.
 * This function converts the input number into its binary representation and stores it in a Buffer
 * with the provided buffer size. By default, the buffer size is set to 4 bytes which represents a 32-bit integer.
 * The function will use the last 4 bytes of the buffer to store the serialized number. If the input number
 * is outside the range of a 32-bit signed integer, the resulting serialization may be incorrect due to truncation.
 *
 * @param n - The number to be serialized as a signed 32-bit integer.
 * @param bufferSize - Optional, the size of the output Buffer (default is 4 bytes).
 * @returns A Buffer containing the serialized big-endian signed 32-bit integer.
 */
export declare function numToInt32BE(n: number, bufferSize?: number): Buffer;
/**
 * Convert a number to an 8-bit unsigned integer and return it as a Buffer of length 1.
 * The input number is written as an 8-bit unsigned integer into the buffer. This function
 * is useful for converting small numeric values to a standardized binary format that can be
 * easily stored or transmitted.
 *
 * @param n - The number to be converted to an 8-bit unsigned integer.
 * @returns A Buffer containing the 8-bit unsigned integer representation of the input number.
 */
export declare function numToUInt8(n: number): Buffer;
/**
 * Adds a 4-byte byte-length prefix to a buffer.
 * @param buf - The input Buffer to be prefixed
 * @returns A Buffer with 4-byte byte-length prefix.
 */
export declare function prefixBufferWithLength(buf: Buffer): Buffer;
/**
 * Parse a buffer as a big integer.
 */
export declare function toBigInt(buf: Buffer): bigint;
/**
 * Stores full 256 bits of information in 2 fields.
 * @param buf - 32 bytes of data
 * @returns 2 field elements
 */
export declare function to2Fields(buf: Buffer): [Fr, Fr];
/**
 * Reconstructs the original 32 bytes of data from 2 field elements.
 * @param field1 - First field element
 * @param field2 - Second field element
 * @returns 32 bytes of data as a Buffer
 */
export declare function from2Fields(field1: Fr, field2: Fr): Buffer;
/**
 * Truncates SHA hashes to match Noir's truncated version
 * @param buf - 32 bytes of data
 * @returns 31 bytes of data padded to 32
 */
export declare function truncateAndPad(buf: Buffer): Buffer;
/**
 * Stores 248 bits of information in 1 field.
 * @param buf - 32 or 31 bytes of data
 * @returns 1 field element
 */
export declare function toTruncField(buf: Buffer): Fr;
/**
 * Reconstructs the original 31 bytes of data from 1 truncated field element.
 * @param field - field element
 * @returns 31 bytes of data as a Buffer
 */
export declare function fromTruncField(field: Fr): Buffer;
export declare function fromFieldsTuple(fields: Tuple<Fr, 2>): Buffer;
export declare function toHumanReadable(buf: Buffer, maxLen?: number): string;
//# sourceMappingURL=free_funcs.d.ts.map