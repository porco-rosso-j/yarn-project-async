import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { KeyValidationRequest } from './key_validation_request.js';
/**
 * Request for validating keys used in the app and a generator.
 */
export declare class KeyValidationRequestAndGenerator {
    /** The key validation request. */
    readonly request: KeyValidationRequest;
    /**
     * The generator index which can be used along with sk_m to derive the sk_app stored in the request.
     * Note: This generator constrains that a correct key type gets validated in the kernel.
     */
    readonly skAppGenerator: Fr;
    constructor(
    /** The key validation request. */
    request: KeyValidationRequest, 
    /**
     * The generator index which can be used along with sk_m to derive the sk_app stored in the request.
     * Note: This generator constrains that a correct key type gets validated in the kernel.
     */
    skAppGenerator: Fr);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): KeyValidationRequestAndGenerator;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): KeyValidationRequestAndGenerator;
    isEmpty(): boolean;
    static empty(): KeyValidationRequestAndGenerator;
}
//# sourceMappingURL=key_validation_request_and_generator.d.ts.map