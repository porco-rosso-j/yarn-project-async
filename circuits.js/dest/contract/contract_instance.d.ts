import { type ContractArtifact, type FunctionArtifact } from '@aztec/foundation/abi';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
/**
 * Generates a Contract Instance from the deployment params.
 * @param artifact - The account contract build artifact.
 * @param opts - Options for the deployment.
 * @returns - The contract instance
 */
export declare function getContractInstanceFromDeployParams(artifact: ContractArtifact, opts: {
    constructorArtifact?: FunctionArtifact | string;
    constructorArgs?: any[];
    skipArgsDecoding?: boolean;
    salt?: Fr;
    publicKeysHash?: Fr;
    deployer?: AztecAddress;
}): Promise<ContractInstanceWithAddress>;
//# sourceMappingURL=contract_instance.d.ts.map