import { AztecAddress } from '@aztec/foundation/aztec-address';
import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, type Tuple } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { RevertCode } from '../revert_code.js';
import { ValidationRequests } from '../validation_requests.js';
import { CombinedConstantData } from './combined_constant_data.js';
import { PublicAccumulatedData } from './public_accumulated_data.js';
/**
 * Outputs from the public kernel circuits.
 * All Public kernels use this shape for outputs.
 */
export declare class PublicKernelCircuitPublicInputs {
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests: ValidationRequests;
    /**
     * Accumulated side effects and enqueued calls that are not revertible.
     */
    endNonRevertibleData: PublicAccumulatedData;
    /**
     * Data accumulated from both public and private circuits.
     */
    end: PublicAccumulatedData;
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData;
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode: RevertCode;
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>;
    /**
     * The address of the fee payer for the transaction
     */
    feePayer: AztecAddress;
    constructor(
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests: ValidationRequests, 
    /**
     * Accumulated side effects and enqueued calls that are not revertible.
     */
    endNonRevertibleData: PublicAccumulatedData, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end: PublicAccumulatedData, 
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData, 
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode: RevertCode, 
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>, 
    /**
     * The address of the fee payer for the transaction
     */
    feePayer: AztecAddress);
    toBuffer(): Buffer;
    clone(): PublicKernelCircuitPublicInputs;
    toString(): string;
    static fromString(str: string): PublicKernelCircuitPublicInputs;
    get needsSetup(): boolean;
    get needsAppLogic(): boolean;
    get needsTeardown(): boolean;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of PublicKernelCircuitPublicInputs.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicKernelCircuitPublicInputs;
    static empty(): PublicKernelCircuitPublicInputs;
    static fromFields(fields: Fr[] | FieldReader): PublicKernelCircuitPublicInputs;
    [inspect.custom](): string;
}
//# sourceMappingURL=public_kernel_circuit_public_inputs.d.ts.map