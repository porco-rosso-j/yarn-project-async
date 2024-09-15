import { Fr } from '@aztec/foundation/fields';
import { type BufferReader } from '@aztec/foundation/serialize';
import { MAX_NOTE_HASH_READ_REQUESTS_PER_TX, NOTE_HASH_TREE_HEIGHT } from '../../constants.gen.js';
import { type MembershipWitness } from '../membership_witness.js';
import { ReadRequestResetHints } from './read_request_hints.js';
type NoteHashLeafValue = Fr;
export type NoteHashReadRequestHints<PENDING extends number, SETTLED extends number> = ReadRequestResetHints<typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX, PENDING, SETTLED, typeof NOTE_HASH_TREE_HEIGHT, NoteHashLeafValue>;
export declare function noteHashReadRequestHintsFromBuffer<PENDING extends number, SETTLED extends number>(buffer: Buffer | BufferReader, numPending: PENDING, numSettled: SETTLED): NoteHashReadRequestHints<PENDING, SETTLED>;
export declare class NoteHashReadRequestHintsBuilder<PENDING extends number, SETTLED extends number> {
    private hints;
    numPendingReadHints: number;
    numSettledReadHints: number;
    constructor(numPending: PENDING, numSettled: SETTLED);
    static empty<PENDING extends number, SETTLED extends number>(numPending: PENDING, numSettled: SETTLED): NoteHashReadRequestHints<PENDING, SETTLED>;
    addPendingReadRequest(readRequestIndex: number, noteHashIndex: number): void;
    addSettledReadRequest(readRequestIndex: number, membershipWitness: MembershipWitness<typeof NOTE_HASH_TREE_HEIGHT>, value: NoteHashLeafValue): void;
    toHints(): {
        numPendingReadHints: number;
        numSettledReadHints: number;
        hints: NoteHashReadRequestHints<PENDING, SETTLED>;
    };
}
export {};
//# sourceMappingURL=note_hash_read_request_hints.d.ts.map