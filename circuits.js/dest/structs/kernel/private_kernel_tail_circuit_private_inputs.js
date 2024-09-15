import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { countAccumulatedItems } from '../../utils/index.js';
import { PrivateKernelData } from './private_kernel_data.js';
/**
 * Input to the private kernel circuit - tail call.
 */
export class PrivateKernelTailCircuitPrivateInputs {
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel) {
        this.previousKernel = previousKernel;
    }
    isForPublic() {
        return (countAccumulatedItems(this.previousKernel.publicInputs.end.publicCallStack) > 0 ||
            !this.previousKernel.publicInputs.publicTeardownCallRequest.isEmpty());
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.previousKernel);
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelTailCircuitPrivateInputs(reader.readObject(PrivateKernelData));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfdGFpbF9jaXJjdWl0X3ByaXZhdGVfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3ByaXZhdGVfa2VybmVsX3RhaWxfY2lyY3VpdF9wcml2YXRlX2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFN0Q7O0dBRUc7QUFDSCxNQUFNLE9BQU8scUNBQXFDO0lBQ2hEO0lBQ0U7O09BRUc7SUFDSSxjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7SUFDdkMsQ0FBQztJQUVKLFdBQVc7UUFDVCxPQUFPLENBQ0wscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7WUFDL0UsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLHFDQUFxQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FDRiJ9