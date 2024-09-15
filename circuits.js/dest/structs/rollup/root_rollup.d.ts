import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { ARCHIVE_HEIGHT, L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, NESTED_RECURSIVE_PROOF_LENGTH, NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP } from '../../constants.gen.js';
import { Header } from '../header.js';
import { RootParityInput } from '../parity/root_parity_input.js';
import { AppendOnlyTreeSnapshot } from './append_only_tree_snapshot.js';
import { PreviousRollupData } from './previous_rollup_data.js';
/**
 * Represents inputs of the root rollup circuit.
 */
export declare class RootRollupInputs {
    /**
     * The previous rollup data.
     * Note: Root rollup circuit is the latest circuit the chain of circuits and the previous rollup data is the data
     * from 2 merge or base rollup circuits.
     */
    previousRollupData: [PreviousRollupData, PreviousRollupData];
    /**
     * The original and converted roots of the L1 to L2 messages subtrees.
     */
    l1ToL2Roots: RootParityInput<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
    /**
     * New L1 to L2 messages.
     */
    newL1ToL2Messages: Tuple<Fr, typeof NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP>;
    /**
     * Sibling path of the new L1 to L2 message tree root.
     */
    newL1ToL2MessageTreeRootSiblingPath: Tuple<Fr, typeof L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH>;
    /**
     * Snapshot of the L1 to L2 message tree at the start of the rollup.
     */
    startL1ToL2MessageTreeSnapshot: AppendOnlyTreeSnapshot;
    /**
     * Snapshot of the historical block roots tree at the start of the rollup.
     */
    startArchiveSnapshot: AppendOnlyTreeSnapshot;
    /**
     * Sibling path of the new block tree root.
     */
    newArchiveSiblingPath: Tuple<Fr, typeof ARCHIVE_HEIGHT>;
    constructor(
    /**
     * The previous rollup data.
     * Note: Root rollup circuit is the latest circuit the chain of circuits and the previous rollup data is the data
     * from 2 merge or base rollup circuits.
     */
    previousRollupData: [PreviousRollupData, PreviousRollupData], 
    /**
     * The original and converted roots of the L1 to L2 messages subtrees.
     */
    l1ToL2Roots: RootParityInput<typeof NESTED_RECURSIVE_PROOF_LENGTH>, 
    /**
     * New L1 to L2 messages.
     */
    newL1ToL2Messages: Tuple<Fr, typeof NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP>, 
    /**
     * Sibling path of the new L1 to L2 message tree root.
     */
    newL1ToL2MessageTreeRootSiblingPath: Tuple<Fr, typeof L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH>, 
    /**
     * Snapshot of the L1 to L2 message tree at the start of the rollup.
     */
    startL1ToL2MessageTreeSnapshot: AppendOnlyTreeSnapshot, 
    /**
     * Snapshot of the historical block roots tree at the start of the rollup.
     */
    startArchiveSnapshot: AppendOnlyTreeSnapshot, 
    /**
     * Sibling path of the new block tree root.
     */
    newArchiveSiblingPath: Tuple<Fr, typeof ARCHIVE_HEIGHT>);
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new RootRollupInputs instance.
     */
    static from(fields: FieldsOf<RootRollupInputs>): RootRollupInputs;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<RootRollupInputs>): readonly [[PreviousRollupData, PreviousRollupData], RootParityInput<109>, [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], AppendOnlyTreeSnapshot, AppendOnlyTreeSnapshot, [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr]];
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new RootRollupInputs instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): RootRollupInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new RootRollupInputs instance.
     */
    static fromString(str: string): RootRollupInputs;
}
/**
 * Represents public inputs of the root rollup circuit.
 *
 * NOTE: in practice, we'll hash all of this up into a single public input, for cheap on-chain verification.
 */
export declare class RootRollupPublicInputs {
    /** Snapshot of archive tree after this block/rollup been processed */
    archive: AppendOnlyTreeSnapshot;
    /** The root for the protocol circuits vk tree */
    vkTreeRoot: Fr;
    /** A header of an L2 block. */
    header: Header;
    constructor(
    /** Snapshot of archive tree after this block/rollup been processed */
    archive: AppendOnlyTreeSnapshot, 
    /** The root for the protocol circuits vk tree */
    vkTreeRoot: Fr, 
    /** A header of an L2 block. */
    header: Header);
    static getFields(fields: FieldsOf<RootRollupPublicInputs>): readonly [AppendOnlyTreeSnapshot, Fr, Header];
    toBuffer(): Buffer;
    toFields(): Fr[];
    static from(fields: FieldsOf<RootRollupPublicInputs>): RootRollupPublicInputs;
    /**
     * Deserializes a buffer into a `RootRollupPublicInputs` object.
     * @param buffer - The buffer to deserialize.
     * @returns The deserialized `RootRollupPublicInputs` object.
     */
    static fromBuffer(buffer: Buffer | BufferReader): RootRollupPublicInputs;
    toString(): string;
    static fromString(str: string): RootRollupPublicInputs;
}
//# sourceMappingURL=root_rollup.d.ts.map