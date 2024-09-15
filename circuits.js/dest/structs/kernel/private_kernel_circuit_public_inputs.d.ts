import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { CallRequest } from '../call_request.js';
import { ValidationRequests } from '../validation_requests.js';
import { CombinedConstantData } from './combined_constant_data.js';
import { PrivateAccumulatedData } from './private_accumulated_data.js';
/**
 * Public inputs to the inner private kernel circuit
 */
export declare class PrivateKernelCircuitPublicInputs {
    /**
     * The side effect counter that non-revertible side effects are all beneath.
     */
    minRevertibleSideEffectCounter: Fr;
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests: ValidationRequests;
    /**
     * Data accumulated from both public and private circuits.
     */
    end: PrivateAccumulatedData;
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData;
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallRequest: CallRequest;
    /**
     * The address of the fee payer for the transaction
     */
    feePayer: AztecAddress;
    constructor(
    /**
     * The side effect counter that non-revertible side effects are all beneath.
     */
    minRevertibleSideEffectCounter: Fr, 
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests: ValidationRequests, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end: PrivateAccumulatedData, 
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData, 
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallRequest: CallRequest, 
    /**
     * The address of the fee payer for the transaction
     */
    feePayer: AztecAddress);
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of PrivateKernelInnerCircuitPublicInputs.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateKernelCircuitPublicInputs;
    static empty(): PrivateKernelCircuitPublicInputs;
}
//# sourceMappingURL=private_kernel_circuit_public_inputs.d.ts.map