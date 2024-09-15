import { type Fr } from '../fields/fields.js';
import { BufferReader } from '../serialize/buffer_reader.js';
import { Selector } from './selector.js';
/** Note selector branding */
export interface NoteSelector {
    /** Brand. */
    _branding: 'NoteSelector';
}
/** A note selector is the first 4 bytes of the hash of a note signature. */
export declare class NoteSelector extends Selector {
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The Selector.
     */
    static fromBuffer(buffer: Buffer | BufferReader): NoteSelector;
    static fromString(buf: string): NoteSelector;
    /**
     * Converts a field to selector.
     * @param fr - The field to convert.
     * @returns The selector.
     */
    static fromField(fr: Fr): NoteSelector;
    /**
     * Creates an empty selector.
     * @returns An empty selector.
     */
    static empty(): NoteSelector;
    /**
     * Creates a random selector.
     * @returns A random selector.
     */
    static random(): NoteSelector;
    toJSON(): {
        type: string;
        value: string;
    };
    static fromJSON(json: any): NoteSelector;
}
//# sourceMappingURL=note_selector.d.ts.map