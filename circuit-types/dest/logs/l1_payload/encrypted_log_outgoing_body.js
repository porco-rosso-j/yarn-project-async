import { AztecAddress, Fr, GeneratorIndex, GrumpkinScalar, Point } from '@aztec/circuits.js';
import { Aes128 } from '@aztec/circuits.js/barretenberg';
import { poseidon2Hash } from '@aztec/foundation/crypto';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class EncryptedLogOutgoingBody {
    constructor(ephSk, recipient, recipientIvpkApp) {
        this.ephSk = ephSk;
        this.recipient = recipient;
        this.recipientIvpkApp = recipientIvpkApp;
    }
    /**
     * Serializes the log body
     *
     * @returns The serialized log body
     */
    toBuffer() {
        // The serialization of Fq is [high, low] check `grumpkin_private_key.nr`
        const ephSkBytes = serializeToBuffer([this.ephSk.hi, this.ephSk.lo]);
        return serializeToBuffer(ephSkBytes, this.recipient, this.recipientIvpkApp);
    }
    /**
     * Deserialized the log body from a buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf) {
        const reader = BufferReader.asReader(buf);
        const high = reader.readObject(Fr);
        const low = reader.readObject(Fr);
        const ephSk = GrumpkinScalar.fromHighLow(high, low);
        const recipient = reader.readObject(AztecAddress);
        const recipientIvpkApp = reader.readObject(Point); // PublicKey = Point
        return new EncryptedLogOutgoingBody(ephSk, recipient, recipientIvpkApp);
    }
    /**
     * Encrypts a log body
     *
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     *
     * @returns The ciphertext of the encrypted log body
     */
    async computeCiphertext(ovskApp, ephPk) {
        // We could use `ephSk` and compute `ephPk` from it.
        // We mainly provide it to keep the same api and potentially slight optimization as we can reuse it.
        const aesSecret = await EncryptedLogOutgoingBody.derivePoseidonAESSecret(ovskApp, ephPk);
        const key = aesSecret.subarray(0, 16);
        const iv = aesSecret.subarray(16, 32);
        const aes128 = new Aes128();
        const buffer = this.toBuffer();
        return aes128.encryptBufferCBC(buffer, iv, key);
    }
    /**
     * Decrypts a log body
     *
     * @param ciphertext - The ciphertext buffer
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     *
     * @returns The decrypted log body
     */
    static async fromCiphertext(ciphertext, ovskApp, ephPk) {
        const input = Buffer.isBuffer(ciphertext) ? ciphertext : Buffer.from(ciphertext.map((x) => Number(x)));
        const aesSecret = await EncryptedLogOutgoingBody.derivePoseidonAESSecret(ovskApp, ephPk);
        const key = aesSecret.subarray(0, 16);
        const iv = aesSecret.subarray(16, 32);
        const aes128 = new Aes128();
        const buffer = aes128.decryptBufferCBC(input, iv, key);
        return EncryptedLogOutgoingBody.fromBuffer(buffer);
    }
    /**
     * Derives an AES symmetric key from the app siloed outgoing viewing secret key
     * and the ephemeral public key using poseidon.
     *
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     * @returns The derived AES symmetric key
     */
    static async derivePoseidonAESSecret(ovskApp, ephPk) {
        // For performance reasons, we do NOT use the usual `deriveAESSecret` function here and instead we compute it using
        // poseidon. Note that we can afford to use poseidon here instead of deriving shared secret using Diffie-Hellman
        // because for outgoing we are encrypting for ourselves and hence we don't need to perform a key exchange.
        return (await poseidon2Hash([ovskApp.hi, ovskApp.lo, ephPk.x, ephPk.y, GeneratorIndex.SYMMETRIC_KEY])).toBuffer();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2xvZ19vdXRnb2luZ19ib2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ3MvbDFfcGF5bG9hZC9lbmNyeXB0ZWRfbG9nX291dGdvaW5nX2JvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFDN0csT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxZQUFtQixLQUFxQixFQUFTLFNBQXVCLEVBQVMsZ0JBQTJCO1FBQXpGLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBVztJQUFHLENBQUM7SUFFaEg7Ozs7T0FJRztJQUNJLFFBQVE7UUFDYix5RUFBeUU7UUFDekUsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDbEMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxNQUFNLElBQUksR0FB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