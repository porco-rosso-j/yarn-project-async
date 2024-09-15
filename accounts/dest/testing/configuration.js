import { generatePublicKey } from '@aztec/aztec.js';
import { deriveMasterIncomingViewingSecretKey, deriveSigningKey } from '@aztec/circuits.js/keys';
import { Fr } from '@aztec/foundation/fields';
import { getSchnorrAccount } from '../schnorr/index.js';
export const INITIAL_TEST_SECRET_KEYS = [
    Fr.fromString('2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281'),
    Fr.fromString('aebd1b4be76efa44f5ee655c20bf9ea60f7ae44b9a7fd1fd9f189c7a0b0cdae'),
    Fr.fromString('0f6addf0da06c33293df974a565b03d1ab096090d907d98055a8b7f4954e120c'),
];
export const INITIAL_TEST_ENCRYPTION_KEYS = INITIAL_TEST_SECRET_KEYS.map(secretKey => deriveMasterIncomingViewingSecretKey(secretKey));
// TODO(#5837): come up with a standard signing key derivation scheme instead of using ivsk_m as signing keys here
export const INITIAL_TEST_SIGNING_KEYS = INITIAL_TEST_ENCRYPTION_KEYS;
export const INITIAL_TEST_ACCOUNT_SALTS = [Fr.ZERO, Fr.ZERO, Fr.ZERO];
/**
 * Gets a collection of wallets for the Aztec accounts that are initially stored in the test environment.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
export function getInitialTestAccountsWallets(pxe) {
    return Promise.all(INITIAL_TEST_SECRET_KEYS.map((encryptionKey, i) => getSchnorrAccount(pxe, encryptionKey, INITIAL_TEST_SIGNING_KEYS[i], INITIAL_TEST_ACCOUNT_SALTS[i]).getWallet()));
}
/**
 * Queries a PXE for it's registered accounts and returns wallets for those accounts using keys in the initial test accounts.
 * @param pxe - PXE instance.
 * @returns A set of AccountWallet implementations for each of the initial accounts.
 */
export async function getDeployedTestAccountsWallets(pxe) {
    const registeredAccounts = await pxe.getRegisteredAccounts();
    return Promise.all(INITIAL_TEST_SECRET_KEYS.filter(initialSecretKey => async () => {
        const initialEncryptionKey = deriveMasterIncomingViewingSecretKey(initialSecretKey);
        const publicKey = await generatePublicKey(initialEncryptionKey);
        return (registeredAccounts.find(registered => registered.publicKeys.masterIncomingViewingPublicKey.equals(publicKey)) !=
            undefined);
    }).map(secretKey => {
        const signingKey = deriveSigningKey(secretKey);
        // TODO(#5726): use actual salt here instead of hardcoding Fr.ZERO
        return getSchnorrAccount(pxe, secretKey, signingKey, Fr.ZERO).getWallet();
    }));
}
/**
 * Deploys the initial set of schnorr signature accounts to the test environment
 * @param pxe - PXE instance.
 * @returns The set of deployed Account objects and associated private encryption keys
 */
export async function deployInitialTestAccounts(pxe) {
    const accounts = INITIAL_TEST_SECRET_KEYS.map((secretKey, i) => {
        const account = getSchnorrAccount(pxe, secretKey, INITIAL_TEST_SIGNING_KEYS[i], INITIAL_TEST_ACCOUNT_SALTS[i]);
        return {
            account,
            secretKey,
        };
    });
    // Attempt to get as much parallelism as possible
    const deployMethods = await Promise.all(accounts.map(async (x) => {
        const deployMethod = await x.account.getDeployMethod();
        await deployMethod.create({
            contractAddressSalt: x.account.salt,
            skipClassRegistration: true,
            skipPublicDeployment: true,
            universalDeploy: true,
        });
        await deployMethod.prove({});
        return deployMethod;
    }));
    // Send tx together to try and get them in the same rollup
    const sentTxs = deployMethods.map(dm => {
        return dm.send();
    });
    await Promise.all(sentTxs.map(async (tx, i) => {
        const wallet = await accounts[i].account.getWallet();
        return (await tx).wait({ wallet });
    }));
    return accounts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0aW5nL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHcEQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakcsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHO0lBQ3RDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0VBQWtFLENBQUM7SUFDakYsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpRUFBaUUsQ0FBQztJQUNoRixFQUFFLENBQUMsVUFBVSxDQUFDLGtFQUFrRSxDQUFDO0NBQ2xGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDbkYsb0NBQW9DLENBQUMsU0FBUyxDQUFDLENBQ2hELENBQUM7QUFDRixrSEFBa0g7QUFDbEgsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsNEJBQTRCLENBQUM7QUFFdEUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXRFOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsR0FBUTtJQUNwRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2hCLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUNoRCxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUs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