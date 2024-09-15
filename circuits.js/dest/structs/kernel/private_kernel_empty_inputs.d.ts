import { type Fr } from '@aztec/foundation/fields';
import { type FieldsOf } from '@aztec/foundation/types';
import { type RECURSIVE_PROOF_LENGTH } from '../../constants.gen.js';
import { type Header } from '../header.js';
import { type RecursiveProof } from '../recursive_proof.js';
import { type VerificationKeyAsFields } from '../verification_key.js';
export type PrivateKernelEmptyInputData = Omit<FieldsOf<PrivateKernelEmptyInputs>, 'emptyNested'>;
export declare class PrivateKernelEmptyInputs {
    readonly emptyNested: EmptyNestedData;
    readonly header: Header;
    readonly chainId: Fr;
    readonly version: Fr;
    readonly vkTreeRoot: Fr;
    constructor(emptyNested: EmptyNestedData, header: Header, chainId: Fr, version: Fr, vkTreeRoot: Fr);
    toBuffer(): Buffer;
    static from(fields: FieldsOf<PrivateKernelEmptyInputs>): PrivateKernelEmptyInputs;
}
export declare class EmptyNestedCircuitInputs {
    toBuffer(): Buffer;
}
export declare class EmptyNestedData {
    readonly proof: RecursiveProof<typeof RECURSIVE_PROOF_LENGTH>;
    readonly vk: VerificationKeyAsFields;
    constructor(proof: RecursiveProof<typeof RECURSIVE_PROOF_LENGTH>, vk: VerificationKeyAsFields);
    toBuffer(): Buffer;
}
//# sourceMappingURL=private_kernel_empty_inputs.d.ts.map