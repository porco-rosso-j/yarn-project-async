import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
export declare class ParityPublicInputs {
    /** Root of the SHA256 tree. */
    shaRoot: Fr;
    /** Root of the converted tree. */
    convertedRoot: Fr;
    /** Root of the VK tree */
    vkTreeRoot: Fr;
    constructor(
    /** Root of the SHA256 tree. */
    shaRoot: Fr, 
    /** Root of the converted tree. */
    convertedRoot: Fr, 
    /** Root of the VK tree */
    vkTreeRoot: Fr);
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The inputs serialized to a hex string.
     */
    toString(): string;
    /**
     * Creates a new ParityPublicInputs instance from the given fields.
     * @param fields - The fields to create the instance from.
     * @returns The instance.
     */
    static from(fields: FieldsOf<ParityPublicInputs>): ParityPublicInputs;
    /**
     * Extracts the fields from the given instance.
     * @param fields - The instance to get the fields from.
     * @returns The instance fields.
     */
    static getFields(fields: FieldsOf<ParityPublicInputs>): readonly [Fr, Fr, Fr];
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new ParityPublicInputs instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): ParityPublicInputs;
    /**
     * Deserializes the inputs from a hex string.
     * @param str - The hex string to deserialize from.
     * @returns A new ParityPublicInputs instance.
     */
    static fromString(str: string): ParityPublicInputs;
}
//# sourceMappingURL=parity_public_inputs.d.ts.map