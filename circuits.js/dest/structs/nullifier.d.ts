import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type Ordered } from '../interfaces/index.js';
export declare class Nullifier implements Ordered {
    value: Fr;
    counter: number;
    noteHash: Fr;
    constructor(value: Fr, counter: number, noteHash: Fr);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): Nullifier;
    isEmpty(): boolean;
    static empty(): Nullifier;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): Nullifier;
    toString(): string;
    scope(contractAddress: AztecAddress): ScopedNullifier;
}
export declare class ScopedNullifier implements Ordered {
    nullifier: Nullifier;
    contractAddress: AztecAddress;
    constructor(nullifier: Nullifier, contractAddress: AztecAddress);
    get counter(): number;
    get value(): Fr;
    get nullifiedNoteHash(): Fr;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedNullifier;
    isEmpty(): boolean;
    static empty(): ScopedNullifier;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedNullifier;
    toString(): string;
}
//# sourceMappingURL=nullifier.d.ts.map