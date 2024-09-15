import { type CompleteAddress, type PXE } from '@aztec/circuit-types';
import { type WaitOpts } from '../contract/index.js';
/**
 * Waits for the account to finish synchronizing with the PXE Service.
 * @param pxe - PXE instance
 * @param address - Address to wait for synch
 * @param opts - Wait options
 */
export declare function waitForAccountSynch(pxe: PXE, address: CompleteAddress, { interval, timeout }?: WaitOpts): Promise<void>;
//# sourceMappingURL=account.d.ts.map