import { AztecAddress } from '@aztec/foundation/aztec-address';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { PartialStateReference } from '../partial_state_reference.js';
import { RevertCode } from '../revert_code.js';
import { RollupValidationRequests } from '../rollup_validation_requests.js';
import { CombinedAccumulatedData } from './combined_accumulated_data.js';
import { CombinedConstantData } from './combined_constant_data.js';
/**
 * Outputs from the public kernel circuits.
 * All Public kernels use this shape for outputs.
 */
export class KernelCircuitPublicInputs {
    constructor(
    /**
     * Validation requests accumulated from private and public execution to be completed by the rollup.
     */
    rollupValidationRequests, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end, 
    /**
     * Data which is not modified by the circuits.
     */
    constants, startState, 
    /**
     * Flag indicating whether the transaction reverted.
     */
    revertCode, 
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer) {
        this.rollupValidationRequests = rollupValidationRequests;
        this.end = end;
        this.constants = constants;
        this.startState = startState;
        this.revertCode = revertCode;
        this.feePayer = feePayer;
    }
    getNonEmptyNullifiers() {
        return this.end.nullifiers.filter(n => !n.isZero());
    }
    /**
     * Computes the transaction fee for the transaction.
     * @param gasFees - Gas fees for the block. We cannot source this from the constants
     * since they may be unset if this comes from a private kernel directly.
     * @returns The amount in gas tokens to pay for this tx.
     * @remarks It is safe to compute this method in typescript because we compute the
     * transaction_fee ourselves in the base rollup. This value must match the value
     * computed in the base rollup, otherwise the content commitment of the block will be invalid.
     */
    getTransactionFee(gasFees) {
        return this.end.gasUsed.computeFee(gasFees).add(this.constants.txContext.gasSettings.inclusionFee);
    }
    toBuffer() {
        return serializeToBuffer(this.rollupValidationRequests, this.end, this.constants, this.startState, this.revertCode, this.feePayer);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of KernelCircuitPublicInputs.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new KernelCircuitPublicInputs(reader.readObject(RollupValidationRequests), reader.readObject(CombinedAccumulatedData), reader.readObject(CombinedConstantData), reader.readObject(PartialStateReference), reader.readObject(RevertCode), reader.readObject(AztecAddress));
    }
    static empty() {
        return new KernelCircuitPublicInputs(RollupValidationRequests.empty(), CombinedAccumulatedData.empty(), CombinedConstantData.empty(), PartialStateReference.empty(), RevertCode.OK, AztecAddress.ZERO);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        return KernelCircuitPublicInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VybmVsX2NpcmN1aXRfcHVibGljX2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9rZXJuZWxfY2lyY3VpdF9wdWJsaWNfaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FOzs7R0FHRztBQUNILE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7SUFDRTs7T0FFRztJQUNJLHdCQUFrRDtJQUN6RDs7T0FFRztJQUNJLEdBQTRCO0lBQ25DOztPQUVHO0lBQ0ksU0FBK0IsRUFDL0IsVUFBaUM7SUFDeEM7O09BRUc7SUFDSSxVQUFzQjtJQUM3Qjs7T0FFRztJQUNJLFFBQXNCO1FBakJ0Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBSWxELFFBQUcsR0FBSCxHQUFHLENBQXlCO1FBSTVCLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBSWpDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFJdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztJQUM1QixDQUFDO0lBRUoscUJBQXFCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxpQkFBaUIsQ0FBQyxPQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FDdEIsSUFBSSxDQUFDLHdCQUF3QixFQUM3QixJQUFJLENBQUMsR0FBRyxFQUNSLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSx5QkFBeUIsQ0FDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFDdkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUN4QyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUNoQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLHlCQUF5QixDQUNsQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsRUFDaEMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLEVBQy9CLG9CQUFvQixDQUFDLEtBQUssRUFBRSxFQUM1QixxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsRUFDN0IsVUFBVSxDQUFDLEVBQUUsRUFDYixZQUFZLENBQUMsSUFBSSxDQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRiJ9