import { Fr, deriveSigningKey } from '@aztec/circuits.js';
import { getSchnorrAccount } from '../schnorr/index.js';
/**
 * Deploys and registers a new account using random private keys and returns the associated Schnorr account wallet. Useful for testing.
 * @param pxe - PXE.
 * @returns - A wallet for a fresh account.
 */
export function createAccount(pxe) {
    const secretKey = Fr.random();
    const signingKey = deriveSigningKey(secretKey);
    return getSchnorrAccount(pxe, secretKey, signingKey).waitSetup();
}
/**
 * Creates a given number of random accounts using the Schnorr account wallet.
 * @param pxe - PXE.
 * @param numberOfAccounts - How many accounts to create.
 * @param secrets - Optional array of secrets to use for the accounts. If empty, random secrets will be generated.
 * @throws If the secrets array is not empty and does not have the same length as the number of accounts.
 * @returns The created account wallets.
 */
export async function createAccounts(pxe, numberOfAccounts = 1, secrets = []) {
    const accounts = [];
    if (secrets.length == 0) {
        secrets = Array.from({ length: numberOfAccounts }, () => Fr.random());
    }
    else if (secrets.length > 0 && secrets.length !== numberOfAccounts) {
        throw new Error('Secrets array must be empty or have the same length as the number of accounts');
    }
    // Prepare deployments
    for (const secret of secrets) {
        const signingKey = deriveSigningKey(secret);
        const account = getSchnorrAccount(pxe, secret, signingKey);
        // Unfortunately the function below is not stateless and we call it here because it takes a long time to run and
        // the results get stored within the account object. By calling it here we increase the probability of all the
        // accounts being deployed in the same block because it makes the deploy() method basically instant.
        await account.getDeployMethod().then(d => d.prove({
            contractAddressSalt: account.salt,
            skipClassRegistration: true,
            skipPublicDeployment: true,
            universalDeploy: true,
        }));
        accounts.push(account);
    }
    // Send them and await them to be mined
    const txs = await Promise.all(accounts.map(account => account.deploy()));
    await Promise.all(txs.map(tx => tx.wait({ interval: 0.1 })));
    return Promise.all(accounts.map(account => account.getWallet()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2FjY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdGluZy9jcmVhdGVfYWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUMsR0FBUTtJQUNwQyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsT0FBTyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ25FLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxjQUFjLENBQ2xDLEdBQVEsRUFDUixnQkFBZ0IsR0FBRyxDQUFDLEVBQ3BCLFVBQWdCLEVBQUU7SUFFbEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN4QixPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7U0FBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQztRQUNyRSxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELHNCQUFzQjtJQUN0QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDM0QsZ0hBQWdIO1FBQ2hILDhHQUE4RztRQUM5RyxvR0FBb0c7UUFDcEcsTUFBTSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3ZDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDTixtQkFBbUIsRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNqQyxxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQyxDQUNILENBQUM7UUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQyJ9