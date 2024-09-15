import { fromHex, toBigIntBE } from '../bigint-buffer/index.js';
import { keccak256, randomBytes } from '../crypto/index.js';
import { BufferReader } from '../serialize/buffer_reader.js';
import { FieldReader } from '../serialize/field_reader.js';
import { TypeRegistry } from '../serialize/type_registry.js';
import { decodeFunctionSignature } from './decoder.js';
import { Selector } from './selector.js';
/** A function selector is the first 4 bytes of the hash of a function signature. */
export class FunctionSelector extends Selector {
    equals(other, otherParams) {
        if (typeof other === 'string') {
            return this.equals(FunctionSelector.fromNameAndParameters(other, otherParams));
        }
        else if (typeof other === 'object' && 'name' in other) {
            return this.equals(FunctionSelector.fromNameAndParameters(other.name, other.parameters));
        }
        else {
            return this.value === other.value;
        }
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The Selector.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const value = Number(toBigIntBE(reader.readBytes(Selector.SIZE)));
        return new FunctionSelector(value);
    }
    /**
     * Converts a field to selector.
     * @param fr - The field to convert.
     * @returns The selector.
     */
    static fromField(fr) {
        return new FunctionSelector(Number(fr.toBigInt()));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return FunctionSelector.fromField(reader.readField());
    }
    /**
     * Creates a selector from a signature.
     * @param signature - Signature to generate the selector for (e.g. "transfer(field,field)").
     * @returns selector.
     */
    static fromSignature(signature) {
        // throw if signature contains whitespace
        if (/\s/.test(signature)) {
            throw new Error('Signature cannot contain whitespace');
        }
        return FunctionSelector.fromBuffer(keccak256(Buffer.from(signature)).subarray(0, Selector.SIZE));
    }
    /**
     * Create a Selector instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 64 hex characters.
     * Throws an error if the input length is invalid or address value is out of range.
     *
     * @param selector - The hex-encoded string representing the Selector.
     * @returns An Selector instance.
     */
    static fromString(selector) {
        const buf = fromHex(selector);
        if (buf.length !== Selector.SIZE) {
            throw new Error(`Invalid Selector length ${buf.length} (expected ${Selector.SIZE}).`);
        }
        return FunctionSelector.fromBuffer(buf);
    }
    /**
     * Creates an empty selector.
     * @returns An empty selector.
     */
    static empty() {
        return new FunctionSelector(0);
    }
    static fromNameAndParameters(nameOrArgs, maybeParameters) {
        const { name, parameters } = typeof nameOrArgs === 'string' ? { name: nameOrArgs, parameters: maybeParameters } : nameOrArgs;
        const signature = decodeFunctionSignature(name, parameters);
        const selector = this.fromSignature(signature);
        // If using the debug logger here it kill the typing in the `server_world_state_synchronizer` and jest tests.
        // console.log(`selector for ${signature} is ${selector}`);
        return selector;
    }
    /**
     * Creates a random instance.
     */
    static random() {
        return FunctionSelector.fromBuffer(randomBytes(Selector.SIZE));
    }
    toJSON() {
        return {
            type: 'FunctionSelector',
            value: this.toString(),
        };
    }
}
// For deserializing JSON.
TypeRegistry.register('FunctionSelector', FunctionSelector);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25fc2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJpL2Z1bmN0aW9uX3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVV6QyxvRkFBb0Y7QUFDcEYsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFFBQVE7SUFRbkMsTUFBTSxDQUNiLEtBQStFLEVBQy9FLFdBQTRCO1FBRTVCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxXQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7WUFDeEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FB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