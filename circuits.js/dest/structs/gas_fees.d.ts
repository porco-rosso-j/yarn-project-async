import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { inspect } from 'util';
import { type GasDimensions } from './gas.js';
/** Gas prices for each dimension. */
export declare class GasFees {
    readonly feePerDaGas: Fr;
    readonly feePerL2Gas: Fr;
    constructor(feePerDaGas: Fr | number | bigint, feePerL2Gas: Fr | number | bigint);
    clone(): GasFees;
    equals(other: GasFees): boolean;
    get(dimension: GasDimensions): Fr;
    static from(fields: FieldsOf<GasFees>): GasFees;
    static random(): GasFees;
    static empty(): GasFees;
    /** Fixed gas fee values used until we define how gas fees in the protocol are computed. */
    static default(): GasFees;
    isEmpty(): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): GasFees;
    toBuffer(): Buffer;
    static fromFields(fields: Fr[] | FieldReader): GasFees;
    toFields(): Fr[];
    static fromJSON(obj: any): GasFees;
    toJSON(): {
        feePerDaGas: `0x${string}`;
        feePerL2Gas: `0x${string}`;
    };
    [inspect.custom](): string;
}
//# sourceMappingURL=gas_fees.d.ts.map