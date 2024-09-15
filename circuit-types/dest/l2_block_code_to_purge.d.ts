import { AppendOnlyTreeSnapshot, GlobalVariables, Header } from '@aztec/circuits.js';
/**
 * Makes header.
 */
export declare function makeHeader(seed?: number, blockNumber?: number | undefined, txsEffectsHash?: Buffer | undefined, inHash?: Buffer | undefined): Header;
/**
 * Makes arbitrary append only tree snapshot.
 * @param seed - The seed to use for generating the append only tree snapshot.
 * @returns An append only tree snapshot.
 */
export declare function makeAppendOnlyTreeSnapshot(seed?: number): AppendOnlyTreeSnapshot;
/**
 * Makes global variables.
 * @param seed - The seed to use for generating the global variables.
 * @param blockNumber - The block number to use for generating the global variables.
 * If blockNumber is undefined, it will be set to seed + 2.
 * @returns Global variables.
 */
export declare function makeGlobalVariables(seed?: number, blockNumber?: number | undefined): GlobalVariables;
//# sourceMappingURL=l2_block_code_to_purge.d.ts.map