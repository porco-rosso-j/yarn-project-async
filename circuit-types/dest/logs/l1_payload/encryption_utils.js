import { GeneratorIndex } from '@aztec/circuits.js';
import { Grumpkin } from '@aztec/circuits.js/barretenberg';
import { sha256 } from '@aztec/foundation/crypto';
import { numToUInt8 } from '@aztec/foundation/serialize';
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
export async function deriveAESSecret(secretKey, publicKey) {
    if (publicKey.isZero()) {
        throw new Error(`Attempting to derive AES secret with a zero public key. You have probably passed a zero public key in your Noir code somewhere thinking that the note won't broadcasted... but it was.`);
    }
    const curve = new Grumpkin();
    const sharedSecret = await curve.mul(publicKey, secretKey);
    const secretBuffer = Buffer.concat([sharedSecret.toBuffer(), numToUInt8(GeneratorIndex.SYMMETRIC_KEY)]);
    const hash = sha256(secretBuffer);
    return hash;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGlvbl91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dzL2wxX3BheWxvYWQvZW5jcnlwdGlvbl91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUF1QyxNQUFNLG9CQUFvQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsZUFBZSxDQUFDLFNBQXlCLEVBQUUsU0FBb0I7SUFDbkYsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUN2QixNQUFNLElBQUksS0FBSyxDQUNiLHdMQUF3TCxDQUN6TCxDQUFDO0lBQ0osQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMifQ==