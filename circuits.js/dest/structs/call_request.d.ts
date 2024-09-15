import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { CallerContext } from './caller_context.js';
/**
 * Call request.
 */
export declare class CallRequest {
    /**
     * The hash of the call stack item.
     */
    hash: Fr;
    /**
     * The address of the contract calling the function.
     */
    callerContractAddress: AztecAddress;
    /**
     * The call context of the contract calling the function.
     */
    callerContext: CallerContext;
    /**
     * The call context of the contract calling the function.
     */
    startSideEffectCounter: Fr;
    /**
     * The call context of the contract calling the function.
     */
    endSideEffectCounter: Fr;
    constructor(
    /**
     * The hash of the call stack item.
     */
    hash: Fr, 
    /**
     * The address of the contract calling the function.
     */
    callerContractAddress: AztecAddress, 
    /**
     * The call context of the contract calling the function.
     */
    callerContext: CallerContext, 
    /**
     * The call context of the contract calling the function.
     */
    startSideEffectCounter: Fr, 
    /**
     * The call context of the contract calling the function.
     */
    endSideEffectCounter: Fr);
    toBuffer(): Buffer;
    get counter(): number;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance of CallRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CallRequest;
    static fromFields(fields: Fr[] | FieldReader): CallRequest;
    isEmpty(): boolean;
    /**
     * Returns a new instance of CallRequest with zero hash, caller contract address and caller context.
     * @returns A new instance of CallRequest with zero hash, caller contract address and caller context.
     */
    static empty(): CallRequest;
    equals(callRequest: CallRequest): boolean;
    toString(): string;
}
//# sourceMappingURL=call_request.d.ts.map