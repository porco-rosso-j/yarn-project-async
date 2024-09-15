import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof, makeEmptyRecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
import { PrivateKernelCircuitPublicInputs } from './private_kernel_circuit_public_inputs.js';
/**
 * Data of the previous kernel iteration in the chain of kernels.
 */
export class PrivateKernelData {
    constructor(
    /**
     * Public inputs of the previous kernel.
     */
    publicInputs, 
    /**
     * Proof of the previous kernel.
     */
    proof, 
    /**
     * Verification key of the previous kernel.
     */
    vk, 
    /**
     * Index of the previous kernel's vk in a tree of vks.
     */
    vkIndex, 
    /**
     * Sibling path of the previous kernel's vk in a tree of vks.
     */
    vkPath) {
        this.publicInputs = publicInputs;
        this.proof = proof;
        this.vk = vk;
        this.vkIndex = vkIndex;
        this.vkPath = vkPath;
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.publicInputs, this.proof, this.vk, this.vkIndex, this.vkPath);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(reader.readObject(PrivateKernelCircuitPublicInputs), RecursiveProof.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH), reader.readObject(VerificationKeyAsFields), reader.readNumber(), reader.readArray(VK_TREE_HEIGHT, Fr));
    }
    static empty() {
        return new PrivateKernelData(PrivateKernelCircuitPublicInputs.empty(), makeEmptyRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH), VerificationKeyAsFields.makeFake(), 0, makeTuple(VK_TREE_HEIGHT, Fr.zero));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9wcml2YXRlX2tlcm5lbF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFGLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsY0FBYyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFN0Y7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCO0lBQ0U7O09BRUc7SUFDSSxZQUE4QztJQUNyRDs7T0FFRztJQUNJLEtBQTJEO0lBQ2xFOztPQUVHO0lBQ0ksRUFBMkI7SUFDbEM7O09BRUc7SUFDSSxPQUFlO0lBQ3RCOztPQUVHO0lBQ0ksTUFBd0M7UUFoQnhDLGlCQUFZLEdBQVosWUFBWSxDQUFrQztRQUk5QyxVQUFLLEdBQUwsS0FBSyxDQUFzRDtRQUkzRCxPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUkzQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSWYsV0FBTSxHQUFOLE1BQU0sQ0FBa0M7SUFDOUMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLElBQUksQ0FDYixNQUFNLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLEVBQ25ELGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLDZCQUE2QixDQUFDLEVBQ2hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFDMUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FDckMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxpQkFBaUIsQ0FDMUIsZ0NBQWdDLENBQUMsS0FBSyxFQUFFLEVBQ3hDLHVCQUF1QixDQUF1Qyw2QkFBNkIsQ0FBQyxFQUM1Rix1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsRUFDbEMsQ0FBQyxFQUNELFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGIn0=