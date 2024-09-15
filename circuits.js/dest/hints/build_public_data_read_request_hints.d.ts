import { type Tuple } from '@aztec/foundation/serialize';
import { type MAX_PUBLIC_DATA_HINTS, type MAX_PUBLIC_DATA_READS_PER_TX, type MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX } from '../constants.gen.js';
import { type PublicDataRead, type PublicDataUpdateRequest } from '../structs/index.js';
import { type PublicDataHint } from '../structs/public_data_hint.js';
export declare function buildPublicDataReadRequestHints(publicDataReads: Tuple<PublicDataRead, typeof MAX_PUBLIC_DATA_READS_PER_TX>, publicDataUpdateRequests: Tuple<PublicDataUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX>, publicDataHints: Tuple<PublicDataHint, typeof MAX_PUBLIC_DATA_HINTS>): import("../structs/public_data_read_request_hints.js").PublicDataReadRequestHints;
//# sourceMappingURL=build_public_data_read_request_hints.d.ts.map