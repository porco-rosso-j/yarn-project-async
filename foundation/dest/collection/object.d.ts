/** Returns a new object with the same keys and where each value has been passed through the mapping function. */
export declare function mapValues<K extends string | number | symbol, T, U>(obj: Record<K, T>, fn: (value: T) => U): Record<K, U>;
export declare function mapValues<K extends string | number | symbol, T, U>(obj: Partial<Record<K, T>>, fn: (value: T) => U): Partial<Record<K, U>>;
//# sourceMappingURL=object.d.ts.map