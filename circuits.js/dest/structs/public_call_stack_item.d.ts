import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { type CallContext } from './call_context.js';
import { CallRequest } from './call_request.js';
import { FunctionData } from './function_data.js';
import { PublicCallStackItemCompressed } from './public_call_stack_item_compressed.js';
import { PublicCircuitPublicInputs } from './public_circuit_public_inputs.js';
/**
 * Call stack item on a public call.
 */
export declare class PublicCallStackItem {
    /**
     * Address of the contract on which the function is invoked.
     */
    contractAddress: AztecAddress;
    /**
     * Data identifying the function being called.
     */
    functionData: FunctionData;
    /**
     * Public inputs to the public kernel circuit.
     */
    publicInputs: PublicCircuitPublicInputs;
    /**
     * Whether the current callstack item should be considered a public fn execution request.
     */
    isExecutionRequest: boolean;
    constructor(
    /**
     * Address of the contract on which the function is invoked.
     */
    contractAddress: AztecAddress, 
    /**
     * Data identifying the function being called.
     */
    functionData: FunctionData, 
    /**
     * Public inputs to the public kernel circuit.
     */
    publicInputs: PublicCircuitPublicInputs, 
    /**
     * Whether the current callstack item should be considered a public fn execution request.
     */
    isExecutionRequest: boolean);
    static getFields(fields: FieldsOf<PublicCallStackItem>): readonly [AztecAddress, FunctionData, PublicCircuitPublicInputs, boolean];
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicCallStackItem;
    static fromFields(fields: Fr[] | FieldReader): PublicCallStackItem;
    /**
     * Returns a new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     */
    static empty(): PublicCallStackItem;
    isEmpty(): boolean;
    getCompressed(): PublicCallStackItemCompressed;
    /**
     * Creates a new CallRequest with values of the calling contract.
     * @returns A CallRequest instance with the contract address, caller context, and the hash of the call stack item.
     */
    toCallRequest(parentCallContext: CallContext): Promise<CallRequest>;
}
//# sourceMappingURL=public_call_stack_item.d.ts.map