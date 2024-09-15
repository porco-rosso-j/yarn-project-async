import { AztecAddress } from '../aztec-address/index.js';
import { type Fr } from '../fields/index.js';
import { type ABIParameter, type AbiType } from './abi.js';
/**
 * The type of our decoded ABI.
 */
export type DecodedReturn = bigint | boolean | AztecAddress | DecodedReturn[] | {
    [key: string]: DecodedReturn;
};
/**
 * Decodes return values from a function call.
 * @param abi - The ABI entry of the function.
 * @param returnValues - The decoded return values.
 * @returns
 */
export declare function decodeReturnValues(returnTypes: AbiType[], returnValues: Fr[]): DecodedReturn;
/**
 * Decodes the signature of a function from the name and parameters.
 */
export declare class FunctionSignatureDecoder {
    private name;
    private parameters;
    private includeNames;
    private separator;
    constructor(name: string, parameters: ABIParameter[], includeNames?: boolean);
    /**
     * Decodes a single function parameter type for the function signature.
     * @param param - The parameter type to decode.
     * @returns A string representing the parameter type.
     */
    private getParameterType;
    /**
     * Decodes a single function parameter for the function signature.
     * @param param - The parameter to decode.
     * @returns A string representing the parameter type and optionally its name.
     */
    private decodeParameter;
    /**
     * Decodes all the parameters and build the function signature
     * @returns The function signature.
     */
    decode(): string;
}
/**
 * Decodes a function signature from the name and parameters.
 * @param name - The name of the function.
 * @param parameters - The parameters of the function.
 * @returns - The function signature.
 */
export declare function decodeFunctionSignature(name: string, parameters: ABIParameter[]): string;
/**
 * Decodes a function signature from the name and parameters including parameter names.
 * @param name - The name of the function.
 * @param parameters - The parameters of the function.
 * @returns - The user-friendly function signature.
 */
export declare function decodeFunctionSignatureWithParameterNames(name: string, parameters: ABIParameter[]): string;
//# sourceMappingURL=decoder.d.ts.map