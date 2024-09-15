import { Body } from '@aztec/circuit-types';
import { AppendOnlyTreeSnapshot, Header } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * The data that makes up the rollup proof, with encoder decoder functions.
 */
export declare class L2Block {
    /** Snapshot of archive tree after the block is applied. */
    archive: AppendOnlyTreeSnapshot;
    /** L2 block header. */
    header: Header;
    /** L2 block body. */
    body: Body;
    constructor(
    /** Snapshot of archive tree after the block is applied. */
    archive: AppendOnlyTreeSnapshot, 
    /** L2 block header. */
    header: Header, 
    /** L2 block body. */
    body: Body);
    /**
     * Constructs a new instance from named fields.
     * @param fields - Fields to pass to the constructor.
     * @param blockHash - Hash of the block.
     * @returns A new instance.
     */
    static fromFields(fields: {
        /** Snapshot of archive tree after the block is applied. */
        archive: AppendOnlyTreeSnapshot;
        /** L2 block header. */
        header: Header;
        body: Body;
    }): L2Block;
    /**
     * Deserializes a block from a buffer
     * @returns A deserialized L2 block.
     */
    static fromBuffer(buf: Buffer | BufferReader): L2Block;
    /**
     * Serializes a block
     * @returns A serialized L2 block as a Buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes L2 block from a buffer.
     * @param str - A serialized L2 block.
     * @returns Deserialized L2 block.
     */
    static fromString(str: string): L2Block;
    /**
     * Serializes a block to a string.
     * @returns A serialized L2 block as a string.
     */
    toString(): string;
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
    static random(l2BlockNum: number, txsPerBlock?: number, numPrivateCallsPerTx?: number, numPublicCallsPerTx?: number, numEncryptedLogsPerCall?: number, numUnencryptedLogsPerCall?: number, inHash?: Buffer | undefined): L2Block;
    /**
     * Creates an L2 block containing empty data.
     * @returns The L2 block.
     */
    static empty(): L2Block;
    get number(): number;
    /**
     * Returns the block's hash (hash of block header).
     * @returns The block's hash.
     */
    hash(): Promise<Fr>;
    /**
     * Computes the public inputs hash for the L2 block.
     * The same output as the hash of RootRollupPublicInputs.
     * @returns The public input hash for the L2 block as a field element.
     */
    getPublicInputsHash(): Fr;
    /**
     * Computes the start state hash (should equal contract data before block).
     * @returns The start state hash for the L2 block.
     */
    getStartStateHash(): Buffer;
    /**
     * Computes the end state hash (should equal contract data after block).
     * @returns The end state hash for the L2 block.
     */
    getEndStateHash(): Buffer;
    /**
     * Returns stats used for logging.
     * @returns Stats on tx count, number, and log size and count.
     */
    getStats(): {
        noteEncryptedLogLength: number;
        noteEncryptedLogCount: number;
        encryptedLogLength: number;
        encryptedLogCount: number;
        unencryptedLogCount: number;
        unencryptedLogSize: number;
        txCount: number;
        blockNumber: number;
    };
}
//# sourceMappingURL=l2_block.d.ts.map