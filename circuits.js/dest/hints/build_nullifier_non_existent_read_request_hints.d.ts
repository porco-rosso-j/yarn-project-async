import { type Fr } from '@aztec/foundation/fields';
import { type Tuple } from '@aztec/foundation/serialize';
import { type IndexedTreeLeafPreimage } from '@aztec/foundation/trees';
import { MAX_NULLIFIERS_PER_TX, type MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX, type NULLIFIER_TREE_HEIGHT } from '../constants.gen.js';
import { Nullifier } from '../structs/index.js';
import { type MembershipWitness } from '../structs/membership_witness.js';
import { type ScopedReadRequest } from '../structs/read_request.js';
interface NullifierMembershipWitnessWithPreimage {
    membershipWitness: MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>;
    leafPreimage: IndexedTreeLeafPreimage;
}
export declare function buildNullifierNonExistentReadRequestHints(oracle: {
    getLowNullifierMembershipWitness(nullifier: Fr): Promise<NullifierMembershipWitnessWithPreimage>;
}, nullifierNonExistentReadRequests: Tuple<ScopedReadRequest, typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_TX>, pendingNullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_TX>): Promise<import("../structs/non_existent_read_request_hints.js").NullifierNonExistentReadRequestHints>;
export {};
//# sourceMappingURL=build_nullifier_non_existent_read_request_hints.d.ts.map