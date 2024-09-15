import { AztecAddress, type GrumpkinScalar, type KeyValidationRequest, type PublicKey } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { L1Payload } from './l1_payload.js';
import { Note } from './payload.js';
/**
 * A class which wraps note data which is pushed on L1.
 * @remarks This data is required to compute a nullifier/to spend a note. Along with that this class contains
 * the necessary functionality to encrypt and decrypt the data.
 */
export declare class L1NotePayload extends L1Payload {
    /**
     * A note as emitted from Noir contract. Can be used along with private key to compute nullifier.
     */
    note: Note;
    /**
     * Address of the contract this tx is interacting with.
     */
    contractAddress: AztecAddress;
    /**
     * Storage slot of the underlying note.
     */
    storageSlot: Fr;
    /**
     * Type identifier for the underlying note, required to determine how to compute its hash and nullifier.
     */
    noteTypeId: NoteSelector;
    constructor(
    /**
     * A note as emitted from Noir contract. Can be used along with private key to compute nullifier.
     */
    note: Note, 
    /**
     * Address of the contract this tx is interacting with.
     */
    contractAddress: AztecAddress, 
    /**
     * Storage slot of the underlying note.
     */
    storageSlot: Fr, 
    /**
     * Type identifier for the underlying note, required to determine how to compute its hash and nullifier.
     */
    noteTypeId: NoteSelector);
    /**
     * Deserializes the L1NotePayload object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of L1NotePayload.
     */
    static fromBuffer(buffer: Buffer | BufferReader): L1NotePayload;
    /**
     * Serializes the L1NotePayload object into a Buffer.
     * @returns Buffer representation of the L1NotePayload object.
     */
    toBuffer(): Buffer;
    /**
     * Create a random L1NotePayload object (useful for testing purposes).
     * @param contract - The address of a contract the note was emitted from.
     * @returns A random L1NotePayload object.
     */
    static random(contract?: AztecAddress): L1NotePayload;
    encrypt(ephSk: GrumpkinScalar, recipient: AztecAddress, ivpk: PublicKey, ovKeys: KeyValidationRequest): Promise<Buffer>;
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
    static decryptAsIncoming(ciphertext: Buffer | bigint[], ivsk: GrumpkinScalar): Promise<L1NotePayload>;
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
    static decryptAsOutgoing(ciphertext: Buffer | bigint[], ovsk: GrumpkinScalar): Promise<L1NotePayload>;
    equals(other: L1NotePayload): boolean;
}
//# sourceMappingURL=l1_note_payload.d.ts.map