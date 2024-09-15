import { Fr } from '../fields/fields.js';
/**
 * Formats a buffer as an array of fields. Splits the input into 31-byte chunks, and stores each
 * of them into a field, omitting the field's first byte, then adds zero-fields at the end until the max length.
 * @param input - Input to format.
 * @param targetLength - Length of the target array in number of fields.
 * @returns A field with the total length in bytes, followed by an array of fields such that their concatenation is equal to the input buffer, followed by enough zeroes to reach targetLength.
 */
export declare function bufferAsFields(input: Buffer, targetLength: number): Fr[];
/**
 * Recovers a buffer from an array of fields.
 * @param fields - An output from bufferAsFields.
 * @returns The recovered buffer.
 */
export declare function bufferFromFields(fields: Fr[]): Buffer;
//# sourceMappingURL=buffer.d.ts.map