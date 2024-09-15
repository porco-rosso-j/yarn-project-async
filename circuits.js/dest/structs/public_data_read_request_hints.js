import { makeTuple } from '@aztec/foundation/array';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_DATA_READS_PER_TX } from '../constants.gen.js';
import { PendingReadHint, ReadRequestState, ReadRequestStatus } from './read_request_hints/index.js';
export class LeafDataReadHint {
    constructor(readRequestIndex, dataHintIndex) {
        this.readRequestIndex = readRequestIndex;
        this.dataHintIndex = dataHintIndex;
    }
    static nada(readRequestLen) {
        return new LeafDataReadHint(readRequestLen, 0);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new LeafDataReadHint(reader.readNumber(), reader.readNumber());
    }
    toBuffer() {
        return serializeToBuffer(this.readRequestIndex, this.dataHintIndex);
    }
}
export class PublicDataReadRequestHints {
    constructor(readRequestStatuses, pendingReadHints, leafDataReadHints) {
        this.readRequestStatuses = readRequestStatuses;
        this.pendingReadHints = pendingReadHints;
        this.leafDataReadHints = leafDataReadHints;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataReadRequestHints(reader.readArray(MAX_PUBLIC_DATA_READS_PER_TX, ReadRequestStatus), reader.readArray(MAX_PUBLIC_DATA_READS_PER_TX, PendingReadHint), reader.readArray(MAX_PUBLIC_DATA_READS_PER_TX, LeafDataReadHint));
    }
    toBuffer() {
        return serializeToBuffer(this.readRequestStatuses, this.pendingReadHints, this.leafDataReadHints);
    }
}
export class PublicDataReadRequestHintsBuilder {
    constructor() {
        this.numPendingReadHints = 0;
        this.numLeafDataReadHints = 0;
        this.hints = new PublicDataReadRequestHints(makeTuple(MAX_PUBLIC_DATA_READS_PER_TX, ReadRequestStatus.nada), makeTuple(MAX_PUBLIC_DATA_READS_PER_TX, () => PendingReadHint.nada(MAX_PUBLIC_DATA_READS_PER_TX)), makeTuple(MAX_PUBLIC_DATA_READS_PER_TX, () => LeafDataReadHint.nada(MAX_PUBLIC_DATA_READS_PER_TX)));
    }
    static empty() {
        return new PublicDataReadRequestHintsBuilder().toHints();
    }
    addPendingReadRequest(readRequestIndex, publicDataWriteIndex) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.PENDING, this.numPendingReadHints);
        this.hints.pendingReadHints[this.numPendingReadHints] = new PendingReadHint(readRequestIndex, publicDataWriteIndex);
        this.numPendingReadHints++;
    }
    addLeafDataReadRequest(readRequestIndex, leafDataDataHintIndex) {
        this.hints.readRequestStatuses[readRequestIndex] = new ReadRequestStatus(ReadRequestState.SETTLED, this.numLeafDataReadHints);
        this.hints.leafDataReadHints[this.numLeafDataReadHints] = new LeafDataReadHint(readRequestIndex, leafDataDataHintIndex);
        this.numLeafDataReadHints++;
    }
    toHints() {
        return this.hints;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfcmVhZF9yZXF1ZXN0X2hpbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvcHVibGljX2RhdGFfcmVhZF9yZXF1ZXN0X2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXJHLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBbUIsZ0JBQXdCLEVBQVMsYUFBcUI7UUFBdEQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQVE7SUFBRyxDQUFDO0lBRTdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBc0I7UUFDaEMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNTLG1CQUFr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