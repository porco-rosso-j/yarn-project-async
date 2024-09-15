import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * An authentication witness. Used to authorize an action by a user.
 */
export declare class AuthWitness {
    /** Hash of the request to authorize */
    readonly requestHash: Fr;
    /** Authentication witness for the hash  */
    readonly witness: Fr[];
    constructor(
    /** Hash of the request to authorize */
    requestHash: Fr, 
    /** Authentication witness for the hash  */
    witness: (Fr | number)[]);
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): AuthWitness;
    toString(): string;
    static fromString(str: string): AuthWitness;
}
//# sourceMappingURL=auth_witness.d.ts.map