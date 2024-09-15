import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type Ordered } from '../interfaces/index.js';
export declare class NoteHash {
    value: Fr;
    counter: number;
    constructor(value: Fr, counter: number);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): NoteHash;
    isEmpty(): boolean;
    static empty(): NoteHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): NoteHash;
    toString(): string;
    scope(contractAddress: AztecAddress): ScopedNoteHash;
}
export declare class ScopedNoteHash implements Ordered {
    noteHash: NoteHash;
    contractAddress: AztecAddress;
    constructor(noteHash: NoteHash, contractAddress: AztecAddress);
    get counter(): number;
    get value(): Fr;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedNoteHash;
    isEmpty(): boolean;
    static empty(): ScopedNoteHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedNoteHash;
    toString(): string;
}
//# sourceMappingURL=note_hash.d.ts.map