import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fq, type Fr, GrumpkinScalar } from '@aztec/foundation/fields';
import { type PublicKey } from '../types/public_key.js';
import { PublicKeys } from '../types/public_keys.js';
import { type KeyPrefix } from './key_types.js';
export declare function computeAppNullifierSecretKey(masterNullifierSecretKey: GrumpkinScalar, app: AztecAddress): Promise<Fr>;
export declare function computeAppSecretKey(skM: GrumpkinScalar, app: AztecAddress, keyPrefix: KeyPrefix): Promise<Fr>;
export declare function computeIvpkApp(ivpk: PublicKey, address: AztecAddress): import("@aztec/foundation/fields").Point;
export declare function computeIvskApp(ivsk: GrumpkinScalar, address: AztecAddress): Fq;
export declare function computeOvskApp(ovsk: GrumpkinScalar, app: AztecAddress): Promise<Fq>;
export declare function deriveMasterNullifierSecretKey(secretKey: Fr): GrumpkinScalar;
export declare function deriveMasterIncomingViewingSecretKey(secretKey: Fr): GrumpkinScalar;
export declare function deriveMasterOutgoingViewingSecretKey(secretKey: Fr): GrumpkinScalar;
export declare function deriveSigningKey(secretKey: Fr): GrumpkinScalar;
export declare function computeAddress(publicKeysHash: Fr, partialAddress: Fr): Promise<AztecAddress>;
export declare function derivePublicKeyFromSecretKey(secretKey: Fq): Promise<import("@aztec/foundation/fields").Point>;
/**
 * Computes secret and public keys and public keys hash from a secret key.
 * @param secretKey - The secret key to derive keys from.
 * @returns The derived keys.
 */
export declare function deriveKeys(secretKey: Fr): Promise<{
    masterNullifierSecretKey: Fq;
    masterIncomingViewingSecretKey: Fq;
    masterOutgoingViewingSecretKey: Fq;
    masterTaggingSecretKey: Fq;
    publicKeys: PublicKeys;
}>;
//# sourceMappingURL=derivation.d.ts.map