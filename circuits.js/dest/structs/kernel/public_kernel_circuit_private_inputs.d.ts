import { BufferReader } from '@aztec/foundation/serialize';
import { PublicCallData } from './public_call_data.js';
import { PublicKernelData } from './public_kernel_data.js';
/**
 * Inputs to the public kernel circuit.
 */
export declare class PublicKernelCircuitPrivateInputs {
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    readonly previousKernel: PublicKernelData;
    /**
     * Public calldata assembled from the execution result and proof.
     */
    readonly publicCall: PublicCallData;
    constructor(
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    previousKernel: PublicKernelData, 
    /**
     * Public calldata assembled from the execution result and proof.
     */
    publicCall: PublicCallData);
    /**
     * Serializes the object to a buffer.
     * @returns - Buffer representation of the object.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the object to a hex string.
     * @returns - Hex string representation of the object.
     */
    toString(): string;
    /**
     * Deserializes the object from a buffer.
     * @param buffer - Buffer to deserialize.
     * @returns - Deserialized object.
     */
    static fromBuffer(buffer: BufferReader | Buffer): PublicKernelCircuitPrivateInputs;
    /**
     * Deserializes the object from a hex string.
     * @param str - Hex string to deserialize.
     * @returns - Deserialized object.
     */
    static fromString(str: string): PublicKernelCircuitPrivateInputs;
    /**
     * Clones the object.
     * @returns - Cloned object.
     */
    clone(): PublicKernelCircuitPrivateInputs;
}
//# sourceMappingURL=public_kernel_circuit_private_inputs.d.ts.map