import { AztecAddress } from '@aztec/foundation/aztec-address';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
export class CallerContext {
    constructor(
    /**
     * Message sender of the caller contract.
     */
    msgSender, 
    /**
     * Storage contract address of the caller contract.
     */
    storageContractAddress, 
    /**
     * Whether the caller was modifying state.
     */
    isStaticCall) {
        this.msgSender = msgSender;
        this.storageContractAddress = storageContractAddress;
        this.isStaticCall = isStaticCall;
    }
    toFields() {
        return serializeToFields([this.msgSender, this.storageContractAddress, this.isStaticCall]);
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new CallerContext(reader.readObject(AztecAddress), reader.readObject(AztecAddress), reader.readBoolean());
    }
    /**
     * Returns a new instance of CallerContext with zero values.
     * @returns A new instance of CallerContext with zero values.
     */
    static empty() {
        return new CallerContext(AztecAddress.ZERO, AztecAddress.ZERO, false);
    }
    isEmpty() {
        return this.msgSender.isZero() && this.storageContractAddress.isZero() && !this.isStaticCall;
    }
    static from(fields) {
        return new CallerContext(...CallerContext.getFields(fields));
    }
    static getFields(fields) {
        return [fields.msgSender, fields.storageContractAddress, fields.isStaticCall];
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...CallerContext.getFields(this));
    }
    /**
     * Deserialize this from a buffer.
     * @param buffer - The bufferable type from which to deserialize.
     * @returns The deserialized instance of PublicCallRequest.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CallerContext(new AztecAddress(reader.readBytes(32)), new AztecAddress(reader.readBytes(32)), reader.readBoolean());
    }
    equals(callerContext) {
        return (callerContext.msgSender.equals(this.msgSender) &&
            callerContext.storageContractAddress.equals(this.storageContractAddress) &&
            callerContext.isStaticCall === this.isStaticCall);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbGVyX2NvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9jYWxsZXJfY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RyxNQUFNLE9BQU8sYUFBYTtJQUN4QjtJQUNFOztPQUVHO0lBQ0ksU0FBdUI7SUFDOUI7O09BRUc7SUFDSSxzQkFBb0M7SUFDM0M7O09BRUc7SUFDSSxZQUFxQjtRQVJyQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBSXZCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBYztRQUlwQyxpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUMzQixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUEwQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSztRQUNqQixPQUFPLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQy9GLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQStCO1FBQ3pDLE9BQU8sSUFBSSxhQUFhLENBQUMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBK0I7UUFDOUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQVUsQ0FBQztJQUN6RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGFBQWEsQ0FDdEIsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN0QyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FDckIsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBNEI7UUFDakMsT0FBTyxDQUNMLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDOUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDeEUsYUFBYSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxDQUNqRCxDQUFDO0lBQ0osQ0FBQztDQUNGIn0=