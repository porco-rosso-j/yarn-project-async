import { getDeployerContract } from './protocol_contracts.js';
/**
 * Sets up a call to the canonical deployer contract to publicly deploy a contract instance.
 * @param wallet - The wallet to use for the deployment.
 * @param instance - The instance to deploy.
 */
export function deployInstance(wallet, instance) {
    const deployerContract = getDeployerContract(wallet);
    const { salt, contractClassId, publicKeysHash, deployer } = instance;
    const isUniversalDeploy = deployer.isZero();
    if (!isUniversalDeploy && !wallet.getAddress().equals(deployer)) {
        throw new Error(`Expected deployer ${deployer.toString()} does not match sender wallet ${wallet.getAddress().toString()}`);
    }
    return deployerContract.methods.deploy(salt, contractClassId, instance.initializationHash, publicKeysHash, isUniversalDeploy);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2luc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlcGxveW1lbnQvZGVwbG95X2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxRQUFxQztJQUNsRixNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELE1BQU0sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRyxRQUFRLENBQUM7SUFDckUsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQ2IscUJBQXFCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsaUNBQWlDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUMxRyxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDcEMsSUFBSSxFQUNKLGVBQWUsRUFDZixRQUFRLENBQUMsa0JBQWtCLEVBQzNCLGNBQWMsRUFDZCxpQkFBaUIsQ0FDbEIsQ0FBQztBQUNKLENBQUMifQ==