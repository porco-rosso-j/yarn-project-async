import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL } from '../../constants.gen.js';
import { CallRequest } from '../call_request.js';
import { Proof } from '../proof.js';
import { PublicCallStackItem } from '../public_call_stack_item.js';
/**
 * Public calldata assembled from the kernel execution result and proof.
 */
export declare class PublicCallData {
    /**
     * Call stack item being processed by the current iteration of the kernel.
     */
    readonly callStackItem: PublicCallStackItem;
    /**
     * Children call stack items.
     */
    readonly publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>;
    /**
     * Proof of the call stack item execution.
     */
    readonly proof: Proof;
    /**
     * Hash of the L2 contract bytecode.
     */
    readonly bytecodeHash: Fr;
    constructor(
    /**
     * Call stack item being processed by the current iteration of the kernel.
     */
    callStackItem: PublicCallStackItem, 
    /**
     * Children call stack items.
     */
    publicCallStack: Tuple<CallRequest, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>, 
    /**
     * Proof of the call stack item execution.
     */
    proof: Proof, 
    /**
     * Hash of the L2 contract bytecode.
     */
    bytecodeHash: Fr);
    toBuffer(): Buffer;
    static fromBuffer(buffer: BufferReader | Buffer): PublicCallData;
}
//# sourceMappingURL=public_call_data.d.ts.map