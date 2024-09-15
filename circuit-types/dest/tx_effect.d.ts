import { EncryptedNoteTxL2Logs, EncryptedTxL2Logs, PublicDataWrite, TxHash, UnencryptedTxL2Logs } from '@aztec/circuit-types';
import { Fr, RevertCode } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
import { inspect } from 'util';
export declare class TxEffect {
    /**
     * Whether the transaction reverted during public app logic.
     */
    revertCode: RevertCode;
    /**
     * The transaction fee, denominated in FPA.
     */
    transactionFee: Fr;
    /**
     * The note hashes to be inserted into the note hash tree.
     */
    noteHashes: Fr[];
    /**
     * The nullifiers to be inserted into the nullifier tree.
     */
    nullifiers: Fr[];
    /**
     * The hash of L2 to L1 messages to be inserted into the messagebox on L1.
     * TODO(just-mitch): rename to l2ToL1MsgHashes
     */
    l2ToL1Msgs: Fr[];
    /**
     * The public data writes to be inserted into the public data tree.
     */
    publicDataWrites: PublicDataWrite[];
    /**
     * The logs and logs lengths of the txEffect
     */
    noteEncryptedLogsLength: Fr;
    encryptedLogsLength: Fr;
    unencryptedLogsLength: Fr;
    noteEncryptedLogs: EncryptedNoteTxL2Logs;
    encryptedLogs: EncryptedTxL2Logs;
    unencryptedLogs: UnencryptedTxL2Logs;
    constructor(
    /**
     * Whether the transaction reverted during public app logic.
     */
    revertCode: RevertCode, 
    /**
     * The transaction fee, denominated in FPA.
     */
    transactionFee: Fr, 
    /**
     * The note hashes to be inserted into the note hash tree.
     */
    noteHashes: Fr[], 
    /**
     * The nullifiers to be inserted into the nullifier tree.
     */
    nullifiers: Fr[], 
    /**
     * The hash of L2 to L1 messages to be inserted into the messagebox on L1.
     * TODO(just-mitch): rename to l2ToL1MsgHashes
     */
    l2ToL1Msgs: Fr[], 
    /**
     * The public data writes to be inserted into the public data tree.
     */
    publicDataWrites: PublicDataWrite[], 
    /**
     * The logs and logs lengths of the txEffect
     */
    noteEncryptedLogsLength: Fr, encryptedLogsLength: Fr, unencryptedLogsLength: Fr, noteEncryptedLogs: EncryptedNoteTxL2Logs, encryptedLogs: EncryptedTxL2Logs, unencryptedLogs: UnencryptedTxL2Logs);
    toBuffer(): Buffer;
    /**
     * Deserializes the TxEffect object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of TxEffect.
     */
    static fromBuffer(buffer: Buffer | BufferReader): TxEffect;
    /**
     * Computes the hash of the TxEffect object.
     * @returns The hash of the TxEffect object.
     * @dev This function must correspond with compute_tx_effects_hash() in Noir and TxsDecoder.sol decode().
     */
    hash(): Buffer;
    static random(numPrivateCallsPerTx?: number, numPublicCallsPerTx?: number, numEncryptedLogsPerCall?: number, numUnencryptedLogsPerCall?: number): TxEffect;
    static empty(): TxEffect;
    isEmpty(): boolean;
    /**
     * Returns a string representation of the TxEffect object.
     */
    toString(): string;
    [inspect.custom](): string;
    /**
     * Deserializes an TxEffect object from a string.
     * @param str - String to deserialize.
     * @returns An instance of TxEffect.
     */
    static fromString(str: string): TxEffect;
    get txHash(): TxHash;
}
//# sourceMappingURL=tx_effect.d.ts.map