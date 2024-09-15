import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GeneratorIndex, TX_CONTEXT_LENGTH } from '../constants.gen.js';
import { GasSettings } from './gas_settings.js';
/**
 * Transaction context.
 */
export class TxContext {
    constructor(
    /** Chain ID of the transaction. Here for replay protection. */
    chainId, 
    /** Version of the transaction. Here for replay protection. */
    version, 
    /** Gas limits for this transaction. */
    gasSettings) {
        this.gasSettings = gasSettings;
        this.chainId = new Fr(chainId);
        this.version = new Fr(version);
    }
    getSize() {
        return this.chainId.size + this.version.size + this.gasSettings.getSize();
    }
    clone() {
        return new TxContext(this.chainId, this.version, this.gasSettings.clone());
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...TxContext.getFields(this));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new TxContext(reader.readField(), reader.readField(), reader.readObject(GasSettings));
    }
    toFields() {
        const fields = serializeToFields(...TxContext.getFields(this));
        if (fields.length !== TX_CONTEXT_LENGTH) {
            throw new Error(`Invalid number of fields for TxContext. Expected ${TX_CONTEXT_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes TxContext from a buffer or reader.
     * @param buffer - Buffer to read from.
     * @returns The TxContext.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new TxContext(Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readObject(GasSettings));
    }
    static empty(chainId = 0, version = 0) {
        return new TxContext(new Fr(chainId), new Fr(version), GasSettings.empty());
    }
    isEmpty() {
        return this.chainId.isZero() && this.version.isZero() && this.gasSettings.isEmpty();
    }
    /**
     * Create a new instance from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A new instance.
     */
    static from(fields) {
        return new TxContext(...TxContext.getFields(fields));
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [fields.chainId, fields.version, fields.gasSettings];
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.TX_CONTEXT);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3R4X2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlHLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQUlwQjtJQUNFLCtEQUErRDtJQUMvRCxPQUE2QjtJQUM3Qiw4REFBOEQ7SUFDOUQsT0FBNkI7SUFDN0IsdUNBQXVDO0lBQ2hDLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1RSxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsaUJBQWlCLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakgsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUF1QixDQUFDLEVBQUUsVUFBdUIsQ0FBQztRQUM3RCxPQUFPLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBMkI7UUFDckMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBMkI7UUFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFVLENBQUM7SUFDdkUsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRiJ9