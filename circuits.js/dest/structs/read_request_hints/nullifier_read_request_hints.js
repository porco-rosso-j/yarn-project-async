import { makeTuple } from '@aztec/foundation/array';
import { MAX_NULLIFIER_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT } from '../../constants.gen.js';
import { NullifierLeafPreimage } from '../trees/index.js';
import { PendingReadHint, ReadRequestResetHints, ReadRequestState, ReadRequestStatus, SettledReadHint, } from './read_request_hints.js';
export function nullifierReadRequestHintsFromBuffer(buffer, numPendingReads, numSettledReads) {
    return ReadRequestResetHints.fromBuffer(buffer, MAX_NULLIFIER_READ_REQUESTS_PER_TX, numPendingReads, numSettledReads, NULLIFIER_TREE_HEIGHT, NullifierLeafPreimage);
}
export class NullifierReadRequestHintsBuilder {
    constructor(numPending, numSettled) {
        this.numPendingReadHints = 0;
        this.numSettledReadHints = 0;
        this.hints = new ReadRequestResetHints(makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_TX, ReadRequestStatus.nada), makeTuple(numPending, () => PendingReadHint.nada(MAX_NULLIFIER_READ_REQUESTS_PER_TX)), makeTuple(numSettled, () => SettledReadHint.nada(MAX_NULLIFIER_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT, NullifierLeafPreimage.empty)));
    }
    static empty(numPending, numSettled) {
        return new NullifierReadRequestHintsBuilder(numPending, numSettled).toHints().hints;
    }
    addPendingReadRequest(readRequestIndex, nullifierIndex) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.PENDING, this.numPendingReadHints);
        this.hints.pendingReadHints[this.numPendingReadHints] = new PendingReadHint(readRequestIndex, nullifierIndex);
        this.numPendingReadHints++;
    }
    addSettledReadRequest(readRequestIndex, membershipWitness, leafPreimage) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.SETTLED, this.numSettledReadHints);
        this.hints.settledReadHints[this.numSettledReadHints] = new SettledReadHint(readRequestIndex, membershipWitness, leafPreimage);
        this.numSettledReadHints++;
    }
    toHints() {
        return {
            numPendingReadHints: this.numPendingReadHints,
            numSettledReadHints: this.numSettledReadHints,
            hints: this.hints,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbGlmaWVyX3JlYWRfcmVxdWVzdF9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JlYWRfcmVxdWVzdF9oaW50cy9udWxsaWZpZXJfcmVhZF9yZXF1ZXN0X2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUlwRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsZUFBZSxFQUNmLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsR0FDaEIsTUFBTSx5QkFBeUIsQ0FBQztBQVVqQyxNQUFNLFVBQVUsbUNBQW1DLENBQ2pELE1BQTZCLEVBQzdCLGVBQXdCLEVBQ3hCLGVBQXdCO0lBRXhCLE9BQU8scUJBQXFCLENBQUMsVUFBVSxDQUNyQyxNQUFNLEVBQ04sa0NBQWtDLEVBQ2xDLGVBQWUsRUFDZixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLHFCQUFxQixDQUN0QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sT0FBTyxnQ0FBZ0M7SUFLM0MsWUFBWSxVQUFtQixFQUFFLFVBQW1CO1FBSDVDLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUN4Qix3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFHOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHFCQUFxQixDQUNwQyxTQUFTLENBQUMsa0NBQWtDLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQ3JFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEVBQ3JGLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ3pCLGVBQWUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQzdHLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFpRCxVQUFtQixFQUFFLFVBQW1CO1FBQ25HLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxnQkFBd0IsRUFBRSxjQUFzQjtRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FDdEUsZ0JBQWdCLENBQUMsT0FBTyxFQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxxQkFBcUIsQ0FDbkIsZ0JBQXdCLEVBQ3hCLGlCQUFrRSxFQUNsRSxZQUE4QjtRQUU5QixJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FDdEUsZ0JBQWdCLENBQUMsT0FBTyxFQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUN6RSxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLFlBQVksQ0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPO1lBQ0wsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtZQUM3QyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=