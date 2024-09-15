import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { FunctionData } from './function_data.js';
import { TxContext } from './tx_context.js';
/**
 * Transaction request.
 */
export declare class TxRequest {
    /** Sender. */
    origin: AztecAddress;
    /** Function data representing the function to call. */
    functionData: FunctionData;
    /** Pedersen hash of function arguments. */
    argsHash: Fr;
    /** Transaction context. */
    txContext: TxContext;
    constructor(
    /** Sender. */
    origin: AztecAddress, 
    /** Function data representing the function to call. */
    functionData: FunctionData, 
    /** Pedersen hash of function arguments. */
    argsHash: Fr, 
    /** Transaction context. */
    txContext: TxContext);
    static getFields(fields: FieldsOf<TxRequest>): readonly [AztecAddress, FunctionData, Fr, TxContext];
    static from(fields: FieldsOf<TxRequest>): TxRequest;
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): TxRequest;
    hash(): Promise<Fr>;
    static empty(): TxRequest;
    isEmpty(): boolean;
}
//# sourceMappingURL=tx_request.d.ts.map