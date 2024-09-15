import { makeTuple } from '@aztec/foundation/array';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
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
export class PublicKernelCircuitPublicInputs {
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
     * Data which is not modified by the circuits.
     */
    constants, 
    /**
     * Indicates whether execution of the public circuit reverted.
     */
    revertCode, 
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallStack, 
    /**
     * The address of the fee payer for the transaction
     */
    feePayer) {
        this.validationRequests = validationRequests;
        this.endNonRevertibleData = endNonRevertibleData;
        this.end = end;
        this.constants = constants;
        this.revertCode = revertCode;
        this.publicTeardownCallStack = publicTeardownCallStack;
        this.feePayer = feePayer;
    }
    toBuffer() {
        return serializeToBuffer(this.validationRequests, this.endNonRevertibleData, this.end, this.constants, this.revertCode, this.publicTeardownCallStack, this.feePayer);
    }
    clone() {
        return PublicKernelCircuitPublicInputs.fromBuffer(this.toBuffer());
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        return PublicKernelCircuitPublicInputs.fromBuffer(Buffer.from(str, 'hex'));
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
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of PublicKernelCircuitPublicInputs.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicKernelCircuitPublicInputs(reader.readObject(ValidationRequests), reader.readObject(PublicAccumulatedData), reader.readObject(PublicAccumulatedData), reader.readObject(CombinedConstantData), reader.readObject(RevertCode), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest), reader.readObject(AztecAddress));
    }
    static empty() {
        return new PublicKernelCircuitPublicInputs(ValidationRequests.empty(), PublicAccumulatedData.empty(), PublicAccumulatedData.empty(), CombinedConstantData.empty(), RevertCode.OK, makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest.empty), AztecAddress.ZERO);
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicKernelCircuitPublicInputs(ValidationRequests.fromFields(reader), PublicAccumulatedData.fromFields(reader), PublicAccumulatedData.fromFields(reader), CombinedConstantData.fromFields(reader), RevertCode.fromField(reader.readField()), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, CallRequest), AztecAddress.fromFields(reader));
    }
    [inspect.custom]() {
        return `PublicKernelCircuitPublicInputs {
      validationRequests: ${inspect(this.validationRequests)},
      endNonRevertibleData: ${inspect(this.endNonRevertibleData)},
      end: ${inspect(this.end)},
      constants: ${inspect(this.constants)},
      revertCode: ${this.revertCode},
      publicTeardownCallStack: ${inspect(this.publicTeardownCallStack)}
      feePayer: ${this.feePayer}
      }`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tlcm5lbF9jaXJjdWl0X3B1YmxpY19pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwvcHVibGljX2tlcm5lbF9jaXJjdWl0X3B1YmxpY19pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sK0JBQStCO0lBQzFDO0lBQ0U7O09BRUc7SUFDSSxrQkFBc0M7SUFDN0M7O09BRUc7SUFDSSxvQkFBMkM7SUFDbEQ7O09BRUc7SUFDSSxHQUEwQjtJQUNqQzs7T0FFRztJQUNJLFNBQStCO0lBQ3RDOztPQUVHO0lBQ0ksVUFBc0I7SUFDN0I7O09BRUc7SUFDSSx1QkFBdUY7SUFDOUY7O09BRUc7SUFDSSxRQUFzQjtRQXhCdEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUl0Qyx5QkFBb0IsR0FBcEIsb0JBQW9C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