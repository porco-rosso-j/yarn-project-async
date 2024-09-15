import { AztecAddress } from '../aztec-address/index.js';
import { isAztecAddressStruct } from './utils.js';
/**
 * Decodes return values from a function call.
 * Missing support for integer and string.
 */
class ReturnValuesDecoder {
    constructor(returnTypes, flattened) {
        this.returnTypes = returnTypes;
        this.flattened = flattened;
    }
    /**
     * Decodes a single return value from field to the given type.
     * @param abiType - The type of the return value.
     * @returns The decoded return value.
     */
    decodeReturn(abiType) {
        switch (abiType.kind) {
            case 'field':
                return this.getNextField().toBigInt();
            case 'integer':
                if (abiType.sign === 'signed') {
                    throw new Error('Unsupported type: signed integer');
                }
                return this.getNextField().toBigInt();
            case 'boolean':
                return !this.getNextField().isZero();
            case 'array': {
                const array = [];
                for (let i = 0; i < abiType.length; i += 1) {
                    array.push(this.decodeReturn(abiType.type));
                }
                return array;
            }
            case 'struct': {
                const struct = {};
                if (isAztecAddressStruct(abiType)) {
                    return new AztecAddress(this.getNextField().toBuffer());
                }
                for (const field of abiType.fields) {
                    struct[field.name] = this.decodeReturn(field.type);
                }
                return struct;
            }
            case 'string': {
                const array = [];
                for (let i = 0; i < abiType.length; i += 1) {
                    array.push(this.getNextField().toBigInt());
                }
                return array;
            }
            default:
                throw new Error(`Unsupported type: ${abiType}`);
        }
    }
    /**
     * Gets the next field in the flattened return values.
     * @returns The next field in the flattened return values.
     */
    getNextField() {
        const field = this.flattened.shift();
        if (!field) {
            throw new Error('Not enough return values');
        }
        return field;
    }
    /**
     * Decodes all the return values for the given function ABI.
     * Aztec.nr support only single return value
     * The return value can however be simple types, structs or arrays
     * @returns The decoded return values.
     */
    decode() {
        if (this.returnTypes.length > 1) {
            throw new Error('Multiple return values not supported');
        }
        if (this.returnTypes.length === 0) {
            return [];
        }
        return this.decodeReturn(this.returnTypes[0]);
    }
}
/**
 * Decodes return values from a function call.
 * @param abi - The ABI entry of the function.
 * @param returnValues - The decoded return values.
 * @returns
 */
export function decodeReturnValues(returnTypes, returnValues) {
    return new ReturnValuesDecoder(returnTypes, returnValues.slice()).decode();
}
/**
 * Decodes the signature of a function from the name and parameters.
 */
export class FunctionSignatureDecoder {
    constructor(name, parameters, includeNames = false) {
        this.name = name;
        this.parameters = parameters;
        this.includeNames = includeNames;
        this.separator = includeNames ? ', ' : ',';
    }
    /**
     * Decodes a single function parameter type for the function signature.
     * @param param - The parameter type to decode.
     * @returns A string representing the parameter type.
     */
    getParameterType(param) {
        switch (param.kind) {
            case 'field':
                return 'Field';
            case 'integer':
                if (param.sign === 'signed') {
                    throw new Error('Unsupported type: signed integer');
                }
                return `u${param.width}`;
            case 'boolean':
                return 'bool';
            case 'array':
                return `[${this.getParameterType(param.type)};${param.length}]`;
            case 'string':
                return `str<${param.length}>`;
            case 'struct':
                return `(${param.fields.map(field => `${this.decodeParameter(field)}`).join(this.separator)})`;
            default:
                throw new Error(`Unsupported type: ${param}`);
        }
    }
    /**
     * Decodes a single function parameter for the function signature.
     * @param param - The parameter to decode.
     * @returns A string representing the parameter type and optionally its name.
     */
    decodeParameter(param) {
        const type = this.getParameterType(param.type);
        return this.includeNames ? `${param.name}: ${type}` : type;
    }
    /**
     * Decodes all the parameters and build the function signature
     * @returns The function signature.
     */
    decode() {
        return `${this.name}(${this.parameters.map(param => this.decodeParameter(param)).join(this.separator)})`;
    }
}
/**
 * Decodes a function signature from the name and parameters.
 * @param name - The name of the function.
 * @param parameters - The parameters of the function.
 * @returns - The function signature.
 */
export function decodeFunctionSignature(name, parameters) {
    return new FunctionSignatureDecoder(name, parameters).decode();
}
/**
 * Decodes a function signature from the name and parameters including parameter names.
 * @param name - The name of the function.
 * @param parameters - The parameters of the function.
 * @returns - The user-friendly function signature.
 */
export function decodeFunctionSignatureWithParameterNames(name, parameters) {
    return new FunctionSignatureDecoder(name, parameters, true).decode();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hYmkvZGVjb2Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBT2xEOzs7R0FHRztBQUNILE1BQU0sbUJBQW1CO0lBQ3ZCLFlBQW9CLFdBQXNCLEVBQVUsU0FBZTtRQUEvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBVztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQU07SUFBRyxDQUFDO0lBRXZFOzs7O09BSUc7SUFDSyxZQUFZLENBQUMsT0FBZ0I7UUFDbkMsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsS0FBSyxPQUFPO2dCQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLEtBQUssU0FBUztnQkFDWixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztnQkFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxLQUFLLFNBQVM7Z0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2QyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFP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