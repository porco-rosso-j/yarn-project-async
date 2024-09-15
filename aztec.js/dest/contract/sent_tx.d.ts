import { type ExtendedNote, type GetUnencryptedLogsResponse, type PXE, type TxHash, type TxReceipt } from '@aztec/circuit-types';
import { type FieldsOf } from '@aztec/foundation/types';
/** Options related to waiting for a tx. */
export type WaitOpts = {
    /** The maximum time (in seconds) to wait for the transaction to be mined. Defaults to 60. */
    timeout?: number;
    /** The time interval (in seconds) between retries to fetch the transaction receipt. Defaults to 1. */
    interval?: number;
    /**
     * Whether to wait for the PXE Service to sync all notes up to the block in which this tx was mined.
     * If false, then any queries that depend on state set by this transaction may return stale data. Defaults to true.
     **/
    waitForNotesSync?: boolean;
    /** Whether to include information useful for debugging/testing in the receipt. */
    debug?: boolean;
    /** Whether to accept a revert as a status code for the tx when waiting for it. If false, will throw if the tx reverts. */
    dontThrowOnRevert?: boolean;
};
export declare const DefaultWaitOpts: WaitOpts;
/**
 * The SentTx class represents a sent transaction through the PXE, providing methods to fetch
 * its hash, receipt, and mining status.
 */
export declare class SentTx {
    protected pxe: PXE;
    protected txHashPromise: Promise<TxHash>;
    constructor(pxe: PXE, txHashPromise: Promise<TxHash>);
    /**
     * Retrieves the transaction hash of the SentTx instance.
     * The function internally awaits for the 'txHashPromise' to resolve, and then returns the resolved transaction hash.
     *
     * @returns A promise that resolves to the transaction hash of the SentTx instance.
     */
    getTxHash(): Promise<TxHash>;
    /**
     * Retrieve the transaction receipt associated with the current SentTx instance.
     * The function fetches the transaction hash using 'getTxHash' and then queries
     * the PXE to get the corresponding transaction receipt.
     *
     * @returns A promise that resolves to a TxReceipt object representing the fetched transaction receipt.
     */
    getReceipt(): Promise<TxReceipt>;
    /**
     * Awaits for a tx to be mined and returns the receipt. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The transaction receipt.
     */
    wait(opts?: WaitOpts): Promise<FieldsOf<TxReceipt>>;
    /**
     * Gets unencrypted logs emitted by this tx.
     * @remarks This function will wait for the tx to be mined if it hasn't been already.
     * @returns The requested logs.
     */
    getUnencryptedLogs(): Promise<GetUnencryptedLogsResponse>;
    /**
     * Get notes of accounts registered in the provided PXE/Wallet created in this tx.
     * @remarks This function will wait for the tx to be mined if it hasn't been already.
     * @returns The requested notes.
     */
    getVisibleNotes(): Promise<ExtendedNote[]>;
    protected waitForReceipt(opts?: WaitOpts): Promise<TxReceipt>;
}
//# sourceMappingURL=sent_tx.d.ts.map