import { AztecAddress, Fr } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { BufferReader } from '@aztec/foundation/serialize';
import { Note } from '../logs/l1_payload/payload.js';
import { TxHash } from '../tx/tx_hash.js';
/**
 * A note with contextual data.
 */
export declare class ExtendedNote {
    /** The note as emitted from the Noir contract. */
    note: Note;
    /** The owner whose public key was used to encrypt the note. */
    owner: AztecAddress;
    /** The contract address this note is created in. */
    contractAddress: AztecAddress;
    /** The specific storage location of the note on the contract. */
    storageSlot: Fr;
    /** The type identifier of the note on the contract. */
    noteTypeId: NoteSelector;
    /** The hash of the tx the note was created in. */
    txHash: TxHash;
    constructor(
    /** The note as emitted from the Noir contract. */
    note: Note, 
    /** The owner whose public key was used to encrypt the note. */
    owner: AztecAddress, 
    /** The contract address this note is created in. */
    contractAddress: AztecAddress, 
    /** The specific storage location of the note on the contract. */
    storageSlot: Fr, 
    /** The type identifier of the note on the contract. */
    noteTypeId: NoteSelector, 
    /** The hash of the tx the note was created in. */
    txHash: TxHash);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ExtendedNote;
    toString(): string;
    static fromString(str: string): ExtendedNote;
}
//# sourceMappingURL=extended_note.d.ts.map