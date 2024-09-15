import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { GlobalVariables } from '../global_variables.js';
import { Header } from '../header.js';
import { TxContext } from '../tx_context.js';
/**
 * Data that is constant/not modified by neither of the kernels.
 */
export class CombinedConstantData {
    constructor(
    /** Header of a block whose state is used during execution (not the block the transaction is included in). */
    historicalHeader, 
    /**
     * Context of the transaction.
     *
     * Note: `chainId` and `version` in txContext are not redundant to the values in
     * self.historical_header.global_variables because they can be different in case of a protocol upgrade. In such
     * a situation we could be using header from a block before the upgrade took place but be using the updated
     * protocol to execute and prove the transaction.
     */
    txContext, 
    /**
     * Root of the vk tree for the protocol circuits.
     */
    vkTreeRoot, 
    /** Present when output by a public kernel, empty otherwise. */
    globalVariables) {
        this.historicalHeader = historicalHeader;
        this.txContext = txContext;
        this.vkTreeRoot = vkTreeRoot;
        this.globalVariables = globalVariables;
    }
    toBuffer() {
        return serializeToBuffer(this.historicalHeader, this.txContext, this.vkTreeRoot, this.globalVariables);
    }
    getSize() {
        return this.historicalHeader.getSize() + this.txContext.getSize() + this.globalVariables.getSize();
    }
    static from({ historicalHeader, txContext, vkTreeRoot, globalVariables, }) {
        return new CombinedConstantData(historicalHeader, txContext, vkTreeRoot, globalVariables);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or buffer reader to read from.
     * @returns A new instance of CombinedConstantData.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CombinedConstantData(reader.readObject(Header), reader.readObject(TxContext), Fr.fromBuffer(reader), reader.readObject(GlobalVariables));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new CombinedConstantData(reader.readObject(Header), reader.readObject(TxContext), reader.readField(), reader.readObject(GlobalVariables));
    }
    static empty() {
        return new CombinedConstantData(Header.empty(), TxContext.empty(), Fr.ZERO, GlobalVariables.empty());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZWRfY29uc3RhbnRfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL2tlcm5lbC9jb21iaW5lZF9jb25zdGFudF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzNGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU3Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7SUFDRSw2R0FBNkc7SUFDdEcsZ0JBQXdCO0lBQy9COzs7Ozs7O09BT0c7SUFDSSxTQUFvQjtJQUMzQjs7T0FFRztJQUNJLFVBQWM7SUFFckIsK0RBQStEO0lBQ3hELGVBQWdDO1FBaEJoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFTeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUlwQixlQUFVLEdBQVYsVUFBVSxDQUFJO1FBR2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3RDLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyRyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUNWLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsR0FDZ0I7UUFDL0IsT0FBTyxJQUFJLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLG9CQUFvQixDQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksb0JBQW9CLENBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQzVCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkcsQ0FBQztDQUNGIn0=