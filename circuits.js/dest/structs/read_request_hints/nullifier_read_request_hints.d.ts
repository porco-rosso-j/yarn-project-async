import { type BufferReader } from '@aztec/foundation/serialize';
import { type TreeLeafPreimage } from '@aztec/foundation/trees';
import { MAX_NULLIFIER_READ_REQUESTS_PER_TX, NULLIFIER_TREE_HEIGHT } from '../../constants.gen.js';
import { type MembershipWitness } from '../membership_witness.js';
import { ReadRequestResetHints } from './read_request_hints.js';
export type NullifierReadRequestHints<PENDING extends number, SETTLED extends number> = ReadRequestResetHints<typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX, PENDING, SETTLED, typeof NULLIFIER_TREE_HEIGHT, TreeLeafPreimage>;
export declare function nullifierReadRequestHintsFromBuffer<PENDING extends number, SETTLED extends number>(buffer: Buffer | BufferReader, numPendingReads: PENDING, numSettledReads: SETTLED): NullifierReadRequestHints<PENDING, SETTLED>;
export declare class NullifierReadRequestHintsBuilder<PENDING extends number, SETTLED extends number> {
    private hints;
    private numPendingReadHints;
    private numSettledReadHints;
    constructor(numPending: PENDING, numSettled: SETTLED);
    static empty<PENDING extends number, SETTLED extends number>(numPending: PENDING, numSettled: SETTLED): NullifierReadRequestHints<PENDING, SETTLED>;
    addPendingReadRequest(readRequestIndex: number, nullifierIndex: number): void;
    addSettledReadRequest(readRequestIndex: number, membershipWitness: MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>, leafPreimage: TreeLeafPreimage): void;
    toHints(): {
        numPendingReadHints: number;
        numSettledReadHints: number;
        hints: NullifierReadRequestHints<PENDING, SETTLED>;
    };
}
//# sourceMappingURL=nullifier_read_request_hints.d.ts.map