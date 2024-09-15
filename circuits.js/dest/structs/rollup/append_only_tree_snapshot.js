import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { STRING_ENCODING } from '../shared.js';
/**
 * Snapshot of an append only tree.
 *
 * Used in circuits to verify that tree insertions are performed correctly.
 */
export class AppendOnlyTreeSnapshot {
    constructor(
    /**
     * Root of the append only tree when taking the snapshot.
     */
    root, 
    /**
     * Index of the next available leaf in the append only tree.
     *
     * Note: We include the next available leaf index in the snapshot so that the snapshot can be used to verify that
     *       the insertion was performed at the correct place. If we only verified tree root then it could happen that
     *       some leaves would get overwritten and the tree root check would still pass.
     *       TLDR: We need to store the next available leaf index to ensure that the "append only" property was
     *             preserved when verifying state transitions.
     */
    nextAvailableLeafIndex) {
        this.root = root;
        this.nextAvailableLeafIndex = nextAvailableLeafIndex;
    }
    getSize() {
        return this.root.size + 4;
    }
    toBuffer() {
        return serializeToBuffer(this.root, this.nextAvailableLeafIndex);
    }
    toFields() {
        return [this.root, new Fr(this.nextAvailableLeafIndex)];
    }
    toString() {
        return this.toBuffer().toString(STRING_ENCODING);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new AppendOnlyTreeSnapshot(Fr.fromBuffer(reader), reader.readNumber());
    }
    static fromString(str) {
        return AppendOnlyTreeSnapshot.fromBuffer(Buffer.from(str, STRING_ENCODING));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new AppendOnlyTreeSnapshot(reader.readField(), Number(reader.readField().toBigInt()));
    }
    static zero() {
        return new AppendOnlyTreeSnapshot(Fr.ZERO, 0);
    }
    isZero() {
        return this.root.isZero() && this.nextAvailableLeafIndex === 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kX29ubHlfdHJlZV9zbmFwc2hvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JvbGx1cC9hcHBlbmRfb25seV90cmVlX3NuYXBzaG90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLE9BQU8sRUFBRSxlQUFlLEVBQWUsTUFBTSxjQUFjLENBQUM7QUFFNUQ7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxzQkFBc0I7SUFDakM7SUFDRTs7T0FFRztJQUNJLElBQVE7SUFDZjs7Ozs7Ozs7T0FRRztJQUNJLHNCQUE4QjtRQVY5QixTQUFJLEdBQUosSUFBSSxDQUFJO1FBVVIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFRO0lBQ3BDLENBQUM7SUFFSixPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsT0FBTyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUk7UUFDVCxPQUFPLElBQUksc0JBQXNCLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRiJ9