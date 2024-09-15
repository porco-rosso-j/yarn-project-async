import { AztecAddress, GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
export declare class EncryptedLogOutgoingBody {
    ephSk: GrumpkinScalar;
    recipient: AztecAddress;
    recipientIvpkApp: PublicKey;
    constructor(ephSk: GrumpkinScalar, recipient: AztecAddress, recipientIvpkApp: PublicKey);
    /**
     * Serializes the log body
     *
     * @returns The serialized log body
     */
    toBuffer(): Buffer;
    /**
     * Deserialized the log body from a buffer
     *
     * @param buf - The buffer to deserialize
     * @returns The deserialized log body
     */
    static fromBuffer(buf: Buffer): EncryptedLogOutgoingBody;
    /**
     * Encrypts a log body
     *
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     *
     * @returns The ciphertext of the encrypted log body
     */
    computeCiphertext(ovskApp: GrumpkinScalar, ephPk: PublicKey): Promise<Buffer>;
    /**
     * Decrypts a log body
     *
     * @param ciphertext - The ciphertext buffer
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     *
     * @returns The decrypted log body
     */
    static fromCiphertext(ciphertext: Buffer | bigint[], ovskApp: GrumpkinScalar, ephPk: PublicKey): Promise<EncryptedLogOutgoingBody>;
    /**
     * Derives an AES symmetric key from the app siloed outgoing viewing secret key
     * and the ephemeral public key using poseidon.
     *
     * @param ovskApp - The app siloed outgoing viewing secret key
     * @param ephPk - The ephemeral public key
     * @returns The derived AES symmetric key
     */
    private static derivePoseidonAESSecret;
}
//# sourceMappingURL=encrypted_log_outgoing_body.d.ts.map