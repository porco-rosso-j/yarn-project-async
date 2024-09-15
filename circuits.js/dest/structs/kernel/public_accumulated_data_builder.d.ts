import { Fr } from '@aztec/foundation/fields';
import { CallRequest } from '../call_request.js';
import { Gas } from '../gas.js';
import { LogHash } from '../log_hash.js';
import { NoteHash } from '../note_hash.js';
import { Nullifier } from '../nullifier.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
import { PublicAccumulatedData } from './public_accumulated_data.js';
/**
 * TESTS-ONLY CLASS
 * Builder for PublicAccumulatedData, used to conveniently construct instances for testing,
 * as PublicAccumulatedData is (or will shortly be) immutable.
 *
 */
export declare class PublicAccumulatedDataBuilder {
    private noteHashes;
    private nullifiers;
    private l2ToL1Msgs;
    private noteEncryptedLogsHashes;
    private encryptedLogsHashes;
    private unencryptedLogsHashes;
    private publicDataUpdateRequests;
    private publicCallStack;
    private gasUsed;
    pushNoteHash(newNoteHash: NoteHash): this;
    withNoteHashes(noteHashes: NoteHash[]): this;
    pushNullifier(newNullifier: Nullifier): this;
    withNullifiers(nullifiers: Nullifier[]): this;
    pushL2ToL1Msg(newL2ToL1Msg: Fr): this;
    withL2ToL1Msgs(l2ToL1Msgs: Fr[]): this;
    pushNoteEncryptedLogsHash(noteEncryptedLogsHash: LogHash): this;
    withNoteEncryptedLogsHashes(noteEncryptedLogsHashes: LogHash[]): this;
    pushEncryptedLogsHash(encryptedLogsHash: LogHash): this;
    withEncryptedLogsHashes(encryptedLogsHashes: LogHash[]): this;
    pushUnencryptedLogsHash(unencryptedLogsHash: LogHash): this;
    withUnencryptedLogsHashes(unencryptedLogsHashes: LogHash[]): this;
    pushPublicDataUpdateRequest(publicDataUpdateRequest: PublicDataUpdateRequest): this;
    withPublicDataUpdateRequests(publicDataUpdateRequests: PublicDataUpdateRequest[]): this;
    pushPublicCall(publicCall: CallRequest): this;
    withPublicCallStack(publicCallStack: CallRequest[]): this;
    withGasUsed(gasUsed: Gas): this;
    build(): PublicAccumulatedData;
    static fromPublicAccumulatedData(publicAccumulatedData: PublicAccumulatedData): PublicAccumulatedDataBuilder;
}
//# sourceMappingURL=public_accumulated_data_builder.d.ts.map