import { inspect } from 'util';
import { BufferReader } from '../serialize/buffer_reader.js';
/**
 * Represents a field derived from BaseField.
 */
type DerivedField<T extends BaseField> = {
    new (value: any): T;
    /**
     * All derived fields will specify a MODULUS.
     */
    MODULUS: bigint;
};
/**
 * Base field class.
 * Conversions from Buffer to BigInt and vice-versa are not cheap.
 * We allow construction with either form and lazily convert to other as needed.
 * We only check we are within the field modulus when initializing with bigint.
 */
declare abstract class BaseField {
    static SIZE_IN_BYTES: number;
    private asBuffer?;
    private asBigInt?;
    /**
     * Return bigint representation.
     * @deprecated Just to get things compiling. Use toBigInt().
     * */
    get value(): bigint;
    /** Returns the size in bytes. */
    get size(): number;
    protected constructor(value: number | bigint | boolean | BaseField | Buffer);
    protected abstract modulus(): bigint;
    /**
     * We return a copy of the Buffer to ensure this remains immutable.
     */
    toBuffer(): Buffer;
    toString(): `0x${string}`;
    toBigInt(): bigint;
    toBool(): boolean;
    toNumber(): number;
    toShortString(): string;
    equals(rhs: BaseField): boolean;
    lt(rhs: BaseField): boolean;
    cmp(rhs: BaseField): -1 | 0 | 1;
    isZero(): boolean;
    isEmpty(): boolean;
    toFriendlyJSON(): string;
    toField(): this;
}
/**
 * Constructs a field from a Buffer of BufferReader.
 * It maybe not read the full 32 bytes if the Buffer is shorter, but it will padded in BaseField constructor.
 */
export declare function fromBuffer<T extends BaseField>(buffer: Buffer | BufferReader, f: DerivedField<T>): T;
/**
 * Branding to ensure fields are not interchangeable types.
 */
export interface Fr {
    /** Brand. */
    _branding: 'Fr';
}
/**
 * Fr field class.
 */
export declare class Fr extends BaseField {
    static ZERO: Fr;
    static ONE: Fr;
    static MODULUS: bigint;
    constructor(value: number | bigint | boolean | Fr | Buffer);
    [inspect.custom](): string;
    protected modulus(): bigint;
    static random(): Fr;
    static zero(): Fr;
    static isZero(value: Fr): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): Fr;
    static fromBufferReduce(buffer: Buffer): Fr;
    /**
     * Creates a Fr instance from a hex string.
     * @param buf - a hex encoded string.
     * @returns the Fr instance
     */
    static fromString(buf: string): Fr;
    /** Arithmetic */
    add(rhs: Fr): Fr;
    square(): Fr;
    negate(): Fr;
    sub(rhs: Fr): Fr;
    mul(rhs: Fr): Fr;
    div(rhs: Fr): Fr;
    ediv(rhs: Fr): Fr;
    toJSON(): {
        type: string;
        value: `0x${string}`;
    };
}
/**
 * Branding to ensure fields are not interchangeable types.
 */
export interface Fq {
    /** Brand. */
    _branding: 'Fq';
}
/**
 * Fq field class.
 */
export declare class Fq extends BaseField {
    static ZERO: Fq;
    static MODULUS: bigint;
    private static HIGH_SHIFT;
    private static LOW_MASK;
    [inspect.custom](): string;
    get lo(): Fr;
    get hi(): Fr;
    constructor(value: number | bigint | boolean | Fq | Buffer);
    protected modulus(): bigint;
    static random(): Fq;
    static zero(): Fq;
    static fromBuffer(buffer: Buffer | BufferReader): Fq;
    static fromBufferReduce(buffer: Buffer): Fq;
    /**
     * Creates a Fq instance from a hex string.
     * @param buf - a hex encoded string.
     * @returns the Fq instance
     */
    static fromString(buf: string): Fq;
    static fromHighLow(high: Fr, low: Fr): Fq;
    toJSON(): {
        type: string;
        value: `0x${string}`;
    };
}
/**
 * GrumpkinScalar is an Fq.
 * @remarks Called GrumpkinScalar because it is used to represent elements in Grumpkin's scalar field as defined in
 *          the Aztec Protocol Specs.
 */
export type GrumpkinScalar = Fq;
export declare const GrumpkinScalar: typeof Fq;
/** Wraps a function that returns a buffer so that all results are reduced into a field of the given type. */
export declare function reduceFn<TInput, TField extends BaseField>(fn: (input: TInput) => Buffer, field: DerivedField<TField>): (input: TInput) => TField;
export {};
//# sourceMappingURL=fields.d.ts.map