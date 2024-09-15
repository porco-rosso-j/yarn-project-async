/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Point, loadContractArtifact, } from '@aztec/aztec.js';
import EasyPrivateTokenContractArtifactJson from '../artifacts/easy_private_token_contract-EasyPrivateToken.json' assert { type: 'json' };
export const EasyPrivateTokenContractArtifact = loadContractArtifact(EasyPrivateTokenContractArtifactJson);
/**
 * Type-safe interface for contract EasyPrivateToken;
 */
export class EasyPrivateTokenContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, EasyPrivateTokenContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, EasyPrivateTokenContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, initial_supply, owner) {
        return new DeployMethod(Point.ZERO, wallet, EasyPrivateTokenContractArtifact, EasyPrivateTokenContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey, wallet, initial_supply, owner) {
        return new DeployMethod(publicKey, wallet, EasyPrivateTokenContractArtifact, EasyPrivateTokenContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return EasyPrivateTokenContractArtifact;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFzeVByaXZhdGVUb2tlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FYXN5UHJpdmF0ZVRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUV0QyxvQkFBb0I7QUFDcEIsT0FBTyxFQUlMLFFBQVEsRUFFUixZQUFZLEVBSVosWUFBWSxFQU9aLEtBQUssRUFJTCxvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLG9DQUFvQyxNQUFNLGdFQUFnRSxDQUFDLFNBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBRTFJLE1BQU0sQ0FBQyxNQUFNLGdDQUFnQyxHQUFHLG9CQUFvQixDQUNsRSxvQ0FBNEQsQ0FDN0QsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFlBQVk7SUFDeEQsWUFBb0IsUUFBcUMsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxRQUFRLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBcUIsRUFBRSxNQUFjO1FBQzFELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBc0MsQ0FBQztJQUM5RyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWMsRUFBRSxjQUErQixFQUFFLEtBQXVCO1FBQzNGLE9BQU8sSUFBSSxZQUFZLENBQ3JCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsTUFBTSxFQUNOLGdDQUFnQyxFQUNoQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLG1CQUFtQixDQUMvQixTQUFvQixFQUNwQixNQUFjLEVBQ2QsY0FBK0IsRUFDL0IsS0FBdUI7UUFFdkIsT0FBTyxJQUFJLFlBQVksQ0FDckIsU0FBUyxFQUNULE1BQU0sRUFDTixnQ0FBZ0MsRUFDaEMsd0JBQXdCLENBQUMsRUFBRSxFQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sZ0NBQWdDLENBQUM7SUFDMUMsQ0FBQztDQWlDRiJ9