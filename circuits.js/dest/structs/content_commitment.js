import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CONTENT_COMMITMENT_LENGTH } from '../constants.gen.js';
export const NUM_BYTES_PER_SHA256 = 32;
export class ContentCommitment {
    constructor(numTxs, txsEffectsHash, inHash, outHash) {
        this.numTxs = numTxs;
        this.txsEffectsHash = txsEffectsHash;
        this.inHash = inHash;
        this.outHash = outHash;
        if (txsEffectsHash.length !== NUM_BYTES_PER_SHA256) {
            throw new Error(`txsEffectsHash buffer must be ${NUM_BYTES_PER_SHA256} bytes`);
        }
        if (txsEffectsHash[0] !== 0) {
            throw new Error(`txsEffectsHash buffer should be truncated and left padded`);
        }
        if (inHash.length !== NUM_BYTES_PER_SHA256) {
            throw new Error(`inHash buffer must be ${NUM_BYTES_PER_SHA256} bytes`);
        }
        if (inHash[0] !== 0) {
            throw new Error(`inHash buffer should be truncated and left padded`);
        }
        if (outHash.length !== NUM_BYTES_PER_SHA256) {
            throw new Error(`outHash buffer must be ${NUM_BYTES_PER_SHA256} bytes`);
        }
        if (outHash[0] !== 0) {
            throw new Error(`outHash buffer should be truncated and left padded`);
        }
    }
    getSize() {
        return this.toBuffer().length;
    }
    toBuffer() {
        return serializeToBuffer(this.numTxs, this.txsEffectsHash, this.inHash, this.outHash);
    }
    toFields() {
        const serialized = [
            this.numTxs,
            Fr.fromBuffer(this.txsEffectsHash),
            Fr.fromBuffer(this.inHash),
            Fr.fromBuffer(this.outHash),
        ];
        if (serialized.length !== CONTENT_COMMITMENT_LENGTH) {
            throw new Error(`Expected content commitment to have 4 fields, but it has ${serialized.length} fields`);
        }
        return serialized;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ContentCommitment(reader.readObject(Fr), reader.readBytes(NUM_BYTES_PER_SHA256), reader.readBytes(NUM_BYTES_PER_SHA256), reader.readBytes(NUM_BYTES_PER_SHA256));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new ContentCommitment(reader.readField(), reader.readField().toBuffer(), reader.readField().toBuffer(), reader.readField().toBuffer());
    }
    static empty() {
        return new ContentCommitment(Fr.zero(), Buffer.alloc(NUM_BYTES_PER_SHA256), Buffer.alloc(NUM_BYTES_PER_SHA256), Buffer.alloc(NUM_BYTES_PER_SHA256));
    }
    isEmpty() {
        return (this.numTxs.isZero() &&
            this.txsEffectsHash.equals(Buffer.alloc(NUM_BYTES_PER_SHA256)) &&
            this.inHash.equals(Buffer.alloc(NUM_BYTES_PER_SHA256)) &&
            this.outHash.equals(Buffer.alloc(NUM_BYTES_PER_SHA256)));
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        const buffer = Buffer.from(str.replace(/^0x/i, ''), 'hex');
        return ContentCommitment.fromBuffer(buffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9jb21taXRtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvY29udGVudF9jb21taXRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhFLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztBQUV2QyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW1CLE1BQVUsRUFBUyxjQUFzQixFQUFTLE1BQWMsRUFBUyxPQUFlO1FBQXhGLFdBQU0sR0FBTixNQUFNLENBQUk7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ3pHLElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxvQkFBb0IsRUFBRSxDQUFDO1lBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLG9CQUFvQixRQUFRLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssb0JBQW9CLEVBQUUsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixvQkFBb0IsUUFBUSxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUNELElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFB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