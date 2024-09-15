import { type GrumpkinScalar } from '@aztec/foundation/fields';

import { type SchnorrSignature } from './signature.js';

// TODO: eliminate foudnation dep and make PublicKey any?

export * from './signature.js';

/**
 * Schnorr signature construction and helper operations.
 */
export class Schnorr {
  /**
   * Computes a grumpkin public key from a private key.
   * @param privateKey - The private key.
   * @returns A grumpkin public key.
   */
  public computePublicKey(privateKey: GrumpkinScalar) {
    console.log('computePublicKey not supported');
    return {
      x: privateKey.toBuffer(),
      y: privateKey.toBuffer(),
    };
  }

  /**
   * Constructs a Schnorr signature given a msg and a private key.
   * @param msg - Message over which the signature is constructed.
   * @param privateKey - The private key of the signer.
   * @returns A Schnorr signature of the form (s, e).
   */
  public constructSignature(msg: Uint8Array, privateKey: GrumpkinScalar) {
    console.log('constructSignature not supported');
    return privateKey;
  }

  /**
   * Verifies a Schnorr signature given a Grumpkin public key.
   * @param msg - Message over which the signature was constructed.
   * @param pubKey - The Grumpkin public key of the signer.
   * @param sig - The Schnorr signature.
   * @returns True or false.
   */
  public verifySignature(msg: Uint8Array, pubKey: any, sig: SchnorrSignature) {
    console.log('constructSignature not supported');
    return false;
  }
}
