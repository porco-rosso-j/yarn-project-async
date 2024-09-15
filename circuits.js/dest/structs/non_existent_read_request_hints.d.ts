import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type IndexedTreeLeafPreimage } from '@aztec/foundation/trees';
import { MAX_NULLIFIERS_PER_TX, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT } from '../constants.gen.js';
import { MembershipWitness } from './membership_witness.js';
import { Nullifier } from './nullifier.js';
interface PendingValue {
    toBuffer(): Buffer;
}
export declare class NonMembershipHint<TREE_HEIGHT extends number, LEAF_PREIMAGE extends IndexedTreeLeafPreimage> {
    membershipWitness: MembershipWitness<TREE_HEIGHT>;
    leafPreimage: LEAF_PREIMAGE;
    constructor(membershipWitness: MembershipWitness<TREE_HEIGHT>, leafPreimage: LEAF_PREIMAGE);
    static empty<TREE_HEIGHT extends number, LEAF_PREIMAGE extends IndexedTreeLeafPreimage>(treeHeight: TREE_HEIGHT, makeEmptyLeafPreimage: () => LEAF_PREIMAGE): NonMembershipHint<TREE_HEIGHT, LEAF_PREIMAGE>;
    static fromBuffer<TREE_HEIGHT extends number, LEAF_PREIMAGE extends IndexedTreeLeafPreimage>(buffer: Buffer | BufferReader, treeHeight: TREE_HEIGHT, leafPreimageFromBuffer: {
        fromBuffer: (buffer: BufferReader) => LEAF_PREIMAGE;
    }): NonMembershipHint<TREE_HEIGHT, LEAF_PREIMAGE>;
    toBuffer(): Buffer;
}
export declare class NonExistentReadRequestHints<READ_REQUEST_LEN extends number, TREE_HEIGHT extends number, LEAF_PREIMAGE extends IndexedTreeLeafPreimage, PENDING_VALUE_LEN extends number, PENDING_VALUE extends PendingValue> {
    /**
     * The hints for the low leaves of the read requests.
     */
    nonMembershipHints: Tuple<NonMembershipHint<TREE_HEIGHT, LEAF_PREIMAGE>, READ_REQUEST_LEN>;
    /**
     * Indices of the smallest pending values greater than the read requests.
     */
    nextPendingValueIndices: Tuple<number, READ_REQUEST_LEN>;
    sortedPendingValues: Tuple<PENDING_VALUE, PENDING_VALUE_LEN>;
    sortedPendingValueHints: Tuple<number, PENDING_VALUE_LEN>;
    constructor(
    /**
     * The hints for the low leaves of the read requests.
     */
    nonMembershipHints: Tuple<NonMembershipHint<TREE_HEIGHT, LEAF_PREIMAGE>, READ_REQUEST_LEN>, 
    /**
     * Indices of the smallest pending values greater than the read requests.
     */
    nextPendingValueIndices: Tuple<number, READ_REQUEST_LEN>, sortedPendingValues: Tuple<PENDING_VALUE, PENDING_VALUE_LEN>, sortedPendingValueHints: Tuple<number, PENDING_VALUE_LEN>);
    static fromBuffer<READ_REQUEST_LEN extends number, TREE_HEIGHT extends number, LEAF_PREIMAGE extends IndexedTreeLeafPreimage, PENDING_VALUE_LEN extends number, PENDING_VALUE extends PendingValue>(buffer: Buffer | BufferReader, readRequestLen: READ_REQUEST_LEN, treeHeight: TREE_HEIGHT, leafPreimageFromBuffer: {
        fromBuffer: (buffer: BufferReader) => LEAF_PREIMAGE;
    }, pendingValueLen: PENDING_VALUE_LEN, orderedValueFromBuffer: {
        fromBuffer: (buffer: BufferReader) => PENDING_VALUE;
    }): NonExistentReadRequestHints<READ_REQUEST_LEN, TREE_HEIGHT, LEAF_PREIMAGE, PENDING_VALUE_LEN, PENDING_VALUE>;
    toBuffer(): Buffer;
}
export type NullifierNonExistentReadRequestHints = NonExistentReadRequestHints<typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, typeof NULLIFIER_TREE_HEIGHT, IndexedTreeLeafPreimage, typeof MAX_NULLIFIERS_PER_TX, Nullifier>;
export declare function nullifierNonExistentReadRequestHintsFromBuffer(buffer: Buffer | BufferReader): NullifierNonExistentReadRequestHints;
export declare class NullifierNonExistentReadRequestHintsBuilder {
    private hints;
    private readRequestIndex;
    constructor(sortedPendingNullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_TX>, sortedPendingNullifierIndexHints: Tuple<number, typeof MAX_NULLIFIERS_PER_TX>);
    static empty(): NullifierNonExistentReadRequestHints;
    addHint(membershipWitness: MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>, lowLeafPreimage: IndexedTreeLeafPreimage, nextPendingValueIndex: number): void;
    toHints(): NullifierNonExistentReadRequestHints;
}
export {};
//# sourceMappingURL=non_existent_read_request_hints.d.ts.map