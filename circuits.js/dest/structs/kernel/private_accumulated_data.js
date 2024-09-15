import { makeTuple } from '@aztec/foundation/array';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX, MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX, } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { ScopedL2ToL1Message } from '../l2_to_l1_message.js';
import { NoteLogHash, ScopedEncryptedLogHash, ScopedLogHash } from '../log_hash.js';
import { ScopedNoteHash } from '../note_hash.js';
import { ScopedNullifier } from '../nullifier.js';
import { ScopedPrivateCallRequest } from '../private_call_request.js';
/**
 * Specific accumulated data structure for the final ordering private kernel circuit. It is included
 *  in the final public inputs of private kernel circuit.
 */
export class PrivateAccumulatedData {
    constructor(
    /**
     * The new note hashes made in this transaction.
     */
    noteHashes, 
    /**
     * The new nullifiers made in this transaction.
     */
    nullifiers, 
    /**
     * All the new L2 to L1 messages created in this transaction.
     */
    l2ToL1Msgs, 
    /**
     * Accumulated encrypted note logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    noteEncryptedLogsHashes, 
    /**
     * Accumulated encrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    encryptedLogsHashes, 
    /**
     * Accumulated unencrypted logs hashes from all the previous kernel iterations.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes, 
    /**
     * Current private call stack.
     */
    privateCallStack, 
    /**
     * Current public call stack.
     */
    publicCallStack) {
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.noteEncryptedLogsHashes = noteEncryptedLogsHashes;
        this.encryptedLogsHashes = encryptedLogsHashes;
        this.unencryptedLogsHashes = unencryptedLogsHashes;
        this.privateCallStack = privateCallStack;
        this.publicCallStack = publicCallStack;
    }
    toBuffer() {
        return serializeToBuffer(this.noteHashes, this.nullifiers, this.l2ToL1Msgs, this.noteEncryptedLogsHashes, this.encryptedLogsHashes, this.unencryptedLogsHashes, this.privateCallStack, this.publicCallStack);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns Deserialized object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateAccumulatedData(reader.readArray(MAX_NOTE_HASHES_PER_TX, ScopedNoteHash), reader.readArray(MAX_NULLIFIERS_PER_TX, ScopedNullifier), reader.readArray(MAX_L2_TO_L1_MSGS_PER_TX, ScopedL2ToL1Message), reader.readArray(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, NoteLogHash), reader.readArray(MAX_ENCRYPTED_LOGS_PER_TX, ScopedEncryptedLogHash), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_TX, ScopedLogHash), reader.readArray(MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX, ScopedPrivateCallRequest), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest));
    }
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns Deserialized object.
     */
    static fromString(str) {
        return PrivateAccumulatedData.fromBuffer(Buffer.from(str, 'hex'));
    }
    static empty() {
        return new PrivateAccumulatedData(makeTuple(MAX_NOTE_HASHES_PER_TX, ScopedNoteHash.empty), makeTuple(MAX_NULLIFIERS_PER_TX, ScopedNullifier.empty), makeTuple(MAX_L2_TO_L1_MSGS_PER_TX, ScopedL2ToL1Message.empty), makeTuple(MAX_NOTE_ENCRYPTED_LOGS_PER_TX, NoteLogHash.empty), makeTuple(MAX_ENCRYPTED_LOGS_PER_TX, ScopedEncryptedLogHash.empty), makeTuple(MAX_UNENCRYPTED_LOGS_PER_TX, ScopedLogHash.empty), makeTuple(MAX_PRIVATE_CALL_STACK_LENGTH_PER_TX, ScopedPrivateCallRequest.empty), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest.empty));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9hY2N1bXVsYXRlZF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3ByaXZhdGVfYWNjdW11bGF0ZWRfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFGLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLDhCQUE4QixFQUM5QixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG9DQUFvQyxFQUNwQyxtQ0FBbUMsRUFDbkMsMkJBQTJCLEdBQzVCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsc0JBQXNCLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDO0lBQ0U7O09BRUc7SUFDSSxVQUFnRTtJQUN2RTs7T0FFRztJQUNJLFVBQWdFO0lBQ3ZFOztPQUVHO0lBQ0ksVUFBdUU7SUFDOUU7OztPQUdHO0lBQ0ksdUJBQWtGO0lBQ3pGOzs7T0FHRztJQUNJLG1CQUFvRjtJQUMzRjs7O09BR0c7SUFDSSxxQkFBK0U7SUFDdEY7O09BRUc7SUFDSSxnQkFBOEY7SUFDckc7O09BRUc7SUFDSSxlQUErRTtRQS9CL0UsZUFBVSxHQUFWLFVBQVUsQ0FBc0Q7UUFJaEUsZUFBVSxHQUFWLFVBQVUsQ0FBc0Q7UUFJaEUsZUFBVSxHQUFWLFVBQVUsQ0FBNkQ7UUFLdkUsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUEyRDtRQUtsRix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWlFO1FBS3BGLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMEQ7UUFJL0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUE4RTtRQUk5RixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0U7SUFDckYsQ0FBQztJQUVKLFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUN0QixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxtQkFBbUIsRUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksc0JBQXNCLENBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDLEVBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsZUFBZSxDQUFDLEVBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLENBQUMsRUFDL0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxXQUFXLENBQUMsRUFDN0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxzQkFBc0IsQ0FBQyxFQUNuRSxNQUFNLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLGFBQWEsQ0FBQyxFQUM1RCxNQUFNLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxFQUFFLHdCQUF3QixDQUFDLEVBQ2hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUNBQW1DLEVBQUUsV0FBVyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxzQkFBc0IsQ0FDL0IsU0FBUyxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFDdkQsU0FBUyxDQUFDLHFCQUFxQixFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFDdkQsU0FBUyxDQUFDLHdCQUF3QixFQUFFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUM5RCxTQUFTLENBQUMsOEJBQThCLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUM1RCxTQUFTLENBQUMseUJBQXlCLEVBQUUsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQ2xFLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQzNELFNBQVMsQ0FBQyxvQ0FBb0MsRUFBRSx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFDL0UsU0FBUyxDQUFDLG1DQUFtQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FDbEUsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9