import { AztecAddress, type GrumpkinScalar, type KeyValidationRequest, type PublicKey } from '@aztec/circuits.js';
import { EventSelector } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type EncryptedL2Log } from '../encrypted_l2_log.js';
import { L1Payload } from './l1_payload.js';
import { Event } from './payload.js';
/**
 * A class which wraps event data which is pushed on L1.
 */
export declare class L1EventPayload extends L1Payload {
    /**
     * An encrypted event as emitted from Noir contract.
     */
    event: Event;
    /**
     * Address of the contract that emitted this event log.
     */
    contractAddress: AztecAddress;
    /**
     * Randomness used to mask the contract address.
     */
    randomness: Fr;
    /**
     * Type identifier for the underlying event.
     */
    eventTypeId: EventSelector;
    constructor(
    /**
     * An encrypted event as emitted from Noir contract.
     */
    event: Event, 
    /**
     * Address of the contract that emitted this event log.
     */
    contractAddress: AztecAddress, 
    /**
     * Randomness used to mask the contract address.
     */
    randomness: Fr, 
    /**
     * Type identifier for the underlying event.
     */
    eventTypeId: EventSelector);
    /**
     * Deserializes the L1EventPayload object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of L1EventPayload.
     */
    static fromBuffer(buffer: Buffer | BufferReader): L1EventPayload;
    /**
     * Serializes the L1EventPayload object into a Buffer.
     * @returns Buffer representation of the L1EventPayload object.
     */
    toBuffer(): Buffer;
    /**
     * Create a random L1EventPayload object (useful for testing purposes).
     * @returns A random L1EventPayload object.
     */
    static random(): L1EventPayload;
    encrypt(ephSk: GrumpkinScalar, recipient: AztecAddress, ivpk: PublicKey, ovKeys: KeyValidationRequest): Promise<Buffer>;
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
    static decryptAsIncoming(encryptedLog: EncryptedL2Log, ivsk: GrumpkinScalar): Promise<L1EventPayload>;
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
    static decryptAsOutgoing(encryptedLog: EncryptedL2Log, ovsk: GrumpkinScalar): Promise<L1EventPayload>;
}
//# sourceMappingURL=l1_event_payload.d.ts.map