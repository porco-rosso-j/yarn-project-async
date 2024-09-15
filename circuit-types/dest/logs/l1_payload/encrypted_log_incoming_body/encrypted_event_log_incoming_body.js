import { Fr } from '@aztec/circuits.js';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { Event } from '../payload.js';
import { EncryptedLogIncomingBody } from './encrypted_log_incoming_body.js';
export class EncryptedEventLogIncomingBody extends EncryptedLogIncomingBody {
    constructor(randomness, eventTypeId, event) {
        super();
        this.randomness = randomness;
        this.eventTypeId = eventTypeId;
        this.event = event;
    }
    /**
     * Serializes the log body to a buffer WITHOUT the length of the event buffer
     *
     * @returns The serialized log body
     */
    toBuffer() {
        const eventBufferWithoutLength = this.event.toBuffer().subarray(4);
        return serializeToBuffer(this.randomness, this.eventTypeId, eventBufferWithoutLength);
    }
    /**
     * Deserialized the log body from a buffer WITHOUT the length of the event buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf) {
        const reader = BufferReader.asReader(buf);
        const randomness = Fr.fromBuffer(reader);
        const eventTypeId = Fr.fromBuffer(reader);
        // 2 Fields (randomness and event type id) are not included in the event buffer
        const fieldsInEvent = reader.getLength() / 32 - 2;
        const event = new Event(reader.readArray(fieldsInEvent, Fr));
        return new EncryptedEventLogIncomingBody(randomness, eventTypeId, event);
    }
    /**
     * Decrypts a log body
     *
     * @param ciphertext - The ciphertext buffer
     * @param ivskAppOrEphSk - The private key matching the public key used in encryption (the viewing key secret or)
     * @param ephPkOrIvpkApp - The public key generated with the ephemeral secret key used in encryption
     *
     * The "odd" input stems from ivskApp * ephPk == ivpkApp * ephSk producing the same value.
     * This is used to allow for the same decryption function to be used by both the sender and the recipient.
     *
     * @returns The decrypted log body
     */
    static async fromCiphertext(ciphertext, ivskAppOrEphSk, ephPkOrIvpkApp) {
        const buffer = await super.fromCiphertextToBuffer(ciphertext, ivskAppOrEphSk, ephPkOrIvpkApp);
        return EncryptedEventLogIncomingBody.fromBuffer(buffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2V2ZW50X2xvZ19pbmNvbWluZ19ib2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvZ3MvbDFfcGF5bG9hZC9lbmNyeXB0ZWRfbG9nX2luY29taW5nX2JvZHkvZW5jcnlwdGVkX2V2ZW50X2xvZ19pbmNvbWluZ19ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQXVDLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFNUUsTUFBTSxPQUFPLDZCQUE4QixTQUFRLHdCQUF3QjtJQUN6RSxZQUFtQixVQUFjLEVBQVMsV0FBZSxFQUFTLEtBQVk7UUFDNUUsS0FBSyxFQUFFLENBQUM7UUFEUyxlQUFVLEdBQVYsVUFBVSxDQUFJO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBRTlFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUTtRQUNiLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDbEMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUMsK0VBQStFO1FBQy9FLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFN0QsT0FBTyxJQUFJLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQ2hDLFVBQTZCLEVBQzdCLGNBQThCLEVBQzlCLGNBQXlCO1FBRXpCLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUYsT0FBTyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGIn0=