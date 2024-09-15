import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
/**
 * Read operations from the public state tree.
 */
export declare class PublicDataRead {
    /**
     * Index of the leaf in the public data tree.
     */
    readonly leafSlot: Fr;
    /**
     * Returned value from the public data tree.
     */
    readonly value: Fr;
    /**
     * Optional side effect counter tracking position of this event in tx execution.
     */
    readonly sideEffectCounter?: number | undefined;
    constructor(
    /**
     * Index of the leaf in the public data tree.
     */
    leafSlot: Fr, 
    /**
     * Returned value from the public data tree.
     */
    value: Fr, 
    /**
     * Optional side effect counter tracking position of this event in tx execution.
     */
    sideEffectCounter?: number | undefined);
    static from(args: {
        /**
         * Index of the leaf in the public data tree.
         */
        leafIndex: Fr;
        /**
         * Returned value from the public data tree.
         */
        value: Fr;
    }): PublicDataRead;
    toBuffer(): Buffer;
    isEmpty(): boolean;
    static fromFields(fields: Fr[] | FieldReader): PublicDataRead;
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataRead;
    static empty(): PublicDataRead;
    toFriendlyJSON(): string;
    equals(other: PublicDataRead): boolean;
}
//# sourceMappingURL=public_data_read_request.d.ts.map