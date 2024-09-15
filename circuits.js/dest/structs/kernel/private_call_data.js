import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { FUNCTION_TREE_HEIGHT, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, RECURSIVE_PROOF_LENGTH, } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { MembershipWitness } from '../membership_witness.js';
import { PrivateCallStackItem } from '../private_call_stack_item.js';
import { RecursiveProof } from '../recursive_proof.js';
import { VerificationKeyAsFields } from '../verification_key.js';
/**
 * Private call data.
 */
export class PrivateCallData {
    constructor(
    /**
     * The call stack item currently being processed.
     */
    callStackItem, 
    /**
     * Other public call stack items to be processed.
     */
    publicCallStack, 
    /**
     * The public call request for the teardown function.
     */
    publicTeardownCallRequest, 
    /**
     * The proof of the execution of this private call.
     */
    proof, 
    /**
     * The verification key for the function being invoked.
     */
    vk, 
    /**
     * Artifact hash of the contract class for this private call.
     */
    contractClassArtifactHash, 
    /**
     * Public bytecode commitment for the contract class for this private call.
     */
    contractClassPublicBytecodeCommitment, 
    /**
     * Public keys hash of the contract instance.
     */
    publicKeysHash, 
    /**
     * Salted initialization hash of the contract instance.
     */
    saltedInitializationHash, 
    /**
     * The membership witness for the function leaf corresponding to the function being invoked.
     */
    functionLeafMembershipWitness, 
    /**
     * The hash of the ACIR of the function being invoked.
     */
    acirHash) {
        this.callStackItem = callStackItem;
        this.publicCallStack = publicCallStack;
        this.publicTeardownCallRequest = publicTeardownCallRequest;
        this.proof = proof;
        this.vk = vk;
        this.contractClassArtifactHash = contractClassArtifactHash;
        this.contractClassPublicBytecodeCommitment = contractClassPublicBytecodeCommitment;
        this.publicKeysHash = publicKeysHash;
        this.saltedInitializationHash = saltedInitializationHash;
        this.functionLeafMembershipWitness = functionLeafMembershipWitness;
        this.acirHash = acirHash;
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [
            fields.callStackItem,
            fields.publicCallStack,
            fields.publicTeardownCallRequest,
            fields.proof,
            fields.vk,
            fields.contractClassArtifactHash,
            fields.contractClassPublicBytecodeCommitment,
            fields.publicKeysHash,
            fields.saltedInitializationHash,
            fields.functionLeafMembershipWitness,
            fields.acirHash,
        ];
    }
    static from(fields) {
        return new PrivateCallData(...PrivateCallData.getFields(fields));
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...PrivateCallData.getFields(this));
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PrivateCallData(reader.readObject(PrivateCallStackItem), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, CallRequest), reader.readObject(CallRequest), RecursiveProof.fromBuffer(reader, RECURSIVE_PROOF_LENGTH), reader.readObject(VerificationKeyAsFields), reader.readObject(Fr), reader.readObject(Fr), reader.readObject(Fr), reader.readObject(Fr), reader.readObject(MembershipWitness.deserializer(FUNCTION_TREE_HEIGHT)), reader.readObject(Fr));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9jYWxsX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwvcHJpdmF0ZV9jYWxsX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcxRixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHFDQUFxQyxFQUNyQyxzQkFBc0IsR0FDdkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFDMUI7SUFDRTs7T0FFRztJQUNJLGFBQW1DO0lBQzFDOztPQUVHO0lBQ0ksZUFBaUY7SUFDeEY7O09BRUc7SUFDSSx5QkFBc0M7SUFDN0M7O09BRUc7SUFDSSxLQUFvRDtJQUMzRDs7T0FFRztJQUNJLEVBQTJCO0lBQ2xDOztPQUVHO0lBQ0kseUJBQTZCO0lBQ3BDOztPQUVHO0lBQ0kscUNBQXlDO0lBQ2hEOztPQUVHO0lBQ0ksY0FBa0I7SUFDekI7O09BRUc7SUFDSSx3QkFBNEI7SUFDbkM7O09BRUc7SUFDSSw2QkFBNkU7SUFDcEY7O09BRUc7SUFDSSxRQUFZO1FBeENaLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUluQyxvQkFBZSxHQUFmLGVBQWUsQ0FBa0U7UUFJakYsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUFhO1FBSXRDLFVBQUssR0FBTCxLQUFLLENBQStDO1FBSXBELE9BQUUsR0FBRixFQUFFLENBQXlCO1FBSTNCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBSTtRQUk3QiwwQ0FBcUMsR0FBckMscUNBQXFDLENBQUk7UUFJekMsbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFJbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFJO1FBSTVCLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBZ0Q7UUFJN0UsYUFBUSxHQUFSLFFBQVEsQ0FBSTtJQUNsQixDQUFDO0lBRUo7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBaUM7UUFDaEQsT0FBTztZQUNMLE1BQU0sQ0FBQyxhQUFhO1lBQ3BCLE1BQU0sQ0FBQyxlQUFlO1lBQ3RCLE1BQU0sQ0FBQyx5QkFBeUI7WUFDaEMsTUFBTSxDQUFDLEtBQUs7WUFDWixNQUFNLENBQUMsRUFBRTtZQUNULE1BQU0sQ0FBQyx5QkFBeUI7WUFDaEMsTUFBTSxDQUFDLHFDQUFxQztZQUM1QyxNQUFNLENBQUMsY0FBYztZQUNyQixNQUFNLENBQUMsd0JBQXdCO1lBQy9CLE1BQU0sQ0FBQyw2QkFBNkI7WUFDcEMsTUFBTSxDQUFDLFFBQVE7U0FDUCxDQUFDO0lBQ2IsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBaUM7UUFDM0MsT0FBTyxJQUFJLGVBQWUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGVBQWUsQ0FDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxFQUFFLFdBQVcsQ0FBQyxFQUNwRSxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUM5QixjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxzQkFBc0IsQ0FBQyxFQUN6RCxNQUFNLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLEVBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFDdkUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9