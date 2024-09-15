import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * Write operations on the public state tree.
 */
export declare class PublicDataWrite {
    /**
     * Index of the updated leaf.
     */
    readonly leafIndex: Fr;
    /**
     * New value of the leaf.
     */
    readonly newValue: Fr;
    static SIZE_IN_BYTES: number;
    constructor(
    /**
     * Index of the updated leaf.
     */
    leafIndex: Fr, 
    /**
     * New value of the leaf.
     */
    newValue: Fr);
    /**
     * Creates a new public data write operation from the given arguments.
     * @param args - Arguments containing info used to create a new public data write operation.
     * @returns A new public data write operation instance.
     */
    static from(args: {
        /**
         * Index of the updated leaf.
         */
        leafIndex: Fr;
        /**
         * New value of the leaf.
         */
        newValue: Fr;
    }): PublicDataWrite;
    /**
     * Serializes the public data write operation to a buffer.
     * @returns A buffer containing the serialized public data write operation.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the operation to a string.
     * @returns A string representation of the operation.
     */
    toString(): string;
    /**
     * Checks if the public data write operation is empty.
     * @returns True if the public data write operation is empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Creates a new public data write operation from the given buffer.
     * @param buffer - Buffer containing the serialized public data write operation.
     * @returns A new public data write operation instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataWrite;
    /**
     * Creates a new public data write operation from the given string.
     * @param str - The serialized string
     * @returns A new public data write operation instance.
     */
    static fromString(str: string): PublicDataWrite;
    /**
     * Creates an empty public data write operation.
     * @returns A new public data write operation instance.
     */
    static empty(): PublicDataWrite;
    /**
     * Creates a random public data write operation.
     * @returns A new public data write operation instance.
     */
    static random(): PublicDataWrite;
    static isEmpty(data: PublicDataWrite): boolean;
}
//# sourceMappingURL=public_data_write.d.ts.map