import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { NESTED_RECURSIVE_PROOF_LENGTH, VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof, makeEmptyRecursiveProof } from '../recursive_proof.js';
import { VerificationKeyData } from '../verification_key.js';
import { KernelCircuitPublicInputs } from './kernel_circuit_public_inputs.js';
export class KernelData {
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
    static empty() {
        return new this(KernelCircuitPublicInputs.empty(), makeEmptyRecursiveProof(NESTED_RECURSIVE_PROOF_LENGTH), VerificationKeyData.makeFake(), 0, makeTuple(VK_TREE_HEIGHT, Fr.zero));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(reader.readObject(KernelCircuitPublicInputs), RecursiveProof.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH), reader.readObject(VerificationKeyData), reader.readNumber(), reader.readArray(VK_TREE_HEIGHT, Fr));
    }
    toBuffer() {
        return serializeToBuffer(this.publicInputs, this.proof, this.vk, this.vkIndex, this.vkPath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VybmVsX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwva2VybmVsX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUU5RSxNQUFNLE9BQU8sVUFBVTtJQUNyQjtJQUNFOztPQUVHO0lBQ0ksWUFBdUM7SUFDOUM7O09BRUc7SUFDSSxLQUEyRDtJQUNsRTs7T0FFRztJQUNJLEVBQXVCO0lBQzlCOztPQUVHO0lBQ0ksT0FBZTtJQUN0Qjs7T0FFRztJQUNJLE1BQXdDO1FBaEJ4QyxpQkFBWSxHQUFaLFlBQVksQ0FBMkI7UUFJdkMsVUFBSyxHQUFMLEtBQUssQ0FBc0Q7UUFJM0QsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7UUFJdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUlmLFdBQU0sR0FBTixNQUFNLENBQWtDO0lBQzlDLENBQUM7SUFFSixNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxJQUFJLENBQ2IseUJBQXlCLENBQUMsS0FBSyxFQUFFLEVBQ2pDLHVCQUF1QixDQUFDLDZCQUE2QixDQUFDLEVBQ3RELG1CQUFtQixDQUFDLFFBQVEsRUFBRSxFQUM5QixDQUFDLEVBQ0QsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxJQUFJLENBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUM1QyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSw2QkFBNkIsQ0FBQyxFQUNoRSxNQUFNLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQ3RDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztDQUNGIn0=