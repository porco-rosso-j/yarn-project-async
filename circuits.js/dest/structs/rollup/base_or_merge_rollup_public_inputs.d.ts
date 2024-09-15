import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { PartialStateReference } from '../partial_state_reference.js';
import { type RollupTypes } from '../shared.js';
import { ConstantRollupData } from './base_rollup.js';
/**
 * Output of the base and merge rollup circuits.
 */
export declare class BaseOrMergeRollupPublicInputs {
    /**
     * Specifies from which type of rollup circuit these inputs are from.
     */
    rollupType: RollupTypes;
    /**
     * Number of txs in this rollup.
     */
    numTxs: number;
    /**
     * Data which is forwarded through the rollup circuits unchanged.
     */
    constants: ConstantRollupData;
    /**
     * Partial state reference at the start of the rollup circuit.
     */
    start: PartialStateReference;
    /**
     * Partial state reference at the end of the rollup circuit.
     */
    end: PartialStateReference;
    /**
     * SHA256 hash of transactions effects. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    txsEffectsHash: Fr;
    /**
     * SHA256 hash of outhash. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    outHash: Fr;
    /**
     * The summed `transaction_fee` of the constituent transactions.
     */
    accumulatedFees: Fr;
    constructor(
    /**
     * Specifies from which type of rollup circuit these inputs are from.
     */
    rollupType: RollupTypes, 
    /**
     * Number of txs in this rollup.
     */
    numTxs: number, 
    /**
     * Data which is forwarded through the rollup circuits unchanged.
     */
    constants: ConstantRollupData, 
    /**
     * Partial state reference at the start of the rollup circuit.
     */
    start: PartialStateReference, 
    /**
     * Partial state reference at the end of the rollup circuit.
     */
    end: PartialStateReference, 
    /**
     * SHA256 hash of transactions effects. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    txsEffectsHash: Fr, 
    /**
     * SHA256 hash of outhash. Used to make public inputs constant-sized (to then be unpacked on-chain).
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    outHash: Fr, 
    /**
     * The summed `transaction_fee` of the constituent transactions.
     */
    accumulatedFees: Fr);
    /**
     * Deserializes from a buffer or reader.
     * Note: Corresponds to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized public inputs.
     */
    static fromBuffer(buffer: Buffer | BufferReader): BaseOrMergeRollupPublicInputs;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serialize this as a hex string.
     * @returns - The hex string.
     */
    toString(): string;
    /**
     * Deserializes from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new BaseOrMergeRollupPublicInputs instance.
     */
    static fromString(str: string): BaseOrMergeRollupPublicInputs;
}
//# sourceMappingURL=base_or_merge_rollup_public_inputs.d.ts.map