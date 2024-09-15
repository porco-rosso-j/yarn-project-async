import { type Fr } from '../fields/fields.js';
import { BufferReader } from '../serialize/buffer_reader.js';
import { Selector } from './selector.js';
/** Event selector branding */
export interface EventSelector {
    /** Brand. */
    _branding: 'EventSelector';
}
/** An event selector is the first 4 bytes of the hash of an event signature. */
export declare class EventSelector extends Selector {
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The Selector.
     */
    static fromBuffer(buffer: Buffer | BufferReader): EventSelector;
    /**
     * Converts a field to selector.
     * @param fr - The field to convert.
     * @returns The selector.
     */
    static fromField(fr: Fr): EventSelector;
    /**
     * Creates a selector from a signature.
     * @param signature - Signature to generate the selector for (e.g. "transfer(field,field)").
     * @returns selector.
     */
    static fromSignature(signature: string): EventSelector;
    /**
     * Create a Selector instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 64 hex characters.
     * Throws an error if the input length is invalid or address value is out of range.
     *
     * @param selector - The hex-encoded string representing the Selector.
     * @returns An Selector instance.
     */
    static fromString(selector: string): EventSelector;
    /**
     * Creates an empty selector.
     * @returns An empty selector.
     */
    static empty(): EventSelector;
    /**
     * Creates a random selector.
     * @returns A random selector.
     */
    static random(): EventSelector;
}
//# sourceMappingURL=event_selector.d.ts.map