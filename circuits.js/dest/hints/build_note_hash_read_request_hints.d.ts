import { type Tuple } from '@aztec/foundation/serialize';
import { type MAX_NOTE_HASHES_PER_TX, type MAX_NOTE_HASH_READ_REQUESTS_PER_TX, type NOTE_HASH_TREE_HEIGHT } from '../constants.gen.js';
import { type MembershipWitness, type ScopedNoteHash, type ScopedReadRequest } from '../structs/index.js';
export declare function isValidNoteHashReadRequest(readRequest: ScopedReadRequest, noteHash: ScopedNoteHash): boolean;
export declare function buildNoteHashReadRequestHints<PENDING extends number, SETTLED extends number>(oracle: {
    getNoteHashMembershipWitness(leafIndex: bigint): Promise<MembershipWitness<typeof NOTE_HASH_TREE_HEIGHT>>;
}, noteHashReadRequests: Tuple<ScopedReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX>, noteHashes: Tuple<ScopedNoteHash, typeof MAX_NOTE_HASHES_PER_TX>, noteHashLeafIndexMap: Map<bigint, bigint>, sizePending: PENDING, sizeSettled: SETTLED, futureNoteHashes: ScopedNoteHash[]): Promise<{
    numPendingReadHints: number;
    numSettledReadHints: number;
    hints: import("../structs/index.js").NoteHashReadRequestHints<PENDING, SETTLED>;
}>;
//# sourceMappingURL=build_note_hash_read_request_hints.d.ts.map