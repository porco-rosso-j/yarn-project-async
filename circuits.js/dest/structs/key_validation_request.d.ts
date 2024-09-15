import { Fr, GrumpkinScalar, Point } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
/**
 * Request for validating keys used in the app.
 */
export declare class KeyValidationRequest {
    /** Master public key corresponding to the same underlying secret as app secret key below. */
    readonly pkM: Point;
    /** App-siloed secret key corresponding to the same underlying secret as master public key above. */
    readonly skApp: Fr;
    constructor(
    /** Master public key corresponding to the same underlying secret as app secret key below. */
    pkM: Point, skApp: Fr | GrumpkinScalar);
    toBuffer(): Buffer;
    get skAppAsGrumpkinScalar(): import("@aztec/foundation/fields").Fq;
    static fromBuffer(buffer: Buffer | BufferReader): KeyValidationRequest;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): KeyValidationRequest;
    isEmpty(): boolean;
    static empty(): KeyValidationRequest;
    static random(): KeyValidationRequest;
}
//# sourceMappingURL=key_validation_request.d.ts.map