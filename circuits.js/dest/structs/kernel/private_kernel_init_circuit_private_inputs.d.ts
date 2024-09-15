import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { TxRequest } from '../tx_request.js';
import { PrivateCallData } from './private_call_data.js';
/**
 * Input to the private kernel circuit - initial call.
 */
export declare class PrivateKernelInitCircuitPrivateInputs {
    /**
     * The transaction request which led to the creation of these inputs.
     */
    txRequest: TxRequest;
    /**
     * The root of the vk tree.
     */
    vkTreeRoot: Fr;
    /**
     * Private calldata corresponding to this iteration of the kernel.
     */
    privateCall: PrivateCallData;
    constructor(
    /**
     * The transaction request which led to the creation of these inputs.
     */
    txRequest: TxRequest, 
    /**
     * The root of the vk tree.
     */
    vkTreeRoot: Fr, 
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
    static fromBuffer(buffer: Buffer | BufferReader): PrivateKernelInitCircuitPrivateInputs;
}
//# sourceMappingURL=private_kernel_init_circuit_private_inputs.d.ts.map