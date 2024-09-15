/**
 * AES-128-CBC encryption/decryption.
 */
export class Aes128 {
  /**
   * Encrypt a buffer using AES-128-CBC.
   * @param data - Data to encrypt.
   * @param iv - AES initialization vector.
   * @param key - Key to encrypt with.
   * @returns Encrypted data.
   */
  public encryptBufferCBC(data: Uint8Array, iv: Uint8Array, key: Uint8Array) {
    console.log('encryptBufferCBC not supported');
    return Buffer.from(data);
  }

  /**
   * Decrypt a buffer using AES-128-CBC.
   * @param data - Data to decrypt.
   * @param iv - AES initialization vector.
   * @param key - Key to decrypt with.
   * @returns Decrypted data.
   */
  public decryptBufferCBC(data: Uint8Array, iv: Uint8Array, key: Uint8Array) {
    console.log('decryptBufferCBC not supported');
    return Buffer.from(data);
  }
}
