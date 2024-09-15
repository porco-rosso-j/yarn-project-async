import { type Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { PartialStateReference } from './partial_state_reference.js';
import { AppendOnlyTreeSnapshot } from './rollup/append_only_tree_snapshot.js';
/**
 * Stores snapshots of all the trees but archive.
 */
export declare class StateReference {
    /** Snapshot of the l1 to l2 message tree. */
    l1ToL2MessageTree: AppendOnlyTreeSnapshot;
    /** Reference to the rest of the state. */
    partial: PartialStateReference;
    constructor(
    /** Snapshot of the l1 to l2 message tree. */
    l1ToL2MessageTree: AppendOnlyTreeSnapshot, 
    /** Reference to the rest of the state. */
    partial: PartialStateReference);
    getSize(): number;
    toBuffer(): Buffer;
    toFields(): Fr[];
    static fromBuffer(buffer: Buffer | BufferReader): StateReference;
    static fromFields(fields: Fr[] | FieldReader): StateReference;
    static empty(): StateReference;
    isEmpty(): boolean;
}
//# sourceMappingURL=state_reference.d.ts.map