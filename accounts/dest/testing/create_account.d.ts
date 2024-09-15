import { type AccountWalletWithSecretKey } from '@aztec/aztec.js/wallet';
import { type PXE } from '@aztec/circuit-types';
import { Fr } from '@aztec/circuits.js';
/**
 * Deploys and registers a new account using random private keys and returns the associated Schnorr account wallet. Useful for testing.
 * @param pxe - PXE.
 * @returns - A wallet for a fresh account.
 */
export declare function createAccount(pxe: PXE): Promise<AccountWalletWithSecretKey>;
/**
 * Creates a given number of random accounts using the Schnorr account wallet.
 * @param pxe - PXE.
 * @param numberOfAccounts - How many accounts to create.
 * @param secrets - Optional array of secrets to use for the accounts. If empty, random secrets will be generated.
 * @throws If the secrets array is not empty and does not have the same length as the number of accounts.
 * @returns The created account wallets.
 */
export declare function createAccounts(pxe: PXE, numberOfAccounts?: number, secrets?: Fr[]): Promise<AccountWalletWithSecretKey[]>;
//# sourceMappingURL=create_account.d.ts.map