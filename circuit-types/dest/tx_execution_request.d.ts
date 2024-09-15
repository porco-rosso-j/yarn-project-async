import { AztecAddress, Fr, FunctionSelector, TxContext, TxRequest } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { AuthWitness } from './auth_witness.js';
import { PackedValues } from './packed_values.js';
/**
 * Request to execute a transaction. Similar to TxRequest, but has the full args.
 */
export declare class TxExecutionRequest {
    /**
     * Sender.
     */
    origin: AztecAddress;
    /**
     * Selector of the function to call.
     */
    functionSelector: FunctionSelector;
    /**
     * The hash of arguments of first call to be executed (usually account entrypoint).
     * @dev This hash is a pointer to `argsOfCalls` unordered array.
     */
    firstCallArgsHash: Fr;
    /**
     * Transaction context.
     */
    txContext: TxContext;
    /**
     * An unordered array of packed arguments for each call in the transaction.
     * @dev These arguments are accessed in Noir via oracle and constrained against the args hash. The length of
     * the array is equal to the number of function calls in the transaction (1 args per 1 call).
     */
    argsOfCalls: PackedValues[];
    /**
     * Transient authorization witnesses for authorizing the execution of one or more actions during this tx.
     * These witnesses are not expected to be stored in the local witnesses database of the PXE.
     */
    authWitnesses: AuthWitness[];
    constructor(
    /**
     * Sender.
     */
    origin: AztecAddress, 
    /**
     * Selector of the function to call.
     */
    functionSelector: FunctionSelector, 
    /**
     * The hash of arguments of first call to be executed (usually account entrypoint).
     * @dev This hash is a pointer to `argsOfCalls` unordered array.
     */
    firstCallArgsHash: Fr, 
    /**
     * Transaction context.
     */
    txContext: TxContext, 
    /**
     * An unordered array of packed arguments for each call in the transaction.
     * @dev These arguments are accessed in Noir via oracle and constrained against the args hash. The length of
     * the array is equal to the number of function calls in the transaction (1 args per 1 call).
     */
    argsOfCalls: PackedValues[], 
    /**
     * Transient authorization witnesses for authorizing the execution of one or more actions during this tx.
     * These witnesses are not expected to be stored in the local witnesses database of the PXE.
     */
    authWitnesses: AuthWitness[]);
    toTxRequest(): TxRequest;
    static getFields(fields: FieldsOf<TxExecutionRequest>): readonly [AztecAddress, FunctionSelector, Fr, TxContext, PackedValues[], AuthWitness[]];
    static from(fields: FieldsOf<TxExecutionRequest>): TxExecutionRequest;
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serialize as a string.
     * @returns The string.
     */
    toString(): string;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): TxExecutionRequest;
    /**
     * Deserializes from a string, corresponding to a write in cpp.
     * @param str - String to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromString(str: string): TxExecutionRequest;
}
//# sourceMappingURL=tx_execution_request.d.ts.map