import { Fr } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
export declare class InboxLeaf {
    /** L2 block number in which the message will be included. */
    readonly blockNumber: bigint;
    /** Index of the leaf in L2 block message subtree. */
    readonly index: bigint;
    /** Leaf in the subtree/message hash. */
    readonly leaf: Fr;
    constructor(
    /** L2 block number in which the message will be included. */
    blockNumber: bigint, 
    /** Index of the leaf in L2 block message subtree. */
    index: bigint, 
    /** Leaf in the subtree/message hash. */
    leaf: Fr);
    toBuffer(): Buffer;
    fromBuffer(buffer: Buffer | BufferReader): InboxLeaf;
}
//# sourceMappingURL=inbox_leaf.d.ts.map