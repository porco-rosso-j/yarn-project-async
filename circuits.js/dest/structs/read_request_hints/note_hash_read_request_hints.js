import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { MAX_NOTE_HASH_READ_REQUESTS_PER_TX, NOTE_HASH_TREE_HEIGHT } from '../../constants.gen.js';
import { PendingReadHint, ReadRequestResetHints, ReadRequestState, ReadRequestStatus, SettledReadHint, } from './read_request_hints.js';
export function noteHashReadRequestHintsFromBuffer(buffer, numPending, numSettled) {
    return ReadRequestResetHints.fromBuffer(buffer, MAX_NOTE_HASH_READ_REQUESTS_PER_TX, numPending, numSettled, NOTE_HASH_TREE_HEIGHT, Fr);
}
export class NoteHashReadRequestHintsBuilder {
    constructor(numPending, numSettled) {
        this.numPendingReadHints = 0;
        this.numSettledReadHints = 0;
        this.hints = new ReadRequestResetHints(makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, ReadRequestStatus.nada), makeTuple(numPending, () => PendingReadHint.nada(MAX_NOTE_HASH_READ_REQUESTS_PER_TX)), makeTuple(numSettled, () => SettledReadHint.nada(MAX_NOTE_HASH_READ_REQUESTS_PER_TX, NOTE_HASH_TREE_HEIGHT, Fr.zero)));
    }
    static empty(numPending, numSettled) {
        return new NoteHashReadRequestHintsBuilder(numPending, numSettled).toHints().hints;
    }
    addPendingReadRequest(readRequestIndex, noteHashIndex) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.PENDING, this.numPendingReadHints);
        this.hints.pendingReadHints[this.numPendingReadHints] = new PendingReadHint(readRequestIndex, noteHashIndex);
        this.numPendingReadHints++;
    }
    addSettledReadRequest(readRequestIndex, membershipWitness, value) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.SETTLED, this.numSettledReadHints);
        this.hints.settledReadHints[this.numSettledReadHints] = new SettledReadHint(readRequestIndex, membershipWitness, value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90ZV9oYXNoX3JlYWRfcmVxdWVzdF9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JlYWRfcmVxdWVzdF9oaW50cy9ub3RlX2hhc2hfcmVhZF9yZXF1ZXN0X2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkcsT0FBTyxFQUNMLGVBQWUsRUFDZixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEdBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFZakMsTUFBTSxVQUFVLGtDQUFrQyxDQUNoRCxNQUE2QixFQUM3QixVQUFtQixFQUNuQixVQUFtQjtJQUVuQixPQUFPLHFCQUFxQixDQUFDLFVBQVUsQ0FDckMsTUFBTSxFQUNOLGtDQUFrQyxFQUNsQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLHFCQUFxQixFQUNyQixFQUFFLENBQ0gsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLE9BQU8sK0JBQStCO0lBSzFDLFlBQVksVUFBbUIsRUFBRSxVQUFtQjtRQUg3Qyx3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDeEIsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBRzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxxQkFBcUIsQ0FDcEMsU0FBUyxDQUFDLGtDQUFrQyxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUNyRSxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUNyRixTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUN6QixlQUFlLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FDekYsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQWlELFVBQW1CLEVBQUUsVUFBbUI7UUFDbkcsT0FBTyxJQUFJLCtCQUErQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDckYsQ0FBQztJQUVELHFCQUFxQixDQUFDLGdCQUF3QixFQUFFLGFBQXFCO1FBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHFCQUFxQixDQUNuQixnQkFBd0IsRUFDeEIsaUJBQWtFLEVBQ2xFLEtBQXdCO1FBRXhCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxlQUFlLENBQ3pFLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsS0FBSyxDQUNOLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU87WUFDTCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==