import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { CallContext } from './call_context.js';
import { CallerContext } from './caller_context.js';
import { FunctionData } from './function_data.js';
import { type PrivateCallStackItem } from './index.js';
export declare class PrivateCallRequest {
    /**
     * The address of the contract being called.
     */
    target: AztecAddress;
    /**
     * The call context of the call.
     */
    callContext: CallContext;
    /**
     * The function data of the call.
     */
    functionData: FunctionData;
    /**
     * The hash of the arguments of the call.
     */
    argsHash: Fr;
    /**
     * The hash of the return values of the call.
     */
    returnsHash: Fr;
    /**
     * The call context of the contract making the call.
     */
    callerContext: CallerContext;
    /**
     * The start counter of the call.
     */
    startSideEffectCounter: number;
    /**
     * The end counter of the call.
     */
    endSideEffectCounter: number;
    constructor(
    /**
     * The address of the contract being called.
     */
    target: AztecAddress, 
    /**
     * The call context of the call.
     */
    callContext: CallContext, 
    /**
     * The function data of the call.
     */
    functionData: FunctionData, 
    /**
     * The hash of the arguments of the call.
     */
    argsHash: Fr, 
    /**
     * The hash of the return values of the call.
     */
    returnsHash: Fr, 
    /**
     * The call context of the contract making the call.
     */
    callerContext: CallerContext, 
    /**
     * The start counter of the call.
     */
    startSideEffectCounter: number, 
    /**
     * The end counter of the call.
     */
    endSideEffectCounter: number);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): PrivateCallRequest;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): PrivateCallRequest;
    isEmpty(): boolean;
    static empty(): PrivateCallRequest;
    equals(callRequest: PrivateCallRequest): boolean;
    toString(): string;
    matchesStackItem(stackItem: PrivateCallStackItem): boolean;
}
export declare class ScopedPrivateCallRequest {
    callRequest: PrivateCallRequest;
    contractAddress: AztecAddress;
    constructor(callRequest: PrivateCallRequest, contractAddress: AztecAddress);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedPrivateCallRequest;
    isEmpty(): boolean;
    static empty(): ScopedPrivateCallRequest;
    equals(callRequest: ScopedPrivateCallRequest): boolean;
    toString(): string;
}
//# sourceMappingURL=private_call_request.d.ts.map