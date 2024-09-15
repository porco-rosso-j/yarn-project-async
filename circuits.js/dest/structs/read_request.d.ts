import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
export declare class ReadRequest {
    /**
     * The value being read.
     */
    value: Fr;
    /**
     * The side-effect counter.
     */
    counter: number;
    constructor(
    /**
     * The value being read.
     */
    value: Fr, 
    /**
     * The side-effect counter.
     */
    counter: number);
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of ReadRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): ReadRequest;
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ReadRequest;
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value and counter both are zero.
     */
    isEmpty(): boolean;
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with both value and counter being zero.
     */
    static empty(): ReadRequest;
    scope(contractAddress: AztecAddress): ScopedReadRequest;
}
/**
 * ReadRequest with context of the contract emitting the request.
 */
export declare class ScopedReadRequest {
    readRequest: ReadRequest;
    contractAddress: AztecAddress;
    constructor(readRequest: ReadRequest, contractAddress: AztecAddress);
    get value(): Fr;
    get counter(): number;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of ScopedReadRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): ScopedReadRequest;
    /**
     * Convert to an array of fields.
     * @returns The array of fields.
     */
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedReadRequest;
    /**
     * Returns whether this instance of side-effect is empty.
     * @returns True if the value, note hash and counter are all zero.
     */
    isEmpty(): boolean;
    /**
     * Returns an empty instance of side-effect.
     * @returns Side-effect with value, note hash and counter being zero.
     */
    static empty(): ScopedReadRequest;
}
//# sourceMappingURL=read_request.d.ts.map