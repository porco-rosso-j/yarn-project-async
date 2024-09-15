/**
 * The `@aztec/accounts/ecdsa` export provides an ECDSA account contract implementation, that uses an ECDSA private key for authentication, and a Grumpkin key for encryption.
 * Consider using this account type when working with integrations with Ethereum wallets.
 *
 * @packageDocumentation
 */
import { AccountManager } from '@aztec/aztec.js/account';
import { getWallet } from '@aztec/aztec.js/wallet';
import { EcdsaAccountContract } from './account_contract.js';
export { EcdsaAccountContractArtifact } from './artifact.js';
export { EcdsaAccountContract };
/**
 * Creates an Account that relies on an ECDSA signing key for authentication.
 * @param pxe - An PXE server instance.
 * @param secretKey - Secret key used to derive all the keystore keys.
 * @param signingPrivateKey - Secp256k1 key used for signing transactions.
 * @param salt - Deployment salt.
 */
export function getEcdsaAccount(pxe, secretKey, signingPrivateKey, salt) {
    return new AccountManager(pxe, secretKey, new EcdsaAccountContract(signingPrivateKey), salt);
}
/**
 * Gets a wallet for an already registered account using ECDSA signatures.
 * @param pxe - An PXE server instance.
 * @param address - Address for the account.
 * @param signingPrivateKey - ECDSA key used for signing transactions.
 * @returns A wallet for this account that can be used to interact with a contract instance.
 */
export function getEcdsaWallet(pxe, address, signingPrivateKey) {
    return getWallet(pxe, address, new EcdsaAccountContract(signingPrivateKey));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWNkc2EvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxPQUFPLEVBQUUsY0FBYyxFQUFhLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFzQixTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUl2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUM7QUFFaEM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFRLEVBQUUsU0FBYSxFQUFFLGlCQUF5QixFQUFFLElBQVc7SUFDN0YsT0FBTyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxHQUFRLEVBQUUsT0FBcUIsRUFBRSxpQkFBeUI7SUFDdkYsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDIn0=