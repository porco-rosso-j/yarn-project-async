import { BufferReader } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { MembershipWitness } from '../membership_witness.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
import { BaseOrMergeRollupPublicInputs } from './base_or_merge_rollup_public_inputs.js';
/**
 * Represents the data of a previous merge or base rollup circuit.
 */
export declare class PreviousRollupData {
    /**
     * Public inputs to the base or merge rollup circuit.
     */
    baseOrMergeRollupPublicInputs: BaseOrMergeRollupPublicInputs;
    /**
     * The proof of the base or merge rollup circuit.
     */
    proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
    /**
     * The verification key of the base or merge rollup circuit.
     */
    vk: VerificationKeyAsFields;
    /**
     * Sibling path of the rollup circuit's vk in a big tree of rollup circuit vks.
     */
    vkWitness: MembershipWitness<typeof VK_TREE_HEIGHT>;
    constructor(
    /**
     * Public inputs to the base or merge rollup circuit.
     */
    baseOrMergeRollupPublicInputs: BaseOrMergeRollupPublicInputs, 
    /**
     * The proof of the base or merge rollup circuit.
     */
    proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>, 
    /**
     * The verification key of the base or merge rollup circuit.
     */
    vk: VerificationKeyAsFields, 
    /**
     * Sibling path of the rollup circuit's vk in a big tree of rollup circuit vks.
     */
    vkWitness: MembershipWitness<typeof VK_TREE_HEIGHT>);
    /**
     * Serializes previous rollup data to a buffer.
     * @returns The buffer of the serialized previous rollup data.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes previous rollup data from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new PreviousRollupData instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PreviousRollupData;
}
//# sourceMappingURL=previous_rollup_data.d.ts.map