import { EcdsaSignature } from './signature.js';

EcdsaSignature;
// import { NativeModules } from 'react-native';
// const { BBSwiftModule } = {NativeModules};
export * from './signature.js';

// eslint-disable-next-line require-await
async function emptyAsyncMethod(): Promise<any> {
  return Promise.resolve('This is the returned value.');
}
/**
 * ECDSA signature construction and helper operations.
 * TODO: Replace with codegen api on bb.js.
 */
export class Ecdsa {
  /**
   * Computes a secp256k1 public key from a private key.
   * @param privateKey - Secp256k1 private key.
   * @returns A secp256k1 public key.
   */
  public async computePublicKey(privateKey: Buffer): Promise<Buffer> {
    // return await BBSwiftModule.method(privateKey)
    //   .then((resultBuffer: any) => {
    //     if (!resultBuffer) {
    //       throw new Error('computePublicKey returned null or encountered an error');
    //     }
    //     return resultBuffer;
    //   })
    //   .catch((error: any) => {});
    privateKey;
    return await emptyAsyncMethod();
  }

  /**
   * Constructs an ECDSA signature given a msg and a private key.
   * @param msg - Message over which the signature is constructed.
   * @param privateKey - The secp256k1 private key of the signer.
   * @returns An ECDSA signature of the form (r, s, v).
   */
  public async constructSignature(msg: Uint8Array, privateKey: Buffer): Promise<EcdsaSignature> {
    // return BBSwiftModule.ecdsaConstructSignature(privateKey)
    //   .then((resultBuffer: any) => {
    //     console.log('Result:', resultBuffer);
    //     if (!resultBuffer) {
    //       throw new Error('constructSignature returned null or encountered an error');
    //     }
    //     return new EcdsaSignature(
    //       Buffer.from(resultBuffer.slice(0, 32)),
    //       Buffer.from(resultBuffer.slice(32, 64)),
    //       Buffer.from(resultBuffer.slice(64, 65)),
    //     );
    //   })
    //   .catch((error: any) => {
    //     console.error('Error:', error);
    //   });
    return Promise.resolve(new EcdsaSignature(Buffer.from(msg), Buffer.from(msg), Buffer.from(msg)));
  }

  /**
   * Recovers a secp256k1 public key from an ECDSA signature (similar to ecrecover).
   * @param msg - Message over which the signature was constructed.
   * @param sig - The ECDSA signature.
   * @returns The secp256k1 public key of the signer.
   */
  public async recoverPublicKey(msg: Uint8Array, sig: EcdsaSignature): Promise<Buffer> {
    // return BBSwiftModule.ecdsaRecoverPublicKey(msg, sig.r, sig.s, sig.v)
    //   .then((resultBuffer: any) => {
    //     console.log('Result:', resultBuffer);
    //     if (!resultBuffer) {
    //       throw new Error('recoverPublicKey returned null or encountered an error');
    //     }
    //     return Buffer.from(resultBuffer);
    //   })
    //   .catch((error: any) => {
    //     console.error('Error:', error);
    //   });
    return Promise.resolve(Buffer.from(msg));
  }

  /**
   * Verifies and ECDSA signature given a secp256k1 public key.
   * @param msg - Message over which the signature was constructed.
   * @param pubKey - The secp256k1 public key of the signer.
   * @param sig - The ECDSA signature.
   * @returns True or false.
   */
  public async verifySignature(msg: Uint8Array, pubKey: Buffer, sig: EcdsaSignature) {
    // return BBSwiftModule.ecdsaVerifySignature(msg, pubKey, sig.r, sig.s, sig.v)
    //   .then((resultBuffer: any) => {
    //     console.log('Result:', resultBuffer);
    //     if (!resultBuffer) {
    //       throw new Error('verifySignature returned null or encountered an error');
    //     }
    //     return Buffer.from(resultBuffer);
    //   })
    //   .catch((error: any) => {
    //     console.error('Error:', error);
    //   });
    return Promise.resolve(pubKey);
  }
}
