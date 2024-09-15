import { type Fr } from '../fields/fields.js';
import { BufferReader } from '../serialize/buffer_reader.js';
import { FieldReader } from '../serialize/field_reader.js';
import { type ABIParameter } from './abi.js';
import { Selector } from './selector.js';
/** Function selector branding */
export interface FunctionSelector {
    /** Brand. */
    _branding: 'FunctionSelector';
}
/** A function selector is the first 4 bytes of the hash of a function signature. */
export declare class FunctionSelector extends Selector {
    /**
     * Checks if this function selector is equal to another.
     * @returns True if the function selectors are equal.
     */
    equals(fn: {
        name: string;
        parameters: ABIParameter[];
    }): boolean;
    equals(otherName: string, otherParams: ABIParameter[]): boolean;
    equals(other: FunctionSelector): boolean;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The Selector.
     */
    static fromBuffer(buffer: Buffer | BufferReader): FunctionSelector;
    /**
     * Converts a field to selector.
     * @param fr - The field to convert.
     * @returns The selector.
     */
    static fromField(fr: Fr): FunctionSelector;
    static fromFields(fields: Fr[] | FieldReader): FunctionSelector;
    /**
     * Creates a selector from a signature.
     * @param signature - Signature to generate the selector for (e.g. "transfer(field,field)").
     * @returns selector.
     */
    static fromSignature(signature: string): FunctionSelector;
    /**
     * Create a Selector instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 64 hex characters.
     * Throws an error if the input length is invalid or address value is out of range.
     *
     * @param selector - The hex-encoded string representing the Selector.
     * @returns An Selector instance.
     */
    static fromString(selector: string): FunctionSelector;
    /**
     * Creates an empty selector.
     * @returns An empty selector.
     */
    static empty(): FunctionSelector;
    /**
     * Creates a function selector for a given function name and parameters.
     * @param name - The name of the function.
     * @param parameters - An array of ABIParameter objects, each containing the type information of a function parameter.
     * @returns A Buffer containing the 4-byte selector.
     */
    static fromNameAndParameters(args: {
        name: string;
        parameters: ABIParameter[];
    }): FunctionSelector;
    static fromNameAndParameters(name: string, parameters: ABIParameter[]): FunctionSelector;
    /**
     * Creates a random instance.
     */
    static random(): FunctionSelector;
    toJSON(): {
        type: string;
        value: string;
    };
}
//# sourceMappingURL=function_selector.d.ts.map