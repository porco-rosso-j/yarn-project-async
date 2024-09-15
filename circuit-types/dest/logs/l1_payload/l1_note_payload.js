import { AztecAddress } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { EncryptedNoteLogIncomingBody } from './encrypted_log_incoming_body/index.js';
import { L1Payload } from './l1_payload.js';
import { Note } from './payload.js';
/**
 * A class which wraps note data which is pushed on L1.
 * @remarks This data is required to compute a nullifier/to spend a note. Along with that this class contains
 * the necessary functionality to encrypt and decrypt the data.
 */
export class L1NotePayload extends L1Payload {
    constructor(
    /**
     * A note as emitted from Noir contract. Can be used along with private key to compute nullifier.
     */
    note, 
    /**
     * Address of the contract this tx is interacting with.
     */
    contractAddress, 
    /**
     * Storage slot of the underlying note.
     */
    storageSlot, 
    /**
     * Type identifier for the underlying note, required to determine how to compute its hash and nullifier.
     */
    noteTypeId) {
        super();
        this.note = note;
        this.contractAddress = contractAddress;
        this.storageSlot = storageSlot;
        this.noteTypeId = noteTypeId;
    }
    /**
     * Deserializes the L1NotePayload object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of L1NotePayload.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new L1NotePayload(reader.readObject(Note), reader.readObject(AztecAddress), Fr.fromBuffer(reader), reader.readObject(NoteSelector));
    }
    /**
     * Serializes the L1NotePayload object into a Buffer.
     * @returns Buffer representation of the L1NotePayload object.
     */
    toBuffer() {
        return serializeToBuffer([this.note, this.contractAddress, this.storageSlot, this.noteTypeId]);
    }
    /**
     * Create a random L1NotePayload object (useful for testing purposes).
     * @param contract - The address of a contract the note was emitted from.
     * @returns A random L1NotePayload object.
     */
    static random(contract = AztecAddress.random()) {
        return new L1NotePayload(Note.random(), contract, Fr.random(), NoteSelector.random());
    }
    encrypt(ephSk, recipient, ivpk, ovKeys) {
        return super._encrypt(this.contractAddress, ephSk, recipient, ivpk, ovKeys, new EncryptedNoteLogIncomingBody(this.storageSlot, this.noteTypeId, this.note));
    }
    /**
     * Decrypts a ciphertext as an incoming log.
     *
     * This is executable by the recipient of the note, and uses the ivsk to decrypt the payload.
     * The outgoing parts of the log are ignored entirely.
     *
     * Produces the same output as `decryptAsOutgoing`.
     *
     * @param ciphertext - The ciphertext for the log
     * @param ivsk - The incoming viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     */
    static async decryptAsIncoming(ciphertext, ivsk) {
        const input = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext.map((x) => Number(x)));
        const reader = BufferReader.asReader(input);
        const [address, incomingBody] = await super._decryptAsIncoming(reader.readToEnd(), ivsk, EncryptedNoteLogIncomingBody.fromCiphertext);
        return new L1NotePayload(incomingBody.note, address, incomingBody.storageSlot, incomingBody.noteTypeId);
    }
    /**
     * Decrypts a ciphertext as an outgoing log.
     *
     * This is executable by the sender of the note, and uses the ovsk to decrypt the payload.
     * The outgoing parts are decrypted to retrieve information that allows the sender to
     * decrypt the incoming log, and learn about the note contents.
     *
     * Produces the same output as `decryptAsIncoming`.
     *
     * @param ciphertext - The ciphertext for the log
     * @param ovsk - The outgoing viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     */
    static async decryptAsOutgoing(ciphertext, ovsk) {
        const input = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext.map((x) => Number(x)));
        const reader = BufferReader.asReader(input);
        const [address, incomingBody] = await super._decryptAsOutgoing(reader.readToEnd(), ovsk, EncryptedNoteLogIncomingBody.fromCiphertext);
        return new L1NotePayload(incomingBody.note, address, incomingBody.storageSlot, incomingBody.noteTypeId);
    }
    equals(other) {
        return (this.note.equals(other.note) &&
            this.contractAddress.equals(other.contractAddress) &&
            this.storageSlot.equals(other.storageSlot) &&
            this.noteTypeId.equals(other.noteTypeId));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfbm90ZV9wYXlsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ3MvbDFfcGF5bG9hZC9sMV9ub3RlX3BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBa0UsTUFBTSxvQkFBb0IsQ0FBQztBQUNsSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQzs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGFBQWMsU0FBUSxTQUFTO0lBQzFDO0lBQ0U7O09BRUc7SUFDSSxJQUFVO0lBQ2pCOztPQUVHO0lBQ0ksZUFBNkI7SUFDcEM7O09BRUc7SUFDSSxXQUFlO0lBQ3RCOztPQUVHO0lBQ0ksVUFBd0I7UUFFL0IsS0FBSyxFQUFFLENBQUM7UUFkRCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBSVYsb0JBQWUsR0FBZixlQUFlLENBQWM7UUFJN0IsZ0JBQVcsR0FBWCxXQUFXLENBQUk7UUFJZixlQUFVLEdBQVYsVUFBVSxDQUFjO0lBR2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxhQUFhLENBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDNUMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQXFCLEVBQUUsU0FBdUIsRUFBRSxJQUFlLEVBQUUsTUFBNEI7UUFDMUcsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUNuQixJQUFJLENBQUMsZUFBZSxFQUNwQixLQUFLLEVBQ0wsU0FBUyxFQUNULElBQUksRUFDSixNQUFNLEVBQ04sSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUMvRSxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUE2QixFQUFFLElBQW9CO1FBQ3ZGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9HLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FDNUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUNsQixJQUFJLEVBQ0osNEJBQTRCLENBQUMsY0FBYyxDQUM1QyxDQUFDO1FBRUYsT0FBTyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUE2QixFQUFFLElBQW9CO1FBQ3ZGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9HLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FDNUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUNsQixJQUFJLEVBQ0osNEJBQTRCLENBQUMsY0FBYyxDQUM1QyxDQUFDO1FBRUYsT0FBTyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQW9CO1FBQ2hDLE9BQU8sQ0FDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQ3pDLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==