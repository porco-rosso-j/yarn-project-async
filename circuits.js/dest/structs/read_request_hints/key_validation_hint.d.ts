import { GrumpkinScalar } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
export declare class KeyValidationHint {
    /** Master secret key used to derive sk_app and pk_m. */
    skM: GrumpkinScalar;
    /** Index of the request in the array of hints. */
    requestIndex: number;
    constructor(
    /** Master secret key used to derive sk_app and pk_m. */
    skM: GrumpkinScalar, 
    /** Index of the request in the array of hints. */
    requestIndex: number);
    static fromBuffer(buffer: Buffer | BufferReader): KeyValidationHint;
    toBuffer(): Buffer;
    static empty(): KeyValidationHint;
}
//# sourceMappingURL=key_validation_hint.d.ts.map