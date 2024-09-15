import { inspect } from 'util';
import { Fr } from '../fields/index.js';
import { BufferReader, FieldReader } from '../serialize/index.js';
/**
 * Represents an Ethereum address as a 20-byte buffer and provides various utility methods
 * for converting between different representations, generating random addresses, validating
 * checksums, and comparing addresses. EthAddress can be instantiated using a buffer or string,
 * and can be serialized/deserialized from a buffer or BufferReader.
 */
export declare class EthAddress {
    private buffer;
    /**
     * The size of an Ethereum address in bytes.
     */
    static SIZE_IN_BYTES: number;
    /**
     * Represents a zero Ethereum address with 20 bytes filled with zeros.
     */
    static ZERO: EthAddress;
    constructor(buffer: Buffer);
    /**
     * Creates an EthAddress instance from a valid Ethereum address string.
     * The input 'address' can be either in checksum format or lowercase, and it can be prefixed with '0x'.
     * Throws an error if the input is not a valid Ethereum address.
     *
     * @param address - The string representing the Ethereum address.
     * @returns An EthAddress instance.
     */
    static fromString(address: string): EthAddress;
    /**
     * Create a random EthAddress instance with 20 random bytes.
     * This method generates a new Ethereum address with a randomly generated set of 20 bytes.
     * It is useful for generating test addresses or unique identifiers.
     *
     * @returns A randomly generated EthAddress instance.
     */
    static random(): EthAddress;
    /**
     * Determines if the given string represents a valid Ethereum address.
     * A valid address should meet the following criteria:
     * 1. Contains exactly 40 hex characters (excluding an optional '0x' prefix).
     * 2. Is either all lowercase, all uppercase, or has a valid checksum based on EIP-55.
     *
     * @param address - The string to be checked for validity as an Ethereum address.
     * @returns True if the input string represents a valid Ethereum address, false otherwise.
     */
    static isAddress(address: string): boolean;
    /**
     * Checks if the EthAddress instance represents a zero address.
     * A zero address consists of 20 bytes filled with zeros and is considered an invalid address.
     *
     * @returns A boolean indicating whether the EthAddress instance is a zero address or not.
     */
    isZero(): boolean;
    /**
     * Checks if the given Ethereum address has a valid checksum.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 40 hex characters.
     * Returns true if the address has a valid checksum, false otherwise.
     *
     * @param address - The hex-encoded string representing the Ethereum address.
     * @returns A boolean value indicating whether the address has a valid checksum.
     */
    static checkAddressChecksum(address: string): boolean;
    /**
     * Converts an Ethereum address to its checksum format.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 40 hex characters.
     * The checksum format is created by capitalizing certain characters in the hex string
     * based on the hash of the lowercase address.
     * Throws an error if the input address is invalid.
     *
     * @param address - The Ethereum address as a hex-encoded string.
     * @returns The Ethereum address in its checksum format.
     */
    static toChecksumAddress(address: string): string;
    /**
     * Checks whether the given EthAddress instance is equal to the current instance.
     * Equality is determined by comparing the underlying byte buffers of both instances.
     *
     * @param rhs - The EthAddress instance to compare with the current instance.
     * @returns A boolean value indicating whether the two instances are equal (true) or not (false).
     */
    equals(rhs: EthAddress): boolean;
    /**
     * Converts the Ethereum address to a hex-encoded string.
     * The resulting string is prefixed with '0x' and has exactly 40 hex characters.
     * This method can be used to represent the EthAddress instance in the widely used hexadecimal format.
     *
     * @returns A hex-encoded string representation of the Ethereum address.
     */
    toString(): `0x${string}`;
    [inspect.custom](): string;
    /**
     * Returns the Ethereum address as a checksummed string.
     * The output string will have characters in the correct upper or lowercase form, according to EIP-55.
     * This provides a way to verify if an address is typed correctly, by checking the character casing.
     *
     * @returns A checksummed Ethereum address string.
     */
    toChecksumString(): string;
    /**
     * Returns a 20-byte buffer representation of the Ethereum address.
     * @returns A 20-byte Buffer containing the Ethereum address.
     */
    toBuffer(): Buffer;
    /**
     * Returns a 32-byte buffer representation of the Ethereum address, with the original 20-byte address
     * occupying the last 20 bytes and the first 12 bytes being zero-filled.
     * This format is commonly used in smart contracts when handling addresses as 32-byte values.
     *
     * @returns A 32-byte Buffer containing the padded Ethereum address.
     */
    toBuffer32(): Buffer;
    /**
     * Returns a new field with the same contents as this EthAddress.
     *
     * @returns An Fr instance.
     */
    toField(): Fr;
    /**
     * Converts a field to a eth address.
     * @param fr - The field to convert.
     * @returns The eth address.
     */
    static fromField(fr: Fr): EthAddress;
    static fromFields(fields: Fr[] | FieldReader): EthAddress;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The EthAddress.
     */
    static fromBuffer(buffer: Buffer | BufferReader): EthAddress;
    /**
     * Friendly representation for debugging purposes.
     * @returns A hex string representing the address.
     */
    toFriendlyJSON(): `0x${string}`;
    toJSON(): {
        type: string;
        value: `0x${string}`;
    };
}
//# sourceMappingURL=index.d.ts.map