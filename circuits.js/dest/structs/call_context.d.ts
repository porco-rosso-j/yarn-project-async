import { FunctionSelector } from '@aztec/foundation/abi';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
/**
 * Call context.
 */
export declare class CallContext {
    /**
     * Address of the account which represents the entity who invoked the call.
     */
    msgSender: AztecAddress;
    /**
     * The contract address against which all state changes will be stored. Not called `contractAddress` because during
     * delegate call the contract whose code is being executed may be different from the contract whose state is being
     * modified.
     */
    storageContractAddress: AztecAddress;
    /**
     * Function selector of the function being called.
     */
    functionSelector: FunctionSelector;
    /**
     * Determines whether the call is a delegate call (see Ethereum's delegate call opcode for more information).
     */
    isDelegateCall: boolean;
    /**
     * Determines whether the call is modifying state.
     */
    isStaticCall: boolean;
    constructor(
    /**
     * Address of the account which represents the entity who invoked the call.
     */
    msgSender: AztecAddress, 
    /**
     * The contract address against which all state changes will be stored. Not called `contractAddress` because during
     * delegate call the contract whose code is being executed may be different from the contract whose state is being
     * modified.
     */
    storageContractAddress: AztecAddress, 
    /**
     * Function selector of the function being called.
     */
    functionSelector: FunctionSelector, 
    /**
     * Determines whether the call is a delegate call (see Ethereum's delegate call opcode for more information).
     */
    isDelegateCall: boolean, 
    /**
     * Determines whether the call is modifying state.
     */
    isStaticCall: boolean);
    /**
     * Returns a new instance of CallContext with zero msg sender, storage contract address.
     * @returns A new instance of CallContext with zero msg sender, storage contract address.
     */
    static empty(): CallContext;
    isEmpty(): false | Fr;
    static from(fields: FieldsOf<CallContext>): CallContext;
    static getFields(fields: FieldsOf<CallContext>): readonly [AztecAddress, AztecAddress, FunctionSelector, boolean, boolean];
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CallContext;
    static fromFields(fields: Fr[] | FieldReader): CallContext;
    equals(callContext: CallContext): boolean;
    hash(): Promise<Fr>;
}
//# sourceMappingURL=call_context.d.ts.map