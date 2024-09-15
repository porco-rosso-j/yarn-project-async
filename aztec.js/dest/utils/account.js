import { retryUntil } from '@aztec/foundation/retry';
import { DefaultWaitOpts } from '../contract/index.js';
/**
 * Waits for the account to finish synchronizing with the PXE Service.
 * @param pxe - PXE instance
 * @param address - Address to wait for synch
 * @param opts - Wait options
 */
export async function waitForAccountSynch(pxe, address, { interval, timeout } = DefaultWaitOpts) {
    const accountAddress = address.address.toString();
    await retryUntil(async () => {
        const status = await pxe.getSyncStatus();
        const accountSynchedToBlock = status.notes[accountAddress];
        if (typeof accountSynchedToBlock === 'undefined') {
            return false;
        }
        else {
            return accountSynchedToBlock >= status.blocks;
        }
    }, 'waitForAccountSynch', timeout, interval);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZUFBZSxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBRXRFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsR0FBUSxFQUNSLE9BQXdCLEVBQ3hCLEVBQUUsUUFBUSxFQUFFLE9BQU8sS0FBZSxlQUFlO0lBRWpELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEQsTUFBTSxVQUFVLENBQ2QsS0FBSyxJQUFJLEVBQUU7UUFDVCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLHFCQUFxQixLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ2pELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLHFCQUFxQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUMsRUFDRCxxQkFBcUIsRUFDckIsT0FBTyxFQUNQLFFBQVEsQ0FDVCxDQUFDO0FBQ0osQ0FBQyJ9