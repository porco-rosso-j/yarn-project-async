import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { inspect } from 'util';
import { type GasFees } from './gas_fees.js';
import { type UInt32 } from './shared.js';
export declare const GasDimensions: readonly ["da", "l2"];
export type GasDimensions = (typeof GasDimensions)[number];
/** Gas amounts in each dimension. */
export declare class Gas {
    readonly daGas: UInt32;
    readonly l2Gas: UInt32;
    constructor(daGas: UInt32, l2Gas: UInt32);
    clone(): Gas;
    get(dimension: GasDimensions): number;
    equals(other: Gas): boolean;
    static from(fields: Partial<FieldsOf<Gas>>): Gas;
    static empty(): Gas;
    /** Returns large enough gas amounts for testing purposes. */
    static test(): Gas;
    isEmpty(): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): Gas;
    toBuffer(): Buffer;
    [inspect.custom](): string;
    add(other: Gas): Gas;
    sub(other: Gas): Gas;
    mul(scalar: number): Gas;
    computeFee(gasFees: GasFees): Fr;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): Gas;
    toJSON(): {
        daGas: number;
        l2Gas: number;
    };
    static fromJSON(json: any): Gas;
}
//# sourceMappingURL=gas.d.ts.map