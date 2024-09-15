import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { computePartialAddress } from '../contract/contract_address.js';
import { computeAddress, deriveKeys } from '../keys/index.js';
import { PublicKeys } from '../types/public_keys.js';
/**
 * A complete address is a combination of an Aztec address, a public key and a partial address.
 *
 * @remarks We have introduced this type because it is common that these 3 values are used together. They are commonly
 *          used together because it is the information needed to send user a note.
 * @remarks See the link below for details about how address is computed:
 *          https://github.com/AztecProtocol/aztec-packages/blob/master/docs/docs/concepts/foundation/accounts/keys.md#addresses-partial-addresses-and-public-keys
 */
export class CompleteAddress {
    constructor(
    /** Contract address (typically of an account contract) */
    address, 
    /** User public keys */
    publicKeys, 
    /** Partial key corresponding to the public key to the address. */
    partialAddress) {
        this.address = address;
        this.publicKeys = publicKeys;
        this.partialAddress = partialAddress;
        this.validate();
    }
    static async random() {
        return await this.fromSecretKeyAndPartialAddress(Fr.random(), Fr.random());
    }
    static async fromSecretKeyAndPartialAddress(secretKey, partialAddress) {
        const { publicKeys } = await deriveKeys(secretKey);
        const address = await computeAddress(await publicKeys.hash(), partialAddress);
        return new CompleteAddress(address, publicKeys, partialAddress);
    }
    static async fromSecretKeyAndInstance(secretKey, instance) {
        const partialAddress = await computePartialAddress(instance);
        return await CompleteAddress.fromSecretKeyAndPartialAddress(secretKey, partialAddress);
    }
    /** Throws if the address is not correctly derived from the public key and partial address.*/
    async validate() {
        const expectedAddress = await computeAddress(await this.publicKeys.hash(), this.partialAddress);
        if (!expectedAddress.equals(this.address)) {
            throw new Error(`Address cannot be derived from public keys and partial address (received ${this.address.toString()}, derived ${expectedAddress.toString()})`);
        }
    }
    /**
     * Gets a readable string representation of the complete address.
     * @returns A readable string representation of the complete address.
     */
    toReadableString() {
        return `Address: ${this.address.toString()}\nMaster Nullifier Public Key: ${this.publicKeys.masterNullifierPublicKey.toString()}\nMaster Incoming Viewing Public Key: ${this.publicKeys.masterIncomingViewingPublicKey.toString()}\nMaster Outgoing Viewing Public Key: ${this.publicKeys.masterOutgoingViewingPublicKey.toString()}\nMaster Tagging Public Key: ${this.publicKeys.masterTaggingPublicKey.toString()}\nPartial Address: ${this.partialAddress.toString()}\n`;
    }
    /**
     * Determines if this CompleteAddress instance is equal to the given CompleteAddress instance.
     * Equality is based on the content of their respective buffers.
     *
     * @param other - The CompleteAddress instance to compare against.
     * @returns True if the buffers of both instances are equal, false otherwise.
     */
    equals(other) {
        return (this.address.equals(other.address) &&
            this.publicKeys.equals(other.publicKeys) &&
            this.partialAddress.equals(other.partialAddress));
    }
    /**
     * Converts the CompleteAddress instance into a Buffer.
     * This method should be used when encoding the address for storage, transmission or serialization purposes.
     *
     * @returns A Buffer representation of the CompleteAddress instance.
     */
    toBuffer() {
        return serializeToBuffer([this.address, this.publicKeys, this.partialAddress]);
    }
    /**
     * Creates an CompleteAddress instance from a given buffer or BufferReader.
     * If the input is a Buffer, it wraps it in a BufferReader before processing.
     * Throws an error if the input length is not equal to the expected size.
     *
     * @param buffer - The input buffer or BufferReader containing the address data.
     * @returns - A new CompleteAddress instance with the extracted address data.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const address = reader.readObject(AztecAddress);
        const publicKeys = reader.readObject(PublicKeys);
        const partialAddress = reader.readObject(Fr);
        return new CompleteAddress(address, publicKeys, partialAddress);
    }
    /**
     * Create a CompleteAddress instance from a hex-encoded string.
     * The input 'address' should be prefixed with '0x' or not, and have exactly 128 hex characters representing the x and y coordinates.
     * Throws an error if the input length is invalid or coordinate values are out of range.
     *
     * @param address - The hex-encoded string representing the complete address.
     * @returns A Point instance.
     */
    static fromString(address) {
        return this.fromBuffer(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    /**
     * Convert the CompleteAddress to a hexadecimal string representation, with a "0x" prefix.
     * The resulting string will have a length of 66 characters (including the prefix).
     *
     * @returns A hexadecimal string representation of the CompleteAddress.
     */
    toString() {
        return `0x${this.toBuffer().toString('hex')}`;
    }
}
/** Size in bytes of an instance */
CompleteAddress.SIZE_IN_BYTES = 32 * 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVfYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2NvbXBsZXRlX2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBQzFCO0lBQ0UsMERBQTBEO0lBQ25ELE9BQXFCO0lBQzVCLHVCQUF1QjtJQUNoQixVQUFzQjtJQUM3QixrRUFBa0U7SUFDM0QsY0FBOEI7UUFKOUIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUVyQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRXRCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUVyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUtELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLE1BQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxTQUFhLEVBQUUsY0FBa0I7UUFDM0UsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFD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