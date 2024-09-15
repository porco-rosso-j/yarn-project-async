import { type Tuple } from '@aztec/foundation/serialize';
import type { IsEmpty, Ordered, Positioned } from '../interfaces/index.js';
export declare function countAccumulatedItems<T extends IsEmpty>(arr: T[]): number;
export declare function mergeAccumulatedData<T extends IsEmpty, N extends number>(arr0: Tuple<T, N>, arr1: Tuple<T, N>, length?: N): Tuple<T, N>;
export declare function genericSort<T extends IsEmpty, N extends number>(arr: Tuple<T, N>, compareFn: (a: T, b: T) => number, ascending?: boolean): Tuple<T, N>;
export declare function compareByCounter<T extends Ordered>(a: T, b: T): number;
export declare function sortByCounter<T extends Ordered & IsEmpty, N extends number>(arr: Tuple<T, N>, ascending?: boolean): Tuple<T, N>;
export declare function compareByPositionThenCounter<T extends Ordered & Positioned>(a: T, b: T): number;
export declare function sortByPositionThenCounter<T extends Ordered & Positioned & IsEmpty, N extends number>(arr: Tuple<T, N>, ascending?: boolean): Tuple<T, N>;
export interface SortOptions {
    ascending: boolean;
    hintIndexesBy: 'original' | 'sorted';
}
export declare function sortAndGetSortedHints<T extends IsEmpty, N extends number>(arr: Tuple<T, N>, compareFn: (a: T, b: T) => number, length: N | undefined, // Need this for ts to infer the return Tuple length.
{ ascending, hintIndexesBy }: SortOptions): [Tuple<T, N>, Tuple<number, N>];
export declare function sortByCounterGetSortedHints<T extends Ordered & IsEmpty, N extends number>(arr: Tuple<T, N>, length?: N, // Need this for ts to infer the return Tuple length.
options?: SortOptions): [Tuple<T, N>, Tuple<number, N>];
export declare function sortByPositionThenCounterGetSortedHints<T extends Ordered & Positioned & IsEmpty, N extends number>(arr: Tuple<T, N>, length?: N, // Need this for ts to infer the return Tuple length.
options?: SortOptions): [Tuple<T, N>, Tuple<number, N>];
/**
 * @param arr An array sorted on position then counter.
 * @param length for type inference.
 * @param getEmptyItem helper function to get an empty item.
 * @returns the array deduplicated by position, and the original run lengths of each position.
 */
export declare function deduplicateSortedArray<T extends Ordered & IsEmpty & Positioned, N extends number>(arr: Tuple<T, N>, length: N | undefined, getEmptyItem: () => T): [Tuple<T, N>, Tuple<number, N>];
export declare function isEmptyArray<T extends IsEmpty>(arr: T[]): boolean;
export declare function getNonEmptyItems<T extends IsEmpty>(arr: T[]): T[];
//# sourceMappingURL=index.d.ts.map