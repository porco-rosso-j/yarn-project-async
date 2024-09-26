import { getDeployerContract } from './protocol_contracts.js';
/**
 * Sets up a call to the canonical deployer contract to publicly deploy a contract instance.
 * @param wallet - The wallet to use for the deployment.
 * @param instance - The instance to deploy.
 */
export async function deployInstance(wallet, instance) {
    const deployerContract = await getDeployerContract(wallet);
    const { salt, contractClassId, publicKeysHash, deployer } = instance;
    const isUniversalDeploy = deployer.isZero();
    if (!isUniversalDeploy && !wallet.getAddress().equals(deployer)) {
        throw new Error(`Expected deployer ${deployer.toString()} does not match sender wallet ${wallet.getAddress().toString()}`);
    }
    return deployerContract.methods.deploy(salt, contractClassId, instance.initializationHash, publicKeysHash, isUniversalDeploy);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2luc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlcGxveW1lbnQvZGVwbG95X2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWMsQ0FDbEMsTUFBYyxFQUNkLFFBQXFDO0lBRXJDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRCxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUcsUUFBUSxDQUFDO0lBQ3JFLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNoRSxNQUFNLElBQUksS0FBSyxDQUNiLHFCQUFxQixRQUFRLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDMUcsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3BDLElBQUksRUFDSixlQUFlLEVBQ2YsUUFBUSxDQUFDLGtCQUFrQixFQUMzQixjQUFjLEVBQ2QsaUJBQWlCLENBQ2xCLENBQUM7QUFDSixDQUFDIn0=