import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
/**
 * Contract storage update request for a slot on a specific contract.
 *
 * Note: Similar to `PublicDataUpdateRequest` but it's from the POV of contract storage so we are not working with
 * public data tree leaf index but storage slot index.
 */
export declare class ContractStorageUpdateRequest {
    /**
     * Storage slot we are updating.
     */
    readonly storageSlot: Fr;
    /**
     * New value of the storage slot.
     */
    readonly newValue: Fr;
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    readonly counter: number;
    /**
     * Contract address whose storage is being read.
     */
    contractAddress?: AztecAddress | undefined;
    constructor(
    /**
     * Storage slot we are updating.
     */
    storageSlot: Fr, 
    /**
     * New value of the storage slot.
     */
    newValue: Fr, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    counter: number, 
    /**
     * Contract address whose storage is being read.
     */
    contractAddress?: AztecAddress | undefined);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ContractStorageUpdateRequest;
    /**
     * Create PublicCallRequest from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCallRequest object.
     */
    static from(fields: FieldsOf<ContractStorageUpdateRequest>): ContractStorageUpdateRequest;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<ContractStorageUpdateRequest>): readonly [Fr, Fr, number, AztecAddress | undefined];
    static empty(): ContractStorageUpdateRequest;
    isEmpty(): boolean;
    toFriendlyJSON(): string;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ContractStorageUpdateRequest;
}
//# sourceMappingURL=contract_storage_update_request.d.ts.map