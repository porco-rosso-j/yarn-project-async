import { Fr } from '@aztec/foundation/fields';
import { ContractBase } from './contract_base.js';
import { DeployMethod } from './deploy_method.js';
/**
 * The Contract class represents a contract and provides utility methods for interacting with it.
 * It enables the creation of ContractFunctionInteraction instances for each function in the contract's ABI,
 * allowing users to call or send transactions to these functions. Additionally, the Contract class can be used
 * to attach the contract instance to a deployed contract on-chain through the PXE, which facilitates
 * interaction with Aztec's privacy protocol.
 */
export class Contract extends ContractBase {
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param artifact - Build artifact of the contract.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, artifact, wallet) {
        console.log('[at in Contract] artifact: ', artifact.name);
        console.log('[at in Contract] address: ', address.toString());
        const instance = await wallet.getContractInstance(address);
        if (instance === undefined) {
            throw new Error(`Contract instance at ${address.toString()} has not been registered in the wallet's PXE`);
        }
        return new Contract(instance, artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of a contract.
     * @param wallet - The wallet for executing the deployment.
     * @param artifact - Build artifact of the contract to deploy
     * @param args - Arguments for the constructor.
     * @param constructorName - The name of the constructor function to call.
     */
    static deploy(wallet, artifact, args, constructorName) {
        console.log('[deploy in Contract] artifact: ', artifact.name);
        console.log('[deploy in Contract] wallet address: ', wallet.getAddress().toString());
        const postDeployCtor = (address, wallet) => Contract.at(address, artifact, wallet);
        return new DeployMethod(Fr.ZERO, wallet, artifact, postDeployCtor, args, constructorName);
    }
    /**
     * Creates a tx to deploy a new instance of a contract using the specified public keys hash to derive the address.
     * @param publicKeysHash - Hash of public keys to use for deriving the address.
     * @param wallet - The wallet for executing the deployment.
     * @param artifact - Build artifact of the contract.
     * @param args - Arguments for the constructor.
     * @param constructorName - The name of the constructor function to call.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet, artifact, args, constructorName) {
        console.log('[deployWithPublicKeysHash in Contract] artifact: ', artifact.name);
        console.log('[deployWithPublicKeysHash in Contract] wallet address: ', wallet.getAddress().toString());
        const postDeployCtor = (address, wallet) => Contract.at(address, artifact, wallet);
        return new DeployMethod(publicKeysHash, wallet, artifact, postDeployCtor, args, constructorName);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFPLFFBQVMsU0FBUSxZQUFZO0lBQ3hDOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQXFCLEVBQUUsUUFBMEIsRUFBRSxNQUFjO1FBQ3RGLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsT0FBTyxDQUFDLFFBQVEsRUFBRSw4Q0FBOEMsQ0FBQyxDQUFDO1FBQzVHLENBQUM7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBYyxFQUFFLFFBQTBCLEVBQUUsSUFBVyxFQUFFLGVBQXdCO1FBQ3BHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFxQixFQUFFLE1BQWMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pHLE9BQU8sSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsd0JBQXdCLENBQ3BDLGNBQWtCLEVBQ2xCLE1BQWMsRUFDZCxRQUEwQixFQUMxQixJQUFXLEVBQ1gsZUFBd0I7UUFFeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUV2RyxNQUFNLGNBQWMsR0FBRyxDQUFDLE9BQXFCLEVBQUUsTUFBYyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekcsT0FBTyxJQUFJLFlBQVksQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ25HLENBQUM7Q0FDRiJ9