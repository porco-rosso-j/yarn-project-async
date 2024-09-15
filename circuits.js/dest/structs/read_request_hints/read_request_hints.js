import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MembershipWitness } from '../membership_witness.js';
export var ReadRequestState;
(function (ReadRequestState) {
    ReadRequestState[ReadRequestState["NADA"] = 0] = "NADA";
    ReadRequestState[ReadRequestState["PENDING"] = 1] = "PENDING";
    ReadRequestState[ReadRequestState["SETTLED"] = 2] = "SETTLED";
})(ReadRequestState || (ReadRequestState = {}));
export class ReadRequestStatus {
    constructor(state, hintIndex) {
        this.state = state;
        this.hintIndex = hintIndex;
    }
    static nada() {
        return new ReadRequestStatus(ReadRequestState.NADA, 0);
    }
    static pending(hintIndex) {
        return new ReadRequestStatus(ReadRequestState.PENDING, hintIndex);
    }
    static settled(hintIndex) {
        return new ReadRequestStatus(ReadRequestState.SETTLED, hintIndex);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ReadRequestStatus(reader.readNumber(), reader.readNumber());
    }
    toBuffer() {
        return serializeToBuffer(this.state, this.hintIndex);
    }
}
export class PendingReadHint {
    constructor(readRequestIndex, pendingValueIndex) {
        this.readRequestIndex = readRequestIndex;
        this.pendingValueIndex = pendingValueIndex;
    }
    static nada(readRequestLen) {
        return new PendingReadHint(readRequestLen, 0);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PendingReadHint(reader.readNumber(), reader.readNumber());
    }
    toBuffer() {
        return serializeToBuffer(this.readRequestIndex, this.pendingValueIndex);
    }
}
export class SettledReadHint {
    constructor(readRequestIndex, membershipWitness, leafPreimage) {
        this.readRequestIndex = readRequestIndex;
        this.membershipWitness = membershipWitness;
        this.leafPreimage = leafPreimage;
    }
    static nada(readRequestLen, treeHeight, emptyLeafPreimage) {
        return new SettledReadHint(readRequestLen, MembershipWitness.empty(treeHeight), emptyLeafPreimage());
    }
    static fromBuffer(buffer, treeHeight, leafPreimage) {
        const reader = BufferReader.asReader(buffer);
        return new SettledReadHint(reader.readNumber(), MembershipWitness.fromBuffer(reader, treeHeight), reader.readObject(leafPreimage));
    }
    toBuffer() {
        return serializeToBuffer(this.readRequestIndex, this.membershipWitness, this.leafPreimage);
    }
}
/**
 * Hints for read request reset circuit.
 */
export class ReadRequestResetHints {
    constructor(readRequestStatuses, 
    /**
     * The hints for read requests reading pending values.
     */
    pendingReadHints, 
    /**
     * The hints for read requests reading settled values.
     */
    settledReadHints) {
        this.readRequestStatuses = readRequestStatuses;
        this.pendingReadHints = pendingReadHints;
        this.settledReadHints = settledReadHints;
    }
    trimToSizes(numPendingReads, numSettledReads) {
        return new ReadRequestResetHints(this.readRequestStatuses, this.pendingReadHints.slice(0, numPendingReads), this.settledReadHints.slice(0, numSettledReads));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer, readRequestLen, numPendingReads, numSettledReads, treeHeight, leafPreimageFromBuffer) {
        const reader = BufferReader.asReader(buffer);
        return new ReadRequestResetHints(reader.readArray(readRequestLen, ReadRequestStatus), reader.readArray(numPendingReads, PendingReadHint), reader.readArray(numSettledReads, {
            fromBuffer: r => SettledReadHint.fromBuffer(r, treeHeight, leafPreimageFromBuffer),
        }));
    }
    toBuffer() {
        return serializeToBuffer(this.readRequestStatuses, this.pendingReadHints, this.settledReadHints);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZF9yZXF1ZXN0X2hpbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMvcmVhZF9yZXF1ZXN0X2hpbnRzL3JlYWRfcmVxdWVzdF9oaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUErQixpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTdELE1BQU0sQ0FBTixJQUFZLGdCQUlYO0FBSkQsV0FBWSxnQkFBZ0I7SUFDMUIsdURBQVEsQ0FBQTtJQUNSLDZEQUFXLENBQUE7SUFDWCw2REFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFJM0I7QUFFRCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW1CLEtBQXVCLEVBQVMsU0FBaUI7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztJQUV4RSxNQUFNLENBQUMsSUFBSTtRQUNULE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBaUI7UUFDOUIsT0FBTyxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQjtRQUM5QixPQUFPLElBQUksaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENB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