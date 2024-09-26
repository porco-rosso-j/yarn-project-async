import { TxStatus, } from '@aztec/circuit-types';
import { retryUntil } from '@aztec/foundation/retry';
export const DefaultWaitOpts = {
    timeout: 60,
    interval: 1,
    waitForNotesSync: true,
    debug: false,
};
/**
 * The SentTx class represents a sent transaction through the PXE, providing methods to fetch
 * its hash, receipt, and mining status.
 */
export class SentTx {
    constructor(pxe, txHashPromise) {
        this.pxe = pxe;
        this.txHashPromise = txHashPromise;
    }
    /**
     * Retrieves the transaction hash of the SentTx instance.
     * The function internally awaits for the 'txHashPromise' to resolve, and then returns the resolved transaction hash.
     *
     * @returns A promise that resolves to the transaction hash of the SentTx instance.
     */
    getTxHash() {
        return this.txHashPromise;
    }
    /**
     * Retrieve the transaction receipt associated with the current SentTx instance.
     * The function fetches the transaction hash using 'getTxHash' and then queries
     * the PXE to get the corresponding transaction receipt.
     *
     * @returns A promise that resolves to a TxReceipt object representing the fetched transaction receipt.
     */
    async getReceipt() {
        const txHash = await this.getTxHash();
        return await this.pxe.getTxReceipt(txHash);
    }
    /**
     * Awaits for a tx to be mined and returns the receipt. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The transaction receipt.
     */
    async wait(opts) {
        console.log('[wait in SentTx]');
        if (opts?.debug && opts.waitForNotesSync === false) {
            throw new Error('Cannot set debug to true if waitForNotesSync is false');
        }
        const receipt = await this.waitForReceipt(opts);
        if (receipt.status !== TxStatus.SUCCESS && !opts?.dontThrowOnRevert) {
            throw new Error(`Transaction ${await this.getTxHash()} was ${receipt.status}. Reason: ${receipt.error ?? 'unknown'}`);
        }
        if (opts?.debug) {
            const txHash = await this.getTxHash();
            console.log('[wait in SentTx] txHash: ', txHash.toString());
            const tx = (await this.pxe.getTxEffect(txHash));
            const visibleIncomingNotes = await this.pxe.getIncomingNotes({ txHash });
            const visibleOutgoingNotes = await this.pxe.getOutgoingNotes({ txHash });
            receipt.debugInfo = {
                noteHashes: tx.noteHashes,
                nullifiers: tx.nullifiers,
                publicDataWrites: tx.publicDataWrites,
                l2ToL1Msgs: tx.l2ToL1Msgs,
                visibleIncomingNotes,
                visibleOutgoingNotes,
            };
        }
        return receipt;
    }
    /**
     * Gets unencrypted logs emitted by this tx.
     * @remarks This function will wait for the tx to be mined if it hasn't been already.
     * @returns The requested logs.
     */
    async getUnencryptedLogs() {
        await this.wait();
        return this.pxe.getUnencryptedLogs({ txHash: await this.getTxHash() });
    }
    /**
     * Get notes of accounts registered in the provided PXE/Wallet created in this tx.
     * @remarks This function will wait for the tx to be mined if it hasn't been already.
     * @returns The requested notes.
     */
    async getVisibleNotes() {
        await this.wait();
        return this.pxe.getIncomingNotes({ txHash: await this.getTxHash() });
    }
    async waitForReceipt(opts) {
        const txHash = await this.getTxHash();
        console.log('[wait in SentTx] txHash: ', txHash.toString());
        return await retryUntil(async () => {
            const txReceipt = await this.pxe.getTxReceipt(txHash);
            // If receipt is not yet available, try again
            if (txReceipt.status === TxStatus.PENDING) {
                return undefined;
            }
            // If the tx was dropped, return it
            if (txReceipt.status === TxStatus.DROPPED) {
                return txReceipt;
            }
            // If we don't care about waiting for notes to be synced, return the receipt
            const waitForNotesSync = opts?.waitForNotesSync ?? DefaultWaitOpts.waitForNotesSync;
            if (!waitForNotesSync) {
                return txReceipt;
            }
            // Check if all sync blocks on the PXE Service are greater or equal than the block in which the tx was mined
            const { blocks, notes } = await this.pxe.getSyncStatus();
            const targetBlock = txReceipt.blockNumber;
            const areNotesSynced = blocks >= targetBlock && Object.values(notes).every(block => block >= targetBlock);
            return areNotesSynced ? txReceipt : undefined;
        }, 'isMined', opts?.timeout ?? DefaultWaitOpts.timeout, opts?.interval ?? DefaultWaitOpts.interval);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudF90eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9zZW50X3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFNTCxRQUFRLEdBQ1QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFvQnJELE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBYTtJQUN2QyxPQUFPLEVBQUUsRUFBRTtJQUNYLFFBQVEsRUFBRSxDQUFDO0lBQ1gsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixLQUFLLEVBQUUsS0FBSztDQUNiLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQUNqQixZQUFzQixHQUFRLEVBQVksYUFBOEI7UUFBbEQsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFZLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtJQUFHLENBQUM7SUFFNUU7Ozs7O09BS0c7SUFDSSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsVUFBVTtRQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQWU7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxNQUFNLE9BQU8sR0FB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