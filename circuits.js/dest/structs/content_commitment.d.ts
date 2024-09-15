import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
export declare const NUM_BYTES_PER_SHA256 = 32;
export declare class ContentCommitment {
    numTxs: Fr;
    txsEffectsHash: Buffer;
    inHash: Buffer;
    outHash: Buffer;
    constructor(numTxs: Fr, txsEffectsHash: Buffer, inHash: Buffer, outHash: Buffer);
    getSize(): number;
    toBuffer(): Buffer;
    toFields(): Fr[];
    static fromBuffer(buffer: Buffer | BufferReader): ContentCommitment;
    static fromFields(fields: Fr[] | FieldReader): ContentCommitment;
    static empty(): ContentCommitment;
    isEmpty(): boolean;
    toString(): string;
    static fromString(str: string): ContentCommitment;
}
//# sourceMappingURL=content_commitment.d.ts.map