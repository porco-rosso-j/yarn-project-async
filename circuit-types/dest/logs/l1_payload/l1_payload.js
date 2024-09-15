import { computeIvpkApp, computeIvskApp, computeOvskApp, derivePublicKeyFromSecretKey, } from '@aztec/circuits.js';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Point } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { EncryptedLogHeader } from './encrypted_log_header.js';
import { EncryptedLogOutgoingBody } from './encrypted_log_outgoing_body.js';
// Both the incoming and the outgoing header are 48 bytes.
// 32 bytes for the address, and 16 bytes padding to follow PKCS#7
const HEADER_SIZE = 48;
// The outgoing body is constant size of 176 bytes.
// 160 bytes for the secret key, address, and public key, and 16 bytes padding to follow PKCS#7
const OUTGOING_BODY_SIZE = 176;
/**
 * A class which wraps event data which is pushed on L1.
 */
export class L1Payload {
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
    async _encrypt(contractAddress, ephSk, recipient, ivpk, ovKeys, incomingBody) {
        if (ivpk.isZero()) {
            throw new Error(`Attempting to encrypt an event log with a zero ivpk.`);
        }
        const ephPk = await derivePublicKeyFromSecretKey(ephSk);
        const header = new EncryptedLogHeader(contractAddress);
        const incomingHeaderCiphertext = await header.computeCiphertext(ephSk, ivpk);
        const outgoingHeaderCiphertext = await header.computeCiphertext(ephSk, ovKeys.pkM);
        const ivpkApp = computeIvpkApp(ivpk, contractAddress);
        const incomingBodyCiphertext = await incomingBody.computeCiphertext(ephSk, ivpkApp);
        const outgoingBodyCiphertext = await new EncryptedLogOutgoingBody(ephSk, recipient, ivpkApp).computeCiphertext(ovKeys.skAppAsGrumpkinScalar, ephPk);
        return Buffer.concat([
            ephPk.toBuffer(),
            incomingHeaderCiphertext,
            outgoingHeaderCiphertext,
            outgoingBodyCiphertext,
            incomingBodyCiphertext,
        ]);
    }
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
    static async _decryptAsIncoming(data, ivsk, fromCiphertext) {
        const reader = BufferReader.asReader(data);
        const ephPk = reader.readObject(Point);
        const incomingHeader = await EncryptedLogHeader.fromCiphertext(reader.readBytes(HEADER_SIZE), ivsk, ephPk);
        // Skipping the outgoing header and body
        reader.readBytes(HEADER_SIZE);
        reader.readBytes(OUTGOING_BODY_SIZE);
        // The incoming can be of variable size, so we read until the end
        const incomingBodySlice = reader.readToEnd();
        const ivskApp = computeIvskApp(ivsk, incomingHeader.address);
        const incomingBody = await fromCiphertext(incomingBodySlice, ivskApp, ephPk);
        return [incomingHeader.address, incomingBody];
    }
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
    static async _decryptAsOutgoing(data, ovsk, fromCiphertext) {
        const reader = BufferReader.asReader(data);
        const ephPk = reader.readObject(Point);
        reader.readBytes(HEADER_SIZE);
        const outgoingHeader = await EncryptedLogHeader.fromCiphertext(reader.readBytes(HEADER_SIZE), ovsk, ephPk);
        const ovskApp = await computeOvskApp(ovsk, outgoingHeader.address);
        const outgoingBody = await EncryptedLogOutgoingBody.fromCiphertext(reader.readBytes(OUTGOING_BODY_SIZE), ovskApp, ephPk);
        // The incoming can be of variable size, so we read until the end
        const incomingBodySlice = reader.readToEnd();
        const incomingBody = await fromCiphertext(incomingBodySlice, outgoingBody.ephSk, outgoingBody.recipientIvpkApp);
        return [outgoingHeader.address, incomingBody];
    }
    static async ensureMatchedMaskedContractAddress(contractAddress, randomness, maskedContractAddress) {
        if (!(await pedersenHash([contractAddress, randomness], 0)).equals(maskedContractAddress)) {
            throw new Error('The provided masked contract address does not match with the incoming address from header and randomness from body');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfcGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dzL2wxX3BheWxvYWQvbDFfcGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsNEJBQTRCLEdBQzdCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBVyxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFL0QsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFNUUsMERBQTBEO0FBQzFELGtFQUFrRTtBQUNsRSxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFFdkIsbURBQW1EO0FBQ25ELCtGQUErRjtBQUMvRixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztBQUMvQjs7R0FFRztBQUNILE1BQU0sT0FBZ0IsU0FBUztJQU83Qjs7Ozs7Ozs7Ozs7T0FXRztJQUNPLEtBQUssQ0FBQyxRQUFRLENBQ3RCLGVBQTZCLEVBQzdCLEtBQXFCLEVBQ3JCLFNBQXVCLEVBQ3ZCLElBQWUsRUFDZixNQUE0QixFQUM1QixZQUFlO1FBRWYsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sNEJBQTRCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV2RCxNQUFNLHdCQUF3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