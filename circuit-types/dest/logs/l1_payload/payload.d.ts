import { Vector } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * The Note class represents a Note emitted from a Noir contract as a vector of Fr (finite field) elements.
 * This data also represents a preimage to a note hash. This class extends the Vector class, which allows for
 * additional operations on the underlying field elements.
 */
export declare class Payload extends Vector<Fr> {
    /**
     * Create a Note instance from a Buffer or BufferReader.
     * The input 'buffer' can be either a Buffer containing the serialized Fr elements or a BufferReader instance.
     * This function reads the Fr elements in the buffer and constructs a Note with them.
     *
     * @param buffer - The Buffer or BufferReader containing the serialized Fr elements.
     * @returns A Note instance containing the deserialized Fr elements.
     */
    static fromBuffer(buffer: Buffer | BufferReader): Payload;
    /**
     * Generates a random Note instance with a variable number of items.
     * The number of items is determined by a random value between 1 and 10 (inclusive).
     * Each item in the Note is generated using the Fr.random() method.
     *
     * @returns A randomly generated Note instance.
     */
    static random(): Payload;
    /**
     * Returns a hex representation of the note.
     * @returns A hex string with the vector length as first element.
     */
    toString(): string;
    /**
     * Creates a new Note instance from a hex string.
     * @param str - Hex representation.
     * @returns A Note instance.
     */
    static fromString(str: string): Payload;
    get length(): number;
    equals(other: Note): boolean;
}
export declare class Event extends Payload {
}
export declare class Note extends Payload {
}
//# sourceMappingURL=payload.d.ts.map