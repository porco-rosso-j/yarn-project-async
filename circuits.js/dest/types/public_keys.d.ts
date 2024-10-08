import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type PublicKey } from './public_key.js';
export declare class PublicKeys {
    /** Contract address (typically of an account contract) */
    /** Master nullifier public key */
    masterNullifierPublicKey: PublicKey;
    /** Master incoming viewing public key */
    masterIncomingViewingPublicKey: PublicKey;
    /** Master outgoing viewing public key */
    masterOutgoingViewingPublicKey: PublicKey;
    /** Master tagging viewing public key */
    masterTaggingPublicKey: PublicKey;
    constructor(
    /** Contract address (typically of an account contract) */
    /** Master nullifier public key */
    masterNullifierPublicKey: PublicKey, 
    /** Master incoming viewing public key */
    masterIncomingViewingPublicKey: PublicKey, 
    /** Master outgoing viewing public key */
    masterOutgoingViewingPublicKey: PublicKey, 
    /** Master tagging viewing public key */
    masterTaggingPublicKey: PublicKey);
    hash(): Promise<Fr>;
    isEmpty(): boolean;
    static empty(): PublicKeys;
    /**
     * Determines if this PublicKeys instance is equal to the given PublicKeys instance.
     * Equality is based on the content of their respective buffers.
     *
     * @param other - The PublicKeys instance to compare against.
     * @returns True if the buffers of both instances are equal, false otherwise.
     */
    equals(other: PublicKeys): boolean;
    /**
     * Converts the PublicKeys instance into a Buffer.
     * This method should be used when encoding the address for storage, transmission or serialization purposes.
     *
     * @returns A Buffer representation of the PublicKeys instance.
     */
    toBuffer(): Buffer;
    /**
     * Creates an PublicKeys instance from a given buffer or BufferReader.
     * If the input is a Buffer, it wraps it in a BufferReader before processing.
     * Throws an error if the input length is not equal to the expected size.
     *
     * @param buffer - The input buffer or BufferReader containing the address data.
     * @returns - A new PublicKeys instance with the extracted address data.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicKeys;
    toNoirStruct(): {
        npk_m: {
            x: Fr;
            y: Fr;
            is_infinite: boolean;
        };
        ivpk_m: {
            x: Fr;
            y: Fr;
            is_infinite: boolean;
        };
        ovpk_m: {
            x: Fr;
            y: Fr;
            is_infinite: boolean;
        };
        tpk_m: {
            x: Fr;
            y: Fr;
            is_infinite: boolean;
        };
    };
    /**
     * Serializes the payload to an array of fields
     * @returns The fields of the payload
     */
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): PublicKeys;
    toString(): string;
    static fromString(keys: string): PublicKeys;
}
//# sourceMappingURL=public_keys.d.ts.map