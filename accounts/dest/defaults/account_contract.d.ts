import { type AccountContract, type AccountInterface, type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type CompleteAddress } from '@aztec/circuit-types';
import { type ContractArtifact } from '@aztec/foundation/abi';
import { type NodeInfo } from '@aztec/types/interfaces';
/**
 * Base class for implementing an account contract. Requires that the account uses the
 * default entrypoint method signature.
 */
export declare abstract class DefaultAccountContract implements AccountContract {
    private artifact;
    abstract getAuthWitnessProvider(address: CompleteAddress): AuthWitnessProvider;
    abstract getDeploymentArgs(): Promise<any[] | undefined>;
    constructor(artifact: ContractArtifact);
    getContractArtifact(): ContractArtifact;
    getInterface(address: CompleteAddress, nodeInfo: NodeInfo): AccountInterface;
}
//# sourceMappingURL=account_contract.d.ts.map