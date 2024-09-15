import { FunctionSelector } from '@aztec/foundation/abi';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { CALL_CONTEXT_LENGTH, GeneratorIndex } from '../constants.gen.js';
/**
 * Call context.
 */
export class CallContext {
    constructor(
    /**
     * Address of the account which represents the entity who invoked the call.
     */
    msgSender, 
    /**
     * The contract address against which all state changes will be stored. Not called `contractAddress` because during
     * delegate call the contract whose code is being executed may be different from the contract whose state is being
     * modified.
     */
    storageContractAddress, 
    /**
     * Function selector of the function being called.
     */
    functionSelector, 
    /**
     * Determines whether the call is a delegate call (see Ethereum's delegate call opcode for more information).
     */
    isDelegateCall, 
    /**
     * Determines whether the call is modifying state.
     */
    isStaticCall) {
        this.msgSender = msgSender;
        this.storageContractAddress = storageContractAddress;
        this.functionSelector = functionSelector;
        this.isDelegateCall = isDelegateCall;
        this.isStaticCall = isStaticCall;
    }
    /**
     * Returns a new instance of CallContext with zero msg sender, storage contract address.
     * @returns A new instance of CallContext with zero msg sender, storage contract address.
     */
    static empty() {
        return new CallContext(AztecAddress.ZERO, AztecAddress.ZERO, FunctionSelector.empty(), false, false);
    }
    isEmpty() {
        return (this.msgSender.isZero() && this.storageContractAddress.isZero() && this.functionSelector.isEmpty() && Fr.ZERO);
    }
    static from(fields) {
        return new CallContext(...CallContext.getFields(fields));
    }
    static getFields(fields) {
        return [
            fields.msgSender,
            fields.storageContractAddress,
            fields.functionSelector,
            fields.isDelegateCall,
            fields.isStaticCall,
        ];
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...CallContext.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...CallContext.getFields(this));
        if (fields.length !== CALL_CONTEXT_LENGTH) {
            throw new Error(`Invalid number of fields for CallContext. Expected ${CALL_CONTEXT_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CallContext(reader.readObject(AztecAddress), reader.readObject(AztecAddress), reader.readObject(FunctionSelector), reader.readBoolean(), reader.readBoolean());
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new CallContext(reader.readObject(AztecAddress), reader.readObject(AztecAddress), reader.readObject(FunctionSelector), reader.readBoolean(), reader.readBoolean());
    }
    equals(callContext) {
        return (callContext.msgSender.equals(this.msgSender) &&
            callContext.storageContractAddress.equals(this.storageContractAddress) &&
            callContext.functionSelector.equals(this.functionSelector) &&
            callContext.isDelegateCall === this.isDelegateCall &&
            callContext.isStaticCall === this.isStaticCall);
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.CALL_CONTEXT);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF9jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvY2FsbF9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTFFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFDdEI7SUFDRTs7T0FFRztJQUNJLFNBQXVCO0lBQzlCOzs7O09BSUc7SUFDSSxzQkFBb0M7SUFDM0M7O09BRUc7SUFDSSxnQkFBa0M7SUFDekM7O09BRUc7SUFDSSxjQUF1QjtJQUM5Qjs7T0FFRztJQUNJLFlBQXFCO1FBbEJyQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBTXZCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBYztRQUlwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFTO1FBSXZCLGlCQUFZLEdBQVosWUFBWSxDQUFTO0lBQzNCLENBQUM7SUFFSjs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSztRQUNqQixPQUFPLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkcsQ0FB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