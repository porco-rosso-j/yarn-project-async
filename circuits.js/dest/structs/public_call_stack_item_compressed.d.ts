import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { CallContext } from './call_context.js';
import { FunctionData } from './function_data.js';
import { Gas } from './gas.js';
import { RevertCode } from './revert_code.js';
/**
 * Compressed call stack item on a public call.
 */
export declare class PublicCallStackItemCompressed {
    contractAddress: AztecAddress;
    callContext: CallContext;
    functionData: FunctionData;
    argsHash: Fr;
    returnsHash: Fr;
    revertCode: RevertCode;
    /** How much gas was available for execution. */
    startGasLeft: Gas;
    /** How much gas was left after execution. */
    endGasLeft: Gas;
    constructor(contractAddress: AztecAddress, callContext: CallContext, functionData: FunctionData, argsHash: Fr, returnsHash: Fr, revertCode: RevertCode, 
    /** How much gas was available for execution. */
    startGasLeft: Gas, 
    /** How much gas was left after execution. */
    endGasLeft: Gas);
    static getFields(fields: FieldsOf<PublicCallStackItemCompressed>): readonly [AztecAddress, CallContext, FunctionData, Fr, Fr, RevertCode, Gas, Gas];
    toFields(): Fr[];
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicCallStackItemCompressed;
    static fromFields(fields: Fr[] | FieldReader): PublicCallStackItemCompressed;
    /**
     * Returns a new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     * @returns A new instance of PublicCallStackItem with zero contract address, function data and public inputs.
     */
    static empty(): PublicCallStackItemCompressed;
    isEmpty(): boolean;
    /**
     * Computes this call stack item hash.
     * @returns Hash.
     */
    hash(): Promise<Fr>;
}
//# sourceMappingURL=public_call_stack_item_compressed.d.ts.map