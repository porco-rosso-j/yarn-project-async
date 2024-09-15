import { AztecAddress } from '@aztec/foundation/aztec-address';
import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
export declare class CallerContext {
    /**
     * Message sender of the caller contract.
     */
    msgSender: AztecAddress;
    /**
     * Storage contract address of the caller contract.
     */
    storageContractAddress: AztecAddress;
    /**
     * Whether the caller was modifying state.
     */
    isStaticCall: boolean;
    constructor(
    /**
     * Message sender of the caller contract.
     */
    msgSender: AztecAddress, 
    /**
     * Storage contract address of the caller contract.
     */
    storageContractAddress: AztecAddress, 
    /**
     * Whether the caller was modifying state.
     */
    isStaticCall: boolean);
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): CallerContext;
    /**
     * Returns a new instance of CallerContext with zero values.
     * @returns A new instance of CallerContext with zero values.
     */
    static empty(): CallerContext;
    isEmpty(): boolean;
    static from(fields: FieldsOf<CallerContext>): CallerContext;
    static getFields(fields: FieldsOf<CallerContext>): readonly [AztecAddress, AztecAddress, boolean];
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CallerContext;
    equals(callerContext: CallerContext): boolean;
}
//# sourceMappingURL=caller_context.d.ts.map