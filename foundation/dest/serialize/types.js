/**
 * Check an array size, and cast it to a tuple.
 * @param array - The array.
 * @param n - The size.
 * @returns The case tuple, or throws Error.
 */
export function assertLength(array, n) {
    if (array.length !== n) {
        throw new Error(`Wrong 'fixed array' size. Expected ${n}, got ${array.length}.`);
    }
    return array;
}
/**
 * Annoyingly, mapping a tuple does not preserve length.
 * This is a helper to preserve length during a map operation.
 * @see https://github.com/microsoft/TypeScript/issues/29841.
 * @param array - A tuple array.
 */
export function mapTuple(tuple, fn) {
    return tuple.map(fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBc0IsS0FBVSxFQUFFLENBQUk7SUFDaEUsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsU0FBUyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsT0FBTyxLQUFvQixDQUFDO0FBQzlCLENBQUM7QUFVRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxRQUFRLENBQWdELEtBQVEsRUFBRSxFQUFLO0lBQ3JGLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQW1CLENBQUM7QUFDekMsQ0FBQyJ9