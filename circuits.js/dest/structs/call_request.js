import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CallerContext } from './caller_context.js';
/**
 * Call request.
 */
export class CallRequest {
    constructor(
    /**
     * The hash of the call stack item.
     */
    hash, 
    /**
     * The address of the contract calling the function.
     */
    callerContractAddress, 
    /**
     * The call context of the contract calling the function.
     */
    callerContext, 
    /**
     * The call context of the contract calling the function.
     */
    startSideEffectCounter, 
    /**
     * The call context of the contract calling the function.
     */
    endSideEffectCounter) {
        this.hash = hash;
        this.callerContractAddress = callerContractAddress;
        this.callerContext = callerContext;
        this.startSideEffectCounter = startSideEffectCounter;
        this.endSideEffectCounter = endSideEffectCounter;
    }
    toBuffer() {
        return serializeToBuffer(this.hash, this.callerContractAddress, this.callerContext, this.startSideEffectCounter, this.endSideEffectCounter);
    }
    get counter() {
        return this.startSideEffectCounter.toNumber();
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance of CallRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CallRequest(Fr.fromBuffer(reader), reader.readObject(AztecAddress), reader.readObject(CallerContext), Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new CallRequest(reader.readField(), reader.readObject(AztecAddress), reader.readObject(CallerContext), reader.readField(), reader.readField());
    }
    isEmpty() {
        return (this.hash.isZero() &&
            this.callerContractAddress.isZero() &&
            this.callerContext.isEmpty() &&
            this.startSideEffectCounter.isZero() &&
            this.endSideEffectCounter.isZero());
    }
    /**
     * Returns a new instance of CallRequest with zero hash, caller contract address and caller context.
     * @returns A new instance of CallRequest with zero hash, caller contract address and caller context.
     */
    static empty() {
        return new CallRequest(Fr.ZERO, AztecAddress.ZERO, CallerContext.empty(), Fr.ZERO, Fr.ZERO);
    }
    equals(callRequest) {
        return (callRequest.hash.equals(this.hash) &&
            callRequest.callerContractAddress.equals(this.callerContractAddress) &&
            callRequest.callerContext.equals(this.callerContext) &&
            callRequest.startSideEffectCounter.equals(this.startSideEffectCounter) &&
            callRequest.endSideEffectCounter.equals(this.endSideEffectCounter));
    }
    toString() {
        return `CallRequest(hash: ${this.hash.toString()}, callerContractAddress: ${this.callerContractAddress.toString()}, callerContext: ${this.callerContext.toString()}, startSideEffectCounter: ${this.startSideEffectCounter.toString()}, endSideEffectCounter: ${this.endSideEffectCounter.toString()})`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbF9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvY2FsbF9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sV0FBVztJQUN0QjtJQUNFOztPQUVHO0lBQ0ksSUFBUTtJQUNmOztPQUVHO0lBQ0kscUJBQW1DO0lBQzFDOztPQUVHO0lBQ0ksYUFBNEI7SUFDbkM7O09BRUc7SUFDSSxzQkFBMEI7SUFDakM7O09BRUc7SUFDSSxvQkFBd0I7UUFoQnhCLFNBQUksR0FBSixJQUFJLENBQUk7UUFJUiwwQkFBcUIsR0FBckIscUJBQXFCLENBQWM7UUFJbkMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFJNUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFJO1FBSTFCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBSTtJQUM5QixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLHFCQUFxQixFQUMxQixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFB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