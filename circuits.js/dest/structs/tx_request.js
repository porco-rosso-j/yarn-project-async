import { AztecAddress } from '@aztec/foundation/aztec-address';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GeneratorIndex, TX_REQUEST_LENGTH } from '../constants.gen.js';
import { FunctionData } from './function_data.js';
import { TxContext } from './tx_context.js';
/**
 * Transaction request.
 */
export class TxRequest {
    constructor(
    /** Sender. */
    origin, 
    /** Function data representing the function to call. */
    functionData, 
    /** Pedersen hash of function arguments. */
    argsHash, 
    /** Transaction context. */
    txContext) {
        this.origin = origin;
        this.functionData = functionData;
        this.argsHash = argsHash;
        this.txContext = txContext;
    }
    static getFields(fields) {
        return [fields.origin, fields.functionData, fields.argsHash, fields.txContext];
    }
    static from(fields) {
        return new TxRequest(...TxRequest.getFields(fields));
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer([...TxRequest.getFields(this)]);
    }
    toFields() {
        const fields = serializeToFields(...TxRequest.getFields(this));
        if (fields.length !== TX_REQUEST_LENGTH) {
            throw new Error(`Invalid number of fields for TxRequest. Expected ${TX_REQUEST_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The deserialized TxRequest object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new TxRequest(reader.readObject(AztecAddress), reader.readObject(FunctionData), Fr.fromBuffer(reader), reader.readObject(TxContext));
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.TX_REQUEST);
    }
    static empty() {
        return new TxRequest(AztecAddress.ZERO, FunctionData.empty(), Fr.zero(), TxContext.empty());
    }
    isEmpty() {
        return this.origin.isZero() && this.functionData.isEmpty() && this.argsHash.isZero() && this.txContext.isEmpty();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3R4X3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR2pHLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTVDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFNBQVM7SUFDcEI7SUFDRSxjQUFjO0lBQ1AsTUFBb0I7SUFDM0IsdURBQXVEO0lBQ2hELFlBQTBCO0lBQ2pDLDJDQUEyQztJQUNwQyxRQUFZO0lBQ25CLDJCQUEyQjtJQUNwQixTQUFvQjtRQU5wQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBRXBCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRTFCLGFBQVEsR0FBUixRQUFRLENBQUk7UUFFWixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQzFCLENBQUM7SUFFSixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQTJCO1FBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFVLENBQUM7SUFDMUYsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBMkI7UUFDckMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsaUJBQWlCLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDakgsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxTQUFTLENBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQy9CLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkgsQ0FBQztDQUNGIn0=