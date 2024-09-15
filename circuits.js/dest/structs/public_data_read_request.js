import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
// TODO: Rename to PublicDataReadRequest
/**
 * Read operations from the public state tree.
 */
export class PublicDataRead {
    constructor(
    /**
     * Index of the leaf in the public data tree.
     */
    leafSlot, 
    /**
     * Returned value from the public data tree.
     */
    value, 
    /**
     * Optional side effect counter tracking position of this event in tx execution.
     */
    sideEffectCounter) {
        this.leafSlot = leafSlot;
        this.value = value;
        this.sideEffectCounter = sideEffectCounter;
    }
    static from(args) {
        return new PublicDataRead(args.leafIndex, args.value);
    }
    toBuffer() {
        return serializeToBuffer(this.leafSlot, this.value);
    }
    isEmpty() {
        return this.leafSlot.isZero() && this.value.isZero();
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicDataRead(reader.readField(), reader.readField());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicDataRead(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    static empty() {
        return new PublicDataRead(Fr.ZERO, Fr.ZERO);
    }
    toFriendlyJSON() {
        return `Leaf=${this.leafSlot.toFriendlyJSON()}: ${this.value.toFriendlyJSON()}`;
    }
    equals(other) {
        return this.leafSlot.equals(other.leafSlot) && this.value.equals(other.value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2RhdGFfcmVhZF9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvcHVibGljX2RhdGFfcmVhZF9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTNGLHdDQUF3QztBQUN4Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBQ3pCO0lBQ0U7O09BRUc7SUFDYSxRQUFZO0lBQzVCOztPQUVHO0lBQ2EsS0FBUztJQUN6Qjs7T0FFRztJQUNhLGlCQUEwQjtRQVIxQixhQUFRLEdBQVIsUUFBUSxDQUFJO1FBSVosVUFBSyxHQUFMLEtBQUssQ0FBSTtRQUlULHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUztJQUN6QyxDQUFDO0lBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxJQVNYO1FBQ0MsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUEwQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO0lBQ2xGLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBcUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Q0FDRiJ9