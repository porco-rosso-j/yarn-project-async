import { type FunctionAbi, FunctionSelector } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type ContractFunctionDao } from '../types/contract_function_dao.js';
/** Function description for circuit. */
export declare class FunctionData {
    /** Function selector of the function being called. */
    selector: FunctionSelector;
    /** Indicates whether the function is private or public. */
    isPrivate: boolean;
    constructor(
    /** Function selector of the function being called. */
    selector: FunctionSelector, 
    /** Indicates whether the function is private or public. */
    isPrivate: boolean);
    static fromAbi(abi: FunctionAbi | ContractFunctionDao): FunctionData;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Returns whether this instance is empty.
     * @returns True if the function selector is zero.
     */
    isEmpty(): boolean;
    /**
     * Returns whether this instance is equal to another.
     * @param other
     * @returns
     */
    equals(other: FunctionData): boolean;
    /**
     * Returns a new instance of FunctionData with zero function selector.
     * @param args - Arguments to pass to the constructor.
     * @returns A new instance of FunctionData with zero function selector.
     */
    static empty(args?: {
        /** Indicates whether the function is private or public. */
        isPrivate?: boolean;
        /** Indicates whether the function can alter state or not. */
        isStatic?: boolean;
    }): FunctionData;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of FunctionData.
     */
    static fromBuffer(buffer: Buffer | BufferReader): FunctionData;
    static fromFields(fields: Fr[] | FieldReader): FunctionData;
    hash(): Promise<Fr>;
}
//# sourceMappingURL=function_data.d.ts.map