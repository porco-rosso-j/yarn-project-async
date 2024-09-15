import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { inspect } from 'util';
import { CallContext } from './call_context.js';
import { CallRequest } from './call_request.js';
import { FunctionSelector } from './index.js';
import { PublicCallStackItem } from './public_call_stack_item.js';
/**
 * Represents a request to call a public function from a private function. Serialization is
 * equivalent to a public call stack item, but without the result fields.
 */
export declare class PublicCallRequest {
    /**
     *Address of the contract on which the function is invoked.
     */
    contractAddress: AztecAddress;
    /**
     * Data identifying the function being called.
     */
    functionSelector: FunctionSelector;
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    callContext: CallContext;
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    parentCallContext: CallContext;
    /**
     * The start side effect counter for this call request.
     */
    sideEffectCounter: number;
    /**
     * Function arguments.
     */
    args: Fr[];
    constructor(
    /**
     *Address of the contract on which the function is invoked.
     */
    contractAddress: AztecAddress, 
    /**
     * Data identifying the function being called.
     */
    functionSelector: FunctionSelector, 
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    callContext: CallContext, 
    /**
     * Context of the public call.
     * TODO(#3417): Check if all fields of CallContext are actually needed.
     */
    parentCallContext: CallContext, 
    /**
     * The start side effect counter for this call request.
     */
    sideEffectCounter: number, 
    /**
     * Function arguments.
     */
    args: Fr[]);
    getSize(): number;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicCallRequest;
    /**
     * Create PublicCallRequest from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCallRequest object.
     */
    static from(fields: FieldsOf<PublicCallRequest>): PublicCallRequest;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<PublicCallRequest>): readonly [AztecAddress, FunctionSelector, CallContext, CallContext, number, Fr[]];
    /**
     * Creates a new PublicCallStackItem by populating with zeroes all fields related to result in the public circuit output.
     * @returns A PublicCallStackItem instance with the same contract address, function data, call context, and args.
     */
    toPublicCallStackItem(): Promise<PublicCallStackItem>;
    /**
     * Creates a new CallRequest with values of the calling contract.
     * @returns A CallRequest instance with the contract address, caller context, and the hash of the call stack item.
     */
    toCallRequest(): Promise<CallRequest>;
    /**
     * Returns the hash of the arguments for this request.
     * @returns Hash of the arguments for this request.
     */
    getArgsHash(): Promise<Fr>;
    static empty(): PublicCallRequest;
    isEmpty(): boolean;
    [inspect.custom](): string;
}
//# sourceMappingURL=public_call_request.d.ts.map