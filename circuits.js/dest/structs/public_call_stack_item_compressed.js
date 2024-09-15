import { AztecAddress } from '@aztec/foundation/aztec-address';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GeneratorIndex, PUBLIC_CALL_STACK_ITEM_COMPRESSED_LENGTH } from '../constants.gen.js';
import { CallContext } from './call_context.js';
import { FunctionData } from './function_data.js';
import { Gas } from './gas.js';
import { RevertCode } from './revert_code.js';
/**
 * Compressed call stack item on a public call.
 */
export class PublicCallStackItemCompressed {
    constructor(contractAddress, callContext, functionData, argsHash, returnsHash, revertCode, 
    /** How much gas was available for execution. */
    startGasLeft, 
    /** How much gas was left after execution. */
    endGasLeft) {
        this.contractAddress = contractAddress;
        this.callContext = callContext;
        this.functionData = functionData;
        this.argsHash = argsHash;
        this.returnsHash = returnsHash;
        this.revertCode = revertCode;
        this.startGasLeft = startGasLeft;
        this.endGasLeft = endGasLeft;
    }
    static getFields(fields) {
        return [
            fields.contractAddress,
            fields.callContext,
            fields.functionData,
            fields.argsHash,
            fields.returnsHash,
            fields.revertCode,
            fields.startGasLeft,
            fields.endGasLeft,
        ];
    }
    toFields() {
        const fields = serializeToFields(...PublicCallStackItemCompressed.getFields(this));
        if (fields.length !== PUBLIC_CALL_STACK_ITEM_COMPRESSED_LENGTH) {
            throw new Error(`Invalid number of fields for PublicCallStackItemCompressed. Expected ${PUBLIC_CALL_STACK_ITEM_COMPRESSED_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    toBuffer() {
        return serializeToBuffer(...PublicCallStackItemCompressed.getFields(this));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicCallStackItemCompressed(reader.readObject(AztecAddress), reader.readObject(CallContext), reader.readObject(FunctionData), reader.readObject(Fr), reader.readObject(Fr), reader.readObject(RevertCode), reader.readObject(Gas), reader.readObject(Gas));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicCallStackItemCompressed(AztecAddress.fromFields(reader), CallContext.fromFields(reader), FunctionData.fromFields(reader), reader.readField(), reader.readField(), RevertCode.fromFields(reader), Gas.fromFields(reader), Gas.fromFields(reader));
    }
    /**
     * Returns a new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     */
    static empty() {
        return new PublicCallStackItemCompressed(AztecAddress.ZERO, CallContext.empty(), FunctionData.empty({ isPrivate: false }), Fr.ZERO, Fr.ZERO, RevertCode.OK, Gas.empty(), Gas.empty());
    }
    isEmpty() {
        return (this.contractAddress.isZero() &&
            this.callContext.isEmpty() &&
            this.functionData.isEmpty() &&
            this.argsHash.isEmpty() &&
            this.returnsHash.isEmpty() &&
            this.revertCode === RevertCode.OK &&
            this.startGasLeft.isEmpty() &&
            this.endGasLeft.isEmpty());
    }
    /**
     * Computes this call stack item hash.
     * @returns Hash.
     */
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.CALL_STACK_ITEM);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2NhbGxfc3RhY2tfaXRlbV9jb21wcmVzc2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvcHVibGljX2NhbGxfc3RhY2tfaXRlbV9jb21wcmVzc2VkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUcsT0FBTyxFQUFFLGNBQWMsRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFlBQ1MsZUFBNkIsRUFDN0IsV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsUUFBWSxFQUNaLFdBQWUsRUFDZixVQUFzQjtJQUM3QixnREFBZ0Q7SUFDekMsWUFBaUI7SUFDeEIsNkNBQTZDO0lBQ3RDLFVBQWU7UUFUZixvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFJO1FBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQUk7UUFDZixlQUFVLEdBQVYs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