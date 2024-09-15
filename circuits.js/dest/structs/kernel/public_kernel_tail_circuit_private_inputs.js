import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_PUBLIC_DATA_HINTS } from '../../constants.gen.js';
import { nullifierNonExistentReadRequestHintsFromBuffer, } from '../non_existent_read_request_hints.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { PublicDataHint } from '../public_data_hint.js';
import { PublicDataReadRequestHints } from '../public_data_read_request_hints.js';
import { nullifierReadRequestHintsFromBuffer } from '../read_request_hints/index.js';
import { CombineHints } from './combine_hints.js';
import { PublicKernelData } from './public_kernel_data.js';
export class PublicKernelTailCircuitPrivateInputs {
    constructor(
    /**
     * Kernels are recursive and this is the data from the previous kernel.
     */
    previousKernel, 
    /**
     * Contains hints for the nullifier read requests to locate corresponding pending or settled nullifiers.
     */
    nullifierReadRequestHints, 
    /**
     * Contains hints for the nullifier non existent read requests.
     */
    nullifierNonExistentReadRequestHints, publicDataHints, publicDataReadRequestHints, startState, combineHints) {
        this.previousKernel = previousKernel;
        this.nullifierReadRequestHints = nullifierReadRequestHints;
        this.nullifierNonExistentReadRequestHints = nullifierNonExistentReadRequestHints;
        this.publicDataHints = publicDataHints;
        this.publicDataReadRequestHints = publicDataReadRequestHints;
        this.startState = startState;
        this.combineHints = combineHints;
    }
    toBuffer() {
        return serializeToBuffer(this.previousKernel, this.nullifierReadRequestHints, this.nullifierNonExistentReadRequestHints, this.publicDataHints, this.publicDataReadRequestHints, this.startState, this.combineHints);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        return PublicKernelTailCircuitPrivateInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicKernelTailCircuitPrivateInputs(reader.readObject(PublicKernelData), nullifierReadRequestHintsFromBuffer(reader, MAX_NULLIFIER_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX), nullifierNonExistentReadRequestHintsFromBuffer(reader), reader.readArray(MAX_PUBLIC_DATA_HINTS, PublicDataHint), reader.readObject(PublicDataReadRequestHints), reader.readObject(PartialStateReference), reader.readObject(CombineHints));
    }
    clone() {
        return PublicKernelTailCircuitPrivateInputs.fromBuffer(this.toBuffer());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tlcm5lbF90YWlsX2NpcmN1aXRfcHJpdmF0ZV9pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9rZXJuZWwvcHVibGljX2tlcm5lbF90YWlsX2NpcmN1aXRfcHJpdmF0ZV9pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBYyxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTFGLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25HLE9BQU8sRUFFTCw4Q0FBOEMsR0FDL0MsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbEYsT0FBTyxFQUFrQyxtQ0FBbUMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUzRCxNQUFNLE9BQU8sb0NBQW9DO0lBQy9DO0lBQ0U7O09BRUc7SUFDYSxjQUFnQztJQUNoRDs7T0FFRztJQUNhLHlCQUdmO0lBQ0Q7O09BRUc7SUFDYSxvQ0FBMEUsRUFDMUUsZUFBb0UsRUFDcEUsMEJBQXNELEVBQ3RELFVBQWlDLEVBQ2pDLFlBQTBCO1FBZjFCLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUloQyw4QkFBeUIsR0FBekIseUJBQXlCLENBR3hDO1FBSWUseUNBQW9DLEdBQXBDLG9DQUFvQyxDQUFzQztRQUMxRSxvQkFBZSxHQUFmLGVBQWUsQ0FBcUQ7UUFDcEUsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtRQUN0RCxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUNqQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUN6QyxDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLG9DQUFvQyxFQUN6QyxJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsMEJBQTBCLEVBQy9CLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFlBQVksQ0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDM0IsT0FBTyxvQ0FBb0MsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxvQ0FBb0MsQ0FDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNuQyxtQ0FBbUMsQ0FDakMsTUFBTSxFQUNOLGtDQUFrQyxFQUNsQyxrQ0FBa0MsQ0FDbkMsRUFDRCw4Q0FBOEMsQ0FBQyxNQUFNLENBQUMsRUFDdEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUMsRUFDdkQsTUFBTSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxFQUM3QyxNQUFNLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQ3hDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQ2hDLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sb0NBQW9DLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRiJ9