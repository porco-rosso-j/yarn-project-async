import { Fr } from '@aztec/circuits.js';
import { toBigIntBE, toHex } from '@aztec/foundation/bigint-buffer';
import { keccak256, pedersenHash } from '@aztec/foundation/crypto';
import { createDebugLogger } from '@aztec/foundation/log';
import fs from 'fs';
/**
 * A class that provides utility functions for interacting with the chain.
 */
export class CheatCodes {
    constructor(
    /**
     * The cheat codes for ethereum (L1).
     */
    eth, 
    /**
     * The cheat codes for aztec.
     */
    aztec) {
        this.eth = eth;
        this.aztec = aztec;
    }
    static create(rpcUrl, pxe) {
        const ethCheatCodes = new EthCheatCodes(rpcUrl);
        const aztecCheatCodes = new AztecCheatCodes(pxe, ethCheatCodes);
        return new CheatCodes(ethCheatCodes, aztecCheatCodes);
    }
}
/**
 * A class that provides utility functions for interacting with ethereum (L1).
 */
export class EthCheatCodes {
    constructor(
    /**
     * The RPC URL to use for interacting with the chain
     */
    rpcUrl, 
    /**
     * The logger to use for the eth cheatcodes
     */
    logger = createDebugLogger('aztec:cheat_codes:eth')) {
        this.rpcUrl = rpcUrl;
        this.logger = logger;
    }
    async rpcCall(method, params) {
        const paramsString = JSON.stringify(params);
        const content = {
            body: `{"jsonrpc":"2.0", "method": "${method}", "params": ${paramsString}, "id": 1}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        return await (await fetch(this.rpcUrl, content)).json();
    }
    /**
     * Get the current blocknumber
     * @returns The current block number
     */
    async blockNumber() {
        const res = await this.rpcCall('eth_blockNumber', []);
        return parseInt(res.result, 16);
    }
    /**
     * Get the current chainId
     * @returns The current chainId
     */
    async chainId() {
        const res = await this.rpcCall('eth_chainId', []);
        return parseInt(res.result, 16);
    }
    /**
     * Get the current timestamp
     * @returns The current timestamp
     */
    async timestamp() {
        const res = await this.rpcCall('eth_getBlockByNumber', ['latest', true]);
        return parseInt(res.result.timestamp, 16);
    }
    /**
     * Advance the chain by a number of blocks
     * @param numberOfBlocks - The number of blocks to mine
     * @returns The current chainId
     */
    async mine(numberOfBlocks = 1) {
        const res = await this.rpcCall('hardhat_mine', [numberOfBlocks]);
        if (res.error) {
            throw new Error(`Error mining: ${res.error.message}`);
        }
        this.logger.info(`Mined ${numberOfBlocks} blocks`);
    }
    /**
     * Set the next block timestamp
     * @param timestamp - The timestamp to set the next block to
     */
    async setNextBlockTimestamp(timestamp) {
        const res = await this.rpcCall('evm_setNextBlockTimestamp', [timestamp]);
        if (res.error) {
            throw new Error(`Error setting next block timestamp: ${res.error.message}`);
        }
        this.logger.info(`Set next block timestamp to ${timestamp}`);
    }
    /**
     * Dumps the current chain state to a file.
     * @param fileName - The file name to dump state into
     */
    async dumpChainState(fileName) {
        const res = await this.rpcCall('hardhat_dumpState', []);
        if (res.error) {
            throw new Error(`Error dumping state: ${res.error.message}`);
        }
        const jsonContent = JSON.stringify(res.result);
        fs.writeFileSync(`${fileName}.json`, jsonContent, 'utf8');
        this.logger.info(`Dumped state to ${fileName}`);
    }
    /**
     * Loads the chain state from a file.
     * @param fileName - The file name to load state from
     */
    async loadChainState(fileName) {
        const data = JSON.parse(fs.readFileSync(`${fileName}.json`, 'utf8'));
        const res = await this.rpcCall('hardhat_loadState', [data]);
        if (res.error) {
            throw new Error(`Error loading state: ${res.error.message}`);
        }
        this.logger.info(`Loaded state from ${fileName}`);
    }
    /**
     * Load the value at a storage slot of a contract address on eth
     * @param contract - The contract address
     * @param slot - The storage slot
     * @returns - The value at the storage slot
     */
    async load(contract, slot) {
        const res = await this.rpcCall('eth_getStorageAt', [contract.toString(), toHex(slot), 'latest']);
        return BigInt(res.result);
    }
    /**
     * Set the value at a storage slot of a contract address on eth
     * @param contract - The contract address
     * @param slot - The storage slot
     * @param value - The value to set the storage slot to
     */
    async store(contract, slot, value) {
        // for the rpc call, we need to change value to be a 32 byte hex string.
        const res = await this.rpcCall('hardhat_setStorageAt', [contract.toString(), toHex(slot), toHex(value, true)]);
        if (res.error) {
            throw new Error(`Error setting storage for contract ${contract} at ${slot}: ${res.error.message}`);
        }
        this.logger.info(`Set storage for contract ${contract} at ${slot} to ${value}`);
    }
    /**
     * Computes the slot value for a given map and key.
     * @param baseSlot - The base slot of the map (specified in Aztec.nr contract)
     * @param key - The key to lookup in the map
     * @returns The storage slot of the value in the map
     */
    keccak256(baseSlot, key) {
        // abi encode (removing the 0x) - concat key and baseSlot (both padded to 32 bytes)
        const abiEncoded = toHex(key, true).substring(2) + toHex(baseSlot, true).substring(2);
        return toBigIntBE(keccak256(Buffer.from(abiEncoded, 'hex')));
    }
    /**
     * Send transactions impersonating an externally owned account or contract.
     * @param who - The address to impersonate
     */
    async startImpersonating(who) {
        const res = await this.rpcCall('hardhat_impersonateAccount', [who.toString()]);
        if (res.error) {
            throw new Error(`Error impersonating ${who}: ${res.error.message}`);
        }
        this.logger.info(`Impersonating ${who}`);
    }
    /**
     * Stop impersonating an account that you are currently impersonating.
     * @param who - The address to stop impersonating
     */
    async stopImpersonating(who) {
        const res = await this.rpcCall('hardhat_stopImpersonatingAccount', [who.toString()]);
        if (res.error) {
            throw new Error(`Error when stopping the impersonation of ${who}: ${res.error.message}`);
        }
        this.logger.info(`Stopped impersonating ${who}`);
    }
    /**
     * Set the bytecode for a contract
     * @param contract - The contract address
     * @param bytecode - The bytecode to set
     */
    async etch(contract, bytecode) {
        const res = await this.rpcCall('hardhat_setCode', [contract.toString(), bytecode]);
        if (res.error) {
            throw new Error(`Error setting bytecode for ${contract}: ${res.error.message}`);
        }
        this.logger.info(`Set bytecode for ${contract} to ${bytecode}`);
    }
    /**
     * Get the bytecode for a contract
     * @param contract - The contract address
     * @returns The bytecode for the contract
     */
    async getBytecode(contract) {
        const res = await this.rpcCall('eth_getCode', [contract.toString(), 'latest']);
        return res.result;
    }
}
/**
 * A class that provides utility functions for interacting with the aztec chain.
 */
export class AztecCheatCodes {
    constructor(
    /**
     * The PXE Service to use for interacting with the chain
     */
    pxe, 
    /**
     * The eth cheat codes.
     */
    eth, 
    /**
     * The logger to use for the aztec cheatcodes
     */
    logger = createDebugLogger('aztec:cheat_codes:aztec')) {
        this.pxe = pxe;
        this.eth = eth;
        this.logger = logger;
    }
    /**
     * Computes the slot value for a given map and key.
     * @param baseSlot - The base slot of the map (specified in Aztec.nr contract)
     * @param key - The key to lookup in the map
     * @returns The storage slot of the value in the map
     */
    async computeSlotInMap(baseSlot, key) {
        // Based on `at` function in
        // aztec3-packages/aztec-nr/aztec/src/state_vars/map.nr
        return await pedersenHash([new Fr(baseSlot), new Fr(key)]);
    }
    /**
     * Get the current blocknumber
     * @returns The current block number
     */
    async blockNumber() {
        return await this.pxe.getBlockNumber();
    }
    /**
     * Set time of the next execution on aztec.
     * It also modifies time on eth for next execution and stores this time as the last rollup block on the rollup contract.
     * @param to - The timestamp to set the next block to (must be greater than current time)
     */
    async warp(to) {
        const rollupContract = (await this.pxe.getNodeInfo()).l1ContractAddresses.rollupAddress;
        await this.eth.setNextBlockTimestamp(to);
        // also store this time on the rollup contract (slot 2 tracks `lastBlockTs`).
        // This is because when the sequencer executes public functions, it uses the timestamp stored in the rollup contract.
        await this.eth.store(rollupContract, 2n, BigInt(to));
        // also store this on slot 3 of the rollup contract (`lastWarpedBlockTs`) which tracks the last time warp was used.
        await this.eth.store(rollupContract, 3n, BigInt(to));
    }
    /**
     * Loads the value stored at the given slot in the public storage of the given contract.
     * @param who - The address of the contract
     * @param slot - The storage slot to lookup
     * @returns The value stored at the given slot
     */
    async loadPublic(who, slot) {
        const storageValue = await this.pxe.getPublicStorageAt(who, new Fr(slot));
        return storageValue;
    }
    /**
     * Loads the value stored at the given slot in the private storage of the given contract.
     * @param contract - The address of the contract
     * @param owner - The owner for whom the notes are encrypted
     * @param slot - The storage slot to lookup
     * @returns The notes stored at the given slot
     */
    async loadPrivate(owner, contract, slot) {
        const extendedNotes = await this.pxe.getIncomingNotes({
            owner,
            contractAddress: contract,
            storageSlot: new Fr(slot),
        });
        return extendedNotes.map(extendedNote => extendedNote.note);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlYXRfY29kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY2hlYXRfY29kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFzQyxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXBCOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFDckI7SUFDRTs7T0FFRztJQUNJLEdBQWtCO0lBQ3pCOztPQUVHO0lBQ0ksS0FBc0I7UUFKdEIsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUlsQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtJQUM1QixDQUFDO0lBRUosTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjLEVBQUUsR0FBUTtRQUNwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUN4QjtJQUNFOztPQUVHO0lBQ0ksTUFBYztJQUNyQjs7T0FFRztJQUNJLFNBQVMsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7UUFKbkQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUlkLFdBQU0sR0FBTixNQUFNLENBQTZDO0lBQ3pELENBQUM7SUFFSixLQUFLLENBQUMsT0FBTyxD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