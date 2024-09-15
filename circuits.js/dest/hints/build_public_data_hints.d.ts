import { type Tuple } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_DATA_HINTS, type MAX_PUBLIC_DATA_READS_PER_TX, type MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, type PUBLIC_DATA_TREE_HEIGHT } from '../constants.gen.js';
import { type PublicDataRead, type PublicDataTreeLeafPreimage, type PublicDataUpdateRequest } from '../structs/index.js';
import { type MembershipWitness } from '../structs/membership_witness.js';
import { PublicDataHint } from '../structs/public_data_hint.js';
interface PublicDataMembershipWitnessWithPreimage {
    membershipWitness: MembershipWitness<typeof PUBLIC_DATA_TREE_HEIGHT>;
    leafPreimage: PublicDataTreeLeafPreimage;
}
type PublicDataMembershipWitnessOracle = {
    getMatchOrLowPublicDataMembershipWitness(leafSlot: bigint): Promise<PublicDataMembershipWitnessWithPreimage>;
};
export declare function buildPublicDataHints(oracle: PublicDataMembershipWitnessOracle, publicDataReads: Tuple<PublicDataRead, typeof MAX_PUBLIC_DATA_READS_PER_TX>, publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>): Promise<Tuple<PublicDataHint, typeof MAX_PUBLIC_DATA_HINTS>>;
export declare function buildPublicDataHint(oracle: PublicDataMembershipWitnessOracle, leafSlot: bigint): Promise<PublicDataHint>;
export {};
//# sourceMappingURL=build_public_data_hints.d.ts.map