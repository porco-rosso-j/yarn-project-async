import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GeneratorIndex, HEADER_LENGTH } from '../constants.gen.js';
import { ContentCommitment } from './content_commitment.js';
import { GlobalVariables } from './global_variables.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
import { StateReference } from './state_reference.js';
/** A header of an L2 block. */
export class Header {
    constructor(
    /** Snapshot of archive before the block is applied. */
    lastArchive, 
    /** Hash of the body of an L2 block. */
    contentCommitment, 
    /** State reference. */
    state, 
    /** Global variables of an L2 block. */
    globalVariables, 
    /** Total fees in the block, computed by the root rollup circuit */
    totalFees) {
        this.lastArchive = lastArchive;
        this.contentCommitment = contentCommitment;
        this.state = state;
        this.globalVariables = globalVariables;
        this.totalFees = totalFees;
    }
    static getFields(fields) {
        // Note: The order here must match the order in the HeaderLib solidity library.
        return [
            fields.lastArchive,
            fields.contentCommitment,
            fields.state,
            fields.globalVariables,
            fields.totalFees,
        ];
    }
    getSize() {
        return (this.lastArchive.getSize() +
            this.contentCommitment.getSize() +
            this.state.getSize() +
            this.globalVariables.getSize() +
            this.totalFees.size);
    }
    toBuffer() {
        return serializeToBuffer(...Header.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...Header.getFields(this));
        if (fields.length !== HEADER_LENGTH) {
            throw new Error(`Invalid number of fields for Header. Expected ${HEADER_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    clone() {
        return Header.fromBuffer(this.toBuffer());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new Header(reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(ContentCommitment), reader.readObject(StateReference), reader.readObject(GlobalVariables), reader.readObject(Fr));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new Header(AppendOnlyTreeSnapshot.fromFields(reader), ContentCommitment.fromFields(reader), StateReference.fromFields(reader), GlobalVariables.fromFields(reader), reader.readField());
    }
    static empty() {
        return new Header(AppendOnlyTreeSnapshot.zero(), ContentCommitment.empty(), StateReference.empty(), GlobalVariables.empty(), Fr.ZERO);
    }
    isEmpty() {
        return (this.lastArchive.isZero() &&
            this.contentCommitment.isEmpty() &&
            this.state.isEmpty() &&
            this.globalVariables.isEmpty());
    }
    /**
     * Serializes this instance into a string.
     * @returns Encoded string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        const buffer = Buffer.from(str.replace(/^0x/i, ''), 'hex');
        return Header.fromBuffer(buffer);
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.BLOCK_HASH);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvaGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RyxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsK0JBQStCO0FBQy9CLE1BQU0sT0FBTyxNQUFNO0lBQ2pCO0lBQ0UsdURBQXVEO0lBQ2hELFdBQW1DO0lBQzFDLHVDQUF1QztJQUNoQyxpQkFBb0M7SUFDM0MsdUJBQXVCO0lBQ2hCLEtBQXFCO0lBQzVCLHVDQUF1QztJQUNoQyxlQUFnQztJQUN2QyxtRUFBbUU7SUFDNUQsU0FBYTtRQVJiLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUVuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRXBDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRXJCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUVoQyxjQUFTLEdBQVQsU0FBUyxDQUFJO0lBQ25CLENBQUM7SUFFSixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQXdCO1FBQ3ZDLCtFQUErRTtRQUMvRSxPQUFPO1lBQ0wsTUFBTSxDQUFDLFdBQVc7WUFDbEIs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