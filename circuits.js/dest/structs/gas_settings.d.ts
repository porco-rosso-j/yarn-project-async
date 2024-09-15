import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { Gas } from './gas.js';
import { GasFees } from './gas_fees.js';
/** Gas usage and fees limits set by the transaction sender for different dimensions and phases. */
export declare class GasSettings {
    readonly gasLimits: Gas;
    readonly teardownGasLimits: Gas;
    readonly maxFeesPerGas: GasFees;
    readonly inclusionFee: Fr;
    constructor(gasLimits: Gas, teardownGasLimits: Gas, maxFeesPerGas: GasFees, inclusionFee: Fr);
    getSize(): number;
    static from(args: {
        gasLimits: FieldsOf<Gas>;
        teardownGasLimits: FieldsOf<Gas>;
        maxFeesPerGas: FieldsOf<GasFees>;
        inclusionFee: Fr;
    }): GasSettings;
    clone(): GasSettings;
    /** Returns the maximum fee to be paid according to gas limits and max fees set. */
    getFeeLimit(): Fr;
    /** Zero-value gas settings. */
    static empty(): GasSettings;
    /** Default gas settings to use when user has not provided them. */
    static default(overrides?: Partial<FieldsOf<GasSettings>>): GasSettings;
    /** Default gas settings with no teardown */
    static teardownless(): GasSettings;
    /** Gas settings to use for simulating a contract call. */
    static simulation(): GasSettings;
    isEmpty(): boolean;
    equals(other: GasSettings): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): GasSettings;
    toBuffer(): Buffer;
    static fromFields(fields: Fr[] | FieldReader): GasSettings;
    toFields(): Fr[];
    static getFields(fields: FieldsOf<GasSettings>): readonly [Gas, Gas, GasFees, Fr];
    /** Returns total gas limits. */
    getLimits(): Gas;
    /** Returns how much gas is available for execution of setup and app phases (ie total limit minus teardown). */
    getInitialAvailable(): Gas;
    /** Returns how much gas is available for execution of teardown phase. */
    getTeardownLimits(): Gas;
}
//# sourceMappingURL=gas_settings.d.ts.map