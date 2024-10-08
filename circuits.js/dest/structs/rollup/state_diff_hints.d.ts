import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { MAX_NULLIFIERS_PER_TX, NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH, NULLIFIER_TREE_HEIGHT, PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH } from '../../constants.gen.js';
import { MembershipWitness } from '../membership_witness.js';
import { NullifierLeafPreimage } from '../trees/index.js';
/**
 * Hints used while proving state diff validity.
 */
export declare class StateDiffHints {
    /**
     * The nullifiers which need to be updated to perform the batch insertion of the new nullifiers.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    nullifierPredecessorPreimages: Tuple<NullifierLeafPreimage, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    nullifierPredecessorMembershipWitnesses: Tuple<MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * The nullifiers to be inserted in the tree, sorted high to low.
     */
    sortedNullifiers: Tuple<Fr, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * The indexes of the sorted nullifiers to the original ones.
     */
    sortedNullifierIndexes: Tuple<number, typeof MAX_NULLIFIERS_PER_TX>;
    /**
     * Sibling path "pointing to" where the new note hash subtree should be inserted into the note hash tree.
     */
    noteHashSubtreeSiblingPath: Tuple<Fr, typeof NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH>;
    /**
     * Sibling path "pointing to" where the new nullifiers subtree should be inserted into the nullifier tree.
     */
    nullifierSubtreeSiblingPath: Tuple<Fr, typeof NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH>;
    /**
     * Sibling path "pointing to" where the new public data subtree should be inserted into the public data tree.
     */
    publicDataSiblingPath: Tuple<Fr, typeof PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH>;
    constructor(
    /**
     * The nullifiers which need to be updated to perform the batch insertion of the new nullifiers.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    nullifierPredecessorPreimages: Tuple<NullifierLeafPreimage, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    nullifierPredecessorMembershipWitnesses: Tuple<MembershipWitness<typeof NULLIFIER_TREE_HEIGHT>, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * The nullifiers to be inserted in the tree, sorted high to low.
     */
    sortedNullifiers: Tuple<Fr, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * The indexes of the sorted nullifiers to the original ones.
     */
    sortedNullifierIndexes: Tuple<number, typeof MAX_NULLIFIERS_PER_TX>, 
    /**
     * Sibling path "pointing to" where the new note hash subtree should be inserted into the note hash tree.
     */
    noteHashSubtreeSiblingPath: Tuple<Fr, typeof NOTE_HASH_SUBTREE_SIBLING_PATH_LENGTH>, 
    /**
     * Sibling path "pointing to" where the new nullifiers subtree should be inserted into the nullifier tree.
     */
    nullifierSubtreeSiblingPath: Tuple<Fr, typeof NULLIFIER_SUBTREE_SIBLING_PATH_LENGTH>, 
    /**
     * Sibling path "pointing to" where the new public data subtree should be inserted into the public data tree.
     */
    publicDataSiblingPath: Tuple<Fr, typeof PUBLIC_DATA_SUBTREE_SIBLING_PATH_LENGTH>);
    static from(fields: FieldsOf<StateDiffHints>): StateDiffHints;
    static getFields(fields: FieldsOf<StateDiffHints>): readonly [[NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage, NullifierLeafPreimage], [MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>, MembershipWitness<20>], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr]];
    /**
     * Serializes the state diff hints to a buffer.
     * @returns A buffer of the serialized state diff hints.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes the state diff hints from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new StateDiffHints instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): StateDiffHints;
    static empty(): StateDiffHints;
}
//# sourceMappingURL=state_diff_hints.d.ts.map