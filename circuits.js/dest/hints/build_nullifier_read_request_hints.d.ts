import { type Fr } from '@aztec/foundation/fields';
import { type Tuple } from '@aztec/foundation/serialize';
import { type IndexedTreeLeafPreimage } from '@aztec/foundation/trees';
import { type MAX_NULLIFIERS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX, type NULLIFIER_TREE_HEIGHT } from '../constants.gen.js';
import { type MembershipWitness, Nullifier, type ScopedNullifier, ScopedReadRequest } from '../structs/index.js';
export declare function isValidNullifierReadRequest(readRequest: ScopedReadRequest, nullifier: ScopedNullifier): boolean;
interface NullifierMembershipWitnessWithPreimage {
    membershipWitness: MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>;
    leafPreimage: IndexedTreeLeafPreimage;
}
export declare function buildNullifierReadRequestHints<PENDING extends number, SETTLED extends number>(oracle: {
    getNullifierMembershipWitness(nullifier: Fr): Promise<NullifierMembershipWitnessWithPreimage>;
}, nullifierReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>, nullifiers: Tuple<ScopedNullifier, typeof MAX_NULLIFIERS_PER_TX>, sizePending: PENDING, sizeSettled: SETTLED, futureNullifiers: ScopedNullifier[], siloed?: boolean): Promise<{
    numPendingReadHints: number;
    numSettledReadHints: number;
    hints: import("../structs/index.js").NullifierReadRequestHints<PENDING, SETTLED>;
}>;
export declare function buildSiloedNullifierReadRequestHints<PENDING extends number, SETTLED extends number>(oracle: {
    getNullifierMembershipWitness(nullifier: Fr): Promise<NullifierMembershipWitnessWithPreimage>;
}, nullifierReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>, nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_TX>, sizePending: PENDING, sizeSettled: SETTLED): Promise<{
    numPendingReadHints: number;
    numSettledReadHints: number;
    hints: import("../structs/index.js").NullifierReadRequestHints<PENDING, SETTLED>;
}>;
export {};
//# sourceMappingURL=build_nullifier_read_request_hints.d.ts.map