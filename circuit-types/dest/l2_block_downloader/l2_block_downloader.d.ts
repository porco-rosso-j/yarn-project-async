import { type L2Block } from '../l2_block.js';
import { type L2BlockSource } from '../l2_block_source.js';
/**
 * Downloads L2 blocks from a L2BlockSource.
 * The blocks are stored in a queue and can be retrieved using the getBlocks method.
 * The queue size is limited by the maxQueueSize parameter.
 * The downloader will pause when the queue is full or when the L2BlockSource is out of blocks.
 */
export declare class L2BlockDownloader {
    private l2BlockSource;
    private pollIntervalMS;
    private runningPromise?;
    private running;
    private from;
    private interruptibleSleep;
    private semaphore;
    private jobQueue;
    private blockQueue;
    constructor(l2BlockSource: L2BlockSource, maxQueueSize: number, pollIntervalMS?: number);
    /**
     * Starts the downloader.
     * @param from - The block number to start downloading from. Defaults to INITIAL_L2_BLOCK_NUM.
     */
    start(from?: number): void;
    /**
     * Repeatedly queries the block source and adds the received blocks to the block queue.
     * Stops when no further blocks are received.
     * @returns The total number of blocks added to the block queue.
     */
    private collectBlocks;
    /**
     * Stops the downloader.
     */
    stop(): Promise<void>;
    /**
     * Gets the next batch of blocks from the queue.
     * @param timeout - optional timeout value to prevent permanent blocking
     * @returns The next batch of blocks from the queue.
     */
    getBlocks(timeout?: number): Promise<L2Block[]>;
    /**
     * Forces an immediate request for blocks.
     * @returns A promise that fulfills once the poll is complete
     */
    pollImmediate(): Promise<number>;
}
//# sourceMappingURL=l2_block_downloader.d.ts.map