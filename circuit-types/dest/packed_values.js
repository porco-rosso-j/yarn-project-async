import { Fr, Vector } from '@aztec/circuits.js';
import { computeVarArgsHash } from '@aztec/circuits.js/hash';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
/**
 * Packs a set of values into a hash.
 */
export class PackedValues {
    constructor(
    /**
     *  Raw values.
     */
    values, 
    /**
     * The hash of the raw values
     */
    hash) {
        this.values = values;
        this.hash = hash;
    }
    static async fromValues(values) {
        return new PackedValues(values, await computeVarArgsHash(values));
    }
    toBuffer() {
        return serializeToBuffer(new Vector(this.values), this.hash);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PackedValues(reader.readVector(Fr), Fr.fromBuffer(reader));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2VkX3ZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWNrZWRfdmFsdWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFDdkI7SUFDRTs7T0FFRztJQUNhLE1BQVk7SUFDNUI7O09BRUc7SUFDYSxJQUFRO1FBSlIsV0FBTSxHQUFOLE1BQU0sQ0FBTTtRQUlaLFNBQUksR0FBSixJQUFJLENBQUk7SUFDdkIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQVk7UUFDbEMsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YifQ==