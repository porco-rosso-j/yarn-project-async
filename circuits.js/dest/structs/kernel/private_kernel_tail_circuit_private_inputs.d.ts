import { BufferReader } from '@aztec/foundation/serialize';
import { PrivateKernelData } from './private_kernel_data.js';
/**
 * Input to the private kernel circuit - tail call.
 */
export declare class PrivateKernelTailCircuitPrivateInputs {
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData;
    constructor(
    /**
     * The previous kernel data
     */
    previousKernel: PrivateKernelData);
    isForPublic(): boolean;
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
    static fromBuffer(buffer: Buffer | BufferReader): PrivateKernelTailCircuitPrivateInputs;
}
//# sourceMappingURL=private_kernel_tail_circuit_private_inputs.d.ts.map