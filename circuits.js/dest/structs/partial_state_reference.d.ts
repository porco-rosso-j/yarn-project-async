import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
/**
 * Stores snapshots of trees which are commonly needed by base or merge rollup circuits.
 */
export declare class PartialStateReference {
    /** Snapshot of the note hash tree. */
    readonly noteHashTree: AppendOnlyTreeSnapshot;
    /** Snapshot of the nullifier tree. */
    readonly nullifierTree: AppendOnlyTreeSnapshot;
    /** Snapshot of the public data tree. */
    readonly publicDataTree: AppendOnlyTreeSnapshot;
    constructor(
    /** Snapshot of the note hash tree. */
    noteHashTree: AppendOnlyTreeSnapshot, 
    /** Snapshot of the nullifier tree. */
    nullifierTree: AppendOnlyTreeSnapshot, 
    /** Snapshot of the public data tree. */
    publicDataTree: AppendOnlyTreeSnapshot);
    getSize(): number;
    static fromBuffer(buffer: Buffer | BufferReader): PartialStateReference;
    static fromFields(fields: Fr[] | FieldReader): PartialStateReference;
    static empty(): PartialStateReference;
    toBuffer(): Buffer;
    toFields(): Fr[];
    isEmpty(): boolean;
}
//# sourceMappingURL=partial_state_reference.d.ts.map