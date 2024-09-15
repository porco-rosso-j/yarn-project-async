import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PARTIAL_STATE_REFERENCE_LENGTH } from '../constants.gen.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
/**
 * Stores snapshots of trees which are commonly needed by base or merge rollup circuits.
 */
export class PartialStateReference {
    constructor(
    /** Snapshot of the note hash tree. */
    noteHashTree, 
    /** Snapshot of the nullifier tree. */
    nullifierTree, 
    /** Snapshot of the public data tree. */
    publicDataTree) {
        this.noteHashTree = noteHashTree;
        this.nullifierTree = nullifierTree;
        this.publicDataTree = publicDataTree;
    }
    getSize() {
        return this.noteHashTree.getSize() + this.nullifierTree.getSize() + this.publicDataTree.getSize();
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PartialStateReference(reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(AppendOnlyTreeSnapshot));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const noteHashTree = AppendOnlyTreeSnapshot.fromFields(reader);
        const nullifierTree = AppendOnlyTreeSnapshot.fromFields(reader);
        const publicDataTree = AppendOnlyTreeSnapshot.fromFields(reader);
        return new PartialStateReference(noteHashTree, nullifierTree, publicDataTree);
    }
    static empty() {
        return new PartialStateReference(AppendOnlyTreeSnapshot.zero(), AppendOnlyTreeSnapshot.zero(), AppendOnlyTreeSnapshot.zero());
    }
    toBuffer() {
        return serializeToBuffer(this.noteHashTree, this.nullifierTree, this.publicDataTree);
    }
    toFields() {
        const fields = [
            ...this.noteHashTree.toFields(),
            ...this.nullifierTree.toFields(),
            ...this.publicDataTree.toFields(),
        ];
        if (fields.length !== PARTIAL_STATE_REFERENCE_LENGTH) {
            throw new Error(`Invalid number of fields for PartialStateReference. Expected ${PARTIAL_STATE_REFERENCE_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    isEmpty() {
        return this.noteHashTree.isZero() && this.nullifierTree.isZero() && this.publicDataTree.isZero();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGlhbF9zdGF0ZV9yZWZlcmVuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wYXJ0aWFsX3N0YXRlX3JlZmVyZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRS9FOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQztJQUNFLHNDQUFzQztJQUN0QixZQUFvQztJQUNwRCxzQ0FBc0M7SUFDdEIsYUFBcUM7SUFDckQsd0NBQXdDO0lBQ3hCLGNBQXNDO1FBSnRDLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtRQUVwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7UUFFckMsbUJBQWMsR0FBZCxjQUFjLENBQXdCO0lBQ3JELENBQUM7SUFFSixPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxxQkFBcUIsQ0FDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUN6QyxNQUFNLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsTUFBTSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxNQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLHFCQUFxQixDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLHFCQUFxQixDQUM5QixzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFDN0Isc0JBQXNCLENBQUMsSUFBSSxFQUFFLEVBQzdCLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRztZQUNiLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDL0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFO1NBQ2xDLENBQUM7UUFDRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssOEJBQThCLEVBQUUsQ0FBQztZQUNyRCxNQUFNLElBQUksS0FBSyxDQUNiLGdFQUFnRSw4QkFBOEIsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQ3ZILENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25HLENBQUM7Q0FDRiJ9