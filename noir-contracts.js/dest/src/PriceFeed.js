/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Point, loadContractArtifact, } from '@aztec/aztec.js';
import PriceFeedContractArtifactJson from '../artifacts/price_feed_contract-PriceFeed.json' assert { type: 'json' };
export const PriceFeedContractArtifact = loadContractArtifact(PriceFeedContractArtifactJson);
/**
 * Type-safe interface for contract PriceFeed;
 */
export class PriceFeedContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, PriceFeedContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, PriceFeedContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet) {
        return new DeployMethod(Point.ZERO, wallet, PriceFeedContractArtifact, PriceFeedContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey, wallet) {
        return new DeployMethod(publicKey, wallet, PriceFeedContractArtifact, PriceFeedContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return PriceFeedContractArtifact;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpY2VGZWVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1ByaWNlRmVlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFFdEMsb0JBQW9CO0FBQ3BCLE9BQU8sRUFJTCxRQUFRLEVBRVIsWUFBWSxFQUlaLFlBQVksRUFPWixLQUFLLEVBSUwsb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyw2QkFBNkIsTUFBTSxpREFBaUQsQ0FBQyxTQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUVwSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxvQkFBb0IsQ0FBQyw2QkFBcUQsQ0FBQyxDQUFDO0FBRXJIOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7SUFDakQsWUFBb0IsUUFBcUMsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxRQUFRLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBcUIsRUFBRSxNQUFjO1FBQzFELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBK0IsQ0FBQztJQUNoRyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWM7UUFDakMsT0FBTyxJQUFJLFlBQVksQ0FDckIsS0FBSyxDQUFDLElBQUksRUFDVixNQUFNLEVBQ04seUJBQXlCLEVBQ3pCLGlCQUFpQixDQUFDLEVBQUUsRUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBb0IsRUFBRSxNQUFjO1FBQ3BFLE9BQU8sSUFBSSxZQUFZLENBQ3JCLFNBQVMsRUFDVCxNQUFNLEVBQ04seUJBQXlCLEVBQ3pCLGlCQUFpQixDQUFDLEVBQUUsRUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLHlCQUF5QixDQUFDO0lBQ25DLENBQUM7Q0EyQkYifQ==