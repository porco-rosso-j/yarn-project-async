import { AztecAddress, Fr } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { BufferReader } from '@aztec/foundation/serialize';
import { Note } from '../logs/l1_payload/payload.js';
import { TxHash } from '../tx/tx_hash.js';
/**
 * A note with contextual data.
 */
export class ExtendedNote {
    constructor(
    /** The note as emitted from the Noir contract. */
    note, 
    /** The owner whose public key was used to encrypt the note. */
    owner, 
    /** The contract address this note is created in. */
    contractAddress, 
    /** The specific storage location of the note on the contract. */
    storageSlot, 
    /** The type identifier of the note on the contract. */
    noteTypeId, 
    /** The hash of the tx the note was created in. */
    txHash) {
        this.note = note;
        this.owner = owner;
        this.contractAddress = contractAddress;
        this.storageSlot = storageSlot;
        this.noteTypeId = noteTypeId;
        this.txHash = txHash;
    }
    toBuffer() {
        return Buffer.concat([
            this.note.toBuffer(),
            this.owner.toBuffer(),
            this.contractAddress.toBuffer(),
            this.storageSlot.toBuffer(),
            this.noteTypeId.toBuffer(),
            this.txHash.buffer,
        ]);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const note = Note.fromBuffer(reader);
        const owner = AztecAddress.fromBuffer(reader);
        const contractAddress = AztecAddress.fromBuffer(reader);
        const storageSlot = Fr.fromBuffer(reader);
        const noteTypeId = reader.readObject(NoteSelector);
        const txHash = new TxHash(reader.readBytes(TxHash.SIZE));
        return new this(note, owner, contractAddress, storageSlot, noteTypeId, txHash);
    }
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    static fromString(str) {
        const hex = str.replace(/^0x/, '');
        return ExtendedNote.fromBuffer(Buffer.from(hex, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5kZWRfbm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub3Rlcy9leHRlbmRlZF9ub3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTFDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDdkI7SUFDRSxrREFBa0Q7SUFDM0MsSUFBVTtJQUNqQiwrREFBK0Q7SUFDeEQsS0FBbUI7SUFDMUIsb0RBQW9EO0lBQzdDLGVBQTZCO0lBQ3BDLGlFQUFpRTtJQUMxRCxXQUFlO0lBQ3RCLHVEQUF1RDtJQUNoRCxVQUF3QjtJQUMvQixrREFBa0Q7SUFDM0MsTUFBYztRQVZkLFNBQUksR0FBSixJQUFJLENBQU07UUFFVixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBRW5CLG9CQUFlLEdBQWYsZUFBZSxDQUFjO1FBRTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1FBRWYsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQUV4QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3BCLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXpELE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxPQUFPLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0YifQ==