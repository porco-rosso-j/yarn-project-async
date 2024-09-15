import { Fr, type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { Note } from '../payload.js';
import { EncryptedLogIncomingBody } from './encrypted_log_incoming_body.js';
export declare class EncryptedNoteLogIncomingBody extends EncryptedLogIncomingBody {
    storageSlot: Fr;
    noteTypeId: NoteSelector;
    note: Note;
    constructor(storageSlot: Fr, noteTypeId: NoteSelector, note: Note);
    /**
     * Serializes the log body to a buffer WITHOUT the length of the note buffer
     *
     * @returns The serialized log body
     */
    toBuffer(): Buffer;
    /**
     * Deserialized the log body from a buffer WITHOUT the length of the note buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf: Buffer): EncryptedNoteLogIncomingBody;
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
    static fromCiphertext(ciphertext: Buffer | bigint[], ivskAppOrEphSk: GrumpkinScalar, ephPkOrIvpkApp: PublicKey): Promise<EncryptedNoteLogIncomingBody>;
}
//# sourceMappingURL=encrypted_note_log_incoming_body.d.ts.map