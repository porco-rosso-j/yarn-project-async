import { AztecAddress } from '@aztec/foundation/aztec-address';
import { padArrayEnd } from '@aztec/foundation/collection';
import { MAX_NULLIFIER_READ_REQUESTS_PER_TX, } from '../constants.gen.js';
import { siloNullifier } from '../hash/hash.js';
import { Nullifier, NullifierReadRequestHintsBuilder, ReadRequest, ScopedReadRequest, } from '../structs/index.js';
import { countAccumulatedItems, getNonEmptyItems } from '../utils/index.js';
import { ScopedValueCache } from './scoped_value_cache.js';
export function isValidNullifierReadRequest(readRequest, nullifier) {
    return (readRequest.value.equals(nullifier.value) &&
        nullifier.contractAddress.equals(readRequest.contractAddress) &&
        readRequest.counter > nullifier.counter);
}
export async function buildNullifierReadRequestHints(oracle, nullifierReadRequests, nullifiers, sizePending, sizeSettled, futureNullifiers, siloed = false) {
    const builder = new NullifierReadRequestHintsBuilder(sizePending, sizeSettled);
    const numReadRequests = countAccumulatedItems(nullifierReadRequests);
    const nullifierMap = new Map();
    getNonEmptyItems(nullifiers).forEach((nullifier, index) => {
        const value = nullifier.value.toBigInt();
        const arr = nullifierMap.get(value) ?? [];
        arr.push({ nullifier, index });
        nullifierMap.set(value, arr);
    });
    const futureNullifiersMap = new ScopedValueCache(futureNullifiers);
    for (let i = 0; i < numReadRequests; ++i) {
        const readRequest = nullifierReadRequests[i];
        const pendingNullifier = nullifierMap
            .get(readRequest.value.toBigInt())
            ?.find(({ nullifier }) => isValidNullifierReadRequest(readRequest, nullifier));
        if (pendingNullifier !== undefined) {
            builder.addPendingReadRequest(i, pendingNullifier.index);
        }
        else if (!futureNullifiersMap
            .get(readRequest)
            .some(futureNullifier => isValidNullifierReadRequest(readRequest, futureNullifier))) {
            const siloedValue = siloed
                ? readRequest.value
                : await siloNullifier(readRequest.contractAddress, readRequest.value);
            const membershipWitnessWithPreimage = await oracle.getNullifierMembershipWitness(siloedValue);
            builder.addSettledReadRequest(i, membershipWitnessWithPreimage.membershipWitness, membershipWitnessWithPreimage.leafPreimage);
        }
    }
    return builder.toHints();
}
export async function buildSiloedNullifierReadRequestHints(oracle, nullifierReadRequests, nullifiers, sizePending, sizeSettled) {
    // Nullifiers outputted from public kernels are already siloed while read requests are not.
    // Siloing the read request values and set the contract addresses to zero to find the matching nullifier contexts.
    // const siloedReadRequests = padArrayEnd(
    //   getNonEmptyItems(nullifierReadRequests).map(async r =>
    //     new ReadRequest(await siloNullifier(r.contractAddress, r.value), r.counter).scope(AztecAddress.ZERO),
    //   ),
    //   ScopedReadRequest.empty(),
    //   MAX_NULLIFIER_READ_REQUESTS_PER_TX,
    // );
    const readRequestsPromises = getNonEmptyItems(nullifierReadRequests).map(async (r) => new ReadRequest(await siloNullifier(r.contractAddress, r.value), r.counter).scope(AztecAddress.ZERO));
    // Resolve the promises before passing them to padArrayEnd
    const siloedReadRequests = padArrayEnd(await Promise.all(readRequestsPromises), // Ensure you await the promises here
    ScopedReadRequest.empty(), MAX_NULLIFIER_READ_REQUESTS_PER_TX);
    const scopedNullifiers = nullifiers.map(n => new Nullifier(n.value, n.counter, n.noteHash).scope(AztecAddress.ZERO));
    return await buildNullifierReadRequestHints(oracle, siloedReadRequests, scopedNullifiers, sizePending, sizeSettled, [], true);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfbnVsbGlmaWVyX3JlYWRfcmVxdWVzdF9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oaW50cy9idWlsZF9udWxsaWZpZXJfcmVhZF9yZXF1ZXN0X2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFLM0QsT0FBTyxFQUVMLGtDQUFrQyxHQUVuQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBRUwsU0FBUyxFQUNULGdDQUFnQyxFQUNoQyxXQUFXLEVBRVgsaUJBQWlCLEdBQ2xCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFM0QsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQThCLEVBQUUsU0FBMEI7SUFDcEcsT0FBTyxDQUNMLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUM3RCxXQUFXLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQ3hDLENBQUM7QUFDSixDQUFDO0FBT0QsTUFBTSxDQUFDLEtBQUssVUFBVSw4QkFBOEIsQ0FDbEQsTUFFQyxFQUNELHFCQUEwRixFQUMxRixVQUFnRSxFQUNoRSxXQUFvQixFQUNwQixXQUFvQixFQUNwQixnQkFBbUMsRUFDbkMsTUFBTSxHQUFHLEtBQUs7SUFFZCxNQUFNLE9BQU8sR0FBRyxJQUFJ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