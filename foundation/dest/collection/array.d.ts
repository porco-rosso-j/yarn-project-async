import { type Tuple } from '../serialize/types.js';
/**
 * Pads an array to the target length by appending an element to its end. Throws if target length exceeds the input array length. Does not modify the input array.
 * @param arr - Array with elements to pad.
 * @param elem - Element to use for padding.
 * @param length - Target length.
 * @returns A new padded array.
 */
export declare function padArrayEnd<T, N extends number>(arr: T[], elem: T, length: N): Tuple<T, N>;
/** Removes the right-padding for an array. Does not modify original array. */
export declare function removeArrayPaddingEnd<T>(arr: T[], isEmpty: (item: T) => boolean): T[];
/**
 * Pads an array to the target length by prepending elements at the beginning. Throws if target length exceeds the input array length. Does not modify the input array.
 * @param arr - Array with elements to pad.
 * @param elem - Element to use for padding.
 * @param length - Target length.
 * @returns A new padded array.
 */
export declare function padArrayStart<T, N extends number>(arr: T[], elem: T, length: N): Tuple<T, N>;
/**
 * Returns if an array is composed of empty items.
 * @param arr - Array to check.
 * @returns True if every item in the array isEmpty.
 */
export declare function isArrayEmpty<T>(arr: T[], isEmpty: (item: T) => boolean): boolean;
/**
 * Returns the number of non-empty items in an array.
 * @param arr - Array to check.
 * @returns Number of non-empty items in an array.
 */
export declare function arrayNonEmptyLength<T>(arr: T[], isEmpty: (item: T) => boolean): number;
/**
 * Executes the given function n times and returns the results in an array.
 * @param n - How many times to repeat.
 * @param fn - Mapper from index to value.
 * @returns The array with the result from all executions.
 */
export declare function times<T>(n: number, fn: (i: number) => T): T[];
/**
 * Returns the serialized size of all non-empty items in an array.
 * @param arr - Array
 * @returns The serialized size in bytes.
 */
export declare function arraySerializedSizeOfNonEmpty(arr: (({
    isZero: () => boolean;
} | {
    isEmpty: () => boolean;
}) & {
    toBuffer: () => Buffer;
})[]): number;
//# sourceMappingURL=array.d.ts.map