import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { PUBLIC_DATA_TREE_HEIGHT } from '../constants.gen.js';
import { MembershipWitness } from './membership_witness.js';
import { PublicDataTreeLeafPreimage } from './trees/index.js';
export declare class PublicDataHint {
    leafSlot: Fr;
    value: Fr;
    overrideCounter: number;
    membershipWitness: MembershipWitness<typeof PUBLIC_DATA_TREE_HEIGHT>;
    leafPreimage: PublicDataTreeLeafPreimage;
    constructor(leafSlot: Fr, value: Fr, overrideCounter: number, membershipWitness: MembershipWitness<typeof PUBLIC_DATA_TREE_HEIGHT>, leafPreimage: PublicDataTreeLeafPreimage);
    static empty(): PublicDataHint;
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataHint;
    toBuffer(): Buffer;
}
//# sourceMappingURL=public_data_hint.d.ts.map