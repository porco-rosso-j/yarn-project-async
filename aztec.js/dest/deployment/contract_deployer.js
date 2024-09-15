import { Fr } from '@aztec/foundation/fields';
import { DeployMethod } from '../contract/deploy_method.js';
import { Contract } from '../contract/index.js';
/**
 * A class for deploying contract.
 * @remarks Keeping this around even though we have Aztec.nr contract types because it can be useful for non-TS users.
 */
export class ContractDeployer {
    constructor(artifact, wallet, publicKeysHash, constructorName) {
        this.artifact = artifact;
        this.wallet = wallet;
        this.publicKeysHash = publicKeysHash;
        this.constructorName = constructorName;
    }
    /**
     * Deploy a contract using the provided ABI and constructor arguments.
     * This function creates a new DeployMethod instance that can be used to send deployment transactions
     * and query deployment status. The method accepts any number of constructor arguments, which will
     * be passed to the contract's constructor during deployment.
     *
     * @param args - The constructor arguments for the contract being deployed.
     * @returns A DeployMethod instance configured with the ABI, PXE, and constructor arguments.
     */
    deploy(...args) {
        const postDeployCtor = (address, wallet) => Contract.at(address, this.artifact, wallet);
        return new DeployMethod(this.publicKeysHash ?? Fr.ZERO, this.wallet, this.artifact, postDeployCtor, args, this.constructorName);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfZGVwbG95ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVwbG95bWVudC9jb250cmFjdF9kZXBsb3llci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1UsUUFBMEIsRUFDMUIsTUFBYyxFQUNkLGNBQW1CLEVBQ25CLGVBQXdCO1FBSHhCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBSztRQUNuQixvQkFBZSxHQUFmLGVBQWUsQ0FBUztJQUMvQixDQUFDO0lBRUo7Ozs7Ozs7O09BUUc7SUFDSSxNQUFNLENBQUMsR0FBRyxJQUFXO1FBQzFCLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBcUIsRUFBRSxNQUFjLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUcsT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUM5QixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLEVBQ2IsY0FBYyxFQUNkLElBQUksRUFDSixJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDO0lBQ0osQ0FBQztDQUNGIn0=