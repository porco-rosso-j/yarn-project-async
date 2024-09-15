import { BufferReader } from '@aztec/foundation/serialize';
import { PrivateCallData } from './private_call_data.js';
import { PrivateKernelData } from './private_kernel_data.js';
/**
 * Input to the private kernel circuit - Inner call.
 */
export declare class PrivateKernelInnerCircuitPrivateInputs {
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData;
    /**
     * Private calldata corresponding to this iteration of the kernel.
     */
    privateCall: PrivateCallData;
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData, 
    /**
     * Private calldata corresponding to this iteration of the kernel.
     */
    privateCall: PrivateCallData);
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateKernelInnerCircuitPrivateInputs;
}
//# sourceMappingURL=private_kernel_inner_circuit_private_inputs.d.ts.map