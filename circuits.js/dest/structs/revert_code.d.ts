import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { inspect } from 'util';
/**
 * Wrapper class over a field to safely represent a revert code.
 */
export declare class RevertCode {
    private code;
    private constructor();
    static readonly OK: RevertCode;
    static readonly APP_LOGIC_REVERTED: RevertCode;
    static readonly TEARDOWN_REVERTED: RevertCode;
    static readonly BOTH_REVERTED: RevertCode;
    equals(other: RevertCode): boolean;
    isOK(): boolean;
    getDescription(): string;
    /**
     * Having different serialization methods allows for
     * decoupling the serialization for producing the content commitment hash
     * (where we use fields)
     * from serialization for transmitting the data.
     */
    private static readonly PREIMAGE_SIZE_IN_BYTES;
    toHashPreimage(): Buffer;
    private static readonly PACKED_SIZE_IN_BYTES;
    toBuffer(): Buffer;
    toField(): Fr;
    getSerializedLength(): number;
    static fromField(fr: Fr): RevertCode;
    static fromFields(fields: Fr[] | FieldReader): RevertCode;
    static fromBuffer(buffer: Buffer | BufferReader): RevertCode;
    private static readonly NUM_OPTIONS;
    static random(): RevertCode;
    [inspect.custom](): string;
}
//# sourceMappingURL=revert_code.d.ts.map