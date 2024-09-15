import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { VK_TREE_HEIGHT } from '../../constants.gen.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
import { ParityPublicInputs } from './parity_public_inputs.js';
export declare class RootParityInput<PROOF_LENGTH extends number> {
    /** The proof of the execution of the parity circuit. */
    readonly proof: RecursiveProof<PROOF_LENGTH>;
    /** The circuit's verification key */
    readonly verificationKey: VerificationKeyAsFields;
    /** The vk path in the vk tree*/
    readonly vkPath: Tuple<Fr, typeof VK_TREE_HEIGHT>;
    /** The public inputs of the parity circuit. */
    readonly publicInputs: ParityPublicInputs;
    constructor(
    /** The proof of the execution of the parity circuit. */
    proof: RecursiveProof<PROOF_LENGTH>, 
    /** The circuit's verification key */
    verificationKey: VerificationKeyAsFields, 
    /** The vk path in the vk tree*/
    vkPath: Tuple<Fr, typeof VK_TREE_HEIGHT>, 
    /** The public inputs of the parity circuit. */
    publicInputs: ParityPublicInputs);
    toBuffer(): Buffer;
    toString(): string;
    static from<PROOF_LENGTH extends number>(fields: FieldsOf<RootParityInput<PROOF_LENGTH>>): RootParityInput<PROOF_LENGTH>;
    static getFields<PROOF_LENGTH extends number>(fields: FieldsOf<RootParityInput<PROOF_LENGTH>>): readonly [RecursiveProof<PROOF_LENGTH>, VerificationKeyAsFields, [Fr, Fr, Fr, Fr, Fr], ParityPublicInputs];
    static fromBuffer<PROOF_LENGTH extends number | undefined>(buffer: Buffer | BufferReader, expectedSize?: PROOF_LENGTH): RootParityInput<PROOF_LENGTH extends number ? PROOF_LENGTH : number>;
    static fromString<PROOF_LENGTH extends number | undefined>(str: string, expectedSize?: PROOF_LENGTH): RootParityInput<PROOF_LENGTH extends number ? PROOF_LENGTH : number>;
}
//# sourceMappingURL=root_parity_input.d.ts.map