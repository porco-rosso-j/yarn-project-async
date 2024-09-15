import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { ContentCommitment } from './content_commitment.js';
import { GlobalVariables } from './global_variables.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
import { StateReference } from './state_reference.js';
/** A header of an L2 block. */
export declare class Header {
    /** Snapshot of archive before the block is applied. */
    lastArchive: AppendOnlyTreeSnapshot;
    /** Hash of the body of an L2 block. */
    contentCommitment: ContentCommitment;
    /** State reference. */
    state: StateReference;
    /** Global variables of an L2 block. */
    globalVariables: GlobalVariables;
    /** Total fees in the block, computed by the root rollup circuit */
    totalFees: Fr;
    constructor(
    /** Snapshot of archive before the block is applied. */
    lastArchive: AppendOnlyTreeSnapshot, 
    /** Hash of the body of an L2 block. */
    contentCommitment: ContentCommitment, 
    /** State reference. */
    state: StateReference, 
    /** Global variables of an L2 block. */
    globalVariables: GlobalVariables, 
    /** Total fees in the block, computed by the root rollup circuit */
    totalFees: Fr);
    static getFields(fields: FieldsOf<Header>): readonly [AppendOnlyTreeSnapshot, ContentCommitment, StateReference, GlobalVariables, Fr];
    getSize(): number;
    toBuffer(): Buffer;
    toFields(): Fr[];
    clone(): Header;
    static fromBuffer(buffer: Buffer | BufferReader): Header;
    static fromFields(fields: Fr[] | FieldReader): Header;
    static empty(): Header;
    isEmpty(): boolean;
    /**
     * Serializes this instance into a string.
     * @returns Encoded string.
     */
    toString(): string;
    static fromString(str: string): Header;
    hash(): Promise<Fr>;
}
//# sourceMappingURL=header.d.ts.map