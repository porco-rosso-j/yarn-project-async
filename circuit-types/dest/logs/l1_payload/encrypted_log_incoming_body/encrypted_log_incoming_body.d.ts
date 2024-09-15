import { type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
export declare abstract class EncryptedLogIncomingBody {
    abstract toBuffer(): Buffer;
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
    protected static fromCiphertextToBuffer(ciphertext: Buffer | bigint[], ivskAppOrEphSk: GrumpkinScalar, ephPkOrIvpkApp: PublicKey): Promise<Buffer>;
    /**
     * Encrypts a log body
     *
     * @param ephSk - The ephemeral secret key
     * @param ivpkApp - The application scoped incoming viewing key for the recipient of this log
     *
     * @returns The ciphertext of the encrypted log body
     */
    computeCiphertext(ephSk: GrumpkinScalar, ivpkApp: PublicKey): Promise<Buffer>;
}
//# sourceMappingURL=encrypted_log_incoming_body.d.ts.map