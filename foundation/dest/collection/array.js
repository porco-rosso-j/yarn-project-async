/**
 * Pads an array to the target length by appending an element to its end. Throws if target length exceeds the input array length. Does not modify the input array.
 * @param arr - Array with elements to pad.
 * @param elem - Element to use for padding.
 * @param length - Target length.
 * @returns A new padded array.
 */
export function padArrayEnd(arr, elem, length) {
    if (arr.length > length) {
        throw new Error(`Array size exceeds target length`);
    }
    // Since typescript cannot always deduce that something is a tuple, we cast
    return [...arr, ...Array(length - arr.length).fill(elem)];
}
/** Removes the right-padding for an array. Does not modify original array. */
export function removeArrayPaddingEnd(arr, isEmpty) {
    const lastNonEmptyIndex = arr.reduce((last, item, i) => (isEmpty(item) ? last : i), -1);
    return lastNonEmptyIndex === -1 ? [] : arr.slice(0, lastNonEmptyIndex + 1);
}
/**
 * Pads an array to the target length by prepending elements at the beginning. Throws if target length exceeds the input array length. Does not modify the input array.
 * @param arr - Array with elements to pad.
 * @param elem - Element to use for padding.
 * @param length - Target length.
 * @returns A new padded array.
 */
export function padArrayStart(arr, elem, length) {
    if (arr.length > length) {
        throw new Error(`Array size exceeds target length`);
    }
    // Since typescript cannot always deduce that something is a tuple, we cast
    return [...Array(length - arr.length).fill(elem), ...arr];
}
/**
 * Returns if an array is composed of empty items.
 * @param arr - Array to check.
 * @returns True if every item in the array isEmpty.
 */
export function isArrayEmpty(arr, isEmpty) {
    for (const item of arr) {
        if (!isEmpty(item)) {
            return false;
        }
    }
    return true;
}
/**
 * Returns the number of non-empty items in an array.
 * @param arr - Array to check.
 * @returns Number of non-empty items in an array.
 */
export function arrayNonEmptyLength(arr, isEmpty) {
    return arr.reduce((sum, item) => (isEmpty(item) ? sum : sum + 1), 0);
}
/**
 * Executes the given function n times and returns the results in an array.
 * @param n - How many times to repeat.
 * @param fn - Mapper from index to value.
 * @returns The array with the result from all executions.
 */
export function times(n, fn) {
    return [...Array(n).keys()].map(i => fn(i));
}
/**
 * Returns the serialized size of all non-empty items in an array.
 * @param arr - Array
 * @returns The serialized size in bytes.
 */
export function arraySerializedSizeOfNonEmpty(arr) {
    return arr
        .filter(x => x && ('isZero' in x ? !x.isZero() : !x.isEmpty()))
        .map(x => x.toBuffer().length)
        .reduce((a, b) => a + b, 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29sbGVjdGlvbi9hcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFzQixHQUFRLEVBQUUsSUFBTyxFQUFFLE1BQVM7SUFDM0UsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsMkVBQTJFO0lBQzNFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBZ0IsQ0FBQztBQUMzRSxDQUFDO0FBRUQsOEVBQThFO0FBQzlFLE1BQU0sVUFBVSxxQkFBcUIsQ0FBSSxHQUFRLEVBQUUsT0FBNkI7SUFDOUUsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsT0FBTyxpQkFBaUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBc0IsR0FBUSxFQUFFLElBQU8sRUFBRSxNQUFTO0lBQzdFLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELDJFQUEyRTtJQUMzRSxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQWdCLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFJLEdBQVEsRUFBRSxPQUE2QjtJQUNyRSxLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNuQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBSSxHQUFRLEVBQUUsT0FBNkI7SUFDNUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUksQ0FBUyxFQUFFLEVBQW9CO0lBQ3RELE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUMzQyxHQUE4RjtJQUU5RixPQUFPLEdBQUc7U0FDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5RCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9