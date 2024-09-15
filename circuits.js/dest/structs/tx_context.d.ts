import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { GasSettings } from './gas_settings.js';
/**
 * Transaction context.
 */
export declare class TxContext {
    /** Gas limits for this transaction. */
    gasSettings: GasSettings;
    chainId: Fr;
    version: Fr;
    constructor(
    /** Chain ID of the transaction. Here for replay protection. */
    chainId: Fr | number | bigint, 
    /** Version of the transaction. Here for replay protection. */
    version: Fr | number | bigint, 
    /** Gas limits for this transaction. */
    gasSettings: GasSettings);
    getSize(): number;
    clone(): TxContext;
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    static fromFields(fields: Fr[] | FieldReader): TxContext;
    toFields(): Fr[];
    /**
     * Deserializes TxContext from a buffer or reader.
     * @param buffer - Buffer to read from.
     * @returns The TxContext.
     */
    static fromBuffer(buffer: Buffer | BufferReader): TxContext;
    static empty(chainId?: Fr | number, version?: Fr | number): TxContext;
    isEmpty(): boolean;
    /**
     * Create a new instance from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A new instance.
     */
    static from(fields: FieldsOf<TxContext>): TxContext;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<TxContext>): readonly [Fr, Fr, GasSettings];
    hash(): Promise<Fr>;
}
//# sourceMappingURL=tx_context.d.ts.map