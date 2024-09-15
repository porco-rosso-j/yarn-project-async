import { type GrumpkinScalar, type PublicKey } from '@aztec/circuits.js';
/**
 * Derive an AES secret key using Elliptic Curve Diffie-Hellman (ECDH) and SHA-256.
 * The function takes in an ECDH public key, a private key, and a Grumpkin instance to compute
 * the shared secret. The shared secret is then hashed using SHA-256 to produce the final
 * AES secret key.
 *
 * @param secretKey - The secret key used to derive shared secret.
 * @param publicKey - The public key used to derive shared secret.
 * @returns A derived AES secret key.
 * @throws If the public key is zero.
 * TODO(#5726): This function is called point_to_symmetric_key in Noir. I don't like that name much since point is not
 * the only input of the function. Unify naming once we have a better name.
 */
export declare function deriveAESSecret(secretKey: GrumpkinScalar, publicKey: PublicKey): Promise<Buffer>;
//# sourceMappingURL=encryption_utils.d.ts.map