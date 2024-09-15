import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { MAX_PUBLIC_DATA_READS_PER_TX } from '../constants.gen.js';
import { PendingReadHint, ReadRequestStatus } from './read_request_hints/index.js';
export declare class LeafDataReadHint {
    readRequestIndex: number;
    dataHintIndex: number;
    constructor(readRequestIndex: number, dataHintIndex: number);
    static nada(readRequestLen: number): LeafDataReadHint;
    static fromBuffer(buffer: Buffer | BufferReader): LeafDataReadHint;
    toBuffer(): Buffer;
}
export declare class PublicDataReadRequestHints {
    readRequestStatuses: Tuple<ReadRequestStatus, typeof MAX_PUBLIC_DATA_READS_PER_TX>;
    pendingReadHints: Tuple<PendingReadHint, typeof MAX_PUBLIC_DATA_READS_PER_TX>;
    leafDataReadHints: Tuple<LeafDataReadHint, typeof MAX_PUBLIC_DATA_READS_PER_TX>;
    constructor(readRequestStatuses: Tuple<ReadRequestStatus, typeof MAX_PUBLIC_DATA_READS_PER_TX>, pendingReadHints: Tuple<PendingReadHint, typeof MAX_PUBLIC_DATA_READS_PER_TX>, leafDataReadHints: Tuple<LeafDataReadHint, typeof MAX_PUBLIC_DATA_READS_PER_TX>);
    static fromBuffer(buffer: Buffer | BufferReader): PublicDataReadRequestHints;
    toBuffer(): Buffer;
}
export declare class PublicDataReadRequestHintsBuilder {
    private hints;
    private numPendingReadHints;
    private numLeafDataReadHints;
    constructor();
    static empty(): PublicDataReadRequestHints;
    addPendingReadRequest(readRequestIndex: number, publicDataWriteIndex: number): void;
    addLeafDataReadRequest(readRequestIndex: number, leafDataDataHintIndex: number): void;
    toHints(): PublicDataReadRequestHints;
}
//# sourceMappingURL=public_data_read_request_hints.d.ts.map