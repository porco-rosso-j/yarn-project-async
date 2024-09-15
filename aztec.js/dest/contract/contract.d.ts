import { type ContractArtifact } from '@aztec/foundation/abi';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type Wallet } from '../account/index.js';
import { ContractBase } from './contract_base.js';
import { DeployMethod } from './deploy_method.js';
/**
 * The Contract class represents a contract and provides utility methods for interacting with it.
 * It enables the creation of ContractFunctionInteraction instances for each function in the contract's ABI,
 * allowing users to call or send transactions to these functions. Additionally, the Contract class can be used
 * to attach the contract instance to a deployed contract on-chain through the PXE, which facilitates
 * interaction with Aztec's privacy protocol.
 */
export declare class Contract extends ContractBase {
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param artifact - Build artifact of the contract.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, artifact: ContractArtifact, wallet: Wallet): Promise<Contract>;
    /**
     * Creates a tx to deploy a new instance of a contract.
     * @param wallet - The wallet for executing the deployment.
     * @param artifact - Build artifact of the contract to deploy
     * @param args - Arguments for the constructor.
     * @param constructorName - The name of the constructor function to call.
     */
    static deploy(wallet: Wallet, artifact: ContractArtifact, args: any[], constructorName?: string): DeployMethod<Contract>;
    /**
     * Creates a tx to deploy a new instance of a contract using the specified public keys hash to derive the address.
     * @param publicKeysHash - Hash of public keys to use for deriving the address.
     * @param wallet - The wallet for executing the deployment.
     * @param artifact - Build artifact of the contract.
     * @param args - Arguments for the constructor.
     * @param constructorName - The name of the constructor function to call.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, artifact: ContractArtifact, args: any[], constructorName?: string): DeployMethod<Contract>;
}
//# sourceMappingURL=contract.d.ts.map