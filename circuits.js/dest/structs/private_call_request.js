import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { CallContext } from './call_context.js';
import { CallerContext } from './caller_context.js';
import { FunctionData } from './function_data.js';
export class PrivateCallRequest {
    constructor(
    /**
     * The address of the contract being called.
     */
    target, 
    /**
     * The call context of the call.
     */
    callContext, 
    /**
     * The function data of the call.
     */
    functionData, 
    /**
     * The hash of the arguments of the call.
     */
    argsHash, 
    /**
     * The hash of the return values of the call.
     */
    returnsHash, 
    /**
     * The call context of the contract making the call.
     */
    callerContext, 
    /**
     * The start counter of the call.
     */
    startSideEffectCounter, 
    /**
     * The end counter of the call.
     */
    endSideEffectCounter) {
        this.target = target;
        this.callContext = callContext;
        this.functionData = functionData;
        this.argsHash = argsHash;
        this.returnsHash = returnsHash;
        this.callerContext = callerContext;
        this.startSideEffectCounter = startSideEffectCounter;
        this.endSideEffectCounter = endSideEffectCounter;
    }
    toFields() {
        return serializeToFields([
            this.target,
            this.callContext,
            this.functionData,
            this.argsHash,
            this.returnsHash,
            this.callerContext,
            this.startSideEffectCounter,
            this.endSideEffectCounter,
        ]);
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PrivateCallRequest(reader.readObject(AztecAddress), reader.readObject(CallContext), reader.readObject(FunctionData), reader.readField(), reader.readField(), reader.readObject(CallerContext), reader.readU32(), reader.readU32());
    }
    toBuffer() {
        return serializeToBuffer(this.target, this.callContext, this.functionData, this.argsHash, this.returnsHash, this.callerContext, this.startSideEffectCounter, this.endSideEffectCounter);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateCallRequest(reader.readObject(AztecAddress), reader.readObject(CallContext), reader.readObject(FunctionData), Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readObject(CallerContext), reader.readNumber(), reader.readNumber());
    }
    isEmpty() {
        return (this.target.isZero() &&
            this.callContext.isEmpty() &&
            this.functionData.isEmpty() &&
            this.argsHash.isZero() &&
            this.returnsHash.isZero() &&
            this.callerContext.isEmpty() &&
            this.startSideEffectCounter === 0 &&
            this.endSideEffectCounter === 0);
    }
    static empty() {
        return new PrivateCallRequest(AztecAddress.ZERO, CallContext.empty(), FunctionData.empty(), Fr.ZERO, Fr.ZERO, CallerContext.empty(), 0, 0);
    }
    equals(callRequest) {
        return (callRequest.target.equals(this.target) &&
            callRequest.callContext.equals(this.callContext) &&
            callRequest.functionData.equals(this.functionData) &&
            callRequest.argsHash.equals(this.argsHash) &&
            callRequest.returnsHash.equals(this.returnsHash) &&
            callRequest.callerContext.equals(this.callerContext) &&
            callRequest.startSideEffectCounter === this.startSideEffectCounter &&
            callRequest.endSideEffectCounter === this.endSideEffectCounter);
    }
    toString() {
        return `PrivateCallRequest(target: ${this.target}, callContext: ${this.callContext}, functionData: ${this.functionData}, argsHash: ${this.argsHash}, returnsHash: ${this.returnsHash}, callerContext: ${this.callerContext}, startSideEffectCounter: ${this.startSideEffectCounter}, endSideEffectCounter: ${this.endSideEffectCounter})`;
    }
    matchesStackItem(stackItem) {
        return (stackItem.contractAddress.equals(this.target) &&
            stackItem.publicInputs.callContext.equals(this.callContext) &&
            stackItem.functionData.equals(this.functionData) &&
            stackItem.publicInputs.argsHash.equals(this.argsHash) &&
            stackItem.publicInputs.returnsHash.equals(this.returnsHash) &&
            stackItem.publicInputs.startSideEffectCounter.equals(new Fr(this.startSideEffectCounter)) &&
            stackItem.publicInputs.endSideEffectCounter.equals(new Fr(this.endSideEffectCounter)));
    }
}
export class ScopedPrivateCallRequest {
    constructor(callRequest, contractAddress) {
        this.callRequest = callRequest;
        this.contractAddress = contractAddress;
    }
    toBuffer() {
        return serializeToBuffer(this.callRequest, this.contractAddress);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ScopedPrivateCallRequest(reader.readObject(PrivateCallRequest), reader.readObject(AztecAddress));
    }
    isEmpty() {
        return this.callRequest.isEmpty() && this.contractAddress.isZero();
    }
    static empty() {
        return new ScopedPrivateCallRequest(PrivateCallRequest.empty(), AztecAddress.ZERO);
    }
    equals(callRequest) {
        return callRequest.callRequest.equals(this.callRequest) && callRequest.contractAddress.equals(this.contractAddress);
    }
    toString() {
        return `ScopedPrivateCallRequest(callRequest: ${this.callRequest}, contractAddress: ${this.contractAddress})`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9jYWxsX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wcml2YXRlX2NhbGxfcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QjtJQUNFOztPQUVHO0lBQ0ksTUFBb0I7SUFDM0I7O09BRUc7SUFDSSxXQUF3QjtJQUMvQjs7T0FFRztJQUNJLFlBQTBCO0lBQ2pDOztPQUVHO0lBQ0ksUUFBWTtJQUNuQjs7T0FFRztJQUNJLFdBQWU7SUFDdEI7O09BRUc7SUFDSSxhQUE0QjtJQUNuQzs7T0FFRztJQUNJLHNCQUE4QjtJQUNyQzs7T0FFRztJQUNJLG9CQUE0QjtRQTVCNUIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUlwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUl4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUkxQixhQUFRLEdBQVIsUUFBUSxDQUFJO1FBSVosZ0JBQVcsR0FBWCxXQUFXLENBQUk7UUFJZixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUk1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVE7UUFJOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO0lBQ2xDLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTTtZQUNYLElBQUksQ0FBQyxXQUFXO1lBQ2hCLElBQUksQ0FBQyxZQUFZO1lBQ2pCLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLFdBQVc7WUFDaEIsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQjtZQUMzQixJQUFJLENBQUMsb0JBQW9CO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLGtCQUFrQixDQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixNQUFNLENBQUMsU0FBUyxFQUFFLEVBQ2xCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFDaEMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUNoQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFlBQVksRUFDakIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGtCQUFrQixDQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUM5QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUNoQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQ25CLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLGtCQUFrQixDQUMzQixZQUFZLENBQUMsSUFBSSxFQUNqQixXQUFXLENBQUMsS0FBSyxFQUFFLEVBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFDcEIsRUFBRSxDQUFDLElBQUksRUFDUCxFQUFFLENBQUMsSUFBSSxFQUNQLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFDckIsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUErQjtRQUNwQyxPQUFPLENBQ0wsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDbEQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDcEQsV0FBVyxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxzQkFBc0I7WUFDbEUsV0FBVyxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxvQkFBb0IsQ0FDL0QsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyw4QkFBOEIsSUFBSSxDQUFDLE1BQU0sa0JBQWtCLElBQUksQ0FBQyxXQUFXLG1CQUFtQixJQUFJLENBQUMsWUFBWSxlQUFlLElBQUksQ0FBQyxRQUFRLGtCQUFrQixJQUFJLENBQUMsV0FBVyxvQkFBb0IsSUFBSSxDQUFDLGFBQWEsNkJBQTZCLElBQUksQ0FBQyxzQkFBc0IsMkJBQTJCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDO0lBQzVVLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUErQjtRQUM5QyxPQUFPLENBQ0wsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMzRCxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzNELFNBQVMsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pGLFNBQVMsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQ3RGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQW1CLFdBQStCLEVBQVMsZUFBNkI7UUFBckUsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWM7SUFBRyxDQUFDO0lBRTVGLFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQXFDO1FBQzFDLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8seUNBQXlDLElBQUksQ0FBQyxXQUFXLHNCQUFzQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUM7SUFDaEgsQ0FBQztDQUNGIn0=