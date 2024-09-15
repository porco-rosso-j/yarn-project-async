import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_PUBLIC_DATA_HINTS } from '../../constants.gen.js';
import { type NullifierNonExistentReadRequestHints } from '../non_existent_read_request_hints.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { PublicDataHint } from '../public_data_hint.js';
import { PublicDataReadRequestHints } from '../public_data_read_request_hints.js';
import { type NullifierReadRequestHints } from '../read_request_hints/index.js';
import { CombineHints } from './combine_hints.js';
import { PublicKernelData } from './public_kernel_data.js';
export declare class PublicKernelTailCircuitPrivateInputs {
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    readonly previousKernel: PublicKernelData;
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    readonly nullifierReadRequestHints: NullifierReadRequestHints<typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>;
    /**
     * Contains hints for the nullifier non existent read requests.
     */
    readonly nullifierNonExistentReadRequestHints: NullifierNonExistentReadRequestHints;
    readonly publicDataHints: Tuple<PublicDataHint, typeof MAX_PUBLIC_DATA_HINTS>;
    readonly publicDataReadRequestHints: PublicDataReadRequestHints;
    readonly startState: PartialStateReference;
    readonly combineHints: CombineHints;
    constructor(
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    previousKernel: PublicKernelData, 
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    nullifierReadRequestHints: NullifierReadRequestHints<typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX>, 
    /**
     * Contains hints for the nullifier non existent read requests.
     */
    nullifierNonExistentReadRequestHints: NullifierNonExistentReadRequestHints, publicDataHints: Tuple<PublicDataHint, typeof MAX_PUBLIC_DATA_HINTS>, publicDataReadRequestHints: PublicDataReadRequestHints, startState: PartialStateReference, combineHints: CombineHints);
    toBuffer(): Buffer;
    toString(): string;
    static fromString(str: string): PublicKernelTailCircuitPrivateInputs;
    static fromBuffer(buffer: Buffer | BufferReader): PublicKernelTailCircuitPrivateInputs;
    clone(): PublicKernelTailCircuitPrivateInputs;
}
//# sourceMappingURL=public_kernel_tail_circuit_private_inputs.d.ts.map