import { Fr } from '../fields/index.js';
import { isAddressStruct, isFunctionSelectorStruct, isWrappedFieldStruct } from './utils.js';
/**
 * Encodes arguments for a function call.
 * Missing support for integer and string.
 */
class ArgumentEncoder {
    constructor(abi, args) {
        this.abi = abi;
        this.args = args;
        this.flattened = [];
    }
    static typeSize(abiType) {
        switch (abiType.kind) {
            case 'field':
            case 'boolean':
            case 'integer':
                return 1;
            case 'string':
                return abiType.length;
            case 'array':
                return abiType.length * ArgumentEncoder.typeSize(abiType.type);
            case 'struct':
                return abiType.fields.reduce((acc, field) => acc + ArgumentEncoder.typeSize(field.type), 0);
            default: {
                const exhaustiveCheck = abiType;
                throw new Error(`Unhandled abi type: ${exhaustiveCheck}`);
            }
        }
    }
    /**
     * Encodes a single argument from the given type to field.
     * @param abiType - The abi type of the argument.
     * @param arg - The value to encode.
     * @param name - Name.
     */
    encodeArgument(abiType, arg, name) {
        if (arg === undefined || arg == null) {
            throw new Error(`Undefined argument ${name ?? 'unnamed'} of type ${abiType.kind}`);
        }
        switch (abiType.kind) {
            case 'field':
                if (typeof arg === 'number') {
                    this.flattened.push(new Fr(BigInt(arg)));
                }
                else if (typeof arg === 'bigint') {
                    this.flattened.push(new Fr(arg));
                }
                else if (typeof arg === 'string') {
                    this.flattened.push(Fr.fromString(arg));
                }
                else if (typeof arg === 'boolean') {
                    this.flattened.push(new Fr(arg ? 1n : 0n));
                }
                else if (typeof arg === 'object') {
                    if (Buffer.isBuffer(arg)) {
                        this.flattened.push(Fr.fromBuffer(arg));
                    }
                    else if (typeof arg.toField === 'function') {
                        this.flattened.push(arg.toField());
                    }
                    else {
                        throw new Error(`Argument for ${name} cannot be serialized to a field`);
                    }
                }
                else {
                    throw new Error(`Invalid argument "${arg}" of type ${abiType.kind}`);
                }
                break;
            case 'boolean':
                this.flattened.push(new Fr(arg ? 1n : 0n));
                break;
            case 'array':
                for (let i = 0; i < abiType.length; i += 1) {
                    this.encodeArgument(abiType.type, arg[i], `${name}[${i}]`);
                }
                break;
            case 'string':
                for (let i = 0; i < abiType.length; i += 1) {
                    // If the string is shorter than the defined length, pad it with 0s.
                    const toInsert = i < arg.length ? BigInt(arg.charCodeAt(i)) : 0n;
                    this.flattened.push(new Fr(toInsert));
                }
                break;
            case 'struct': {
                // If the abi expects a struct like { address: Field } and the supplied arg does not have
                // an address field in it, we try to encode it as if it were a field directly.
                const isAddress = isAddressStruct(abiType);
                if (isAddress && typeof arg.address === 'undefined' && typeof arg.inner === 'undefined') {
                    this.encodeArgument({ kind: 'field' }, arg, `${name}.inner`);
                    break;
                }
                // Or if the supplied argument does have an address field in it, like a CompleteAddress,
                // we encode it directly as a field.
                if (isAddress && typeof arg.address !== 'undefined') {
                    this.encodeArgument({ kind: 'field' }, arg.address, `${name}.address`);
                    break;
                }
                if (isFunctionSelectorStruct(abiType)) {
                    this.encodeArgument({ kind: 'integer', sign: 'unsigned', width: 32 }, arg.value ?? arg, `${name}.inner`);
                    break;
                }
                if (isWrappedFieldStruct(abiType)) {
                    this.encodeArgument({ kind: 'field' }, arg.inner ?? arg, `${name}.inner`);
                    break;
                }
                for (const field of abiType.fields) {
                    this.encodeArgument(field.type, arg[field.name], `${name}.${field.name}`);
                }
                break;
            }
            case 'integer':
                if (typeof arg === 'string') {
                    const value = BigInt(arg);
                    this.flattened.push(new Fr(value));
                }
                else {
                    this.flattened.push(new Fr(arg));
                }
                break;
            default:
                throw new Error(`Unsupported type: ${abiType}`);
        }
    }
    /**
     * Encodes all the arguments for the given function ABI.
     * @returns The encoded arguments.
     */
    encode() {
        for (let i = 0; i < this.abi.parameters.length; i += 1) {
            const parameterAbi = this.abi.parameters[i];
            this.encodeArgument(parameterAbi.type, this.args[i], parameterAbi.name);
        }
        return this.flattened;
    }
}
/**
 * Encodes all the arguments for a function call.
 * @param abi - The function ABI entry.
 * @param args - The arguments to encode.
 * @returns The encoded arguments.
 */
export function encodeArguments(abi, args) {
    return new ArgumentEncoder(abi, args).encode();
}
/**
 * Returns the size of the arguments for a function ABI.
 * @param abi - The function ABI entry.
 * @returns The size of the arguments.
 */
export function countArgumentsSize(abi) {
    return abi.parameters.reduce((acc, parameter) => acc + ArgumentEncoder.typeSize(parameter.type), 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hYmkvZW5jb2Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3Rjs7O0dBR0c7QUFDSCxNQUFNLGVBQWU7SUFHbkIsWUFBb0IsR0FBZ0IsRUFBVSxJQUFXO1FBQXJDLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBRmpELGNBQVMsR0FBUyxFQUFFLENBQUM7SUFFK0IsQ0FBQztJQUU3RCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWdCO1FBQzlCLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxDQUFDLENBQUM7WUFDWCxLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLEtBQUssT0FBTztnQkFDVixPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsS0FBSyxRQUFRO2dCQUNYLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUYsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLGVBQWUsR0FBVSxPQUFPLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLGVB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