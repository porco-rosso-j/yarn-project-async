import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { DEFAULT_GAS_LIMIT, DEFAULT_INCLUSION_FEE, DEFAULT_MAX_FEE_PER_GAS, DEFAULT_TEARDOWN_GAS_LIMIT, GAS_SETTINGS_LENGTH, } from '../constants.gen.js';
import { Gas, GasDimensions } from './gas.js';
import { GasFees } from './gas_fees.js';
/** Gas usage and fees limits set by the transaction sender for different dimensions and phases. */
export class GasSettings {
    constructor(gasLimits, teardownGasLimits, maxFeesPerGas, inclusionFee) {
        this.gasLimits = gasLimits;
        this.teardownGasLimits = teardownGasLimits;
        this.maxFeesPerGas = maxFeesPerGas;
        this.inclusionFee = inclusionFee;
    }
    getSize() {
        return this.toBuffer().length;
    }
    static from(args) {
        return new GasSettings(Gas.from(args.gasLimits), Gas.from(args.teardownGasLimits), GasFees.from(args.maxFeesPerGas), args.inclusionFee);
    }
    clone() {
        return new GasSettings(this.gasLimits.clone(), this.teardownGasLimits.clone(), this.maxFeesPerGas.clone(), this.inclusionFee);
    }
    /** Returns the maximum fee to be paid according to gas limits and max fees set. */
    getFeeLimit() {
        return GasDimensions.reduce((acc, dimension) => this.maxFeesPerGas
            .get(dimension)
            .mul(new Fr(this.gasLimits.get(dimension)))
            .add(acc), Fr.ZERO).add(this.inclusionFee);
    }
    /** Zero-value gas settings. */
    static empty() {
        return new GasSettings(Gas.empty(), Gas.empty(), GasFees.empty(), Fr.ZERO);
    }
    /** Default gas settings to use when user has not provided them. */
    static default(overrides) {
        return GasSettings.from({
            gasLimits: { l2Gas: DEFAULT_GAS_LIMIT, daGas: DEFAULT_GAS_LIMIT },
            teardownGasLimits: { l2Gas: DEFAULT_TEARDOWN_GAS_LIMIT, daGas: DEFAULT_TEARDOWN_GAS_LIMIT },
            maxFeesPerGas: { feePerL2Gas: new Fr(DEFAULT_MAX_FEE_PER_GAS), feePerDaGas: new Fr(DEFAULT_MAX_FEE_PER_GAS) },
            inclusionFee: new Fr(DEFAULT_INCLUSION_FEE),
            ...overrides,
        });
    }
    /** Default gas settings with no teardown */
    static teardownless() {
        return GasSettings.default({ teardownGasLimits: Gas.from({ l2Gas: 0, daGas: 0 }) });
    }
    /** Gas settings to use for simulating a contract call. */
    static simulation() {
        return GasSettings.default();
    }
    isEmpty() {
        return (this.gasLimits.isEmpty() &&
            this.teardownGasLimits.isEmpty() &&
            this.maxFeesPerGas.isEmpty() &&
            this.inclusionFee.isZero());
    }
    equals(other) {
        return (this.gasLimits.equals(other.gasLimits) &&
            this.teardownGasLimits.equals(other.teardownGasLimits) &&
            this.maxFeesPerGas.equals(other.maxFeesPerGas) &&
            this.inclusionFee.equals(other.inclusionFee));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new GasSettings(reader.readObject(Gas), reader.readObject(Gas), reader.readObject(GasFees), reader.readObject(Fr));
    }
    toBuffer() {
        return serializeToBuffer(...GasSettings.getFields(this));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new GasSettings(reader.readObject(Gas), reader.readObject(Gas), reader.readObject(GasFees), reader.readField());
    }
    toFields() {
        const fields = serializeToFields(...GasSettings.getFields(this));
        if (fields.length !== GAS_SETTINGS_LENGTH) {
            throw new Error(`Invalid number of fields for GasSettings. Expected ${GAS_SETTINGS_LENGTH} but got ${fields.length}`);
        }
        return fields;
    }
    static getFields(fields) {
        return [fields.gasLimits, fields.teardownGasLimits, fields.maxFeesPerGas, fields.inclusionFee];
    }
    /** Returns total gas limits. */
    getLimits() {
        return this.gasLimits;
    }
    /** Returns how much gas is available for execution of setup and app phases (ie total limit minus teardown). */
    getInitialAvailable() {
        return this.gasLimits.sub(this.teardownGasLimits);
    }
    /** Returns how much gas is available for execution of teardown phase. */
    getTeardownLimits() {
        return this.teardownGasLimits;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FzX3NldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0cnVjdHMvZ2FzX3NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlHLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QiwwQkFBMEIsRUFDMUIsbUJBQW1CLEdBQ3BCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxtR0FBbUc7QUFDbkcsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFDa0IsU0FBYyxFQUNkLGlCQUFzQixFQUN0QixhQUFzQixFQUN0QixZQUFnQjtRQUhoQixjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFLO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFJO0lBQy9CLENBQUM7SUFFSixPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBS1g7UUFDQyxPQUFPLElBQUksV0FBVyxDQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVB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