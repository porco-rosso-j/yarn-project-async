import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CallRequest } from './call_request.js';
import { CallerContext } from './caller_context.js';
import { FunctionData } from './function_data.js';
import { PublicCallStackItemCompressed } from './public_call_stack_item_compressed.js';
import { PublicCircuitPublicInputs } from './public_circuit_public_inputs.js';
/**
 * Call stack item on a public call.
 */
export class PublicCallStackItem {
    constructor(
    /**
     * Address of the contract on which the function is invoked.
     */
    contractAddress, 
    /**
     * Data identifying the function being called.
     */
    functionData, 
    /**
     * Public inputs to the public kernel circuit.
     */
    publicInputs, 
    /**
     * Whether the current callstack item should be considered a public fn execution request.
     */
    isExecutionRequest) {
        this.contractAddress = contractAddress;
        this.functionData = functionData;
        this.publicInputs = publicInputs;
        this.isExecutionRequest = isExecutionRequest;
    }
    static getFields(fields) {
        return [fields.contractAddress, fields.functionData, fields.publicInputs, fields.isExecutionRequest];
    }
    toBuffer() {
        return serializeToBuffer(...PublicCallStackItem.getFields(this));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicCallStackItem(reader.readObject(AztecAddress), reader.readObject(FunctionData), reader.readObject(PublicCircuitPublicInputs), reader.readBoolean());
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const contractAddress = AztecAddress.fromFields(reader);
        const functionData = FunctionData.fromFields(reader);
        const publicInputs = PublicCircuitPublicInputs.fromFields(reader);
        const isExecutionRequest = reader.readBoolean();
        return new PublicCallStackItem(contractAddress, functionData, publicInputs, isExecutionRequest);
    }
    /**
     * Returns a new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     */
    static empty() {
        return new PublicCallStackItem(AztecAddress.ZERO, FunctionData.empty({ isPrivate: false }), PublicCircuitPublicInputs.empty(), false);
    }
    isEmpty() {
        return this.contractAddress.isZero() && this.functionData.isEmpty() && this.publicInputs.isEmpty();
    }
    getCompressed() {
        let publicInputsToHash = this.publicInputs;
        if (this.isExecutionRequest) {
            // An execution request (such as an enqueued call from private) is hashed with
            // only the publicInput members present in a PublicCallRequest.
            // This allows us to check that the request (which is created/hashed before
            // side-effects and output info are unknown for public calls) matches the call
            // being processed by a kernel iteration.
            // WARNING: This subset of publicInputs that is set here must align with
            // `parse_public_call_stack_item_from_oracle` in enqueue_public_function_call.nr
            // and `PublicCallStackItem::as_execution_request()` in public_call_stack_item.ts
            const { callContext, argsHash } = this.publicInputs;
            publicInputsToHash = PublicCircuitPublicInputs.empty();
            publicInputsToHash.callContext = callContext;
            publicInputsToHash.argsHash = argsHash;
        }
        return new PublicCallStackItemCompressed(this.contractAddress, publicInputsToHash.callContext, this.functionData, publicInputsToHash.argsHash, publicInputsToHash.returnsHash, publicInputsToHash.revertCode, publicInputsToHash.startGasLeft, publicInputsToHash.endGasLeft);
    }
    /**
     * Creates a new CallRequest with values of the calling contract.
     * @returns A CallRequest instance with the contract address, caller context, and the hash of the call stack item.
     */
    async toCallRequest(parentCallContext) {
        if (this.isEmpty()) {
            return CallRequest.empty();
        }
        const currentCallContext = this.publicInputs.callContext;
        const callerContext = currentCallContext.isDelegateCall
            ? new CallerContext(parentCallContext.msgSender, parentCallContext.storageContractAddress, parentCallContext.isStaticCall)
            : CallerContext.empty();
        // todo: populate side effect counters correctly
        const hash = await this.getCompressed().hash();
        return new CallRequest(hash, parentCallContext.storageContractAddress, callerContext, Fr.ZERO, Fr.ZERO);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2NhbGxfc3RhY2tfaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3B1YmxpY19jYWxsX3N0YWNrX2l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSTNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTlFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QjtJQUNFOztPQUVHO0lBQ0ksZUFBNkI7SUFDcEM7O09BRUc7SUFDSSxZQUEwQjtJQUNqQzs7T0FFRztJQUNJLFlBQXVDO0lBQzlDOztPQUVHO0lBQ0ksa0JBQTJCO1FBWjNCLG9CQUFlLEdBQWYsZUFBZSxDQUFjO1FBSTdCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSTFCLGlCQUFZLEdBQVosWUFBWSxDQUEyQjtRQUl2Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVM7SUFDakMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBcUM7UUFDcEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBVSxD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