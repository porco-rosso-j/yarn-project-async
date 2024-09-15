import { Fr } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { Note } from '../payload.js';
import { EncryptedLogIncomingBody } from './encrypted_log_incoming_body.js';
export class EncryptedNoteLogIncomingBody extends EncryptedLogIncomingBody {
    constructor(storageSlot, noteTypeId, note) {
        super();
        this.storageSlot = storageSlot;
        this.noteTypeId = noteTypeId;
        this.note = note;
    }
    /**
     * Serializes the log body to a buffer WITHOUT the length of the note buffer
     *
     * @returns The serialized log body
     */
    toBuffer() {
        const noteBufferWithoutLength = this.note.toBuffer().subarray(4);
        // Note: We serialize note type to field first because that's how it's done in Noir
        return serializeToBuffer(this.storageSlot, this.noteTypeId.toField(), noteBufferWithoutLength);
    }
    /**
     * Deserialized the log body from a buffer WITHOUT the length of the note buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf) {
        const reader = BufferReader.asReader(buf);
        const storageSlot = Fr.fromBuffer(reader);
        const noteTypeId = NoteSelector.fromField(Fr.fromBuffer(reader));
        // 2 Fields (storage slot and note type id) are not included in the note buffer
        const fieldsInNote = reader.getLength() / 32 - 2;
        const note = new Note(reader.readArray(fieldsInNote, Fr));
        return new EncryptedNoteLogIncomingBody(storageSlot, noteTypeId, note);
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
        return EncryptedNoteLogIncomingBody.fromBuffer(buffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX25vdGVfbG9nX2luY29taW5nX2JvZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9ncy9sMV9wYXlsb2FkL2VuY3J5cHRlZF9sb2dfaW5jb21pbmdfYm9keS9lbmNyeXB0ZWRfbm90ZV9sb2dfaW5jb21pbmdfYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUF1QyxNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUU1RSxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsd0JBQXdCO0lBQ3hFLFlBQW1CLFdBQWUsRUFBUyxVQUF3QixFQUFTLElBQVU7UUFDcEYsS0FBSyxFQUFFLENBQUM7UUFEUyxnQkFBVyxHQUFYLFdBQVcsQ0FBSTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQWM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO0lBRXRGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUTtRQUNiLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsbUZBQW1GO1FBQ25GLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRSwrRUFBK0U7UUFDL0UsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxRCxPQUFPLElBQUksNEJBQTRCLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FDaEMsVUFBNkIsRUFDN0IsY0FBOEIsRUFDOUIsY0FBeUI7UUFFekIsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM5RixPQUFPLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0YifQ==