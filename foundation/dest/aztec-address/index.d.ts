import { inspect } from 'util';
import { Fr } from '../fields/index.js';
import { type BufferReader, FieldReader } from '../serialize/index.js';
/**
 * AztecAddress represents a 32-byte address in the Aztec Protocol.
 * It provides methods to create, manipulate, and compare addresses.
 * The maximum value of an address is determined by the field modulus and all instances of AztecAddress.
 * It should have a value less than or equal to this max value.
 * This class also provides helper functions to convert addresses from strings, buffers, and other formats.
 */
export declare class AztecAddress extends Fr {
    constructor(buffer: Buffer);
    [inspect.custom](): string;
    static ZERO: AztecAddress;
    static zero(): AztecAddress;
    static fromBuffer(buffer: Buffer | BufferReader): AztecAddress;
    static fromField(fr: Fr): AztecAddress;
    static fromFields(fields: Fr[] | FieldReader): AztecAddress;
    static fromBigInt(value: bigint): AztecAddress;
    static fromString(buf: string): AztecAddress;
    static random(): AztecAddress;
    toJSON(): {
        type: string;
        value: `0x${string}`;
    };
}
//# sourceMappingURL=index.d.ts.map