import { AztecAddress, type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
/**
 * An encrypted log header, containing the address of the log along with utility
 * functions to compute and decrypt its ciphertext.
 *
 * Using AES-128-CBC for encryption.
 * Can be used for both incoming and outgoing logs.
 *
 */
export declare class EncryptedLogHeader {
    readonly address: AztecAddress;
    constructor(address: AztecAddress);
    /**
     * Serializes the log header to a buffer
     *
     * @returns The serialized log header
     */
    toBuffer(): Buffer;
    static fromBuffer(buf: Buffer): EncryptedLogHeader;
    /**
     * Computes the ciphertext of the encrypted log header
     *
     * @param secret - An ephemeral secret key
     * @param publicKey - The incoming or outgoing viewing key of the "recipient" of this log
     * @returns The ciphertext of the encrypted log header
     */
    computeCiphertext(secret: GrumpkinScalar, publicKey: PublicKey): Promise<Buffer>;
    /**
     *
     * @param ciphertext - The ciphertext buffer
     * @param secret - The private key matching the public key used in encryption
     * @param publicKey - The public key generated with the ephemeral secret key used in encryption
     *                    e.g., eph_sk * G
     * @returns
     */
    static fromCiphertext(ciphertext: Buffer | bigint[], secret: GrumpkinScalar, publicKey: PublicKey): Promise<EncryptedLogHeader>;
}
//# sourceMappingURL=encrypted_log_header.d.ts.map