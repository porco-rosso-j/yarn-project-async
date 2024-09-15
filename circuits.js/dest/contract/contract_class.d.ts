import { type ContractArtifact, type FunctionArtifact } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { type ContractClass, type ContractClassWithId } from '@aztec/types/contracts';
import { type ContractClassIdPreimage } from './contract_class_id.js';
/** Contract artifact including its artifact hash */
type ContractArtifactWithHash = ContractArtifact & {
    artifactHash: Fr;
};
/** Creates a ContractClass from a contract compilation artifact. */
export declare function getContractClassFromArtifact(artifact: ContractArtifact | ContractArtifactWithHash): Promise<ContractClassWithId & ContractClassIdPreimage>;
export declare function getContractClassPrivateFunctionFromArtifact(f: FunctionArtifact): ContractClass['privateFunctions'][number];
/**
 * Calculates the hash of a verification key.
 * Returns zero for consistency with Noir.
 */
export declare function computeVerificationKeyHash(_verificationKeyInBase64: string): Fr;
export {};
//# sourceMappingURL=contract_class.d.ts.map