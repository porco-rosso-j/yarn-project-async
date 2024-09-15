import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CallRequest } from '../call_request.js';
import { ValidationRequests } from '../validation_requests.js';
import { CombinedConstantData } from './combined_constant_data.js';
import { PrivateAccumulatedData } from './private_accumulated_data.js';
/**
 * Public inputs to the inner private kernel circuit
 */
export class PrivateKernelCircuitPublicInputs {
    constructor(
    /**
     * The side effect counter that non-revertible side effects are all beneath.
     */
    minRevertibleSideEffectCounter, 
    /**
     * Validation requests accumulated from public functions.
     */
    validationRequests, 
    /**
     * Data accumulated from both public and private circuits.
     */
    end, 
    /**
     * Data which is not modified by the circuits.
     */
    constants, 
    /**
     * The call request for the public teardown function
     */
    publicTeardownCallRequest, 
    /**
     * The address of the fee payer for the transaction
     */
    feePayer) {
        this.minRevertibleSideEffectCounter = minRevertibleSideEffectCounter;
        this.validationRequests = validationRequests;
        this.end = end;
        this.constants = constants;
        this.publicTeardownCallRequest = publicTeardownCallRequest;
        this.feePayer = feePayer;
    }
    toBuffer() {
        return serializeToBuffer(this.minRevertibleSideEffectCounter, this.validationRequests, this.end, this.constants, this.publicTeardownCallRequest, this.feePayer);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of PrivateKernelInnerCircuitPublicInputs.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateKernelCircuitPublicInputs(reader.readObject(Fr), reader.readObject(ValidationRequests), reader.readObject(PrivateAccumulatedData), reader.readObject(CombinedConstantData), reader.readObject(CallRequest), reader.readObject(AztecAddress));
    }
    static empty() {
        return new PrivateKernelCircuitPublicInputs(Fr.zero(), ValidationRequests.empty(), PrivateAccumulatedData.empty(), CombinedConstantData.empty(), CallRequest.empty(), AztecAddress.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfY2lyY3VpdF9wdWJsaWNfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3ByaXZhdGVfa2VybmVsX2NpcmN1aXRfcHVibGljX2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdkU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0NBQWdDO0lBQzNDO0lBQ0U7O09BRUc7SUFDSSw4QkFBa0M7SUFDekM7O09BRUc7SUFDSSxrQkFBc0M7SUFDN0M7O09BRUc7SUFDSSxHQUEyQjtJQUNsQzs7T0FFRztJQUNJLFNBQStCO0lBQ3RDOztPQUVHO0lBQ0kseUJBQXNDO0lBQzdDOztPQUVHO0lBQ0ksUUFBc0I7UUFwQnRCLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBSTtRQUlsQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBSXRDLFFBQUcsR0FBSCxHQUFHLENBQXdCO1FBSTNCLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBSS9CLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBYTtRQUl0QyxhQUFRLEdBQVIsUUFBUSxDQUFjO0lBQzVCLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FDdEIsSUFBSSxDQUFDLDhCQUE4QixFQUNuQyxJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMseUJBQXlCLEVBQzlCLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FDekMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFDdkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FDekMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUNULGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUMxQixzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsRUFDOUIsb0JBQW9CLENBQUMsS0FBSyxFQUFFLEVBQzVCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFDbkIsWUFBWSxDQUFDLElBQUksQ0FDbEIsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9