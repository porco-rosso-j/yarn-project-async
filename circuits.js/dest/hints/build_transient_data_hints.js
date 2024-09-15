import { countAccumulatedItems, isValidNoteHashReadRequest, isValidNullifierReadRequest, } from '@aztec/circuits.js';
import { makeTuple } from '@aztec/foundation/array';
import { ScopedValueCache } from './scoped_value_cache.js';
export function buildTransientDataHints(noteHashes, nullifiers, futureNoteHashReads, futureNullifierReads, noteHashNullifierCounterMap, noteHashesLength = noteHashes.length, nullifiersLength = nullifiers.length) {
    const futureNoteHashReadsMap = new ScopedValueCache(futureNoteHashReads);
    const futureNullifierReadsMap = new ScopedValueCache(futureNullifierReads);
    const nullifierIndexMap = new Map();
    nullifiers.forEach((n, i) => nullifierIndexMap.set(n.counter, i));
    const nullifierIndexesForNoteHashes = makeTuple(noteHashesLength, () => nullifiersLength);
    const noteHashIndexesForNullifiers = makeTuple(nullifiersLength, () => noteHashesLength);
    const numNoteHashes = countAccumulatedItems(noteHashes);
    for (let i = 0; i < numNoteHashes; i++) {
        const noteHash = noteHashes[i];
        const noteHashNullifierCounter = noteHashNullifierCounterMap.get(noteHash.counter);
        // The note hash might not be linked to a nullifier or it might be read in the future
        if (!noteHashNullifierCounter ||
            futureNoteHashReadsMap.get(noteHash).find(read => isValidNoteHashReadRequest(read, noteHash))) {
            continue;
        }
        const nullifierIndex = nullifierIndexMap.get(noteHashNullifierCounter);
        // We might not have the corresponding nullifier yet
        if (nullifierIndex === undefined) {
            continue;
        }
        const nullifier = nullifiers[nullifierIndex];
        if (!nullifier.nullifiedNoteHash.equals(noteHash.value)) {
            throw new Error('Hinted note hash does not match.');
        }
        if (!nullifier.contractAddress.equals(noteHash.contractAddress)) {
            throw new Error('Contract address of hinted note hash does not match.');
        }
        // The nullifier might be read in the future
        if (futureNullifierReadsMap.get(nullifier).find(read => isValidNullifierReadRequest(read, nullifier))) {
            continue;
        }
        nullifierIndexesForNoteHashes[i] = nullifierIndex;
        noteHashIndexesForNullifiers[nullifierIndex] = i;
    }
    return [nullifierIndexesForNoteHashes, noteHashIndexesForNullifiers];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfdHJhbnNpZW50X2RhdGFfaGludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGludHMvYnVpbGRfdHJhbnNpZW50X2RhdGFfaGludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlMLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsMkJBQTJCLEdBQzVCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELE1BQU0sVUFBVSx1QkFBdUIsQ0FDckMsVUFBa0QsRUFDbEQsVUFBa0QsRUFDbEQsbUJBQXdDLEVBQ3hDLG9CQUF5QyxFQUN6QywyQkFBZ0QsRUFDaEQsbUJBQW9DLFVBQVUsQ0FBQyxNQUF5QixFQUN4RSxtQkFBbUMsVUFBVSxDQUFDLE1BQXdCO0lBRXRFLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTNFLE1BQU0saUJBQWlCLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDekQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEUsTUFBTSw2QkFBNkIsR0FBbUMsU0FBUyxDQUM3RSxnQkFBZ0IsRUFDaEIsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ3ZCLENBQUM7SUFFRixNQUFNLDRCQUE0QixHQUFrQyxTQUFTLENBQzNFLGdCQUFnQixFQUNoQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDdkIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSx3QkFBd0IsR0FBRywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25GLHFGQUFxRjtRQUNyRixJQUNFLENBQUMsd0JBQXdCO1lBQ3pCLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDN0YsQ0FBQztZQUNELFNBQVM7UUFDWCxDQUFDO1FBRUQsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkUsb0RBQW9EO1FBQ3BELElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLFNBQVM7UUFDWCxDQUFDO1FBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQsNENBQTRDO1FBQzVDLElBQUksdUJBQXVCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdEcsU0FBUztRQUNYLENBQUM7UUFFRCw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUM7UUFDbEQsNEJBQTRCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxPQUFPLENBQUMsNkJBQTZCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztBQUN2RSxDQUFDIn0=