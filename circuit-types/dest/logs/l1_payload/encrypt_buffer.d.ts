import { type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
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
export declare function encryptBuffer(data: Buffer, ephSecretKey: GrumpkinScalar, incomingViewingPublicKey: PublicKey): Promise<Buffer>;
/**
 * Decrypts the given encrypted data buffer using the provided secret key.
 * @param data - The encrypted data buffer to be decrypted.
 * @param incomingViewingSecretKey - The secret key used for decryption.
 * @returns The decrypted plaintext as a Buffer or undefined if decryption fails.
 */
export declare function decryptBuffer(data: Buffer, incomingViewingSecretKey: GrumpkinScalar): Promise<Buffer | undefined>;
//# sourceMappingURL=encrypt_buffer.d.ts.map