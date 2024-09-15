import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX } from '../../constants.gen.js';
import { countAccumulatedItems } from '../../utils/index.js';
import { KeyValidationHint, noteHashReadRequestHintsFromBuffer, nullifierReadRequestHintsFromBuffer, } from '../read_request_hints/index.js';
import { PrivateKernelData } from './private_kernel_data.js';
export class PrivateKernelResetHints {
    constructor(
    /**
     * Contains hints for the transient note hashes to locate corresponding nullifiers.
     */
    transientNullifierIndexesForNoteHashes, 
    /**
     * Contains hints for the transient nullifiers to locate corresponding note hashes.
     */
    transientNoteHashIndexesForNullifiers, 
    /**
     * Contains hints for the transient read requests to localize corresponding commitments.
     */
    noteHashReadRequestHints, 
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    nullifierReadRequestHints, 
    /**
     * Contains hints for key validation request.
     */
    keyValidationHints) {
        this.transientNullifierIndexesForNoteHashes = transientNullifierIndexesForNoteHashes;
        this.transientNoteHashIndexesForNullifiers = transientNoteHashIndexesForNullifiers;
        this.noteHashReadRequestHints = noteHashReadRequestHints;
        this.nullifierReadRequestHints = nullifierReadRequestHints;
        this.keyValidationHints = keyValidationHints;
    }
    toBuffer() {
        return serializeToBuffer(this.transientNullifierIndexesForNoteHashes, this.transientNoteHashIndexesForNullifiers, this.noteHashReadRequestHints, this.nullifierReadRequestHints, this.keyValidationHints);
    }
    trimToSizes(numNoteHashReadRequestPending, numNoteHashReadRequestSettled, numNullifierReadRequestPending, numNullifierReadRequestSettled, numKeyValidationRequests) {
        return new PrivateKernelResetHints(this.transientNullifierIndexesForNoteHashes, this.transientNoteHashIndexesForNullifiers, this.noteHashReadRequestHints.trimToSizes(numNoteHashReadRequestPending, numNoteHashReadRequestSettled), this.nullifierReadRequestHints.trimToSizes(numNullifierReadRequestPending, numNullifierReadRequestSettled), this.keyValidationHints.slice(0, numKeyValidationRequests));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer, numNoteHashReadRequestPending, numNoteHashReadRequestSettled, numNullifierReadRequestPending, numNullifierReadRequestSettled, numNullifierKeys) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelResetHints(reader.readNumbers(MAX_NOTE_HASHES_PER_TX), reader.readNumbers(MAX_NULLIFIERS_PER_TX), reader.readObject({
            fromBuffer: buf => noteHashReadRequestHintsFromBuffer(buf, numNoteHashReadRequestPending, numNoteHashReadRequestSettled),
        }), reader.readObject({
            fromBuffer: buf => nullifierReadRequestHintsFromBuffer(buf, numNullifierReadRequestPending, numNullifierReadRequestSettled),
        }), reader.readArray(numNullifierKeys, KeyValidationHint));
    }
}
/**
 * Input to the private kernel circuit - reset call.
 */
export class PrivateKernelResetCircuitPrivateInputs {
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel, hints, sizeTag) {
        this.previousKernel = previousKernel;
        this.hints = hints;
        this.sizeTag = sizeTag;
    }
    isForPublic() {
        return countAccumulatedItems(this.previousKernel.publicInputs.end.publicCallStack) > 0;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.previousKernel, this.hints);
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer, numNoteHashReadRequestPending, numNoteHashReadRequestSettled, numNullifierReadRequestPending, numNullifierReadRequestSettled, numNullifierKeys, sizeTag) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelResetCircuitPrivateInputs(reader.readObject(PrivateKernelData), reader.readObject({
            fromBuffer: buf => PrivateKernelResetHints.fromBuffer(buf, numNoteHashReadRequestPending, numNoteHashReadRequestSettled, numNullifierReadRequestPending, numNullifierReadRequestSettled, numNullifierKeys),
        }), sizeTag);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfcmVzZXRfY2lyY3VpdF9wcml2YXRlX2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9wcml2YXRlX2tlcm5lbF9yZXNldF9jaXJjdWl0X3ByaXZhdGVfaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCxPQUFPLEVBQ0wsaUJBQWlCLEVBR2pCLGtDQUFrQyxFQUNsQyxtQ0FBbUMsR0FDcEMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU3RCxNQUFNLE9BQU8sdUJBQXVCO0lBT2xDO0lBQ0U7O09BRUc7SUFDSSxzQ0FBb0Y7SUFDM0Y7O09BRUc7SUFDSSxxQ0FBa0Y7SUFDekY7O09BRUc7SUFDSSx3QkFBZ0Y7SUFDdkY7O09BRUc7SUFDSSx5QkFBb0Y7SUFDM0Y7O09BRUc7SUFDSSxrQkFBcUU7UUFoQnJFLDJDQUFzQyxHQUF0QyxzQ0FBc0MsQ0FBOEM7UUFJcEYsMENBQXFDLEdBQXJDLHFDQUFxQyxDQUE2QztRQUlsRiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQXdEO1FBSWhGLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkQ7UUFJcEYsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtRDtJQUMzRSxDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxzQ0FBc0MsRUFDM0MsSUFBSSxDQUFDLHFDQUFxQyxFQUMxQyxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FB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