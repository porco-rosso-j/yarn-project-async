import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { CONTRACT_STORAGE_UPDATE_REQUEST_LENGTH } from '../constants.gen.js';
/**
 * Contract storage update request for a slot on a specific contract.
 *
 * Note: Similar to `PublicDataUpdateRequest` but it's from the POV of contract storage so we are not working with
 * public data tree leaf index but storage slot index.
 */
export class ContractStorageUpdateRequest {
    constructor(
    /**
     * Storage slot we are updating.
     */
    storageSlot, 
    /**
     * New value of the storage slot.
     */
    newValue, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    counter, 
    /**
     * Contract address whose storage is being read.
     */
    contractAddress) {
        this.storageSlot = storageSlot;
        this.newValue = newValue;
        this.counter = counter;
        this.contractAddress = contractAddress;
    }
    toBuffer() {
        return serializeToBuffer(this.storageSlot, this.newValue, this.counter);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ContractStorageUpdateRequest(Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readNumber());
    }
    /**
     * Create PublicCallRequest from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCallRequest object.
     */
    static from(fields) {
        return new ContractStorageUpdateRequest(...ContractStorageUpdateRequest.getFields(fields));
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [fields.storageSlot, fields.newValue, fields.counter, fields.contractAddress];
    }
    static empty() {
        return new ContractStorageUpdateRequest(Fr.ZERO, Fr.ZERO, 0);
    }
    isEmpty() {
        return this.storageSlot.isZero() && this.newValue.isZero();
    }
    toFriendlyJSON() {
        return `Slot=${this.storageSlot.toFriendlyJSON()}: ${this.newValue.toFriendlyJSON()}, sideEffectCounter=${this.counter}`;
    }
    toFields() {
        const fields = [this.storageSlot, this.newValue, new Fr(this.counter)];
        if (fields.length !== CONTRACT_STORAGE_UPDATE_REQUEST_LENGTH) {
            throw new Error(`Invalid number of fields for ContractStorageUpdateRequest. Expected ${CONTRACT_STORAGE_UPDATE_REQUEST_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        const storageSlot = reader.readField();
        const newValue = reader.readField();
        return new ContractStorageUpdateRequest(storageSlot, newValue, reader.readU32());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rfc3RvcmFnZV91cGRhdGVfcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2NvbnRyYWN0X3N0b3JhZ2VfdXBkYXRlX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHM0YsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0U7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDO0lBQ0U7O09BRUc7SUFDYSxXQUFlO0lBQy9COztPQUVHO0lBQ2EsUUFBWTtJQUM1Qjs7T0FFRztJQUNhLE9BQWU7SUFDL0I7O09BRUc7SUFDSSxlQUE4QjtRQVpyQixnQkFBVyxHQUFYLFdBQVcsQ0FBSTtRQUlmLGFBQVEsR0FBUixRQUFRLENBQUk7UUFJWixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSXhCLG9CQUFlLEdBQWYsZUFBZSxDQUFlO0lBQ3BDLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLDRCQUE0QixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBOEM7UUFDeEQsT0FBTyxJQUFJLDRCQUE0QixDQUFDLEdBQUcsNEJBQTRCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQThDO1FBQzdELE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFVLENBQUM7SUFDaEcsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLDRCQUE0QixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsdUJBQ2pGLElBQUksQ0FBQyxPQUNQLEVBQUUsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLHNDQUFzQyxFQUFFLENBQUM7WUFDN0QsTUFBTSxJQUFJLEtBQUssQ0FDYix1RUFBdUUsc0NBQXNDLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUN0SSxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwQyxPQUFPLElBQUksNEJBQTRCLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDO0NBQ0YifQ==