import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { Proof } from '../proof.js';
import { PublicCallStackItem } from '../public_call_stack_item.js';
/**
 * Public calldata assembled from the kernel execution result and proof.
 */
export class PublicCallData {
    constructor(
    /**
     * Call stack item being processed by the current iteration of the kernel.
     */
    callStackItem, 
    /**
     * Children call stack items.
     */
    publicCallStack, 
    /**
     * Proof of the call stack item execution.
     */
    proof, 
    /**
     * Hash of the L2 contract bytecode.
     */
    bytecodeHash) {
        this.callStackItem = callStackItem;
        this.publicCallStack = publicCallStack;
        this.proof = proof;
        this.bytecodeHash = bytecodeHash;
    }
    toBuffer() {
        return serializeToBuffer(this.callStackItem, this.publicCallStack, this.proof, this.bytecodeHash);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicCallData(reader.readObject(PublicCallStackItem), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, CallRequest), reader.readObject(Proof), reader.readObject(Fr));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2NhbGxfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9wdWJsaWNfY2FsbF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUYsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbkU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6QjtJQUNFOztPQUVHO0lBQ2EsYUFBa0M7SUFDbEQ7O09BRUc7SUFDYSxlQUFpRjtJQUNqRzs7T0FFRztJQUNhLEtBQVk7SUFDNUI7O09BRUc7SUFDYSxZQUFnQjtRQVpoQixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFJbEMsb0JBQWUsR0FBZixlQUFlLENBQWtFO1FBSWpGLFVBQUssR0FBTCxLQUFLLENBQU87UUFJWixpQkFBWSxHQUFaLFlBQVksQ0FBSTtJQUMvQixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGNBQWMsQ0FDdkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUN0QyxNQUFNLENBQUMsU0FBUyxDQUNkLHFDQUFxQyxFQUNyQyxXQUFXLENBQ1osRUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=