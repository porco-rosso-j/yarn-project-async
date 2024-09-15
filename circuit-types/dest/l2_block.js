import { Body } from '@aztec/circuit-types';
import { AppendOnlyTreeSnapshot, Header, STRING_ENCODING } from '@aztec/circuits.js';
import { sha256, sha256ToField } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { makeAppendOnlyTreeSnapshot, makeHeader } from './l2_block_code_to_purge.js';
/**
 * The data that makes up the rollup proof, with encoder decoder functions.
 */
export class L2Block {
    constructor(
    /** Snapshot of archive tree after the block is applied. */
    archive, 
    /** L2 block header. */
    header, 
    /** L2 block body. */
    body) {
        this.archive = archive;
        this.header = header;
        this.body = body;
    }
    /**
     * Constructs a new instance from named fields.
     * @param fields - Fields to pass to the constructor.
     * @param blockHash - Hash of the block.
     * @returns A new instance.
     */
    static fromFields(fields) {
        return new this(fields.archive, fields.header, fields.body);
    }
    /**
     * Deserializes a block from a buffer
     * @returns A deserialized L2 block.
     */
    static fromBuffer(buf) {
        const reader = BufferReader.asReader(buf);
        const header = reader.readObject(Header);
        const archive = reader.readObject(AppendOnlyTreeSnapshot);
        const body = reader.readObject(Body);
        return L2Block.fromFields({
            archive,
            header,
            body,
        });
    }
    /**
     * Serializes a block
     * @returns A serialized L2 block as a Buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.header, this.archive, this.body);
    }
    /**
     * Deserializes L2 block from a buffer.
     * @param str - A serialized L2 block.
     * @returns Deserialized L2 block.
     */
    static fromString(str) {
        return L2Block.fromBuffer(Buffer.from(str, STRING_ENCODING));
    }
    /**
     * Serializes a block to a string.
     * @returns A serialized L2 block as a string.
     */
    toString() {
        return this.toBuffer().toString(STRING_ENCODING);
    }
    /**
     * Creates an L2 block containing random data.
     * @param l2BlockNum - The number of the L2 block.
     * @param txsPerBlock - The number of transactions to include in the block.
     * @param numPrivateCallsPerTx - The number of private function calls to include in each transaction.
     * @param numPublicCallsPerTx - The number of public function calls to include in each transaction.
     * @param numEncryptedLogsPerCall - The number of encrypted logs per 1 private function invocation.
     * @param numUnencryptedLogsPerCall - The number of unencrypted logs per 1 public function invocation.
     * @param inHash - The hash of the L1 to L2 messages subtree which got inserted in this block.
     * @returns The L2 block.
     */
    static random(l2BlockNum, txsPerBlock = 4, numPrivateCallsPerTx = 2, numPublicCallsPerTx = 3, numEncryptedLogsPerCall = 2, numUnencryptedLogsPerCall = 1, inHash = undefined) {
        const body = Body.random(txsPerBlock, numPrivateCallsPerTx, numPublicCallsPerTx, numEncryptedLogsPerCall, numUnencryptedLogsPerCall);
        const txsEffectsHash = body.getTxsEffectsHash();
        return L2Block.fromFields({
            archive: makeAppendOnlyTreeSnapshot(1),
            header: makeHeader(0, l2BlockNum, txsEffectsHash, inHash),
            body,
        });
    }
    /**
     * Creates an L2 block containing empty data.
     * @returns The L2 block.
     */
    static empty() {
        return L2Block.fromFields({
            archive: AppendOnlyTreeSnapshot.zero(),
            header: Header.empty(),
            body: Body.empty(),
        });
    }
    get number() {
        return Number(this.header.globalVariables.blockNumber.toBigInt());
    }
    /**
     * Returns the block's hash (hash of block header).
     * @returns The block's hash.
     */
    async hash() {
        return await this.header.hash();
    }
    /**
     * Computes the public inputs hash for the L2 block.
     * The same output as the hash of RootRollupPublicInputs.
     * @returns The public input hash for the L2 block as a field element.
     */
    // TODO(#4844)
    getPublicInputsHash() {
        const preimage = [
            this.header.globalVariables,
            AppendOnlyTreeSnapshot.zero(), // this.startNoteHashTreeSnapshot / commitments,
            AppendOnlyTreeSnapshot.zero(), // this.startNullifierTreeSnapshot,
            AppendOnlyTreeSnapshot.zero(), // this.startPublicDataTreeSnapshot,
            AppendOnlyTreeSnapshot.zero(), // this.startL1ToL2MessageTreeSnapshot,
            this.header.lastArchive,
            this.header.state.partial.noteHashTree,
            this.header.state.partial.nullifierTree,
            this.header.state.partial.publicDataTree,
            this.header.state.l1ToL2MessageTree,
            this.archive,
            this.body.getTxsEffectsHash(),
        ];
        return sha256ToField(preimage);
    }
    /**
     * Computes the start state hash (should equal contract data before block).
     * @returns The start state hash for the L2 block.
     */
    // TODO(#4844)
    getStartStateHash() {
        const inputValue = serializeToBuffer(new Fr(Number(this.header.globalVariables.blockNumber.toBigInt()) - 1), AppendOnlyTreeSnapshot.zero(), // this.startNoteHashTreeSnapshot,
        AppendOnlyTreeSnapshot.zero(), // this.startNullifierTreeSnapshot,
        AppendOnlyTreeSnapshot.zero(), // this.startPublicDataTreeSnapshot,
        AppendOnlyTreeSnapshot.zero(), // this.startL1ToL2MessageTreeSnapshot,
        this.header.lastArchive);
        return sha256(inputValue);
    }
    /**
     * Computes the end state hash (should equal contract data after block).
     * @returns The end state hash for the L2 block.
     */
    // TODO(#4844)
    getEndStateHash() {
        const inputValue = serializeToBuffer(this.header.globalVariables.blockNumber, this.header.state.partial.noteHashTree, this.header.state.partial.nullifierTree, this.header.state.partial.publicDataTree, this.header.state.l1ToL2MessageTree, this.archive);
        return sha256(inputValue);
    }
    /**
     * Returns stats used for logging.
     * @returns Stats on tx count, number, and log size and count.
     */
    getStats() {
        const logsStats = {
            noteEncryptedLogLength: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.noteEncryptedLogs.getSerializedLength(), 0),
            noteEncryptedLogCount: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.noteEncryptedLogs.getTotalLogCount(), 0),
            encryptedLogLength: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.encryptedLogs.getSerializedLength(), 0),
            encryptedLogCount: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.encryptedLogs.getTotalLogCount(), 0),
            unencryptedLogCount: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.unencryptedLogs.getTotalLogCount(), 0),
            unencryptedLogSize: this.body.txEffects.reduce((logCount, txEffect) => logCount + txEffect.unencryptedLogs.getSerializedLength(), 0),
        };
        return {
            txCount: this.body.txEffects.length,
            blockNumber: this.number,
            ...logsStats,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDJfYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbDJfYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckYsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVyRjs7R0FFRztBQUNILE1BQU0sT0FBTyxPQUFPO0lBQ2xCO0lBQ0UsMkRBQTJEO0lBQ3BELE9BQStCO0lBQ3RDLHVCQUF1QjtJQUNoQixNQUFjO0lBQ3JCLHFCQUFxQjtJQUNkLElBQVU7UUFKVixZQUFPLEdBQVAsT0FBTyxDQUF3QjtRQUUvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRWQsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUNoQixDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BTWpCO1FBQ0MsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FB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