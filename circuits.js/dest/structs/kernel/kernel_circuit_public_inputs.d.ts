import { AztecAddress } from '@aztec/foundation/aztec-address';
import type { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type GasFees } from '../gas_fees.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { RevertCode } from '../revert_code.js';
import { RollupValidationRequests } from '../rollup_validation_requests.js';
import { CombinedAccumulatedData } from './combined_accumulated_data.js';
import { CombinedConstantData } from './combined_constant_data.js';
/**
 * Outputs from the public kernel circuits.
 * All Public kernels use this shape for outputs.
 */
export declare class KernelCircuitPublicInputs {
    /**
     * Validation requests accumulated from private and public execution to be completed by the rollup.
     */
    rollupValidationRequests: RollupValidationRequests;
    /**
     * Data accumulated from both public and private circuits.
     */
    end: CombinedAccumulatedData;
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData;
    startState: PartialStateReference;
    /**
     * Flag indicating whether the transaction reverted.
     */
    revertCode: RevertCode;
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer: AztecAddress;
    constructor(
    /**
     * Validation requests accumulated from private and public execution to be completed by the rollup.
     */
    rollupValidationRequests: RollupValidationRequests, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end: CombinedAccumulatedData, 
    /**
     * Data which is not modified by the circuits.
     */
    constants: CombinedConstantData, startState: PartialStateReference, 
    /**
     * Flag indicating whether the transaction reverted.
     */
    revertCode: RevertCode, 
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer: AztecAddress);
    getNonEmptyNullifiers(): Fr[];
    /**
     * Computes the transaction fee for the transaction.
     * @param gasFees - Gas fees for the block. We cannot source this from the constants
     * since they may be unset if this comes from a private kernel directly.
     * @returns The amount in gas tokens to pay for this tx.
     * @remarks It is safe to compute this method in typescript because we compute the
     * transaction_fee ourselves in the base rollup. This value must match the value
     * computed in the base rollup, otherwise the content commitment of the block will be invalid.
     */
    getTransactionFee(gasFees: GasFees): Fr;
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of KernelCircuitPublicInputs.
     */
    static fromBuffer(buffer: Buffer | BufferReader): KernelCircuitPublicInputs;
    static empty(): KernelCircuitPublicInputs;
    toString(): string;
    static fromString(str: string): KernelCircuitPublicInputs;
}
//# sourceMappingURL=kernel_circuit_public_inputs.d.ts.map