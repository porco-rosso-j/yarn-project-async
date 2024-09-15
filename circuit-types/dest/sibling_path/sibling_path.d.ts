import { Fr } from '@aztec/foundation/fields';
import { type Tuple } from '@aztec/foundation/serialize';
import { type Hasher } from '@aztec/types/interfaces';
/**
 * Contains functionality to compute and serialize/deserialize a sibling path.
 * E.g. Sibling path for a leaf at index 3 in a tree of depth 3 consists of:
 *      d0:                                            [ root ]
 *      d1:                      [ ]                                               [*]
 *      d2:         [*]                      [ ]                       [ ]                     [ ]
 *      d3:   [ ]         [ ]          [*]         [ ]           [ ]         [ ]          [ ]        [ ].
 *
 *      And the elements would be ordered as: [ leaf_at_index_2, node_at_level_2_index_0, node_at_level_1_index_1 ].
 */
export declare class SiblingPath<N extends number> {
    /**
     * Size of the sibling path (number of fields it contains).
     */
    pathSize: N;
    private data;
    /**
     * Returns sibling path hashed up from the a element.
     * @param size - The number of elements in a given path.
     * @param zeroElement - Value of the zero element.
     * @param hasher - Implementation of a hasher interface.
     * @returns A sibling path hashed up from a zero element.
     */
    static ZERO<N extends number>(size: N, zeroElement: Buffer, hasher: Hasher): SiblingPath<N>;
    /**
     * Constructor.
     * @param pathSize - The size of the sibling path.
     * @param path - The sibling path data.
     */
    constructor(
    /**
     * Size of the sibling path (number of fields it contains).
     */
    pathSize: N, 
    /**
     * The sibling path data.
     */
    path: Buffer[]);
    /**
     * Serializes this SiblingPath object to a buffer.
     * @returns The buffer representation of this object.
     */
    toBuffer(): Buffer;
    /**
     * Returns the path buffer underlying the sibling path.
     * @returns The Buffer array representation of this object.
     */
    toBufferArray(): Buffer[];
    /**
     * Convert the Sibling Path object into an array of field elements.
     * @returns The field array representation of this object.
     */
    toFields(): Fr[];
    /**
     * Convert Sibling Path object into a tuple of field elements.
     * @returns A tuple representation of the sibling path.
     */
    toTuple<N extends number>(): Tuple<Fr, N>;
    /**
     * Deserializes a SiblingPath from a buffer.
     * @param buf - A buffer containing the buffer representation of SiblingPath.
     * @param offset - An offset to start deserializing from.
     * @returns A SiblingPath object.
     */
    static fromBuffer<N extends number>(buf: Buffer, offset?: number): SiblingPath<N>;
    /**
     * Deserializes a SiblingPath object from a slice of a part of a buffer and returns the amount of bytes advanced.
     * @param buf - A buffer representation of the sibling path.
     * @param offset - An offset to start deserializing from.
     * @returns The deserialized sibling path and the number of bytes advanced.
     */
    static deserialize<N extends number>(buf: Buffer, offset?: number): {
        elem: SiblingPath<N>;
        adv: number;
    };
    /**
     * Serializes this SiblingPath object to a hex string representation.
     * @returns A hex string representation of the sibling path.
     */
    toString(): string;
    /**
     * Deserializes a SiblingPath object from a hex string representation.
     * @param repr - A hex string representation of the sibling path.
     * @returns A SiblingPath object.
     */
    static fromString<N extends number>(repr: string): SiblingPath<N>;
    /**
     * Generate a subtree path from the current sibling path.
     * @param subtreeHeight - The size of the subtree that we are getting the path for.
     * @returns A new sibling path that is the for the requested subtree.
     */
    getSubtreeSiblingPath<SubtreeHeight extends number, SubtreeSiblingPathHeight extends number>(subtreeHeight: SubtreeHeight): SiblingPath<SubtreeSiblingPathHeight>;
}
//# sourceMappingURL=sibling_path.d.ts.map