import { siloNoteHash } from '../hash/index.js';
import { NoteHashReadRequestHintsBuilder, } from '../structs/index.js';
import { countAccumulatedItems, getNonEmptyItems } from '../utils/index.js';
import { ScopedValueCache } from './scoped_value_cache.js';
export function isValidNoteHashReadRequest(readRequest, noteHash) {
    return (noteHash.value.equals(readRequest.value) &&
        noteHash.contractAddress.equals(readRequest.contractAddress) &&
        readRequest.counter > noteHash.counter);
}
export async function buildNoteHashReadRequestHints(oracle, noteHashReadRequests, noteHashes, noteHashLeafIndexMap, sizePending, sizeSettled, futureNoteHashes) {
    const builder = new NoteHashReadRequestHintsBuilder(sizePending, sizeSettled);
    const numReadRequests = countAccumulatedItems(noteHashReadRequests);
    const noteHashMap = new Map();
    getNonEmptyItems(noteHashes).forEach((noteHash, index) => {
        const value = noteHash.value.toBigInt();
        const arr = noteHashMap.get(value) ?? [];
        arr.push({ noteHash, index });
        noteHashMap.set(value, arr);
    });
    const futureNoteHashMap = new ScopedValueCache(futureNoteHashes);
    for (let i = 0; i < numReadRequests; ++i) {
        const readRequest = noteHashReadRequests[i];
        const value = readRequest.value;
        const pendingNoteHash = noteHashMap
            .get(value.toBigInt())
            ?.find(n => isValidNoteHashReadRequest(readRequest, n.noteHash));
        if (pendingNoteHash !== undefined) {
            builder.addPendingReadRequest(i, pendingNoteHash.index);
        }
        else if (!futureNoteHashMap
            .get(readRequest)
            .find(futureNoteHash => isValidNoteHashReadRequest(readRequest, futureNoteHash))) {
            const siloedValue = await siloNoteHash(readRequest.contractAddress, value);
            const leafIndex = noteHashLeafIndexMap.get(siloedValue.toBigInt());
            if (leafIndex === undefined) {
                throw new Error('Read request is reading an unknown note hash.');
            }
            const membershipWitness = await oracle.getNoteHashMembershipWitness(leafIndex);
            builder.addSettledReadRequest(i, membershipWitness, siloedValue);
        }
    }
    return builder.toHints();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfbm90ZV9oYXNoX3JlYWRfcmVxdWVzdF9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaW50cy9idWlsZF9ub3RlX2hhc2hfcmVhZF9yZXF1ZXN0X2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBRUwsK0JBQStCLEdBR2hDLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFM0QsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFdBQThCLEVBQUUsUUFBd0I7SUFDakcsT0FBTyxDQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDeEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUM1RCxXQUFXLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQ3ZDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSw2QkFBNkIsQ0FDakQsTUFFQyxFQUNELG9CQUF5RixFQUN6RixVQUFnRSxFQUNoRSxvQkFBeUMsRUFDekMsV0FBb0IsRUFDcEIsV0FBb0IsRUFDcEIsZ0JBQWtDO0lBRWxDLE1BQU0sT0FBTyxHQUFHLElBQUksK0JBQStCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRTlFLE1BQU0sZUFBZSxHQUFHLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFcEUsTUFBTSxXQUFXLEdBQStELElBQUksR0FBRyxFQUFFLENBQUM7SUFDMUYsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3ZELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFakUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFFaEMsTUFBTSxlQUFlLEdBQUcsV0FBVzthQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRW5FLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELENBQUM7YUFBTSxJQUNMLENBQUMsaUJBQWlCO2FBQ2YsR0FBRyxDQUFDLFdBQVcsQ0FBQzthQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFDbEYsQ0FBQztZQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0UsTUFBTSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUNELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxNQUFNLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0UsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRSxDQUFDO0lBQ0gsQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNCLENBQUMifQ==