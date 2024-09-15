import { fromHex, toBigIntBE } from '../bigint-buffer/index.js';
import { keccak256, randomBytes } from '../crypto/index.js';
import { BufferReader } from '../serialize/buffer_reader.js';
import { Selector } from './selector.js';
/** An event selector is the first 4 bytes of the hash of an event signature. */
export class EventSelector extends Selector {
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The Selector.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const value = Number(toBigIntBE(reader.readBytes(Selector.SIZE)));
        return new EventSelector(value);
    }
    /**
     * Converts a field to selector.
     * @param fr - The field to convert.
     * @returns The selector.
     */
    static fromField(fr) {
        return new EventSelector(Number(fr.toBigInt()));
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
        return EventSelector.fromBuffer(keccak256(Buffer.from(signature)).subarray(0, Selector.SIZE));
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
        return EventSelector.fromBuffer(buf);
    }
    /**
     * Creates an empty selector.
     * @returns An empty selector.
     */
    static empty() {
        return new EventSelector(0);
    }
    /**
     * Creates a random selector.
     * @returns A random selector.
     */
    static random() {
        return EventSelector.fromBuffer(randomBytes(Selector.SIZE));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfc2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJpL2V2ZW50X3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVV6QyxnRkFBZ0Y7QUFDaEYsTUFBTSxPQUFPLGFBQWMsU0FBUSxRQUFRO0lBQ3pDOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsT0FBTyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBTTtRQUNyQixPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFpQjtRQUNwQyx5Q0FBeUM7UUFDekMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFnQjtRQUNoQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixHQUFHLENBQUMsTUFBTSxjQUFjLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3hGLENBQUM7UUFDRCxPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLE1BQU07UUFDWCxPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRiJ9