/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Point, loadContractArtifact, } from '@aztec/aztec.js';
import TokenBridgeContractArtifactJson from '../artifacts/token_bridge_contract-TokenBridge.json' assert { type: 'json' };
export const TokenBridgeContractArtifact = loadContractArtifact(TokenBridgeContractArtifactJson);
/**
 * Type-safe interface for contract TokenBridge;
 */
export class TokenBridgeContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, TokenBridgeContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, TokenBridgeContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, token) {
        return new DeployMethod(Point.ZERO, wallet, TokenBridgeContractArtifact, TokenBridgeContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey, wallet, token) {
        return new DeployMethod(publicKey, wallet, TokenBridgeContractArtifact, TokenBridgeContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return TokenBridgeContractArtifact;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5CcmlkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvVG9rZW5CcmlkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXNDO0FBRXRDLG9CQUFvQjtBQUNwQixPQUFPLEVBSUwsUUFBUSxFQUVSLFlBQVksRUFJWixZQUFZLEVBT1osS0FBSyxFQUlMLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sK0JBQStCLE1BQU0scURBQXFELENBQUMsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFFMUgsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsb0JBQW9CLENBQzdELCtCQUF1RCxDQUN4RCxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsWUFBWTtJQUNuRCxZQUFvQixRQUFxQyxFQUFFLE1BQWM7UUFDdkUsS0FBSyxDQUFDLFFBQVEsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFxQixFQUFFLE1BQWM7UUFDMUQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFpQyxDQUFDO0lBQ3BHLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQXVCO1FBQzFELE9BQU8sSUFBSSxZQUFZLENBQ3JCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsTUFBTSxFQUNOLDJCQUEyQixFQUMzQixtQkFBbUIsQ0FBQyxFQUFFLEVBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQW9CLEVBQUUsTUFBYyxFQUFFLEtBQXVCO1FBQzdGLE9BQU8sSUFBSSxZQUFZLENBQ3JCLFNBQVMsRUFDVCxNQUFNLEVBQ04sMkJBQTJCLEVBQzNCLG1CQUFtQixDQUFDLEVBQUUsRUFDdEIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLDJCQUEyQixDQUFDO0lBQ3JDLENBQUM7Q0E4REYifQ==