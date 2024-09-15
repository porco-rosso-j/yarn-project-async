import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { ARCHIVE_HEIGHT, MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PUBLIC_DATA_TREE_HEIGHT } from '../../constants.gen.js';
import { GlobalVariables } from '../global_variables.js';
import { KernelData } from '../kernel/kernel_data.js';
import { MembershipWitness } from '../membership_witness.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { PublicDataHint } from '../public_data_hint.js';
import { type UInt32 } from '../shared.js';
import { PublicDataTreeLeaf, PublicDataTreeLeafPreimage } from '../trees/index.js';
import { AppendOnlyTreeSnapshot } from './append_only_tree_snapshot.js';
import { StateDiffHints } from './state_diff_hints.js';
/**
 * Data which is forwarded through the base rollup circuits unchanged.
 */
export declare class ConstantRollupData {
    /** Archive tree snapshot at the very beginning of the entire rollup. */
    lastArchive: AppendOnlyTreeSnapshot;
    /**
     * Root of the verification key tree.
     */
    vkTreeRoot: Fr;
    /**
     * Global variables for the block
     */
    globalVariables: GlobalVariables;
    constructor(
    /** Archive tree snapshot at the very beginning of the entire rollup. */
    lastArchive: AppendOnlyTreeSnapshot, 
    /**
     * Root of the verification key tree.
     */
    vkTreeRoot: Fr, 
    /**
     * Global variables for the block
     */
    globalVariables: GlobalVariables);
    static from(fields: FieldsOf<ConstantRollupData>): ConstantRollupData;
    static fromBuffer(buffer: Buffer | BufferReader): ConstantRollupData;
    static getFields(fields: FieldsOf<ConstantRollupData>): readonly [AppendOnlyTreeSnapshot, Fr, GlobalVariables];
    static empty(): ConstantRollupData;
    toBuffer(): Buffer;
}
/**
 * Inputs to the base rollup circuit.
 */
export declare class BaseRollupInputs {
    /** Data of the 2 kernels that preceded this base rollup circuit. */
    kernelData: KernelData;
    /** Partial state reference at the start of the rollup. */
    start: PartialStateReference;
    /** Hints used while proving state diff validity. */
    stateDiffHints: StateDiffHints;
    /** Public data read hint for accessing the balance of the fee payer. */
    feePayerGasTokenBalanceReadHint: PublicDataHint;
    /**
     * The public data writes to be inserted in the tree, sorted high slot to low slot.
     */
    sortedPublicDataWrites: Tuple<PublicDataTreeLeaf, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /**
     * The indexes of the sorted public data writes to the original ones.
     */
    sortedPublicDataWritesIndexes: Tuple<UInt32, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /**
     * The public data writes which need to be updated to perform the batch insertion of the new public data writes.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    lowPublicDataWritesPreimages: Tuple<PublicDataTreeLeafPreimage, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    lowPublicDataWritesMembershipWitnesses: Tuple<MembershipWitness<typeof PUBLIC_DATA_TREE_HEIGHT>, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>;
    /**
     * Membership witnesses of blocks referred by each of the 2 kernels.
     */
    archiveRootMembershipWitness: MembershipWitness<typeof ARCHIVE_HEIGHT>;
    /**
     * Data which is not modified by the base rollup circuit.
     */
    constants: ConstantRollupData;
    constructor(
    /** Data of the 2 kernels that preceded this base rollup circuit. */
    kernelData: KernelData, 
    /** Partial state reference at the start of the rollup. */
    start: PartialStateReference, 
    /** Hints used while proving state diff validity. */
    stateDiffHints: StateDiffHints, 
    /** Public data read hint for accessing the balance of the fee payer. */
    feePayerGasTokenBalanceReadHint: PublicDataHint, 
    /**
     * The public data writes to be inserted in the tree, sorted high slot to low slot.
     */
    sortedPublicDataWrites: Tuple<PublicDataTreeLeaf, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /**
     * The indexes of the sorted public data writes to the original ones.
     */
    sortedPublicDataWritesIndexes: Tuple<UInt32, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /**
     * The public data writes which need to be updated to perform the batch insertion of the new public data writes.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    lowPublicDataWritesPreimages: Tuple<PublicDataTreeLeafPreimage, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    lowPublicDataWritesMembershipWitnesses: Tuple<MembershipWitness<typeof PUBLIC_DATA_TREE_HEIGHT>, typeof MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, 
    /**
     * Membership witnesses of blocks referred by each of the 2 kernels.
     */
    archiveRootMembershipWitness: MembershipWitness<typeof ARCHIVE_HEIGHT>, 
    /**
     * Data which is not modified by the base rollup circuit.
     */
    constants: ConstantRollupData);
    static from(fields: FieldsOf<BaseRollupInputs>): BaseRollupInputs;
    static getFields(fields: FieldsOf<BaseRollupInputs>): readonly [KernelData, PartialStateReference, StateDiffHints, PublicDataHint, [PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf, PublicDataTreeLeaf], [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number], [PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage, PublicDataTreeLeafPreimage], [MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>, MembershipWitness<40>], MembershipWitness<16>, ConstantRollupData];
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new BaseRollupInputs instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): BaseRollupInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new BaseRollupInputs instance.
     */
    static fromString(str: string): BaseRollupInputs;
    static empty(): BaseRollupInputs;
}
//# sourceMappingURL=base_rollup.d.ts.map