import { makeTuple } from '@aztec/foundation/array';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_NULLIFIERS_PER_TX, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT, } from '../constants.gen.js';
import { MembershipWitness } from './membership_witness.js';
import { Nullifier } from './nullifier.js';
import { NullifierLeafPreimage } from './trees/index.js';
export class NonMembershipHint {
    constructor(membershipWitness, leafPreimage) {
        this.membershipWitness = membershipWitness;
        this.leafPreimage = leafPreimage;
    }
    static empty(treeHeight, makeEmptyLeafPreimage) {
        return new NonMembershipHint(MembershipWitness.empty(treeHeight), makeEmptyLeafPreimage());
    }
    static fromBuffer(buffer, treeHeight, leafPreimageFromBuffer) {
        const reader = BufferReader.asReader(buffer);
        return new NonMembershipHint(MembershipWitness.fromBuffer(reader, treeHeight), reader.readObject(leafPreimageFromBuffer));
    }
    toBuffer() {
        return serializeToBuffer(this.membershipWitness, this.leafPreimage);
    }
}
export class NonExistentReadRequestHints {
    constructor(
    /**
     * The hints for the low leaves of the read requests.
     */
    nonMembershipHints, 
    /**
     * Indices of the smallest pending values greater than the read requests.
     */
    nextPendingValueIndices, sortedPendingValues, sortedPendingValueHints) {
        this.nonMembershipHints = nonMembershipHints;
        this.nextPendingValueIndices = nextPendingValueIndices;
        this.sortedPendingValues = sortedPendingValues;
        this.sortedPendingValueHints = sortedPendingValueHints;
    }
    static fromBuffer(buffer, readRequestLen, treeHeight, leafPreimageFromBuffer, pendingValueLen, orderedValueFromBuffer) {
        const reader = BufferReader.asReader(buffer);
        return new NonExistentReadRequestHints(reader.readArray(readRequestLen, {
            fromBuffer: buf => NonMembershipHint.fromBuffer(buf, treeHeight, leafPreimageFromBuffer),
        }), reader.readNumbers(readRequestLen), reader.readArray(pendingValueLen, orderedValueFromBuffer), reader.readNumbers(pendingValueLen));
    }
    toBuffer() {
        return serializeToBuffer(this.nonMembershipHints, this.nextPendingValueIndices, this.sortedPendingValues, this.sortedPendingValueHints);
    }
}
export function nullifierNonExistentReadRequestHintsFromBuffer(buffer) {
    return NonExistentReadRequestHints.fromBuffer(buffer, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT, NullifierLeafPreimage, MAX_NULLIFIERS_PER_TX, Nullifier);
}
export class NullifierNonExistentReadRequestHintsBuilder {
    constructor(sortedPendingNullifiers, sortedPendingNullifierIndexHints) {
        this.readRequestIndex = 0;
        this.hints = new NonExistentReadRequestHints(makeTuple(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, () => NonMembershipHint.empty(NULLIFIER_TREE_HEIGHT, NullifierLeafPreimage.empty)), makeTuple(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, () => 0), sortedPendingNullifiers, sortedPendingNullifierIndexHints);
    }
    static empty() {
        const emptySortedPendingNullifiers = makeTuple(MAX_NULLIFIERS_PER_TX, Nullifier.empty);
        const emptySortedPendingNullifierIndexHints = makeTuple(MAX_NULLIFIERS_PER_TX, () => 0);
        return new NullifierNonExistentReadRequestHintsBuilder(emptySortedPendingNullifiers, emptySortedPendingNullifierIndexHints).toHints();
    }
    addHint(membershipWitness, lowLeafPreimage, nextPendingValueIndex) {
        this.hints.nonMembershipHints[this.readRequestIndex] = new NonMembershipHint(membershipWitness, lowLeafPreimage);
        this.hints.nextPendingValueIndices[this.readRequestIndex] = nextPendingValueIndex;
        this.readRequestIndex++;
    }
    toHints() {
        return this.hints;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9uX2V4aXN0ZW50X3JlYWRfcmVxdWVzdF9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL25vbl9leGlzdGVudF9yZWFkX3JlcXVlc3RfaGludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcxRixPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLCtDQUErQyxFQUMvQyxxQkFBcUIsR0FDdEIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNekQsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFtQixpQkFBaUQsRUFBUyxZQUEyQjtRQUFyRixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWdDO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWU7SUFBRyxDQUFDO0lBRTVHLE1BQU0sQ0FBQyxLQUFLLENBQ1YsVUFBdUIsRUFDdkIscUJBQTBDO1FBRTFDLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUNmLE1BQTZCLEVBQzdCLFVBQXVCLEVBQ3ZCLHNCQUErRTtRQUUvRSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxpQkFBaUIsQ0FDMUIsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFB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