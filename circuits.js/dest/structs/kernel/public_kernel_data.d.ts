import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof } from '../recursive_proof.js';
import { type UInt32 } from '../shared.js';
import { VerificationKeyData } from '../verification_key.js';
import { PublicKernelCircuitPublicInputs } from './public_kernel_circuit_public_inputs.js';
/**
 * Data of the previous public kernel iteration in the chain of kernels.
 */
export declare class PublicKernelData {
    /**
     * Public inputs of the previous kernel.
     */
    publicInputs: PublicKernelCircuitPublicInputs;
    /**
     * Proof of the previous kernel.
     */
    proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
    /**
     * Verification key of the previous kernel.
     */
    vk: VerificationKeyData;
    /**
     * Index of the previous kernel's vk in a tree of vks.
     */
    vkIndex: UInt32;
    /**
     * Sibling path of the previous kernel's vk in a tree of vks.
     */
    vkPath: Tuple<Fr, typeof VK_TREE_HEIGHT>;
    constructor(
    /**
     * Public inputs of the previous kernel.
     */
    publicInputs: PublicKernelCircuitPublicInputs, 
    /**
     * Proof of the previous kernel.
     */
    proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>, 
    /**
     * Verification key of the previous kernel.
     */
    vk: VerificationKeyData, 
    /**
     * Index of the previous kernel's vk in a tree of vks.
     */
    vkIndex: UInt32, 
    /**
     * Sibling path of the previous kernel's vk in a tree of vks.
     */
    vkPath: Tuple<Fr, typeof VK_TREE_HEIGHT>);
    static fromBuffer(buffer: Buffer | BufferReader): PublicKernelData;
    static empty(): PublicKernelData;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
}
//# sourceMappingURL=public_kernel_data.d.ts.map