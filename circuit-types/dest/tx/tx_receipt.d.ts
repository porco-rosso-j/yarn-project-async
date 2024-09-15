import { RevertCode } from '@aztec/circuits.js';
import { type Fr } from '@aztec/foundation/fields';
import { type ExtendedNote } from '../notes/extended_note.js';
import { type PublicDataWrite } from '../public_data_write.js';
import { TxHash } from './tx_hash.js';
/**
 * Possible status of a transaction.
 */
export declare enum TxStatus {
    DROPPED = "dropped",
    PENDING = "pending",
    SUCCESS = "success",
    APP_LOGIC_REVERTED = "app_logic_reverted",
    TEARDOWN_REVERTED = "teardown_reverted",
    BOTH_REVERTED = "both_reverted"
}
/**
 * Represents a transaction receipt in the Aztec network.
 * Contains essential information about the transaction including its status, origin, and associated addresses.
 * REFACTOR: TxReceipt should be returned only once the tx is mined, and all its fields should be required.
 * We should not be using a TxReceipt to answer a query for a pending or dropped tx.
 */
export declare class TxReceipt {
    /**
     * A unique identifier for a transaction.
     */
    txHash: TxHash;
    /**
     * The transaction's status.
     */
    status: TxStatus;
    /**
     * Description of transaction error, if any.
     */
    error: string;
    /**
     * The transaction fee paid for the transaction.
     */
    transactionFee?: bigint | undefined;
    /**
     * The hash of the block containing the transaction.
     */
    blockHash?: Buffer | undefined;
    /**
     * The block number in which the transaction was included.
     */
    blockNumber?: number | undefined;
    /**
     * Information useful for testing/debugging, set when test flag is set to true in `waitOpts`.
     */
    debugInfo?: DebugInfo | undefined;
    constructor(
    /**
     * A unique identifier for a transaction.
     */
    txHash: TxHash, 
    /**
     * The transaction's status.
     */
    status: TxStatus, 
    /**
     * Description of transaction error, if any.
     */
    error: string, 
    /**
     * The transaction fee paid for the transaction.
     */
    transactionFee?: bigint | undefined, 
    /**
     * The hash of the block containing the transaction.
     */
    blockHash?: Buffer | undefined, 
    /**
     * The block number in which the transaction was included.
     */
    blockNumber?: number | undefined, 
    /**
     * Information useful for testing/debugging, set when test flag is set to true in `waitOpts`.
     */
    debugInfo?: DebugInfo | undefined);
    /**
     * Convert a Tx class object to a plain JSON object.
     * @returns A plain object with Tx properties.
     */
    toJSON(): {
        txHash: string;
        status: string;
        error: string;
        blockHash: string | undefined;
        blockNumber: number | undefined;
        transactionFee: string | undefined;
    };
    /**
     * Convert a plain JSON object to a Tx class object.
     * @param obj - A plain Tx JSON object.
     * @returns A Tx class object.
     */
    static fromJSON(obj: any): TxReceipt;
    static statusFromRevertCode(revertCode: RevertCode): TxStatus.SUCCESS | TxStatus.APP_LOGIC_REVERTED | TxStatus.TEARDOWN_REVERTED | TxStatus.BOTH_REVERTED;
}
/**
 * Information useful for debugging/testing purposes included in the receipt when the debug flag is set to true
 * in `WaitOpts`.
 */
interface DebugInfo {
    /**
     * New note hashes created by the transaction.
     */
    noteHashes: Fr[];
    /**
     * New nullifiers created by the transaction.
     */
    nullifiers: Fr[];
    /**
     * New public data writes created by the transaction.
     */
    publicDataWrites: PublicDataWrite[];
    /**
     * New L2 to L1 messages created by the transaction.
     */
    l2ToL1Msgs: Fr[];
    /**
     * Notes created in this tx which were successfully decoded with the incoming keys of accounts which are registered
     * in the PXE which was used to submit the tx. You will not get notes of accounts which are not registered in
     * the PXE here even though they were created in this tx.
     */
    visibleIncomingNotes: ExtendedNote[];
    /**
     * Notes created in this tx which were successfully decoded with the outgoing keys of accounts which are registered
     * in the PXE which was used to submit the tx. You will not get notes of accounts which are not registered in
     * the PXE here even though they were created in this tx.
     */
    visibleOutgoingNotes: ExtendedNote[];
}
export {};
//# sourceMappingURL=tx_receipt.d.ts.map