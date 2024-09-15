import { AztecAddress } from '@aztec/foundation/aztec-address';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { RevertCode } from '../revert_code.js';
import { RollupValidationRequests } from '../rollup_validation_requests.js';
import { ValidationRequests } from '../validation_requests.js';
import { CombinedAccumulatedData } from './combined_accumulated_data.js';
import { CombinedConstantData } from './combined_constant_data.js';
import { KernelCircuitPublicInputs } from './kernel_circuit_public_inputs.js';
import { PublicAccumulatedData } from './public_accumulated_data.js';
import { PublicKernelCircuitPublicInputs } from './public_kernel_circuit_public_inputs.js';
export declare class PartialPrivateTailPublicInputsForPublic {
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
     * Call request for the public teardown function.
     */
    publicTeardownCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>;
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
     * Call request for the public teardown function.
     */
    publicTeardownCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX>);
    getSize(): number;
    get needsSetup(): boolean;
    get needsAppLogic(): boolean;
    get needsTeardown(): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): PartialPrivateTailPublicInputsForPublic;
    toBuffer(): Buffer;
    static empty(): PartialPrivateTailPublicInputsForPublic;
}
export declare class PartialPrivateTailPublicInputsForRollup {
    rollupValidationRequests: RollupValidationRequests;
    end: CombinedAccumulatedData;
    constructor(rollupValidationRequests: RollupValidationRequests, end: CombinedAccumulatedData);
    static fromBuffer(buffer: Buffer | BufferReader): PartialPrivateTailPublicInputsForRollup;
    getSize(): number;
    toBuffer(): Buffer;
    static empty(): PartialPrivateTailPublicInputsForRollup;
}
export declare class PrivateKernelTailCircuitPublicInputs {
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData;
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode: RevertCode;
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer: AztecAddress;
    forPublic?: PartialPrivateTailPublicInputsForPublic | undefined;
    forRollup?: PartialPrivateTailPublicInputsForRollup | undefined;
    constructor(
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData, 
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode: RevertCode, 
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer: AztecAddress, forPublic?: PartialPrivateTailPublicInputsForPublic | undefined, forRollup?: PartialPrivateTailPublicInputsForRollup | undefined);
    get publicInputs(): PartialPrivateTailPublicInputsForPublic | PartialPrivateTailPublicInputsForRollup;
    getSize(): number;
    toPublicKernelCircuitPublicInputs(): PublicKernelCircuitPublicInputs;
    toKernelCircuitPublicInputs(): KernelCircuitPublicInputs;
    numberOfPublicCallRequests(): number;
    getNonEmptyNoteHashes(): import("@aztec/foundation/fields").Fr[];
    getNonEmptyNullifiers(): import("@aztec/foundation/fields").Fr[];
    static fromBuffer(buffer: Buffer | BufferReader): PrivateKernelTailCircuitPublicInputs;
    toBuffer(): Buffer;
    static empty(): PrivateKernelTailCircuitPublicInputs;
}
//# sourceMappingURL=private_kernel_tail_circuit_public_inputs.d.ts.map