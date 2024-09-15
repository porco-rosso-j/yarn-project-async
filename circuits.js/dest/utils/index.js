import { makeTuple } from '@aztec/foundation/array';
// Define these utils here as their design is very specific to kernel's accumulated data and not general enough to be put in foundation.
// Returns number of non-empty items in an array.
export function countAccumulatedItems(arr) {
    return arr.reduce((num, item, i) => {
        if (!item.isEmpty()) {
            if (num !== i) {
                throw new Error('Non-empty items must be placed continuously from index 0.');
            }
            return num + 1;
        }
        return num;
    }, 0);
}
// Merges two arrays of length N into an array of length N.
export function mergeAccumulatedData(arr0, arr1, length = arr0.length) {
    const numNonEmptyItems0 = countAccumulatedItems(arr0);
    const numNonEmptyItems1 = countAccumulatedItems(arr1);
    if (numNonEmptyItems0 + numNonEmptyItems1 > length) {
        throw new Error('Combined non-empty items exceeded the maximum allowed.');
    }
    const arr = [...arr0];
    arr1.slice(0, numNonEmptyItems1).forEach((item, i) => (arr[i + numNonEmptyItems0] = item));
    return arr;
}
// Sort items by a provided compare function. All empty items are padded to the right.
export function genericSort(arr, compareFn, ascending = true) {
    return [...arr].sort((a, b) => {
        if (a.isEmpty()) {
            return 1; // Move empty items to the right.
        }
        if (b.isEmpty()) {
            return -1; // Move non-empty items to the left.
        }
        return ascending ? compareFn(a, b) : compareFn(b, a);
    });
}
export function compareByCounter(a, b) {
    return a.counter - b.counter;
}
export function sortByCounter(arr, ascending = true) {
    return genericSort(arr, compareByCounter, ascending);
}
export function compareByPositionThenCounter(a, b) {
    const positionComp = a.position.cmp(b.position);
    if (positionComp !== 0) {
        return positionComp;
    }
    return a.counter - b.counter;
}
export function sortByPositionThenCounter(arr, ascending = true) {
    return genericSort(arr, compareByPositionThenCounter, ascending);
}
const defaultSortOptions = {
    ascending: true,
    hintIndexesBy: 'sorted',
};
export function sortAndGetSortedHints(arr, compareFn, length = arr.length, // Need this for ts to infer the return Tuple length.
{ ascending = true, hintIndexesBy = 'sorted' }) {
    const itemsWithIndexes = arr.map((item, i) => ({
        item,
        originalIndex: i,
        isEmpty: () => item.isEmpty(),
    }));
    const sorted = genericSort(itemsWithIndexes, (a, b) => compareFn(a.item, b.item), ascending);
    const items = sorted.map(({ item }) => item);
    const indexHints = makeTuple(length, () => 0);
    if (hintIndexesBy === 'sorted') {
        sorted.forEach(({ originalIndex }, i) => {
            if (!items[i].isEmpty()) {
                indexHints[originalIndex] = i;
            }
        });
    }
    else {
        sorted.forEach(({ originalIndex }, i) => {
            if (!items[i].isEmpty()) {
                indexHints[i] = originalIndex;
            }
        });
    }
    return [items, indexHints];
}
export function sortByCounterGetSortedHints(arr, length = arr.length, // Need this for ts to infer the return Tuple length.
options = defaultSortOptions) {
    return sortAndGetSortedHints(arr, compareByCounter, length, options);
}
export function sortByPositionThenCounterGetSortedHints(arr, length = arr.length, // Need this for ts to infer the return Tuple length.
options = defaultSortOptions) {
    return sortAndGetSortedHints(arr, compareByPositionThenCounter, length, options);
}
/**
 * @param arr An array sorted on position then counter.
 * @param length for type inference.
 * @param getEmptyItem helper function to get an empty item.
 * @returns the array deduplicated by position, and the original run lengths of each position.
 */
export function deduplicateSortedArray(arr, length = arr.length, getEmptyItem) {
    const dedupedArray = makeTuple(length, getEmptyItem);
    const runLengths = makeTuple(length, () => 0);
    let dedupedIndex = 0;
    let runCounter = 0;
    let currentPosition = arr[0].position;
    let i = 0;
    for (; i < length; i++) {
        const item = arr[i];
        if (item.isEmpty()) {
            break; // Stop processing when encountering the first empty item.
        }
        if (item.position.equals(currentPosition)) {
            runCounter++;
        }
        else {
            dedupedArray[dedupedIndex] = arr[i - 1];
            runLengths[dedupedIndex] = runCounter;
            dedupedIndex++;
            runCounter = 1;
            currentPosition = item.position;
        }
    }
    if (runCounter > 0) {
        dedupedArray[dedupedIndex] = arr[i - 1];
        runLengths[dedupedIndex] = runCounter;
        dedupedIndex++;
    }
    // Fill the remaining part of the deduped array and run lengths with empty items and zeros.
    for (let i = dedupedIndex; i < length; i++) {
        dedupedArray[i] = getEmptyItem();
        runLengths[i] = 0;
    }
    return [dedupedArray, runLengths];
}
export function isEmptyArray(arr) {
    return arr.every(item => item.isEmpty());
}
export function getNonEmptyItems(arr) {
    return arr.filter(item => !item.isEmpty());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBS3BELHdJQUF3STtBQUV4SSxpREFBaUQ7QUFDakQsTUFBTSxVQUFVLHFCQUFxQixDQUFvQixHQUFRO0lBQy9ELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBQ0QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUM7QUFFRCwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxJQUFpQixFQUNqQixJQUFpQixFQUNqQixTQUFZLElBQUksQ0FBQyxNQUFXO0lBRTVCLE1BQU0saUJBQWlCLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsTUFBTSxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixHQUFHLE1BQU0sRUFBRSxDQUFDO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBZ0IsQ0FBQztJQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FB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