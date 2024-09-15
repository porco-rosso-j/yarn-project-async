import { Grumpkin } from '@aztec/circuits.js/barretenberg';
import { Point } from '@aztec/foundation/fields';
import { createCipheriv, createDecipheriv } from 'browserify-cipher';
import { deriveAESSecret } from './encryption_utils.js';
/**
 * Encrypt a given data buffer using the owner's public key and an ephemeral private key.
 * The encrypted data includes the original data, AES secret derived from ECDH shared secret,
 * and the ephemeral public key. The encryption is done using the 'aes-128-cbc' algorithm
 * with the provided curve instance for elliptic curve operations.
 *
 * @param data - The data buffer to be encrypted.
 * @param ephSecretKey - The ephemeral secret key..
 * @param incomingViewingPublicKey - The note owner's incoming viewing public key.
 * @returns A Buffer containing the encrypted data and the ephemeral public key.
 */
export async function encryptBuffer(data, ephSecretKey, incomingViewingPublicKey) {
    const aesSecret = await deriveAESSecret(ephSecretKey, incomingViewingPublicKey);
    const aesKey = aesSecret.subarray(0, 16);
    const iv = aesSecret.subarray(16, 32);
    const cipher = createCipheriv('aes-128-cbc', aesKey, iv);
    const plaintext = Buffer.concat([iv.subarray(0, 8), data]);
    const curve = new Grumpkin();
    const ephPubKey = await curve.mul(curve.generator(), ephSecretKey);
    // We encrypt eth pub key without the isInfinite flag because infinite point is not a valid pub key
    return Buffer.concat([cipher.update(plaintext), cipher.final(), ephPubKey.toBuffer()]);
}
/**
 * Decrypts the given encrypted data buffer using the provided secret key.
 * @param data - The encrypted data buffer to be decrypted.
 * @param incomingViewingSecretKey - The secret key used for decryption.
 * @returns The decrypted plaintext as a Buffer or undefined if decryption fails.
 */
export async function decryptBuffer(data, incomingViewingSecretKey) {
    // Extract the ephemeral public key from the end of the data
    const ephPubKey = Point.fromBuffer(data.subarray(-Point.SIZE_IN_BYTES));
    // Derive the AES secret key using the secret key and the ephemeral public key
    const aesSecret = await deriveAESSecret(incomingViewingSecretKey, ephPubKey);
    const aesKey = aesSecret.subarray(0, 16);
    const iv = aesSecret.subarray(16, 32);
    const cipher = createDecipheriv('aes-128-cbc', aesKey, iv);
    try {
        const plaintext = Buffer.concat([cipher.update(data.subarray(0, -Point.SIZE_IN_BYTES)), cipher.final()]);
        if (plaintext.subarray(0, 8).equals(iv.subarray(0, 8))) {
            return plaintext.subarray(8);
        }
    }
    catch (e) {
        return;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdF9idWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9ncy9sMV9wYXlsb2FkL2VuY3J5cHRfYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXJFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQ2pDLElBQVksRUFDWixZQUE0QixFQUM1Qix3QkFBbUM7SUFFbkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxlQUFlLENBQUMsWUFBWSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDaEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUM3QixNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRW5FLG1HQUFtRztJQUNuRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUNqQyxJQUFZLEVBQ1osd0JBQXdDO0lBRXhDLDREQUE0RDtJQUM1RCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4RSw4RUFBOEU7SUFDOUUsTUFBTSxTQUFTLEdBQUcsTUFBTSxlQUFlLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDN0UsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3ZELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxPQUFPO0lBQ1QsQ0FBQztBQUNILENBQUMifQ==