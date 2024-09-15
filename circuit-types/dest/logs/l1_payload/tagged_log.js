import { AztecAddress } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { L1EventPayload } from './l1_event_payload.js';
import { L1NotePayload } from './l1_note_payload.js';
// placeholder value until tagging is implemented
const PLACEHOLDER_TAG = new Fr(33);
/**
 * Encrypted log payload with a tag used for retrieval by clients.
 */
export class TaggedLog {
    constructor(payload, incomingTag = PLACEHOLDER_TAG, outgoingTag = PLACEHOLDER_TAG) {
        this.payload = payload;
        this.incomingTag = incomingTag;
        this.outgoingTag = outgoingTag;
    }
    static fromBuffer(buffer, payloadType = L1NotePayload) {
        const reader = BufferReader.asReader(buffer);
        const incomingTag = Fr.fromBuffer(reader);
        const outgoingTag = Fr.fromBuffer(reader);
        const payload = payloadType === L1NotePayload ? L1NotePayload.fromBuffer(reader) : L1EventPayload.fromBuffer(reader);
        return new TaggedLog(payload, incomingTag, outgoingTag);
    }
    /**
     * Serializes the TaggedLog object into a Buffer.
     * @returns Buffer representation of the TaggedLog object (unencrypted).
     */
    toBuffer() {
        return serializeToBuffer(this.incomingTag, this.outgoingTag, this.payload);
    }
    static random(payloadType = L1NotePayload, contract = AztecAddress.random()) {
        return payloadType === L1NotePayload
            ? new TaggedLog(L1NotePayload.random(contract))
            : new TaggedLog(L1EventPayload.random());
    }
    async encrypt(ephSk, recipient, ivpk, ovKeys) {
        return serializeToBuffer(this.incomingTag, this.outgoingTag, await this.payload.encrypt(ephSk, recipient, ivpk, ovKeys));
    }
    static async decryptAsIncoming(data, ivsk, payloadType = L1NotePayload) {
        try {
            if (payloadType === L1EventPayload) {
                const reader = BufferReader.asReader(data.data);
                const incomingTag = Fr.fromBuffer(reader);
                const outgoingTag = Fr.fromBuffer(reader);
                // We must pass the entire encrypted log in. The tags are not stripped here from the original data
                const payload = await L1EventPayload.decryptAsIncoming(data, ivsk);
                return new TaggedLog(payload, incomingTag, outgoingTag);
            }
            else {
                const input = Buffer.isBuffer(data) ? data : Buffer.from(data.map((x) => Number(x)));
                const reader = BufferReader.asReader(input);
                const incomingTag = Fr.fromBuffer(reader);
                const outgoingTag = Fr.fromBuffer(reader);
                const payload = await L1NotePayload.decryptAsIncoming(reader.readToEnd(), ivsk);
                return new TaggedLog(payload, incomingTag, outgoingTag);
            }
        }
        catch (e) {
            // Following error messages are expected to occur when decryption fails
            if (!e.message.endsWith('is greater or equal to field modulus.') &&
                !e.message.startsWith('Invalid AztecAddress length') &&
                !e.message.startsWith('Selector must fit in') &&
                !e.message.startsWith('Attempted to read beyond buffer length')) {
                // If we encounter an unexpected error, we rethrow it
                throw e;
            }
            return;
        }
    }
    static async decryptAsOutgoing(data, ovsk, payloadType = L1NotePayload) {
        try {
            if (payloadType === L1EventPayload) {
                const reader = BufferReader.asReader(data.data);
                const incomingTag = Fr.fromBuffer(reader);
                const outgoingTag = Fr.fromBuffer(reader);
                const payload = await L1EventPayload.decryptAsOutgoing(data, ovsk);
                return new TaggedLog(payload, incomingTag, outgoingTag);
            }
            else {
                const input = Buffer.isBuffer(data) ? data : Buffer.from(data.map((x) => Number(x)));
                const reader = BufferReader.asReader(input);
                const incomingTag = Fr.fromBuffer(reader);
                const outgoingTag = Fr.fromBuffer(reader);
                const payload = await L1NotePayload.decryptAsOutgoing(reader.readToEnd(), ovsk);
                return new TaggedLog(payload, incomingTag, outgoingTag);
            }
        }
        catch (e) {
            // Following error messages are expected to occur when decryption fails
            if (!e.message.endsWith('is greater or equal to field modulus.') &&
                !e.message.startsWith('Invalid AztecAddress length') &&
                !e.message.startsWith('Selector must fit in') &&
                !e.message.startsWith('Attempted to read beyond buffer length')) {
                // If we encounter an unexpected error, we rethrow it
                throw e;
            }
            return;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnZ2VkX2xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dzL2wxX3BheWxvYWQvdGFnZ2VkX2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFrRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxpREFBaUQ7QUFDakQsTUFBTSxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFbkM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFtQixPQUFnQixFQUFTLGNBQWMsZUFBZSxFQUFTLGNBQWMsZUFBZTtRQUE1RixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQztJQVNuSCxNQUFNLENBQUMsVUFBVSxDQUNmLE1BQTZCLEVBQzdCLGNBQTRELGFBQWE7UUFFekUsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxPQUFPLEdBQ1gsV0FBVyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFD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