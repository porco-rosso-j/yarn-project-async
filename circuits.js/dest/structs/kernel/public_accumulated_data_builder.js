import { padArrayEnd } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX, } from '../../constants.gen.js';
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
export class PublicAccumulatedDataBuilder {
    constructor() {
        this.noteHashes = [];
        this.nullifiers = [];
        this.l2ToL1Msgs = [];
        this.noteEncryptedLogsHashes = [];
        this.encryptedLogsHashes = [];
        this.unencryptedLogsHashes = [];
        this.publicDataUpdateRequests = [];
        this.publicCallStack = [];
        this.gasUsed = Gas.empty();
    }
    pushNoteHash(newNoteHash) {
        this.noteHashes.push(newNoteHash);
        return this;
    }
    withNoteHashes(noteHashes) {
        this.noteHashes = noteHashes;
        return this;
    }
    pushNullifier(newNullifier) {
        this.nullifiers.push(newNullifier);
        return this;
    }
    withNullifiers(nullifiers) {
        this.nullifiers = nullifiers;
        return this;
    }
    pushL2ToL1Msg(newL2ToL1Msg) {
        this.l2ToL1Msgs.push(newL2ToL1Msg);
        return this;
    }
    withL2ToL1Msgs(l2ToL1Msgs) {
        this.l2ToL1Msgs = l2ToL1Msgs;
        return this;
    }
    pushNoteEncryptedLogsHash(noteEncryptedLogsHash) {
        this.noteEncryptedLogsHashes.push(noteEncryptedLogsHash);
        return this;
    }
    withNoteEncryptedLogsHashes(noteEncryptedLogsHashes) {
        this.noteEncryptedLogsHashes = noteEncryptedLogsHashes;
        return this;
    }
    pushEncryptedLogsHash(encryptedLogsHash) {
        this.encryptedLogsHashes.push(encryptedLogsHash);
        return this;
    }
    withEncryptedLogsHashes(encryptedLogsHashes) {
        this.encryptedLogsHashes = encryptedLogsHashes;
        return this;
    }
    pushUnencryptedLogsHash(unencryptedLogsHash) {
        this.unencryptedLogsHashes.push(unencryptedLogsHash);
        return this;
    }
    withUnencryptedLogsHashes(unencryptedLogsHashes) {
        this.unencryptedLogsHashes = unencryptedLogsHashes;
        return this;
    }
    pushPublicDataUpdateRequest(publicDataUpdateRequest) {
        this.publicDataUpdateRequests.push(publicDataUpdateRequest);
        return this;
    }
    withPublicDataUpdateRequests(publicDataUpdateRequests) {
        this.publicDataUpdateRequests = publicDataUpdateRequests;
        return this;
    }
    pushPublicCall(publicCall) {
        this.publicCallStack.push(publicCall);
        return this;
    }
    withPublicCallStack(publicCallStack) {
        this.publicCallStack = publicCallStack;
        return this;
    }
    withGasUsed(gasUsed) {
        this.gasUsed = gasUsed;
        return this;
    }
    build() {
        return new PublicAccumulatedData(padArrayEnd(this.noteHashes, NoteHash.empty(), MAX_NOTE_HASHES_PER_TX), padArrayEnd(this.nullifiers, Nullifier.empty(), MAX_NULLIFIERS_PER_TX), padArrayEnd(this.l2ToL1Msgs, Fr.ZERO, MAX_L2_TO_L1_MSGS_PER_TX), padArrayEnd(this.noteEncryptedLogsHashes, LogHash.empty(), MAX_NOTE_ENCRYPTED_LOGS_PER_TX), padArrayEnd(this.encryptedLogsHashes, LogHash.empty(), MAX_ENCRYPTED_LOGS_PER_TX), padArrayEnd(this.unencryptedLogsHashes, LogHash.empty(), MAX_UNENCRYPTED_LOGS_PER_TX), padArrayEnd(this.publicDataUpdateRequests, PublicDataUpdateRequest.empty(), MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX), padArrayEnd(this.publicCallStack, CallRequest.empty(), MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX), this.gasUsed);
    }
    static fromPublicAccumulatedData(publicAccumulatedData) {
        return new PublicAccumulatedDataBuilder()
            .withNoteHashes(publicAccumulatedData.noteHashes)
            .withNullifiers(publicAccumulatedData.nullifiers)
            .withL2ToL1Msgs(publicAccumulatedData.l2ToL1Msgs)
            .withNoteEncryptedLogsHashes(publicAccumulatedData.noteEncryptedLogsHashes)
            .withEncryptedLogsHashes(publicAccumulatedData.encryptedLogsHashes)
            .withUnencryptedLogsHashes(publicAccumulatedData.unencryptedLogsHashes)
            .withPublicDataUpdateRequests(publicAccumulatedData.publicDataUpdateRequests)
            .withPublicCallStack(publicAccumulatedData.publicCallStack)
            .withGasUsed(publicAccumulatedData.gasUsed);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FjY3VtdWxhdGVkX2RhdGFfYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9wdWJsaWNfYWNjdW11bGF0ZWRfZGF0YV9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFOUMsT0FBTyxFQUNMLHlCQUF5QixFQUN6Qix3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsbUNBQW1DLEVBQ25DLHNDQUFzQyxFQUN0QywyQkFBMkIsR0FDNUIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRTs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyw0QkFBNEI7SUFBekM7UUFDVSxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBQzVCLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLGVBQVUsR0FBUyxFQUFFLENBQUM7UUFDdEIsNEJBQXVCLEdBQWMsRUFBRSxDQUFDO1FBQ3hDLHdCQUFtQixHQUFjLEVBQUUsQ0FBQztRQUNwQywwQkFBcUIsR0FBYyxFQUFFLENB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