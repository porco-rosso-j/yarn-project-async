import { BufferReader, type Bufferable, type Tuple } from '@aztec/foundation/serialize';
import { MembershipWitness } from '../membership_witness.js';
export declare enum ReadRequestState {
    NADA = 0,
    PENDING = 1,
    SETTLED = 2
}
export declare class ReadRequestStatus {
    state: ReadRequestState;
    hintIndex: number;
    constructor(state: ReadRequestState, hintIndex: number);
    static nada(): ReadRequestStatus;
    static pending(hintIndex: number): ReadRequestStatus;
    static settled(hintIndex: number): ReadRequestStatus;
    static fromBuffer(buffer: Buffer | BufferReader): ReadRequestStatus;
    toBuffer(): Buffer;
}
export declare class PendingReadHint {
    readRequestIndex: number;
    pendingValueIndex: number;
    constructor(readRequestIndex: number, pendingValueIndex: number);
    static nada(readRequestLen: number): PendingReadHint;
    static fromBuffer(buffer: Buffer | BufferReader): PendingReadHint;
    toBuffer(): Buffer;
}
export declare class SettledReadHint<TREE_HEIGHT extends number, LEAF_PREIMAGE extends Bufferable> {
    readRequestIndex: number;
    membershipWitness: MembershipWitness<TREE_HEIGHT>;
    leafPreimage: LEAF_PREIMAGE;
    constructor(readRequestIndex: number, membershipWitness: MembershipWitness<TREE_HEIGHT>, leafPreimage: LEAF_PREIMAGE);
    static nada<TREE_HEIGHT extends number, LEAF_PREIMAGE extends Bufferable>(readRequestLen: number, treeHeight: TREE_HEIGHT, emptyLeafPreimage: () => LEAF_PREIMAGE): SettledReadHint<TREE_HEIGHT, LEAF_PREIMAGE>;
    static fromBuffer<TREE_HEIGHT extends number, LEAF_PREIMAGE extends Bufferable>(buffer: Buffer | BufferReader, treeHeight: TREE_HEIGHT, leafPreimage: {
        fromBuffer(buffer: BufferReader): LEAF_PREIMAGE;
    }): SettledReadHint<TREE_HEIGHT, LEAF_PREIMAGE>;
    toBuffer(): Buffer;
}
/**
 * Hints for read request reset circuit.
 */
export declare class ReadRequestResetHints<READ_REQUEST_LEN extends number, NUM_PENDING_READS extends number, NUM_SETTLED_READS extends number, TREE_HEIGHT extends number, LEAF_PREIMAGE extends Bufferable> {
    readRequestStatuses: Tuple<ReadRequestStatus, READ_REQUEST_LEN>;
    /**
     * The hints for read requests reading pending values.
     */
    pendingReadHints: Tuple<PendingReadHint, NUM_PENDING_READS>;
    /**
     * The hints for read requests reading settled values.
     */
    settledReadHints: Tuple<SettledReadHint<TREE_HEIGHT, LEAF_PREIMAGE>, NUM_SETTLED_READS>;
    constructor(readRequestStatuses: Tuple<ReadRequestStatus, READ_REQUEST_LEN>, 
    /**
     * The hints for read requests reading pending values.
     */
    pendingReadHints: Tuple<PendingReadHint, NUM_PENDING_READS>, 
    /**
     * The hints for read requests reading settled values.
     */
    settledReadHints: Tuple<SettledReadHint<TREE_HEIGHT, LEAF_PREIMAGE>, NUM_SETTLED_READS>);
    trimToSizes<NEW_NUM_PENDING_READS extends number, NEW_NUM_SETTLED_READS extends number>(numPendingReads: NEW_NUM_PENDING_READS, numSettledReads: NEW_NUM_SETTLED_READS): ReadRequestResetHints<READ_REQUEST_LEN, NEW_NUM_PENDING_READS, NEW_NUM_SETTLED_READS, TREE_HEIGHT, LEAF_PREIMAGE>;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer<READ_REQUEST_LEN extends number, NUM_PENDING_READS extends number, NUM_SETTLED_READS extends number, TREE_HEIGHT extends number, LEAF_PREIMAGE extends Bufferable>(buffer: Buffer | BufferReader, readRequestLen: READ_REQUEST_LEN, numPendingReads: NUM_PENDING_READS, numSettledReads: NUM_SETTLED_READS, treeHeight: TREE_HEIGHT, leafPreimageFromBuffer: {
        fromBuffer: (buffer: BufferReader) => LEAF_PREIMAGE;
    }): ReadRequestResetHints<READ_REQUEST_LEN, NUM_PENDING_READS, NUM_SETTLED_READS, TREE_HEIGHT, LEAF_PREIMAGE>;
    toBuffer(): Buffer;
}
//# sourceMappingURL=read_request_hints.d.ts.map