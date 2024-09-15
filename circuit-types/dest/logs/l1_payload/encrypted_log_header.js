import { AztecAddress } from '@aztec/circuits.js';
import { Aes128 } from '@aztec/circuits.js/barretenberg';
import { deriveAESSecret } from './encryption_utils.js';
/**
 * An encrypted log header, containing the address of the log along with utility
 * functions to compute and decrypt its ciphertext.
 *
 * Using AES-128-CBC for encryption.
 * Can be used for both incoming and outgoing logs.
 *
 */
export class EncryptedLogHeader {
    constructor(address) {
        this.address = address;
    }
    /**
     * Serializes the log header to a buffer
     *
     * @returns The serialized log header
     */
    toBuffer() {
        return this.address.toBuffer();
    }
    static fromBuffer(buf) {
        return new EncryptedLogHeader(AztecAddress.fromBuffer(buf));
    }
    /**
     * Computes the ciphertext of the encrypted log header
     *
     * @param secret - An ephemeral secret key
     * @param publicKey - The incoming or outgoing viewing key of the "recipient" of this log
     * @returns The ciphertext of the encrypted log header
     */
    async computeCiphertext(secret, publicKey) {
        const aesSecret = await deriveAESSecret(secret, publicKey);
        const key = aesSecret.subarray(0, 16);
        const iv = aesSecret.subarray(16, 32);
        const aes128 = new Aes128();
        const buffer = this.toBuffer();
        return aes128.encryptBufferCBC(buffer, iv, key);
    }
    /**
     *
     * @param ciphertext - The ciphertext buffer
     * @param secret - The private key matching the public key used in encryption
     * @param publicKey - The public key generated with the ephemeral secret key used in encryption
     *                    e.g., eph_sk * G
     * @returns
     */
    static async fromCiphertext(ciphertext, secret, publicKey) {
        const input = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext.map((x) => Number(x)));
        const aesSecret = await deriveAESSecret(secret, publicKey);
        const key = aesSecret.subarray(0, 16);
        const iv = aesSecret.subarray(16, 32);
        const aes128 = new Aes128();
        const buffer = aes128.decryptBufferCBC(input, iv, key);
        return EncryptedLogHeader.fromBuffer(buffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2xvZ19oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9ncy9sMV9wYXlsb2FkL2VuY3J5cHRlZF9sb2dfaGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQXVDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUE0QixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO0lBQUcsQ0FBQztJQUVyRDs7OztPQUlHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQ2xDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFzQixFQUFFLFNBQW9CO1FBQ3pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQ2hDLFVBQTZCLEVBQzdCLE1BQXNCLEVBQ3RCLFNBQW9CO1FBRXBCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9HLE1BQU0sU0FBUyxHQUFHLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRiJ9