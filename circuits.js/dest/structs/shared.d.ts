import { type Bufferable } from '@aztec/foundation/serialize';
/**
 * Implementation of a vector. Matches how we are serializing and deserializing vectors in cpp (length in the first position, followed by the items).
 */
export declare class Vector<T extends Bufferable> {
    /**
     * Items in the vector.
     */
    items: T[];
    constructor(
    /**
     * Items in the vector.
     */
    items: T[]);
    toBuffer(): Buffer;
    toFriendlyJSON(): T[];
}
/**
 * A type alias for a 32-bit unsigned integer.
 */
export type UInt32 = number;
/**
 * CircuitType replaces ComposerType for now. When using Plonk, CircuitType is equivalent to the information of the proving system that will be used
 * to construct a proof. In the future Aztec zk stack, more information must be specified (e.g., the curve over which circuits are  constructed;
 * Plonk vs Honk; zk-SNARK or just SNARK; etc).
 */
export declare enum CircuitType {
    STANDARD = 0,
    ULTRA = 1
}
/**
 * Rollup types.
 */
export declare enum RollupTypes {
    Base = 0,
    Merge = 1,
    Root = 2
}
/**
 * String encoding of serialized buffer data
 */
export declare const STRING_ENCODING: BufferEncoding;
//# sourceMappingURL=shared.d.ts.map