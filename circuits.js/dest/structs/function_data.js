import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { FUNCTION_DATA_LENGTH, GeneratorIndex } from '../constants.gen.js';
/** Function description for circuit. */
export class FunctionData {
    constructor(
    /** Function selector of the function being called. */
    selector, 
    /** Indicates whether the function is private or public. */
    isPrivate) {
        this.selector = selector;
        this.isPrivate = isPrivate;
    }
    static fromAbi(abi) {
        return new FunctionData(FunctionSelector.fromNameAndParameters(abi.name, abi.parameters), abi.functionType === FunctionType.PRIVATE);
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.selector, this.isPrivate);
    }
    toFields() {
        const fields = [this.selector.toField(), new Fr(this.isPrivate)];
        if (fields.length !== FUNCTION_DATA_LENGTH) {
            throw new Error(`Invalid number of fields for FunctionData. Expected ${FUNCTION_DATA_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Returns whether this instance is empty.
     * @returns True if the function selector is zero.
     */
    isEmpty() {
        return this.selector.isEmpty();
    }
    /**
     * Returns whether this instance is equal to another.
     * @param other
     * @returns
     */
    equals(other) {
        return this.selector.equals(other.selector) && this.isPrivate === other.isPrivate;
    }
    /**
     * Returns a new instance of FunctionData with zero function selector.
     * @param args - Arguments to pass to the constructor.
     * @returns A new instance of FunctionData with zero function selector.
     */
    static empty(args) {
        return new FunctionData(FunctionSelector.empty(), args?.isPrivate ?? false);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of FunctionData.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new FunctionData(reader.readObject(FunctionSelector), /*isPrivate=*/ reader.readBoolean());
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const selector = FunctionSelector.fromFields(reader);
        const isPrivate = reader.readBoolean();
        return new FunctionData(selector, isPrivate);
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.FUNCTION_DATA);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2Z1bmN0aW9uX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0YsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzNFLHdDQUF3QztBQUN4QyxNQUFNLE9BQU8sWUFBWTtJQUN2QjtJQUNFLHNEQUFzRDtJQUMvQyxRQUEwQjtJQUNqQywyREFBMkQ7SUFDcEQsU0FBa0I7UUFGbEIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFFMUIsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUN4QixDQUFDO0lBRUosTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFzQztRQUNuRCxPQUFPLElBQUksWUFBWSxDQUNyQixnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFDaEUsR0FBRyxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsT0FBTyxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxvQkFBb0IsRUFBRSxDQUFDO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQ2IsdURBQXVELG9CQUFvQixTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FDcEcsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxLQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBS25CO1FBQ0MsT0FBTyxJQUFJLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUEwQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFdkMsT0FBTyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FDRiJ9