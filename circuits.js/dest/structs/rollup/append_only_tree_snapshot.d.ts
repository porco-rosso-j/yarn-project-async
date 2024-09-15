import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type UInt32 } from '../shared.js';
/**
 * Snapshot of an append only tree.
 *
 * Used in circuits to verify that tree insertions are performed correctly.
 */
export declare class AppendOnlyTreeSnapshot {
    /**
     * Root of the append only tree when taking the snapshot.
     */
    root: Fr;
    /**
     * Index of the next available leaf in the append only tree.
     *
     * Note: We include the next available leaf index in the snapshot so that the snapshot can be used to verify that
     *       the insertion was performed at the correct place. If we only verified tree root then it could happen that
     *       some leaves would get overwritten and the tree root check would still pass.
     *       TLDR: We need to store the next available leaf index to ensure that the "append only" property was
     *             preserved when verifying state transitions.
     */
    nextAvailableLeafIndex: UInt32;
    constructor(
    /**
     * Root of the append only tree when taking the snapshot.
     */
    root: Fr, 
    /**
     * Index of the next available leaf in the append only tree.
     *
     * Note: We include the next available leaf index in the snapshot so that the snapshot can be used to verify that
     *       the insertion was performed at the correct place. If we only verified tree root then it could happen that
     *       some leaves would get overwritten and the tree root check would still pass.
     *       TLDR: We need to store the next available leaf index to ensure that the "append only" property was
     *             preserved when verifying state transitions.
     */
    nextAvailableLeafIndex: UInt32);
    getSize(): number;
    toBuffer(): Buffer;
    toFields(): Fr[];
    toString(): string;
    static fromBuffer(buffer: Buffer | BufferReader): AppendOnlyTreeSnapshot;
    static fromString(str: string): AppendOnlyTreeSnapshot;
    static fromFields(fields: Fr[] | FieldReader): AppendOnlyTreeSnapshot;
    static zero(): AppendOnlyTreeSnapshot;
    isZero(): boolean;
}
//# sourceMappingURL=append_only_tree_snapshot.d.ts.map