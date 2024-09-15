import { Fr } from '@aztec/circuits.js';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class InboxLeaf {
    constructor(
    /** L2 block number in which the message will be included. */
    blockNumber, 
    /** Index of the leaf in L2 block message subtree. */
    index, 
    /** Leaf in the subtree/message hash. */
    leaf) {
        this.blockNumber = blockNumber;
        this.index = index;
        this.leaf = leaf;
    }
    toBuffer() {
        return serializeToBuffer([this.blockNumber, this.index, this.leaf]);
    }
    fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const blockNumber = toBigIntBE(reader.readBytes(32));
        const index = toBigIntBE(reader.readBytes(32));
        const leaf = reader.readObject(Fr);
        return new InboxLeaf(blockNumber, index, leaf);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ib3hfbGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdpbmcvaW5ib3hfbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxNQUFNLE9BQU8sU0FBUztJQUNwQjtJQUNFLDZEQUE2RDtJQUM3QyxXQUFtQjtJQUNuQyxxREFBcUQ7SUFDckMsS0FBYTtJQUM3Qix3Q0FBd0M7SUFDeEIsSUFBUTtRQUpSLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBRW5CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFYixTQUFJLEdBQUosSUFBSSxDQUFJO0lBQ3ZCLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQTZCO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRiJ9