import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { computeVarArgsHash } from '../hash/hash.js';
import { CallContext } from './call_context.js';
import { CallRequest } from './call_request.js';
import { CallerContext } from './caller_context.js';
import { FunctionData, FunctionSelector } from './index.js';
import { PublicCallStackItem } from './public_call_stack_item.js';
import { PublicCircuitPublicInputs } from './public_circuit_public_inputs.js';
import { Vector } from './shared.js';
/**
 * Represents a request to call a public function from a private function. Serialization is
 * equivalent to a public call stack item, but without the result fields.
 */
export class PublicCallRequest {
    constructor(
    /**
     *Address of the contract on which the function is invoked.
     */
    contractAddress, 
    /**
     * Data identifying the function being called.
     */
    functionSelector, 
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    callContext, 
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    parentCallContext, 
    /**
     * The start side effect counter for this call request.
     */
    sideEffectCounter, 
    /**
     * Function arguments.
     */
    args) {
        this.contractAddress = contractAddress;
        this.functionSelector = functionSelector;
        this.callContext = callContext;
        this.parentCallContext = parentCallContext;
        this.sideEffectCounter = sideEffectCounter;
        this.args = args;
    }
    getSize() {
        return this.isEmpty() ? 0 : this.toBuffer().length;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.contractAddress, this.functionSelector, this.callContext, this.parentCallContext, this.sideEffectCounter, new Vector(this.args));
    }
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicCallRequest(new AztecAddress(reader.readBytes(32)), FunctionSelector.fromBuffer(reader), CallContext.fromBuffer(reader), CallContext.fromBuffer(reader), reader.readNumber(), reader.readVector(Fr));
    }
    /**
     * Create PublicCallRequest from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCallRequest object.
     */
    static from(fields) {
        return new PublicCallRequest(...PublicCallRequest.getFields(fields));
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [
            fields.contractAddress,
            fields.functionSelector,
            fields.callContext,
            fields.parentCallContext,
            fields.sideEffectCounter,
            fields.args,
        ];
    }
    /**
     * Creates a new PublicCallStackItem by populating with zeroes all fields related to result in the public circuit output.
     * @returns A PublicCallStackItem instance with the same contract address, function data, call context, and args.
     */
    async toPublicCallStackItem() {
        const publicInputs = PublicCircuitPublicInputs.empty();
        publicInputs.callContext = this.callContext;
        publicInputs.argsHash = await this.getArgsHash();
        return new PublicCallStackItem(this.contractAddress, new FunctionData(this.functionSelector, false), publicInputs, true);
    }
    /**
     * Creates a new CallRequest with values of the calling contract.
     * @returns A CallRequest instance with the contract address, caller context, and the hash of the call stack item.
     */
    async toCallRequest() {
        const item = this.toPublicCallStackItem();
        const callerContext = this.callContext.isDelegateCall
            ? new CallerContext(this.parentCallContext.msgSender, this.parentCallContext.storageContractAddress, this.parentCallContext.isStaticCall)
            : CallerContext.empty();
        return new CallRequest(await (await item).getCompressed().hash(), this.parentCallContext.storageContractAddress, callerContext, new Fr(this.sideEffectCounter), Fr.ZERO);
    }
    /**
     * Returns the hash of the arguments for this request.
     * @returns Hash of the arguments for this request.
     */
    getArgsHash() {
        return computeVarArgsHash(this.args);
    }
    static empty() {
        return new PublicCallRequest(AztecAddress.ZERO, FunctionSelector.empty(), CallContext.empty(), CallContext.empty(), 0, []);
    }
    isEmpty() {
        return (this.contractAddress.isZero() &&
            this.functionSelector.isEmpty() &&
            this.callContext.isEmpty() &&
            this.parentCallContext.isEmpty() &&
            this.sideEffectCounter == 0 &&
            this.args.length === 0);
    }
    [inspect.custom]() {
        return `PublicCallRequest {
      contractAddress: ${this.contractAddress}
      functionSelector: ${this.functionSelector}
      callContext: ${this.callContext}
      parentCallContext: ${this.parentCallContext}
      sideEffectCounter: ${this.sideEffectCounter}
      args: ${this.args}
    }`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2NhbGxfcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3B1YmxpY19jYWxsX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHOUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QjtJQUNFOztPQUVHO0lBQ0ksZUFBNkI7SUFDcEM7O09BRUc7SUFDSSxnQkFBa0M7SUFDekM7OztPQUdHO0lBQ0ksV0FBd0I7SUFDL0I7OztPQUdHO0lBQ0ksaUJBQThCO0lBQ3JDOztPQUVHO0lBQ0ksaUJBQXlCO0lBQ2hDOztPQUVHO0lBQ0ksSUFBVTtRQXRCVixvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUk3QixxQkFBZ0Is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