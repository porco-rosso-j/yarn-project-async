import { AztecAddress } from '@aztec/circuits.js';
import { EventSelector } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { EncryptedEventLogIncomingBody } from './encrypted_log_incoming_body/index.js';
import { L1Payload } from './l1_payload.js';
import { Event } from './payload.js';
/**
 * A class which wraps event data which is pushed on L1.
 */
export class L1EventPayload extends L1Payload {
    constructor(
    /**
     * An encrypted event as emitted from Noir contract.
     */
    event, 
    /**
     * Address of the contract that emitted this event log.
     */
    contractAddress, 
    /**
     * Randomness used to mask the contract address.
     */
    randomness, 
    /**
     * Type identifier for the underlying event.
     */
    eventTypeId) {
        super();
        this.event = event;
        this.contractAddress = contractAddress;
        this.randomness = randomness;
        this.eventTypeId = eventTypeId;
    }
    /**
     * Deserializes the L1EventPayload object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of L1EventPayload.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new L1EventPayload(reader.readObject(Event), reader.readObject(AztecAddress), Fr.fromBuffer(reader), reader.readObject(EventSelector));
    }
    /**
     * Serializes the L1EventPayload object into a Buffer.
     * @returns Buffer representation of the L1EventPayload object.
     */
    toBuffer() {
        return serializeToBuffer([this.event, this.contractAddress, this.randomness, this.eventTypeId]);
    }
    /**
     * Create a random L1EventPayload object (useful for testing purposes).
     * @returns A random L1EventPayload object.
     */
    static random() {
        return new L1EventPayload(Event.random(), AztecAddress.random(), Fr.random(), EventSelector.random());
    }
    async encrypt(ephSk, recipient, ivpk, ovKeys) {
        return await super._encrypt(this.contractAddress, ephSk, recipient, ivpk, ovKeys, new EncryptedEventLogIncomingBody(this.randomness, this.eventTypeId.toField(), this.event));
    }
    /**
     * Decrypts a ciphertext as an incoming log.
     *
     * This is executable by the recipient of the event, and uses the ivsk to decrypt the payload.
     * The outgoing parts of the log are ignored entirely.
     *
     * Produces the same output as `decryptAsOutgoing`.
     *
     * @param encryptedLog - The encrypted log. This encrypted log is assumed to always have tags.
     * @param ivsk - The incoming viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     * @remarks The encrypted log is assumed to always have tags.
     */
    static async decryptAsIncoming(encryptedLog, ivsk) {
        const reader = BufferReader.asReader(encryptedLog.data);
        // We skip the tags
        Fr.fromBuffer(reader);
        Fr.fromBuffer(reader);
        const [address, incomingBody] = await super._decryptAsIncoming(reader.readToEnd(), ivsk, EncryptedEventLogIncomingBody.fromCiphertext);
        // We instantiate selector before checking the address because instantiating the selector validates that
        // the selector is valid (and that's the preferred way of detecting decryption failure).
        const selector = EventSelector.fromField(incomingBody.eventTypeId);
        this.ensureMatchedMaskedContractAddress(address, incomingBody.randomness, encryptedLog.maskedContractAddress);
        return new L1EventPayload(incomingBody.event, address, incomingBody.randomness, selector);
    }
    /**
     * Decrypts a ciphertext as an outgoing log.
     *
     * This is executable by the sender of the event, and uses the ovsk to decrypt the payload.
     * The outgoing parts are decrypted to retrieve information that allows the sender to
     * decrypt the incoming log, and learn about the event contents.
     *
     * Produces the same output as `decryptAsIncoming`.
     *
     * @param ciphertext - The ciphertext for the log
     * @param ovsk - The outgoing viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     */
    static async decryptAsOutgoing(encryptedLog, ovsk) {
        const reader = BufferReader.asReader(encryptedLog.data);
        // Skip the tags
        Fr.fromBuffer(reader);
        Fr.fromBuffer(reader);
        const [address, incomingBody] = await super._decryptAsOutgoing(reader.readToEnd(), ovsk, EncryptedEventLogIncomingBody.fromCiphertext);
        // We instantiate selector before checking the address because instantiating the selector validates that
        // the selector is valid (and that's the preferred way of detecting decryption failure).
        const selector = EventSelector.fromField(incomingBody.eventTypeId);
        this.ensureMatchedMaskedContractAddress(address, incomingBody.randomness, encryptedLog.maskedContractAddress);
        return new L1EventPayload(incomingBody.event, address, incomingBody.randomness, selector);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfZXZlbnRfcGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dzL2wxX3BheWxvYWQvbDFfZXZlbnRfcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFrRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXJDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGNBQWUsU0FBUSxTQUFTO0lBQzNDO0lBQ0U7O09BRUc7SUFDSSxLQUFZO0lBQ25COztPQUVHO0lBQ0ksZUFBNkI7SUFDcEM7O09BRUc7SUFDSSxVQUFjO0lBQ3JCOztPQUVHO0lBQ0ksV0FBMEI7UUFFakMsS0FBSyxFQUFFLENBQUM7UUFkRCxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBSVosb0JBQWUsR0FBZixlQUFlLENBQWM7UUFJN0IsZUFBVSxHQUFWLFVBQVUsQ0FBSTtRQUlkLGdCQUFXLEdBQVgsV0FBVyxDQUFlO0lBR25DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxjQUFjLENBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQ3hCLE1BQU0sQ0FB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