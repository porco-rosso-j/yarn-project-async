import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { FUNCTION_TREE_HEIGHT, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, RECURSIVE_PROOF_LENGTH } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { MembershipWitness } from '../membership_witness.js';
import { PrivateCallStackItem } from '../private_call_stack_item.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
/**
 * Private call data.
 */
export declare class PrivateCallData {
    /**
     * The call stack item currently being processed.
     */
    callStackItem: PrivateCallStackItem;
    /**
     * Other public call stack items to be processed.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>;
    /**
     * The public call request for the teardown function.
     */
    publicTeardownCallRequest: CallRequest;
    /**
     * The proof of the execution of this private call.
     */
    proof: RecursiveProof<typeof RECURSIVE_PROOF_LENGTH>;
    /**
     * The verification key for the function being invoked.
     */
    vk: VerificationKeyAsFields;
    /**
     * Artifact hash of the contract class for this private call.
     */
    contractClassArtifactHash: Fr;
    /**
     * Public bytecode commitment for the contract class for this private call.
     */
    contractClassPublicBytecodeCommitment: Fr;
    /**
     * Public keys hash of the contract instance.
     */
    publicKeysHash: Fr;
    /**
     * Salted initialization hash of the contract instance.
     */
    saltedInitializationHash: Fr;
    /**
     * The membership witness for the function leaf corresponding to the function being invoked.
     */
    functionLeafMembershipWitness: MembershipWitness<typeof FUNCTION_TREE_HEIGHT>;
    /**
     * The hash of the ACIR of the function being invoked.
     */
    acirHash: Fr;
    constructor(
    /**
     * The call stack item currently being processed.
     */
    callStackItem: PrivateCallStackItem, 
    /**
     * Other public call stack items to be processed.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>, 
    /**
     * The public call request for the teardown function.
     */
    publicTeardownCallRequest: CallRequest, 
    /**
     * The proof of the execution of this private call.
     */
    proof: RecursiveProof<typeof RECURSIVE_PROOF_LENGTH>, 
    /**
     * The verification key for the function being invoked.
     */
    vk: VerificationKeyAsFields, 
    /**
     * Artifact hash of the contract class for this private call.
     */
    contractClassArtifactHash: Fr, 
    /**
     * Public bytecode commitment for the contract class for this private call.
     */
    contractClassPublicBytecodeCommitment: Fr, 
    /**
     * Public keys hash of the contract instance.
     */
    publicKeysHash: Fr, 
    /**
     * Salted initialization hash of the contract instance.
     */
    saltedInitializationHash: Fr, 
    /**
     * The membership witness for the function leaf corresponding to the function being invoked.
     */
    functionLeafMembershipWitness: MembershipWitness<typeof FUNCTION_TREE_HEIGHT>, 
    /**
     * The hash of the ACIR of the function being invoked.
     */
    acirHash: Fr);
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<PrivateCallData>): readonly [PrivateCallStackItem, [CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest, CallRequest], CallRequest, RecursiveProof<93>, VerificationKeyAsFields, Fr, Fr, Fr, Fr, MembershipWitness<5>, Fr];
    static from(fields: FieldsOf<PrivateCallData>): PrivateCallData;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PrivateCallData;
}
//# sourceMappingURL=private_call_data.d.ts.map