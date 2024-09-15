import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PublicCallData } from './public_call_data.js';
import { PublicKernelData } from './public_kernel_data.js';
/**
 * Inputs to the public kernel circuit.
 */
export class PublicKernelCircuitPrivateInputs {
    constructor(
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    previousKernel, 
    /**
     * Public calldata assembled from the execution result and proof.
     */
    publicCall) {
        this.previousKernel = previousKernel;
        this.publicCall = publicCall;
    }
    /**
     * Serializes the object to a buffer.
     * @returns - Buffer representation of the object.
     */
    toBuffer() {
        return serializeToBuffer(this.previousKernel, this.publicCall);
    }
    /**
     * Serializes the object to a hex string.
     * @returns - Hex string representation of the object.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes the object from a buffer.
     * @param buffer - Buffer to deserialize.
     * @returns - Deserialized object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const previousKernel = reader.readObject(PublicKernelData);
        const publicCall = reader.readObject(PublicCallData);
        return new PublicKernelCircuitPrivateInputs(previousKernel, publicCall);
    }
    /**
     * Deserializes the object from a hex string.
     * @param str - Hex string to deserialize.
     * @returns - Deserialized object.
     */
    static fromString(str) {
        return PublicKernelCircuitPrivateInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
    /**
     * Clones the object.
     * @returns - Cloned object.
     */
    clone() {
        return PublicKernelCircuitPrivateInputs.fromBuffer(this.toBuffer());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tlcm5lbF9jaXJjdWl0X3ByaXZhdGVfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3B1YmxpY19rZXJuZWxfY2lyY3VpdF9wcml2YXRlX2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdDQUFnQztJQUMzQztJQUNFOztPQUVHO0lBQ2EsY0FBZ0M7SUFDaEQ7O09BRUc7SUFDYSxVQUEwQjtRQUoxQixtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFJaEMsZUFBVSxHQUFWLFVBQVUsQ0FBZ0I7SUFDekMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxnQ0FBZ0MsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDM0IsT0FBTyxnQ0FBZ0MsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILE9BQU8sZ0NBQWdDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRiJ9