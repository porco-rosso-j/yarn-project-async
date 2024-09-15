import { EncryptedL2BlockL2Logs, EncryptedNoteL2BlockL2Logs, TxEffect, UnencryptedL2BlockL2Logs } from '@aztec/circuit-types';
import { BufferReader } from '@aztec/foundation/serialize';
import { inspect } from 'util';
export declare class Body {
    txEffects: TxEffect[];
    constructor(txEffects: TxEffect[]);
    /**
     * Serializes a block body
     * @returns A serialized L2 block body.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes a block from a buffer
     * @returns A deserialized L2 block.
     */
    static fromBuffer(buf: Buffer | BufferReader): Body;
    [inspect.custom](): string;
    /**
     * Computes the transactions effects hash for the L2 block
     * This hash is also computed in the `AvailabilityOracle`.
     * @returns The txs effects hash.
     */
    getTxsEffectsHash(): Buffer;
    get noteEncryptedLogs(): EncryptedNoteL2BlockL2Logs;
    get encryptedLogs(): EncryptedL2BlockL2Logs;
    get unencryptedLogs(): UnencryptedL2BlockL2Logs;
    /**
     * Computes the number of transactions in the block including padding transactions.
     * @dev Modified code from TxsDecoder.computeNumTxEffectsToPad
     */
    get numberOfTxsIncludingPadded(): number;
    static random(txsPerBlock?: number, numPrivateCallsPerTx?: number, numPublicCallsPerTx?: number, numEncryptedLogsPerCall?: number, numUnencryptedLogsPerCall?: number): Body;
    static empty(): Body;
}
//# sourceMappingURL=body.d.ts.map