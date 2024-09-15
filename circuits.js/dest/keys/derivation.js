import { AztecAddress } from '@aztec/foundation/aztec-address';
import { poseidon2Hash, sha512ToGrumpkinScalar } from '@aztec/foundation/crypto';
import { GrumpkinScalar } from '@aztec/foundation/fields';
import { Grumpkin } from '../barretenberg/crypto/grumpkin/index.js';
import { GeneratorIndex } from '../constants.gen.js';
import { PublicKeys } from '../types/public_keys.js';
import { getKeyGenerator } from './utils.js';
const curve = new Grumpkin();
export async function computeAppNullifierSecretKey(masterNullifierSecretKey, app) {
    return await computeAppSecretKey(masterNullifierSecretKey, app, 'n'); // 'n' is the key prefix for nullifier secret key
}
export async function computeAppSecretKey(skM, app, keyPrefix) {
    const generator = getKeyGenerator(keyPrefix);
    return await poseidon2Hash([skM.hi, skM.lo, app, generator]);
}
export function computeIvpkApp(ivpk, address) {
    return ivpk;
    // // Computing the siloed key is actually useless because we can derive the master key from it
    // // Issue(#6955)
    // const I = Fq.fromBuffer(poseidon2Hash([address.toField(), ivpk.x, ivpk.y, GeneratorIndex.IVSK_M]).toBuffer());
    // return curve.add(curve.mul(Grumpkin.generator, I), ivpk);
}
export function computeIvskApp(ivsk, address) {
    return ivsk;
    // Computing the siloed key is actually useless because we can derive the master key from it
    // Issue(#6955)
    // const ivpk = curve.mul(Grumpkin.generator, ivsk);
    // // Here we are intentionally converting Fr (output of poseidon) to Fq. This is fine even though a distribution of
    // // P = s * G will not be uniform because 2 * (q - r) / q is small.
    // const I = Fq.fromBuffer(poseidon2Hash([address.toField(), ivpk.x, ivpk.y, GeneratorIndex.IVSK_M]).toBuffer());
    // return new Fq((I.toBigInt() + ivsk.toBigInt()) % Fq.MODULUS);
}
export async function computeOvskApp(ovsk, app) {
    const ovskAppFr = await computeAppSecretKey(ovsk, app, 'ov'); // 'ov' is the key prefix for outgoing viewing key
    // Here we are intentionally converting Fr (output of poseidon) to Fq. This is fine even though a distribution of
    // P = s * G will not be uniform because 2 * (q - r) / q is small.
    return GrumpkinScalar.fromBuffer(ovskAppFr.toBuffer());
}
export function deriveMasterNullifierSecretKey(secretKey) {
    return sha512ToGrumpkinScalar([secretKey, GeneratorIndex.NSK_M]);
}
export function deriveMasterIncomingViewingSecretKey(secretKey) {
    return sha512ToGrumpkinScalar([secretKey, GeneratorIndex.IVSK_M]);
}
export function deriveMasterOutgoingViewingSecretKey(secretKey) {
    return sha512ToGrumpkinScalar([secretKey, GeneratorIndex.OVSK_M]);
}
export function deriveSigningKey(secretKey) {
    // TODO(#5837): come up with a standard signing key derivation scheme instead of using ivsk_m as signing keys here
    return sha512ToGrumpkinScalar([secretKey, GeneratorIndex.IVSK_M]);
}
export async function computeAddress(publicKeysHash, partialAddress) {
    const addressFr = await poseidon2Hash([publicKeysHash, partialAddress, GeneratorIndex.CONTRACT_ADDRESS_V1]);
    return AztecAddress.fromField(addressFr);
}
export async function derivePublicKeyFromSecretKey(secretKey) {
    const curve = new Grumpkin();
    return await curve.mul(curve.generator(), secretKey);
}
/**
 * Computes secret and public keys and public keys hash from a secret key.
 * @param secretKey - The secret key to derive keys from.
 * @returns The derived keys.
 */
export async function deriveKeys(secretKey) {
    // First we derive master secret keys -  we use sha512 here because this derivation will never take place
    // in a circuit
    const masterNullifierSecretKey = deriveMasterNullifierSecretKey(secretKey);
    const masterIncomingViewingSecretKey = deriveMasterIncomingViewingSecretKey(secretKey);
    const masterOutgoingViewingSecretKey = deriveMasterOutgoingViewingSecretKey(secretKey);
    const masterTaggingSecretKey = sha512ToGrumpkinScalar([secretKey, GeneratorIndex.TSK_M]);
    // Then we derive master public keys
    const masterNullifierPublicKey = await derivePublicKeyFromSecretKey(masterNullifierSecretKey);
    const masterIncomingViewingPublicKey = await derivePublicKeyFromSecretKey(masterIncomingViewingSecretKey);
    const masterOutgoingViewingPublicKey = await derivePublicKeyFromSecretKey(masterOutgoingViewingSecretKey);
    const masterTaggingPublicKey = await derivePublicKeyFromSecretKey(masterTaggingSecretKey);
    // We hash the public keys to get the public keys hash
    const publicKeys = new PublicKeys(masterNullifierPublicKey, masterIncomingViewingPublicKey, masterOutgoingViewingPublicKey, masterTaggingPublicKey);
    return {
        masterNullifierSecretKey,
        masterIncomingViewingSecretKey,
        masterOutgoingViewingSecretKey,
        masterTaggingSecretKey,
        publicKeys,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVyaXZhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXlzL2Rlcml2YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQWUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsNEJBQTRCLENBQUMsd0JBQXdDLEVBQUUsR0FBaUI7SUFDNUcsT0FBTyxNQUFNLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLGlEQUFpRDtBQUN6SCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxHQUFtQixFQUFFLEdBQWlCLEVBQUUsU0FBb0I7SUFDcEcsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sTUFBTSxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBZSxFQUFFLE9BQXFCO0lBQ25FLE9BQU8sSUFBSSxDQUFDO0lB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