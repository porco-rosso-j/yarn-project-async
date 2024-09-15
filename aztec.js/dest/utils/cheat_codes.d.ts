import { type Note, type PXE } from '@aztec/circuit-types';
import { type AztecAddress, type EthAddress, Fr } from '@aztec/circuits.js';
/**
 * A class that provides utility functions for interacting with the chain.
 */
export declare class CheatCodes {
    /**
     * The cheat codes for ethereum (L1).
     */
    eth: EthCheatCodes;
    /**
     * The cheat codes for aztec.
     */
    aztec: AztecCheatCodes;
    constructor(
    /**
     * The cheat codes for ethereum (L1).
     */
    eth: EthCheatCodes, 
    /**
     * The cheat codes for aztec.
     */
    aztec: AztecCheatCodes);
    static create(rpcUrl: string, pxe: PXE): CheatCodes;
}
/**
 * A class that provides utility functions for interacting with ethereum (L1).
 */
export declare class EthCheatCodes {
    /**
     * The RPC URL to use for interacting with the chain
     */
    rpcUrl: string;
    /**
     * The logger to use for the eth cheatcodes
     */
    logger: import("@aztec/foundation/log").Logger;
    constructor(
    /**
     * The RPC URL to use for interacting with the chain
     */
    rpcUrl: string, 
    /**
     * The logger to use for the eth cheatcodes
     */
    logger?: import("@aztec/foundation/log").Logger);
    rpcCall(method: string, params: any[]): Promise<any>;
    /**
     * Get the current blocknumber
     * @returns The current block number
     */
    blockNumber(): Promise<number>;
    /**
     * Get the current chainId
     * @returns The current chainId
     */
    chainId(): Promise<number>;
    /**
     * Get the current timestamp
     * @returns The current timestamp
     */
    timestamp(): Promise<number>;
    /**
     * Advance the chain by a number of blocks
     * @param numberOfBlocks - The number of blocks to mine
     * @returns The current chainId
     */
    mine(numberOfBlocks?: number): Promise<void>;
    /**
     * Set the next block timestamp
     * @param timestamp - The timestamp to set the next block to
     */
    setNextBlockTimestamp(timestamp: number): Promise<void>;
    /**
     * Dumps the current chain state to a file.
     * @param fileName - The file name to dump state into
     */
    dumpChainState(fileName: string): Promise<void>;
    /**
     * Loads the chain state from a file.
     * @param fileName - The file name to load state from
     */
    loadChainState(fileName: string): Promise<void>;
    /**
     * Load the value at a storage slot of a contract address on eth
     * @param contract - The contract address
     * @param slot - The storage slot
     * @returns - The value at the storage slot
     */
    load(contract: EthAddress, slot: bigint): Promise<bigint>;
    /**
     * Set the value at a storage slot of a contract address on eth
     * @param contract - The contract address
     * @param slot - The storage slot
     * @param value - The value to set the storage slot to
     */
    store(contract: EthAddress, slot: bigint, value: bigint): Promise<void>;
    /**
     * Computes the slot value for a given map and key.
     * @param baseSlot - The base slot of the map (specified in Aztec.nr contract)
     * @param key - The key to lookup in the map
     * @returns The storage slot of the value in the map
     */
    keccak256(baseSlot: bigint, key: bigint): bigint;
    /**
     * Send transactions impersonating an externally owned account or contract.
     * @param who - The address to impersonate
     */
    startImpersonating(who: EthAddress): Promise<void>;
    /**
     * Stop impersonating an account that you are currently impersonating.
     * @param who - The address to stop impersonating
     */
    stopImpersonating(who: EthAddress): Promise<void>;
    /**
     * Set the bytecode for a contract
     * @param contract - The contract address
     * @param bytecode - The bytecode to set
     */
    etch(contract: EthAddress, bytecode: `0x${string}`): Promise<void>;
    /**
     * Get the bytecode for a contract
     * @param contract - The contract address
     * @returns The bytecode for the contract
     */
    getBytecode(contract: EthAddress): Promise<`0x${string}`>;
}
/**
 * A class that provides utility functions for interacting with the aztec chain.
 */
export declare class AztecCheatCodes {
    /**
     * The PXE Service to use for interacting with the chain
     */
    pxe: PXE;
    /**
     * The eth cheat codes.
     */
    eth: EthCheatCodes;
    /**
     * The logger to use for the aztec cheatcodes
     */
    logger: import("@aztec/foundation/log").Logger;
    constructor(
    /**
     * The PXE Service to use for interacting with the chain
     */
    pxe: PXE, 
    /**
     * The eth cheat codes.
     */
    eth: EthCheatCodes, 
    /**
     * The logger to use for the aztec cheatcodes
     */
    logger?: import("@aztec/foundation/log").Logger);
    /**
     * Computes the slot value for a given map and key.
     * @param baseSlot - The base slot of the map (specified in Aztec.nr contract)
     * @param key - The key to lookup in the map
     * @returns The storage slot of the value in the map
     */
    computeSlotInMap(baseSlot: Fr | bigint, key: Fr | bigint | AztecAddress): Promise<Fr>;
    /**
     * Get the current blocknumber
     * @returns The current block number
     */
    blockNumber(): Promise<number>;
    /**
     * Set time of the next execution on aztec.
     * It also modifies time on eth for next execution and stores this time as the last rollup block on the rollup contract.
     * @param to - The timestamp to set the next block to (must be greater than current time)
     */
    warp(to: number): Promise<void>;
    /**
     * Loads the value stored at the given slot in the public storage of the given contract.
     * @param who - The address of the contract
     * @param slot - The storage slot to lookup
     * @returns The value stored at the given slot
     */
    loadPublic(who: AztecAddress, slot: Fr | bigint): Promise<Fr>;
    /**
     * Loads the value stored at the given slot in the private storage of the given contract.
     * @param contract - The address of the contract
     * @param owner - The owner for whom the notes are encrypted
     * @param slot - The storage slot to lookup
     * @returns The notes stored at the given slot
     */
    loadPrivate(owner: AztecAddress, contract: AztecAddress, slot: Fr | bigint): Promise<Note[]>;
}
//# sourceMappingURL=cheat_codes.d.ts.map