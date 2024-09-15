import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { computePartialAddress } from '../contract/contract_address.js';
import { type PartialAddress } from '../types/partial_address.js';
import { PublicKeys } from '../types/public_keys.js';
/**
 * A complete address is a combination of an Aztec address, a public key and a partial address.
 *
 * @remarks We have introduced this type because it is common that these 3 values are used together. They are commonly
 *          used together because it is the information needed to send user a note.
 * @remarks See the link below for details about how address is computed:
 *          https://github.com/AztecProtocol/aztec-packages/blob/master/docs/docs/concepts/foundation/accounts/keys.md#addresses-partial-addresses-and-public-keys
 */
export declare class CompleteAddress {
    /** Contract address (typically of an account contract) */
    address: AztecAddress;
    /** User public keys */
    publicKeys: PublicKeys;
    /** Partial key corresponding to the public key to the address. */
    partialAddress: PartialAddress;
    constructor(
    /** Contract address (typically of an account contract) */
    address: AztecAddress, 
    /** User public keys */
    publicKeys: PublicKeys, 
    /** Partial key corresponding to the public key to the address. */
    partialAddress: PartialAddress);
    /** Size in bytes of an instance */
    static readonly SIZE_IN_BYTES: number;
    static random(): Promise<CompleteAddress>;
    static fromSecretKeyAndPartialAddress(secretKey: Fr, partialAddress: Fr): Promise<CompleteAddress>;
    static fromSecretKeyAndInstance(secretKey: Fr, instance: Parameters<typeof computePartialAddress>[0]): Promise<CompleteAddress>;
    /** Throws if the address is not correctly derived from the public key and partial address.*/
    validate(): Promise<void>;
    /**
     * Gets a readable string representation of the complete address.
     * @returns A readable string representation of the complete address.
     */
    toReadableString(): string;
    /**
     * Determines if this CompleteAddress instance is equal to the given CompleteAddress instance.
     * Equality is based on the content of their respective buffers.
     *
     * @param other - The CompleteAddress instance to compare against.
     * @returns True if the buffers of both instances are equal, false otherwise.
     */
    equals(other: CompleteAddress): boolean;
    /**
     * Converts the CompleteAddress instance into a Buffer.
     * This method should be used when encoding the address for storage, transmission or serialization purposes.
     *
     * @returns A Buffer representation of the CompleteAddress instance.
     */
    toBuffer(): Buffer;
    /**
     * Creates an CompleteAddress instance from a given buffer or BufferReader.
     * If the input is a Buffer, it wraps it in a BufferReader before processing.
     * Throws an error if the input length is not equal to the expected size.
     *
     * @param buffer - The input buffer or BufferReader containing the address data.
     * @returns - A new CompleteAddress instance with the extracted address data.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CompleteAddress;
    /**
     * Create a CompleteAddress instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 128 hex characters representing the x and y coordinates.
     * Throws an error if the input length is invalid or coordinate values are out of range.
     *
     * @param address - The hex-encoded string representing the complete address.
     * @returns A Point instance.
     */
    static fromString(address: string): CompleteAddress;
    /**
     * Convert the CompleteAddress to a hexadecimal string representation, with a "0x" prefix.
     * The resulting string will have a length of 66 characters (including the prefix).
     *
     * @returns A hexadecimal string representation of the CompleteAddress.
     */
    toString(): string;
}
//# sourceMappingURL=complete_address.d.ts.map