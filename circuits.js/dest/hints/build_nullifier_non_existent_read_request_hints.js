import { padArrayEnd } from '@aztec/foundation/collection';
import { MAX_NULLIFIERS_PER_TX, } from '../constants.gen.js';
import { siloNullifier } from '../hash/index.js';
import { Nullifier } from '../structs/index.js';
import { NullifierNonExistentReadRequestHintsBuilder } from '../structs/non_existent_read_request_hints.js';
import { countAccumulatedItems } from '../utils/index.js';
function sortNullifiersByValues(nullifiers) {
    const numNullifiers = countAccumulatedItems(nullifiers);
    const sorted = nullifiers
        .slice(0, numNullifiers)
        .map((nullifier, originalIndex) => ({ nullifier, originalIndex }))
        .sort((a, b) => (b.nullifier.value.lt(a.nullifier.value) ? 1 : -1));
    const sortedIndexHints = [];
    for (let i = 0; i < numNullifiers; ++i) {
        sortedIndexHints[sorted[i].originalIndex] = i;
    }
    return {
        sortedValues: padArrayEnd(sorted.map(s => s.nullifier), Nullifier.empty(), MAX_NULLIFIERS_PER_TX),
        sortedIndexHints: padArrayEnd(sortedIndexHints, 0, MAX_NULLIFIERS_PER_TX),
    };
}
export async function buildNullifierNonExistentReadRequestHints(oracle, nullifierNonExistentReadRequests, pendingNullifiers) {
    const { sortedValues, sortedIndexHints } = sortNullifiersByValues(pendingNullifiers);
    const builder = new NullifierNonExistentReadRequestHintsBuilder(sortedValues, sortedIndexHints);
    const numPendingNullifiers = countAccumulatedItems(pendingNullifiers);
    const numReadRequests = countAccumulatedItems(nullifierNonExistentReadRequests);
    for (let i = 0; i < numReadRequests; ++i) {
        const readRequest = nullifierNonExistentReadRequests[i];
        const siloedValue = await siloNullifier(readRequest.contractAddress, readRequest.value);
        const { membershipWitness, leafPreimage } = await oracle.getLowNullifierMembershipWitness(siloedValue);
        let nextPendingValueIndex = sortedValues.findIndex(v => !v.value.lt(siloedValue));
        if (nextPendingValueIndex == -1) {
            nextPendingValueIndex = numPendingNullifiers;
        }
        else if (sortedValues[nextPendingValueIndex].value.equals(siloedValue) &&
            sortedValues[nextPendingValueIndex].counter < readRequest.counter) {
            throw new Error('Nullifier DOES exists in the pending set at the time of reading, but there is a NonExistentReadRequest for it.');
        }
        builder.addHint(membershipWitness, leafPreimage, nextPendingValueIndex);
    }
    return builder.toHints();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfbnVsbGlmaWVyX25vbl9leGlzdGVudF9yZWFkX3JlcXVlc3RfaGludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGludHMvYnVpbGRfbnVsbGlmaWVyX25vbl9leGlzdGVudF9yZWFkX3JlcXVlc3RfaGludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBSzNELE9BQU8sRUFDTCxxQkFBcUIsR0FHdEIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRTVHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBWTFELFNBQVMsc0JBQXNCLENBQzdCLFVBQTBEO0lBRTFELE1BQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sTUFBTSxHQUFHLFVBQVU7U0FDdEIsS0FBSyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUM7U0FDdkIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO0lBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPO1FBQ0wsWUFBWSxFQUFFLFdBQVcsQ0FDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFDNUIsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUNqQixxQkFBcUIsQ0FDdEI7UUFDRCxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLHFCQUFxQixDQUFDO0tBQzFFLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSx5Q0FBeUMsQ0FDN0QsTUFFQyxFQUNELGdDQUFrSCxFQUNsSCxpQkFBaUU7SUFFakUsTUFBTSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFckYsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQ0FBMkMsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVoRyxNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEUsTUFBTSxlQUFlLEdBQUcscUJBQXFCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNoRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDekMsTUFBTSxXQUFXLEdBQUcsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEYsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLGdDQUFnQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZHLElBQUkscUJBQXFCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDaEMscUJBQXFCLEdBQUcsb0JBQW9CLENBQUM7UUFDL0MsQ0FBQzthQUFNLElBQ0wsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDN0QsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQ2pFLENBQUM7WUFDRCxNQUFNLElBQUksS0FBSyxDQUNiLGdIQUFnSCxDQUNqSCxDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNCLENBQUMifQ==