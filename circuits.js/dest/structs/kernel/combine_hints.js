import { removeArrayPaddingEnd } from '@aztec/foundation/collection';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
import { MAX_ENCRYPTED_LOGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, MAX_UNENCRYPTED_LOGS_PER_TX, } from '../../constants.gen.js';
import { deduplicateSortedArray, getNonEmptyItems, mergeAccumulatedData, sortByCounterGetSortedHints, sortByPositionThenCounterGetSortedHints, } from '../../utils/index.js';
import { LogHash } from '../log_hash.js';
import { NoteHash } from '../note_hash.js';
import { PublicDataUpdateRequest } from '../public_data_update_request.js';
export class CombineHints {
    constructor(sortedNoteHashes, sortedNoteHashesIndexes, sortedUnencryptedLogsHashes, sortedUnencryptedLogsHashesIndexes, sortedPublicDataUpdateRequests, sortedPublicDataUpdateRequestsIndexes, dedupedPublicDataUpdateRequests, dedupedPublicDataUpdateRequestsRuns) {
        this.sortedNoteHashes = sortedNoteHashes;
        this.sortedNoteHashesIndexes = sortedNoteHashesIndexes;
        this.sortedUnencryptedLogsHashes = sortedUnencryptedLogsHashes;
        this.sortedUnencryptedLogsHashesIndexes = sortedUnencryptedLogsHashesIndexes;
        this.sortedPublicDataUpdateRequests = sortedPublicDataUpdateRequests;
        this.sortedPublicDataUpdateRequestsIndexes = sortedPublicDataUpdateRequestsIndexes;
        this.dedupedPublicDataUpdateRequests = dedupedPublicDataUpdateRequests;
        this.dedupedPublicDataUpdateRequestsRuns = dedupedPublicDataUpdateRequestsRuns;
    }
    static getFields(fields) {
        return [
            fields.sortedNoteHashes,
            fields.sortedNoteHashesIndexes,
            fields.sortedUnencryptedLogsHashes,
            fields.sortedUnencryptedLogsHashesIndexes,
            fields.sortedPublicDataUpdateRequests,
            fields.sortedPublicDataUpdateRequestsIndexes,
            fields.dedupedPublicDataUpdateRequests,
            fields.dedupedPublicDataUpdateRequestsRuns,
        ];
    }
    static from(fields) {
        return new CombineHints(...CombineHints.getFields(fields));
    }
    toBuffer() {
        return serializeToBuffer(...CombineHints.getFields(this));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CombineHints(reader.readArray(MAX_NOTE_HASHES_PER_TX, NoteHash), reader.readNumbers(MAX_NOTE_HASHES_PER_TX), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_TX, LogHash), reader.readNumbers(MAX_UNENCRYPTED_LOGS_PER_TX), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest), reader.readNumbers(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataUpdateRequest), reader.readNumbers(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX));
    }
    static fromPublicData({ revertibleData, nonRevertibleData, }) {
        const mergedNoteHashes = mergeAccumulatedData(nonRevertibleData.noteHashes, revertibleData.noteHashes, MAX_NOTE_HASHES_PER_TX);
        const [sortedNoteHashes, sortedNoteHashesIndexes] = sortByCounterGetSortedHints(mergedNoteHashes, MAX_NOTE_HASHES_PER_TX);
        const unencryptedLogHashes = mergeAccumulatedData(nonRevertibleData.unencryptedLogsHashes, revertibleData.unencryptedLogsHashes, MAX_ENCRYPTED_LOGS_PER_TX);
        const [sortedUnencryptedLogsHashes, sortedUnencryptedLogsHashesIndexes] = sortByCounterGetSortedHints(unencryptedLogHashes, MAX_ENCRYPTED_LOGS_PER_TX);
        const publicDataUpdateRequests = mergeAccumulatedData(nonRevertibleData.publicDataUpdateRequests, revertibleData.publicDataUpdateRequests, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX);
        // Since we're using `check_permutation` in the circuit, we need index hints based on the original array.
        const [sortedPublicDataUpdateRequests, sortedPublicDataUpdateRequestsIndexes] = sortByPositionThenCounterGetSortedHints(publicDataUpdateRequests, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, {
            ascending: true,
            hintIndexesBy: 'original',
        });
        // further, we need to fill in the rest of the hints with an identity mapping
        for (let i = 0; i < MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX; i++) {
            if (publicDataUpdateRequests[i].isEmpty()) {
                sortedPublicDataUpdateRequestsIndexes[i] = i;
            }
        }
        const [dedupedPublicDataUpdateRequests, dedupedPublicDataUpdateRequestsRuns] = deduplicateSortedArray(sortedPublicDataUpdateRequests, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, () => PublicDataUpdateRequest.empty());
        return CombineHints.from({
            sortedNoteHashes,
            sortedNoteHashesIndexes,
            sortedUnencryptedLogsHashes,
            sortedUnencryptedLogsHashesIndexes,
            sortedPublicDataUpdateRequests,
            sortedPublicDataUpdateRequestsIndexes,
            dedupedPublicDataUpdateRequests,
            dedupedPublicDataUpdateRequestsRuns,
        });
    }
    [inspect.custom]() {
        return `CombineHints {
  sortedNoteHashes: ${getNonEmptyItems(this.sortedNoteHashes)
            .map(h => inspect(h))
            .join(', ')},
  sortedNoteHashesIndexes: ${removeArrayPaddingEnd(this.sortedNoteHashesIndexes, n => n === 0)},
  sortedUnencryptedLogsHashes: ${getNonEmptyItems(this.sortedUnencryptedLogsHashes)
            .map(h => inspect(h))
            .join(', ')},
  sortedUnencryptedLogsHashesIndexes: ${removeArrayPaddingEnd(this.sortedUnencryptedLogsHashesIndexes, n => n === 0)},
  sortedPublicDataUpdateRequests: ${getNonEmptyItems(this.sortedPublicDataUpdateRequests)
            .map(h => inspect(h))
            .join(', ')},
  sortedPublicDataUpdateRequestsIndexes: ${this.sortedPublicDataUpdateRequestsIndexes},
  dedupedPublicDataUpdateRequests: ${getNonEmptyItems(this.dedupedPublicDataUpdateRequests)
            .map(h => inspect(h))
            .join(', ')},
  dedupedPublicDataUpdateRequestsRuns: ${this.dedupedPublicDataUpdateRequestsRuns},
}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZV9oaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9jb21iaW5lX2hpbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsc0JBQXNCLEVBQ3RCLHNDQUFzQyxFQUN0QywyQkFBMkIsR0FDNUIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsMkJBQTJCLEVBQzNCLHVDQUF1QyxHQUN4QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHM0UsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFDa0IsZ0JBQWdFLEVBQ2hFLHVCQUFxRSxFQUNyRSwyQkFBK0UsRUFDL0Usa0NBQXFGLEVBQ3JGLDhCQUdmLEVBQ2UscUNBQW1HLEVBQ25HLCtCQUdmLEVBQ2UsbUNBQWlHO1FBYmpHLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBZ0Q7UUFDaEUsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUE4QztRQUNyRSxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQW9EO1FBQy9FLHVDQUFrQyxHQUFsQyxrQ0FBa0MsQ0FBbUQ7UUFDckYsbUNBQThCLEdBQTlCLDhCQUE4QixDQUc3QztRQUNlLDBDQUFxQyxHQUFyQyxxQ0FB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