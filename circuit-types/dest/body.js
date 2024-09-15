import { EncryptedL2BlockL2Logs, EncryptedNoteL2BlockL2Logs, TxEffect, UnencryptedL2BlockL2Logs, } from '@aztec/circuit-types';
import { padArrayEnd } from '@aztec/foundation/collection';
import { sha256Trunc } from '@aztec/foundation/crypto';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
export class Body {
    constructor(txEffects) {
        this.txEffects = txEffects;
        txEffects.forEach(txEffect => {
            if (txEffect.isEmpty()) {
                throw new Error('Empty tx effect not allowed in Body');
            }
        });
    }
    /**
     * Serializes a block body
     * @returns A serialized L2 block body.
     */
    toBuffer() {
        return serializeToBuffer(this.txEffects.length, this.txEffects);
    }
    /**
     * Deserializes a block from a buffer
     * @returns A deserialized L2 block.
     */
    static fromBuffer(buf) {
        const reader = BufferReader.asReader(buf);
        return new this(reader.readVector(TxEffect));
    }
    [inspect.custom]() {
        return `Body {
  txEffects: ${inspect(this.txEffects)},
  emptyTxEffectsCount: ${this.numberOfTxsIncludingPadded},
  emptyTxEffectHash: ${TxEffect.empty().hash().toString('hex')},
  txsEffectsHash: ${this.getTxsEffectsHash().toString('hex')},
}`;
    }
    /**
     * Computes the transactions effects hash for the L2 block
     * This hash is also computed in the `AvailabilityOracle`.
     * @returns The txs effects hash.
     */
    getTxsEffectsHash() {
        // Adapted from proving-state.ts -> findMergeLevel and unbalanced_tree.ts
        // Calculates the tree upwards layer by layer until we reach the root
        // The L1 calculation instead computes the tree from right to left (slightly cheaper gas)
        // TODO: A more thorough investigation of which method is cheaper, then use that method everywhere
        const computeRoot = (leaves) => {
            const depth = Math.ceil(Math.log2(leaves.length));
            let [layerWidth, nodeToShift] = leaves.length & 1 ? [leaves.length - 1, leaves[leaves.length - 1]] : [leaves.length, Buffer.alloc(0)];
            // Allocate this layer's leaves and init the next layer up
            let thisLayer = leaves.slice(0, layerWidth);
            let nextLayer = [];
            for (let i = 0; i < depth; i++) {
                for (let j = 0; j < layerWidth; j += 2) {
                    // Store the hash of each pair one layer up
                    nextLayer[j / 2] = sha256Trunc(Buffer.concat([thisLayer[j], thisLayer[j + 1]]));
                }
                layerWidth /= 2;
                if (layerWidth & 1) {
                    if (nodeToShift.length) {
                        // If the next layer has odd length, and we have a node that needs to be shifted up, add it here
                        nextLayer.push(nodeToShift);
                        layerWidth += 1;
                        nodeToShift = Buffer.alloc(0);
                    }
                    else {
                        // If we don't have a node waiting to be shifted, store the next layer's final node to be shifted
                        layerWidth -= 1;
                        nodeToShift = nextLayer[layerWidth];
                    }
                }
                // reset the layers
                thisLayer = nextLayer;
                nextLayer = [];
            }
            // return the root
            return thisLayer[0];
        };
        const emptyTxEffectHash = TxEffect.empty().hash();
        let leaves = this.txEffects.map(txEffect => txEffect.hash());
        if (leaves.length < 2) {
            leaves = padArrayEnd(leaves, emptyTxEffectHash, 2);
        }
        return computeRoot(leaves);
    }
    get noteEncryptedLogs() {
        const logs = this.txEffects.map(txEffect => txEffect.noteEncryptedLogs);
        return new EncryptedNoteL2BlockL2Logs(logs);
    }
    get encryptedLogs() {
        const logs = this.txEffects.map(txEffect => txEffect.encryptedLogs);
        return new EncryptedL2BlockL2Logs(logs);
    }
    get unencryptedLogs() {
        const logs = this.txEffects.map(txEffect => txEffect.unencryptedLogs);
        return new UnencryptedL2BlockL2Logs(logs);
    }
    /**
     * Computes the number of transactions in the block including padding transactions.
     * @dev Modified code from TxsDecoder.computeNumTxEffectsToPad
     */
    get numberOfTxsIncludingPadded() {
        const numTxEffects = this.txEffects.length;
        // 2 is the minimum number of tx effects
        if (numTxEffects <= 2) {
            return 2;
        }
        return numTxEffects;
    }
    static random(txsPerBlock = 4, numPrivateCallsPerTx = 2, numPublicCallsPerTx = 3, numEncryptedLogsPerCall = 2, numUnencryptedLogsPerCall = 1) {
        const txEffects = [...new Array(txsPerBlock)].map(_ => TxEffect.random(numPrivateCallsPerTx, numPublicCallsPerTx, numEncryptedLogsPerCall, numUnencryptedLogsPerCall));
        return new Body(txEffects);
    }
    static empty() {
        return new Body([]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ib2R5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsMEJBQTBCLEVBQzFCLFFBQVEsRUFDUix3QkFBd0IsR0FDekIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE1BQU0sT0FBTyxJQUFJO0lBQ2YsWUFBbUIsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUN0QyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQTBCO1FBQzFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELENBQUMsT0FBTyxDQUFDLE1B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