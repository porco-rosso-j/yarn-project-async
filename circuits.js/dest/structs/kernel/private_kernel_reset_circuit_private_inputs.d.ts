import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX } from '../../constants.gen.js';
import { KeyValidationHint, type NoteHashReadRequestHints, type NullifierReadRequestHints } from '../read_request_hints/index.js';
import { PrivateKernelData } from './private_kernel_data.js';
export declare class PrivateKernelResetHints<NH_RR_PENDING extends number, NH_RR_SETTLED extends number, NLL_RR_PENDING extends number, NLL_RR_SETTLED extends number, KEY_VALIDATION_REQUESTS extends number> {
    /**
     * Contains hints for the transient note hashes to locate corresponding nullifiers.
     */
    transientNullifierIndexesForNoteHashes: Tuple<number, typeof MAX_NOTE_HASHES_PER_TX>;
    /**
     * Contains hints for the transient nullifiers to locate corresponding note hashes.
     */
    transientNoteHashIndexesForNullifiers: Tuple<number, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * Contains hints for the transient read requests to localize corresponding commitments.
     */
    noteHashReadRequestHints: NoteHashReadRequestHints<NH_RR_PENDING, NH_RR_SETTLED>;
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    nullifierReadRequestHints: NullifierReadRequestHints<NLL_RR_PENDING, NLL_RR_SETTLED>;
    /**
     * Contains hints for key validation request.
     */
    keyValidationHints: Tuple<KeyValidationHint, KEY_VALIDATION_REQUESTS>;
    constructor(
    /**
     * Contains hints for the transient note hashes to locate corresponding nullifiers.
     */
    transientNullifierIndexesForNoteHashes: Tuple<number, typeof MAX_NOTE_HASHES_PER_TX>, 
    /**
     * Contains hints for the transient nullifiers to locate corresponding note hashes.
     */
    transientNoteHashIndexesForNullifiers: Tuple<number, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * Contains hints for the transient read requests to localize corresponding commitments.
     */
    noteHashReadRequestHints: NoteHashReadRequestHints<NH_RR_PENDING, NH_RR_SETTLED>, 
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    nullifierReadRequestHints: NullifierReadRequestHints<NLL_RR_PENDING, NLL_RR_SETTLED>, 
    /**
     * Contains hints for key validation request.
     */
    keyValidationHints: Tuple<KeyValidationHint, KEY_VALIDATION_REQUESTS>);
    toBuffer(): Buffer;
    trimToSizes<NEW_NH_RR_PENDING extends number, NEW_NH_RR_SETTLED extends number, NEW_NLL_RR_PENDING extends number, NEW_NLL_RR_SETTLED extends number, NEW_KEY_VALIDATION_REQUESTS extends number>(numNoteHashReadRequestPending: NEW_NH_RR_PENDING, numNoteHashReadRequestSettled: NEW_NH_RR_SETTLED, numNullifierReadRequestPending: NEW_NLL_RR_PENDING, numNullifierReadRequestSettled: NEW_NLL_RR_SETTLED, numKeyValidationRequests: NEW_KEY_VALIDATION_REQUESTS): PrivateKernelResetHints<NEW_NH_RR_PENDING, NEW_NH_RR_SETTLED, NEW_NLL_RR_PENDING, NEW_NLL_RR_SETTLED, NEW_KEY_VALIDATION_REQUESTS>;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer<NH_RR_PENDING extends number, NH_RR_SETTLED extends number, NLL_RR_PENDING extends number, NLL_RR_SETTLED extends number, KEY_VALIDATION_REQUESTS extends number>(buffer: Buffer | BufferReader, numNoteHashReadRequestPending: NH_RR_PENDING, numNoteHashReadRequestSettled: NH_RR_SETTLED, numNullifierReadRequestPending: NLL_RR_PENDING, numNullifierReadRequestSettled: NLL_RR_SETTLED, numNullifierKeys: KEY_VALIDATION_REQUESTS): PrivateKernelResetHints<NH_RR_PENDING, NH_RR_SETTLED, NLL_RR_PENDING, NLL_RR_SETTLED, KEY_VALIDATION_REQUESTS>;
}
/**
 * Input to the private kernel circuit - reset call.
 */
export declare class PrivateKernelResetCircuitPrivateInputs<NH_RR_PENDING extends number, NH_RR_SETTLED extends number, NLL_RR_PENDING extends number, NLL_RR_SETTLED extends number, KEY_VALIDATION_REQUESTS extends number, TAG extends string> {
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData;
    hints: PrivateKernelResetHints<NH_RR_PENDING, NH_RR_SETTLED, NLL_RR_PENDING, NLL_RR_SETTLED, KEY_VALIDATION_REQUESTS>;
    sizeTag: TAG;
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData, hints: PrivateKernelResetHints<NH_RR_PENDING, NH_RR_SETTLED, NLL_RR_PENDING, NLL_RR_SETTLED, KEY_VALIDATION_REQUESTS>, sizeTag: TAG);
    isForPublic(): boolean;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer<NH_RR_PENDING extends number, NH_RR_SETTLED extends number, NLL_RR_PENDING extends number, NLL_RR_SETTLED extends number, KEY_VALIDATION_REQUESTS extends number, TAG extends string>(buffer: Buffer | BufferReader, numNoteHashReadRequestPending: NH_RR_PENDING, numNoteHashReadRequestSettled: NH_RR_SETTLED, numNullifierReadRequestPending: NLL_RR_PENDING, numNullifierReadRequestSettled: NLL_RR_SETTLED, numNullifierKeys: KEY_VALIDATION_REQUESTS, sizeTag: TAG): PrivateKernelResetCircuitPrivateInputs<NH_RR_PENDING, NH_RR_SETTLED, NLL_RR_PENDING, NLL_RR_SETTLED, KEY_VALIDATION_REQUESTS, TAG>;
}
//# sourceMappingURL=private_kernel_reset_circuit_private_inputs.d.ts.map