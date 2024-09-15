import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
/**
 * Contract storage read operation on a specific contract.
 *
 * Note: Similar to `PublicDataRead` but it's from the POV of contract storage so we are not working with public data
 * tree leaf index but storage slot index.
 */
export declare class ContractStorageRead {
    /**
     * Storage slot we are reading from.
     */
    readonly storageSlot: Fr;
    /**
     * Value read from the storage slot.
     */
    readonly currentValue: Fr;
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
     * Storage slot we are reading from.
     */
    storageSlot: Fr, 
    /**
     * Value read from the storage slot.
     */
    currentValue: Fr, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    counter: number, 
    /**
     * Contract address whose storage is being read.
     */
    contractAddress?: AztecAddress | undefined);
    static from(args: {
        storageSlot: Fr;
        currentValue: Fr;
        counter: number;
        contractAddress?: AztecAddress;
    }): ContractStorageRead;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ContractStorageRead;
    static empty(): ContractStorageRead;
    isEmpty(): boolean;
    toFriendlyJSON(): string;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ContractStorageRead;
}
//# sourceMappingURL=contract_storage_read.d.ts.map