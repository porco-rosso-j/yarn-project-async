import { makeTuple } from '@aztec/foundation/array';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { arraySerializedSizeOfNonEmpty } from '@aztec/foundation/collection';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX } from '../../constants.gen.js';
import { countAccumulatedItems, mergeAccumulatedData } from '../../utils/index.js';
import { CallRequest } from '../call_request.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { RevertCode } from '../revert_code.js';
import { RollupValidationRequests } from '../rollup_validation_requests.js';
import { ValidationRequests } from '../validation_requests.js';
import { CombinedAccumulatedData } from './combined_accumulated_data.js';
import { CombinedConstantData } from './combined_constant_data.js';
import { KernelCircuitPublicInputs } from './kernel_circuit_public_inputs.js';
import { PublicAccumulatedData } from './public_accumulated_data.js';
import { PublicKernelCircuitPublicInputs } from './public_kernel_circuit_public_inputs.js';
export class PartialPrivateTailPublicInputsForPublic {
    constructor(
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests, 
    /**
     * Accumulated side effects and enqueued calls that are not revertible.
     */
    endNonRevertibleData, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end, 
    /**
     * Call request for the public teardown function.
     */
    publicTeardownCallStack) {
        this.validationRequests = validationRequests;
        this.endNonRevertibleData = endNonRevertibleData;
        this.end = end;
        this.publicTeardownCallStack = publicTeardownCallStack;
    }
    getSize() {
        return (this.validationRequests.getSize() +
            this.endNonRevertibleData.getSize() +
            this.end.getSize() +
            arraySerializedSizeOfNonEmpty(this.publicTeardownCallStack));
    }
    get needsSetup() {
        return !this.endNonRevertibleData.publicCallStack[0].isEmpty();
    }
    get needsAppLogic() {
        return !this.end.publicCallStack[0].isEmpty();
    }
    get needsTeardown() {
        return !this.publicTeardownCallStack[0].isEmpty();
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PartialPrivateTailPublicInputsForPublic(reader.readObject(ValidationRequests), reader.readObject(PublicAccumulatedData), reader.readObject(PublicAccumulatedData), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest));
    }
    toBuffer() {
        return serializeToBuffer(this.validationRequests, this.endNonRevertibleData, this.end, this.publicTeardownCallStack);
    }
    static empty() {
        return new PartialPrivateTailPublicInputsForPublic(ValidationRequests.empty(), PublicAccumulatedData.empty(), PublicAccumulatedData.empty(), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest.empty));
    }
}
export class PartialPrivateTailPublicInputsForRollup {
    constructor(rollupValidationRequests, end) {
        this.rollupValidationRequests = rollupValidationRequests;
        this.end = end;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PartialPrivateTailPublicInputsForRollup(reader.readObject(RollupValidationRequests), reader.readObject(CombinedAccumulatedData));
    }
    getSize() {
        return this.rollupValidationRequests.getSize() + this.end.getSize();
    }
    toBuffer() {
        return serializeToBuffer(this.rollupValidationRequests, this.end);
    }
    static empty() {
        return new PartialPrivateTailPublicInputsForRollup(RollupValidationRequests.empty(), CombinedAccumulatedData.empty());
    }
}
export class PrivateKernelTailCircuitPublicInputs {
    constructor(
    /**
     * Data which is not modified by the circuits.
     */
    constants, 
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode, 
    /**
     * The address of the fee payer for the transaction.
     */
    feePayer, forPublic, forRollup) {
        this.constants = constants;
        this.revertCode = revertCode;
        this.feePayer = feePayer;
        this.forPublic = forPublic;
        this.forRollup = forRollup;
        if (!forPublic && !forRollup) {
            throw new Error('Missing partial public inputs for private tail circuit.');
        }
        if (forPublic && forRollup) {
            throw new Error('Cannot create PrivateKernelTailCircuitPublicInputs that is for both public kernel circuit and rollup circuit.');
        }
    }
    get publicInputs() {
        return (this.forPublic ?? this.forRollup);
    }
    getSize() {
        return ((this.forPublic?.getSize() ?? 0) +
            (this.forRollup?.getSize() ?? 0) +
            this.constants.getSize() +
            this.revertCode.getSerializedLength() +
            this.feePayer.size);
    }
    toPublicKernelCircuitPublicInputs() {
        if (!this.forPublic) {
            throw new Error('Private tail public inputs is not for public circuit.');
        }
        return new PublicKernelCircuitPublicInputs(this.forPublic.validationRequests, this.forPublic.endNonRevertibleData, this.forPublic.end, this.constants, this.revertCode, this.forPublic.publicTeardownCallStack, this.feePayer);
    }
    toKernelCircuitPublicInputs() {
        if (!this.forRollup) {
            throw new Error('Private tail public inputs is not for rollup circuit.');
        }
        return new KernelCircuitPublicInputs(this.forRollup.rollupValidationRequests, this.forRollup.end, this.constants, PartialStateReference.empty(), this.revertCode, this.feePayer);
    }
    numberOfPublicCallRequests() {
        return this.forPublic
            ? countAccumulatedItems(this.forPublic.endNonRevertibleData.publicCallStack) +
                countAccumulatedItems(this.forPublic.end.publicCallStack) +
                countAccumulatedItems(this.forPublic.publicTeardownCallStack)
            : 0;
    }
    getNonEmptyNoteHashes() {
        const noteHashes = this.forPublic
            ? mergeAccumulatedData(this.forPublic.endNonRevertibleData.noteHashes, this.forPublic.end.noteHashes).map(n => n.value)
            : this.forRollup.end.noteHashes;
        return noteHashes.filter(n => !n.isZero());
    }
    getNonEmptyNullifiers() {
        const nullifiers = this.forPublic
            ? mergeAccumulatedData(this.forPublic.endNonRevertibleData.nullifiers, this.forPublic.end.nullifiers).map(n => n.value)
            : this.forRollup.end.nullifiers;
        return nullifiers.filter(n => !n.isZero());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const isForPublic = reader.readBoolean();
        return new PrivateKernelTailCircuitPublicInputs(reader.readObject(CombinedConstantData), reader.readObject(RevertCode), reader.readObject(AztecAddress), isForPublic ? reader.readObject(PartialPrivateTailPublicInputsForPublic) : undefined, !isForPublic ? reader.readObject(PartialPrivateTailPublicInputsForRollup) : undefined);
    }
    toBuffer() {
        const isForPublic = !!this.forPublic;
        return serializeToBuffer(isForPublic, this.constants, this.revertCode, this.feePayer, isForPublic ? this.forPublic.toBuffer() : this.forRollup.toBuffer());
    }
    static empty() {
        return new PrivateKernelTailCircuitPublicInputs(CombinedConstantData.empty(), RevertCode.OK, AztecAddress.ZERO, undefined, PartialPrivateTailPublicInputsForRollup.empty());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfdGFpbF9jaXJjdWl0X3B1YmxpY19pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwvcHJpdmF0ZV9rZXJuZWxfdGFpbF9jaXJjdWl0X3B1YmxpY19pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUYsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUzRixNQUFNLE9BQU8sdUNBQXVDO0lBQ2xEO0lBQ0U7O09BRUc7SUFDSSxrQkFBc0M7SUFDN0M7O09BRUc7SUFDSSxvQkFBMkM7SUFDbEQ7O09BRUc7SUFDSSxHQUEwQjtJQUNqQzs7T0FFRztJQUNJLHVCQUF1RjtRQVp2Rix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSXRDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7UUFJM0MsUUFBRyxHQUFILEdBQUcsQ0FBdUI7UUFJMUIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFnRTtJQUM3RixDQUFDO0lBRUosT0FBTztRQUNMLE9BQU8sQ0FDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbEIsNkJBQTZCLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSx1Q0FBdUMsQ0FDaEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQ3hDLE1BQU0sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFDeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLENBQUMsQ0FDbkUsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUN2QixJQUFJLENBQUMsb0JBQW9CLEVBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUM3QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLHVDQUF1QyxDQUNoRCxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsRUFDMUIscUJBQXFCLENBQUMsS0FBSyxFQUFFLEVBQzdCLHFCQUFxQixDQUFDLEtBQUssRUFBRSxFQUM3QixTQUFTLENBQUMsbUNBQW1DLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUNsRSxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHVDQUF1QztJQUNsRCxZQUFtQix3QkFBa0QsRUFBUyxHQUE0QjtRQUF2Riw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBeUI7SUFBRyxDQUFDO0lBRTlHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksdUNBQXVDLENBQ2hELE1BQU0sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFDM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUMzQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSx1Q0FBdUMsQ0FDaEQsd0JBQXdCLENBQUMsS0FBSyxFQUFFLEVBQ2hDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUNoQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLG9DQUFvQztJQUMvQztJQUNFOztPQUVHO0lBQ0ksU0FBK0I7SUFDdEM7O09BRUc7SUFDSSxVQUFzQjtJQUM3Qjs7T0FFRztJQUNJLFFBQXNCLEVBRXRCLFNBQW1ELEVBQ25ELFNBQW1EO1FBWG5ELGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBSS9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFJdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUV0QixjQUFTLEdBQVQsU0FBUyxDQUEwQztRQUNuRCxjQUFTLEdBQVQsU0FBUyxDQUEwQztRQUUxRCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxJQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUNiLCtHQUErRyxDQUNoSCxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQWlDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxPQUFPLElBQUksK0JBQStCLENBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUNsQixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELDJCQUEyQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsT0FBTyxJQUFJLHlCQUF5QixDQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsRUFDN0IsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsMEJBQTBCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVM7WUFDbkIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDO2dCQUN4RSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7Z0JBQ3pELHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUM7WUFDakUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDL0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FDckcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUNiO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNuQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDL0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FDckcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUNiO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNuQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxvQ0FBb0MsQ0FDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN2QyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUNwRixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3RGLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3JDLE9BQU8saUJBQWlCLENBQ3RCLFdBQVcsRUFDWCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFFBQVEsRUFDYixXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFVLENBQUMsUUFBUSxFQUFFLENBQ3RFLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksb0NBQW9DLENBQzdDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxFQUM1QixVQUFVLENBQUMsRUFBRSxFQUNiLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLFNBQVMsRUFDVCx1Q0FBdUMsQ0FBQyxLQUFLLEVBQUUsQ0FDaEQsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9