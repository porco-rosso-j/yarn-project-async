import { AztecAddress } from '@aztec/foundation/aztec-address';
import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { KeyValidationRequestAndGenerator } from './key_validation_request_and_generator.js';
/**
 * Request for validating keys used in the app.
 */
export declare class ScopedKeyValidationRequestAndGenerator {
    readonly request: KeyValidationRequestAndGenerator;
    readonly contractAddress: AztecAddress;
    constructor(request: KeyValidationRequestAndGenerator, contractAddress: AztecAddress);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedKeyValidationRequestAndGenerator;
    toFields(): Fr[];
    static fromFields(fields: Fr[] | FieldReader): ScopedKeyValidationRequestAndGenerator;
    isEmpty(): boolean;
    static empty(): ScopedKeyValidationRequestAndGenerator;
}
//# sourceMappingURL=scoped_key_validation_request_and_generator.d.ts.map