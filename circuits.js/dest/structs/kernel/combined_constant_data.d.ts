import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { GlobalVariables } from '../global_variables.js';
import { Header } from '../header.js';
import { TxContext } from '../tx_context.js';
/**
 * Data that is constant/not modified by neither of the kernels.
 */
export declare class CombinedConstantData {
    /** Header of a block whose state is used during execution (not the block the transaction is included in). */
    historicalHeader: Header;
    /**
     * Context of the transaction.
     *
     * Note: `chainId` and `version` in txContext are not redundant to the values in
     * self.historical_header.global_variables because they can be different in case of a protocol upgrade. In such
     * a situation we could be using header from a block before the upgrade took place but be using the updated
     * protocol to execute and prove the transaction.
     */
    txContext: TxContext;
    /**
     * Root of the vk tree for the protocol circuits.
     */
    vkTreeRoot: Fr;
    /** Present when output by a public kernel, empty otherwise. */
    globalVariables: GlobalVariables;
    constructor(
    /** Header of a block whose state is used during execution (not the block the transaction is included in). */
    historicalHeader: Header, 
    /**
     * Context of the transaction.
     *
     * Note: `chainId` and `version` in txContext are not redundant to the values in
     * self.historical_header.global_variables because they can be different in case of a protocol upgrade. In such
     * a situation we could be using header from a block before the upgrade took place but be using the updated
     * protocol to execute and prove the transaction.
     */
    txContext: TxContext, 
    /**
     * Root of the vk tree for the protocol circuits.
     */
    vkTreeRoot: Fr, 
    /** Present when output by a public kernel, empty otherwise. */
    globalVariables: GlobalVariables);
    toBuffer(): Buffer;
    getSize(): number;
    static from({ historicalHeader, txContext, vkTreeRoot, globalVariables, }: FieldsOf<CombinedConstantData>): CombinedConstantData;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or buffer reader to read from.
     * @returns A new instance of CombinedConstantData.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CombinedConstantData;
    static fromFields(fields: Fr[] | FieldReader): CombinedConstantData;
    static empty(): CombinedConstantData;
}
//# sourceMappingURL=combined_constant_data.d.ts.map