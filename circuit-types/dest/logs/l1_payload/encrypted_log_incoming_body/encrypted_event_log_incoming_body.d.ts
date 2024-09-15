import { Fr, type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
import { Event } from '../payload.js';
import { EncryptedLogIncomingBody } from './encrypted_log_incoming_body.js';
export declare class EncryptedEventLogIncomingBody extends EncryptedLogIncomingBody {
    randomness: Fr;
    eventTypeId: Fr;
    event: Event;
    constructor(randomness: Fr, eventTypeId: Fr, event: Event);
    /**
     * Serializes the log body to a buffer WITHOUT the length of the event buffer
     *
     * @returns The serialized log body
     */
    toBuffer(): Buffer;
    /**
     * Deserialized the log body from a buffer WITHOUT the length of the event buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf: Buffer): EncryptedEventLogIncomingBody;
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
    static fromCiphertext(ciphertext: Buffer | bigint[], ivskAppOrEphSk: GrumpkinScalar, ephPkOrIvpkApp: PublicKey): Promise<EncryptedEventLogIncomingBody>;
}
//# sourceMappingURL=encrypted_event_log_incoming_body.d.ts.map