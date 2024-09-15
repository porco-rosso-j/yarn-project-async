import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof, makeEmptyRecursiveProof } from '../recursive_proof.js';
import { VerificationKeyData } from '../verification_key.js';
import { PublicKernelCircuitPublicInputs } from './public_kernel_circuit_public_inputs.js';
/**
 * Data of the previous public kernel iteration in the chain of kernels.
 */
export class PublicKernelData {
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
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(reader.readObject(PublicKernelCircuitPublicInputs), RecursiveProof.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH), reader.readObject(VerificationKeyData), reader.readNumber(), reader.readArray(VK_TREE_HEIGHT, Fr));
    }
    static empty() {
        return new this(PublicKernelCircuitPublicInputs.empty(), makeEmptyRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH), VerificationKeyData.makeFake(), 0, makeTuple(VK_TREE_HEIGHT, Fr.zero));
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.publicInputs, this.proof, this.vk, this.vkIndex, this.vkPath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tlcm5lbF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3B1YmxpY19rZXJuZWxfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWhGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTNGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjtJQUNFOztPQUVHO0lBQ0ksWUFBNkM7SUFDcEQ7O09BRUc7SUFDSSxLQUEyRDtJQUNsRTs7T0FFRztJQUNJLEVBQXVCO0lBQzlCOztPQUVHO0lBQ0ksT0FBZTtJQUN0Qjs7T0FFRztJQUNJLE1BQXdDO1FBaEJ4QyxpQkFBWSxHQUFaLFlBQVksQ0FBaUM7UUFJN0MsVUFBSyxHQUFMLEtBQUssQ0FBc0Q7UUFJM0QsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7UUFJdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUlmLFdBQU0sR0FBTixNQUFNLENBQWtDO0lBQzlDLENBQUM7SUFFSixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLElBQUksQ0FDYixNQUFNLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDLEVBQ2xELGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLDZCQUE2QixDQUFDLEVBQ2hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFDdEMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FDckMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxJQUFJLENBQ2IsK0JBQStCLENBQUMsS0FBSyxFQUFFLEVBQ3ZDLHVCQUF1QixDQUF1Qyw2QkFBNkIsQ0FBQyxFQUM1RixtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsRUFDOUIsQ0FBQyxFQUNELFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlGLENBQUM7Q0FDRiJ9