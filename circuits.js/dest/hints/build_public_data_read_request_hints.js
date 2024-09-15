import { PublicDataReadRequestHintsBuilder, } from '../structs/index.js';
import { countAccumulatedItems } from '../utils/index.js';
export function buildPublicDataReadRequestHints(publicDataReads, publicDataUpdateRequests, publicDataHints) {
    const builder = new PublicDataReadRequestHintsBuilder();
    const numReadRequests = countAccumulatedItems(publicDataReads);
    for (let i = 0; i < numReadRequests; ++i) {
        const rr = publicDataReads[i];
        // TODO: Add counters to reads and writes.
        const writeIndex = publicDataUpdateRequests.findIndex(w => w.leafSlot.equals(rr.leafSlot) && w.newValue.equals(rr.value));
        if (writeIndex !== -1) {
            builder.addPendingReadRequest(i, writeIndex);
        }
        else {
            const hintIndex = publicDataHints.findIndex(h => h.leafSlot.equals(rr.leafSlot));
            if (hintIndex === -1) {
                throw new Error('Cannot find a pending write or a data hint for the read request.');
            }
            if (!publicDataHints[hintIndex].value.equals(rr.value)) {
                throw new Error('Value being read does not match existing public data or pending writes.');
            }
            builder.addLeafDataReadRequest(i, hintIndex);
        }
    }
    return builder.toHints();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfcHVibGljX2RhdGFfcmVhZF9yZXF1ZXN0X2hpbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpbnRzL2J1aWxkX3B1YmxpY19kYXRhX3JlYWRfcmVxdWVzdF9oaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBRUwsaUNBQWlDLEdBRWxDLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUQsTUFBTSxVQUFVLCtCQUErQixDQUM3QyxlQUEyRSxFQUMzRSx3QkFBdUcsRUFDdkcsZUFBb0U7SUFFcEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQ0FBaUMsRUFBRSxDQUFDO0lBRXhELE1BQU0sZUFBZSxHQUFHLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsMENBQTBDO1FBQzFDLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDLFNBQVMsQ0FDbkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUNuRSxDQUFDO1FBQ0YsSUFBSSxVQUFVLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztZQUN0RixDQUFDO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7WUFDN0YsQ0FBQztZQUNELE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQixDQUFDIn0=