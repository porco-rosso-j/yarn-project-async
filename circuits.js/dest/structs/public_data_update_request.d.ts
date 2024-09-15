import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { inspect } from 'util';
/**
 * Write operations on the public data tree including the previous value.
 */
export declare class PublicDataUpdateRequest {
    /**
     * Index of the leaf in the public data tree which is to be updated.
     */
    readonly leafSlot: Fr;
    /**
     * New value of the leaf.
     */
    readonly newValue: Fr;
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    readonly sideEffectCounter: number;
    constructor(
    /**
     * Index of the leaf in the public data tree which is to be updated.
     */
    leafSlot: Fr, 
    /**
     * New value of the leaf.
     */
    newValue: Fr, 
    /**
     * Side effect counter tracking position of this event in tx execution.
     */
    sideEffectCounter: number);
    static from(args: {
        /**
         * Index of the leaf in the public data tree which is to be updated.
         */
        leafIndex: Fr;
        /**
         * New value of the leaf.
         */
        newValue: Fr;
        /**
         * Side effect counter tracking position of this event in tx execution.
         */
        sideEffectCounter: number;
    }): PublicDataUpdateRequest;
    get counter(): number;
    get position(): Fr;
    toBuffer(): Buffer;
    isEmpty(): boolean;
    static fromFields(fields: Fr[] | FieldReader): PublicDataUpdateRequest;
    static isEmpty(x: PublicDataUpdateRequest): boolean;
    equals(other: PublicDataUpdateRequest): boolean;
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataUpdateRequest;
    static empty(): PublicDataUpdateRequest;
    toFriendlyJSON(): string;
    [inspect.custom](): string;
}
//# sourceMappingURL=public_data_update_request.d.ts.map