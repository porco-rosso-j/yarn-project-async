import { Aes128 } from '@aztec/circuits.js/barretenberg';
import { deriveAESSecret } from '../encryption_utils.js';
export class EncryptedLogIncomingBody {
    /**
     * Decrypts a log body
     *
     * @param ciphertext - The ciphertext buffer
     * @param ivskAppOrEphSk - The private key matching the public key used in encryption (the viewing key secret or)
     * @param ephPkOrIvpkApp - The public key generated with the ephemeral secret key used in encryption
     *
     * The "odd" input stems from ivskApp * ephPk == ivpkApp * ephSk producing the same value.
     * This is used to allow for the same decryption function to be used by both the sender and the recipient.
     *
     * @returns The decrypted log body as a buffer
     */
    static async fromCiphertextToBuffer(ciphertext, ivskAppOrEphSk, ephPkOrIvpkApp) {
        const input = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext.map((x) => Number(x)));
        const aesSecret = await deriveAESSecret(ivskAppOrEphSk, ephPkOrIvpkApp);
        const key = aesSecret.subarray(0, 16);
        const iv = aesSecret.subarray(16, 32);
        const buffer = new Aes128().decryptBufferCBC(input, iv, key);
        return buffer;
    }
    /**
     * Encrypts a log body
     *
     * @param ephSk - The ephemeral secret key
     * @param ivpkApp - The application scoped incoming viewing key for the recipient of this log
     *
     * @returns The ciphertext of the encrypted log body
     */
    async computeCiphertext(ephSk, ivpkApp) {
        const aesSecret = deriveAESSecret(ephSk, ivpkApp);
        const key = (await aesSecret).subarray(0, 16);
        const iv = (await aesSecret).subarray(16, 32);
        const aes128 = new Aes128();
        const buffer = this.toBuffer();
        return aes128.encryptBufferCBC(buffer, iv, key);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2xvZ19pbmNvbWluZ19ib2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvZ3MvbDFfcGF5bG9hZC9lbmNyeXB0ZWRfbG9nX2luY29taW5nX2JvZHkvZW5jcnlwdGVkX2xvZ19pbmNvbWluZ19ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsTUFBTSxPQUFnQix3QkFBd0I7SUFHNUM7Ozs7Ozs7Ozs7O09BV0c7SUFDTyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUMzQyxVQUE2QixFQUM3QixjQUE4QixFQUM5QixjQUF5QjtRQUV6QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRyxNQUFNLFNBQVMsR0FBRyxNQUFNLGVBQWUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDeEUsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQXFCLEVBQUUsT0FBa0I7UUFDdEUsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUvQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRiJ9