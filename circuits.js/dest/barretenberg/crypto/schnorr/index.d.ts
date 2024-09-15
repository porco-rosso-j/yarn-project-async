import { type GrumpkinScalar } from '@aztec/foundation/fields';
import { type SchnorrSignature } from './signature.js';
export * from './signature.js';
/**
 * Schnorr signature construction and helper operations.
 */
export declare class Schnorr {
    /**
     * Computes a grumpkin public key from a private key.
     * @param privateKey - The private key.
     * @returns A grumpkin public key.
     */
    computePublicKey(privateKey: GrumpkinScalar): {
        x: Buffer;
        y: Buffer;
    };
    /**
     * Constructs a Schnorr signature given a msg and a private key.
     * @param msg - Message over which the signature is constructed.
     * @param privateKey - The private key of the signer.
     * @returns A Schnorr signature of the form (s, e).
     */
    constructSignature(msg: Uint8Array, privateKey: GrumpkinScalar): import("@aztec/foundation/fields").Fq;
    /**
     * Verifies a Schnorr signature given a Grumpkin public key.
     * @param msg - Message over which the signature was constructed.
     * @param pubKey - The Grumpkin public key of the signer.
     * @param sig - The Schnorr signature.
     * @returns True or false.
     */
    verifySignature(msg: Uint8Array, pubKey: any, sig: SchnorrSignature): boolean;
}
//# sourceMappingURL=index.d.ts.map