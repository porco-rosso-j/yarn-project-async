import { AztecAddress } from '@aztec/foundation/aztec-address';
import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { FunctionData } from './function_data.js';
import { PrivateCircuitPublicInputs } from './private_circuit_public_inputs.js';
/**
 * Call stack item on a private call.
 */
export declare class PrivateCallStackItem {
    /**
     * Address of the contract on which the function is invoked.
     */
    contractAddress: AztecAddress;
    /**
     * Data identifying the function being called.
     */
    functionData: FunctionData;
    /**
     * Public inputs to the private kernel circuit.
     */
    publicInputs: PrivateCircuitPublicInputs;
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
     * Public inputs to the private kernel circuit.
     */
    publicInputs: PrivateCircuitPublicInputs);
    static getFields(fields: FieldsOf<PrivateCallStackItem>): readonly [AztecAddress, FunctionData, PrivateCircuitPublicInputs];
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateCallStackItem;
    static fromFields(fields: Fr[] | FieldReader): PrivateCallStackItem;
    /**
     * Returns a new instance of PrivateCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PrivateCallStackItem with zero contract address, function data and public inputs.
     */
    static empty(): PrivateCallStackItem;
    isEmpty(): boolean;
    /**
     * Computes this call stack item hash.
     * @returns Hash.
     */
    hash(): Promise<Fr>;
}
//# sourceMappingURL=private_call_stack_item.d.ts.map