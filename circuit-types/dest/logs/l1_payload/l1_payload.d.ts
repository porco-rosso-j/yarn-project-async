import { type AztecAddress, type GrumpkinScalar, type KeyValidationRequest, type PublicKey } from '@aztec/circuits.js';
import { type Fr, Point } from '@aztec/foundation/fields';
import { type EncryptedLogIncomingBody } from './encrypted_log_incoming_body/index.js';
/**
 * A class which wraps event data which is pushed on L1.
 */
export declare abstract class L1Payload {
    /**
     * Serializes the L1EventPayload object into a Buffer.
     * @returns Buffer representation of the L1EventPayload object.
     */
    abstract toBuffer(): Buffer;
    /**
     * Encrypts an event payload for a given recipient and sender.
     * Creates an incoming log the the recipient using the recipient's ivsk, and
     * an outgoing log for the sender using the sender's ovsk.
     *
     * @param ephSk - An ephemeral secret key used for the encryption
     * @param recipient - The recipient address, retrievable by the sender for his logs
     * @param ivpk - The incoming viewing public key of the recipient
     * @param ovKeys - The outgoing viewing keys of the sender
     * @returns A buffer containing the encrypted log payload
     * @throws If the ivpk is zero.
     */
    protected _encrypt<T extends EncryptedLogIncomingBody>(contractAddress: AztecAddress, ephSk: GrumpkinScalar, recipient: AztecAddress, ivpk: PublicKey, ovKeys: KeyValidationRequest, incomingBody: T): Promise<Buffer>;
    /**
     * Decrypts a ciphertext as an incoming log.
     *
     * This is executable by the recipient of the event, and uses the ivsk to decrypt the payload.
     * The outgoing parts of the log are ignored entirely.
     *
     * Produces the same output as `decryptAsOutgoing`.
     *
     * @param encryptedLog - The encrypted log. This encrypted log is assumed to always have tags.
     * @param ivsk - The incoming viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     */
    protected static _decryptAsIncoming<T extends EncryptedLogIncomingBody>(data: Buffer, ivsk: GrumpkinScalar, fromCiphertext: (incomingBodySlice: Buffer, ivskApp: GrumpkinScalar, ephPk: Point) => Promise<T>): Promise<[AztecAddress, T]>;
    /**
     * Decrypts a ciphertext as an outgoing log.
     *
     * This is executable by the sender of the event, and uses the ovsk to decrypt the payload.
     * The outgoing parts are decrypted to retrieve information that allows the sender to
     * decrypt the incoming log, and learn about the event contents.
     *
     * Produces the same output as `decryptAsIncoming`.
     *
     * @param ciphertext - The ciphertext for the log
     * @param ovsk - The outgoing viewing secret key, used to decrypt the logs
     * @returns The decrypted log payload
     */
    protected static _decryptAsOutgoing<T extends EncryptedLogIncomingBody>(data: Buffer, ovsk: GrumpkinScalar, fromCiphertext: (incomingBodySlice: Buffer, ivskApp: GrumpkinScalar, ephPk: Point) => Promise<T>): Promise<[AztecAddress, T]>;
    protected static ensureMatchedMaskedContractAddress(contractAddress: AztecAddress, randomness: Fr, maskedContractAddress: Fr): Promise<void>;
}
//# sourceMappingURL=l1_payload.d.ts.map