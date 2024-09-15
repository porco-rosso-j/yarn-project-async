import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { type Ordered } from '../interfaces/index.js';
export declare class LogHash implements Ordered {
    value: Fr;
    counter: number;
    length: Fr;
    constructor(value: Fr, counter: number, length: Fr);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): LogHash;
    isEmpty(): boolean;
    static empty(): LogHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): LogHash;
    toString(): string;
    [inspect.custom](): string;
}
export declare class ScopedLogHash implements Ordered {
    logHash: LogHash;
    contractAddress: AztecAddress;
    constructor(logHash: LogHash, contractAddress: AztecAddress);
    get counter(): number;
    get value(): Fr;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedLogHash;
    isEmpty(): boolean;
    static empty(): ScopedLogHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedLogHash;
    toString(): string;
}
export declare class NoteLogHash implements Ordered {
    value: Fr;
    counter: number;
    length: Fr;
    noteHashCounter: number;
    constructor(value: Fr, counter: number, length: Fr, noteHashCounter: number);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): NoteLogHash;
    isEmpty(): boolean;
    static empty(): NoteLogHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): NoteLogHash;
    toString(): string;
}
export declare class EncryptedLogHash implements Ordered {
    value: Fr;
    counter: number;
    length: Fr;
    randomness: Fr;
    constructor(value: Fr, counter: number, length: Fr, randomness: Fr);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): EncryptedLogHash;
    isEmpty(): boolean;
    static empty(): EncryptedLogHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): EncryptedLogHash;
    toString(): string;
}
export declare class ScopedEncryptedLogHash implements Ordered {
    logHash: EncryptedLogHash;
    contractAddress: AztecAddress;
    constructor(logHash: EncryptedLogHash, contractAddress: AztecAddress);
    get counter(): number;
    get value(): Fr;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedEncryptedLogHash;
    isEmpty(): boolean;
    static empty(): ScopedEncryptedLogHash;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedEncryptedLogHash;
    toString(): string;
}
//# sourceMappingURL=log_hash.d.ts.map