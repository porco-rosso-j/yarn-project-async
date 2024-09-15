import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { TxRequest } from '../tx_request.js';
import { PrivateCallData } from './private_call_data.js';
/**
 * Input to the private kernel circuit - initial call.
 */
export class PrivateKernelInitCircuitPrivateInputs {
    constructor(
    /**
     * The transaction request which led to the creation of these inputs.
     */
    txRequest, 
    /**
     * The root of the vk tree.
     */
    vkTreeRoot, 
    /**
     * Private calldata corresponding to this iteration of the kernel.
     */
    privateCall) {
        this.txRequest = txRequest;
        this.vkTreeRoot = vkTreeRoot;
        this.privateCall = privateCall;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.txRequest, this.vkTreeRoot, this.privateCall);
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelInitCircuitPrivateInputs(reader.readObject(TxRequest), Fr.fromBuffer(reader), reader.readObject(PrivateCallData));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfaW5pdF9jaXJjdWl0X3ByaXZhdGVfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3ByaXZhdGVfa2VybmVsX2luaXRfY2lyY3VpdF9wcml2YXRlX2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8scUNBQXFDO0lBQ2hEO0lBQ0U7O09BRUc7SUFDSSxTQUFvQjtJQUMzQjs7T0FFRztJQUNJLFVBQWM7SUFDckI7O09BRUc7SUFDSSxXQUE0QjtRQVI1QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSXBCLGVBQVUsR0FBVixVQUFVLENBQUk7UUFJZCxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFDbEMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLHFDQUFxQyxDQUM5QyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGIn0=