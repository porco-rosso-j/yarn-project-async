import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { STATE_REFERENCE_LENGTH } from '../constants.gen.js';
import { PartialStateReference } from './partial_state_reference.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
/**
 * Stores snapshots of all the trees but archive.
 */
export class StateReference {
    constructor(
    /** Snapshot of the l1 to l2 message tree. */
    l1ToL2MessageTree, 
    /** Reference to the rest of the state. */
    partial) {
        this.l1ToL2MessageTree = l1ToL2MessageTree;
        this.partial = partial;
    }
    getSize() {
        return this.l1ToL2MessageTree.getSize() + this.partial.getSize();
    }
    toBuffer() {
        // Note: The order here must match the order in the HeaderLib solidity library.
        return serializeToBuffer(this.l1ToL2MessageTree, this.partial);
    }
    toFields() {
        const fields = [...this.l1ToL2MessageTree.toFields(), ...this.partial.toFields()];
        if (fields.length !== STATE_REFERENCE_LENGTH) {
            throw new Error(`Invalid number of fields for StateReference. Expected ${STATE_REFERENCE_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new StateReference(reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(PartialStateReference));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const l1ToL2MessageTree = AppendOnlyTreeSnapshot.fromFields(reader);
        const partial = PartialStateReference.fromFields(reader);
        return new StateReference(l1ToL2MessageTree, partial);
    }
    static empty() {
        return new StateReference(AppendOnlyTreeSnapshot.zero(), PartialStateReference.empty());
    }
    isEmpty() {
        return this.l1ToL2MessageTree.isZero() && this.partial.isEmpty();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfcmVmZXJlbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvc3RhdGVfcmVmZXJlbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFL0U7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6QjtJQUNFLDZDQUE2QztJQUN0QyxpQkFBeUM7SUFDaEQsMENBQTBDO0lBQ25DLE9BQThCO1FBRjlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBd0I7UUFFekMsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7SUFDcEMsQ0FBQztJQUVKLE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25FLENBQUM7SUFFRCxRQUFRO1FBQ04sK0VBQStFO1FBQy9FLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLHNCQUFzQixFQUFFLENBQUM7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDYix5REFBeUQsc0JBQXNCLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUN4RyxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxNQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxNQUFNLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekQsT0FBTyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksY0FBYyxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxFQUFFLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25FLENBQUM7Q0FDRiJ9