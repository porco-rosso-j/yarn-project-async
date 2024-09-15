import { AztecAddress } from '@aztec/foundation/aztec-address';
import { pedersenHash } from '@aztec/foundation/crypto';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GeneratorIndex, PRIVATE_CALL_STACK_ITEM_LENGTH } from '../constants.gen.js';
import { FunctionData } from './function_data.js';
import { PrivateCircuitPublicInputs } from './private_circuit_public_inputs.js';
/**
 * Call stack item on a private call.
 */
export class PrivateCallStackItem {
    constructor(
    /**
     * Address of the contract on which the function is invoked.
     */
    contractAddress, 
    /**
     * Data identifying the function being called.
     */
    functionData, 
    /**
     * Public inputs to the private kernel circuit.
     */
    publicInputs) {
        this.contractAddress = contractAddress;
        this.functionData = functionData;
        this.publicInputs = publicInputs;
    }
    static getFields(fields) {
        return [fields.contractAddress, fields.functionData, fields.publicInputs];
    }
    toBuffer() {
        return serializeToBuffer(...PrivateCallStackItem.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...PrivateCallStackItem.getFields(this));
        if (fields.length !== PRIVATE_CALL_STACK_ITEM_LENGTH) {
            throw new Error(`Invalid number of fields for PrivateCallStackItem. Expected ${PRIVATE_CALL_STACK_ITEM_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateCallStackItem(reader.readObject(AztecAddress), reader.readObject(FunctionData), reader.readObject(PrivateCircuitPublicInputs));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PrivateCallStackItem(AztecAddress.fromFields(reader), FunctionData.fromFields(reader), PrivateCircuitPublicInputs.fromFields(reader));
    }
    /**
     * Returns a new instance of PrivateCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PrivateCallStackItem with zero contract address, function data and public inputs.
     */
    static empty() {
        return new PrivateCallStackItem(AztecAddress.ZERO, FunctionData.empty({ isPrivate: true }), PrivateCircuitPublicInputs.empty());
    }
    isEmpty() {
        return this.contractAddress.isZero() && this.functionData.isEmpty() && this.publicInputs.isEmpty();
    }
    /**
     * Computes this call stack item hash.
     * @returns Hash.
     */
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.CALL_STACK_ITEM);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9jYWxsX3N0YWNrX2l0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wcml2YXRlX2NhbGxfc3RhY2tfaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhELE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUcsT0FBTyxFQUFFLGNBQWMsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVoRjs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7SUFDRTs7T0FFRztJQUNJLGVBQTZCO0lBQ3BDOztPQUVHO0lBQ0ksWUFBMEI7SUFDakM7O09BRUc7SUFDSSxZQUF3QztRQVJ4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUk3QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUkxQixpQkFBWSxHQUFaLFlBQVksQ0FBNEI7SUFDOUMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBc0M7UUFDckQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFVLENBQUM7SUFDckYsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLEdBQUcsb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyw4QkFBOEIsRUFBRSxDQUFDO1lBQ3JELE1BQU0sSUFBSSxLQUFLLENBQ2IsK0RBQStELDhCQUE4QixTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FDdEgsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksb0JBQW9CLENBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FDOUMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLG9CQUFvQixDQUM3QixZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUMvQixZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUMvQiwwQkFBMEIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQzlDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLG9CQUFvQixDQUM3QixZQUFZLENBQUMsSUFBSSxFQUNqQixZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ3ZDLDBCQUEwQixDQUFDLEtBQUssRUFBRSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUUsSUFBSTtRQUNoQixPQUFPLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGIn0=