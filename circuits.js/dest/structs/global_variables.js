import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { GLOBAL_VARIABLES_LENGTH } from '../constants.gen.js';
import { GasFees } from './gas_fees.js';
/**
 * Global variables of the L2 block.
 */
export class GlobalVariables {
    constructor(
    /** ChainId for the L2 block. */
    chainId, 
    /** Version for the L2 block. */
    version, 
    /** Block number of the L2 block. */
    blockNumber, 
    /** Timestamp of the L2 block. */
    timestamp, 
    /** Recipient of block reward. */
    coinbase, 
    /** Address to receive fees. */
    feeRecipient, 
    /** Global gas prices for this block. */
    gasFees) {
        this.chainId = chainId;
        this.version = version;
        this.blockNumber = blockNumber;
        this.timestamp = timestamp;
        this.coinbase = coinbase;
        this.feeRecipient = feeRecipient;
        this.gasFees = gasFees;
    }
    getSize() {
        return this.toBuffer().length;
    }
    static from(fields) {
        return new GlobalVariables(...GlobalVariables.getFields(fields));
    }
    static empty() {
        return new GlobalVariables(Fr.ZERO, Fr.ZERO, Fr.ZERO, Fr.ZERO, EthAddress.ZERO, AztecAddress.ZERO, GasFees.empty());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new GlobalVariables(Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readObject(EthAddress), reader.readObject(AztecAddress), reader.readObject(GasFees));
    }
    static fromJSON(obj) {
        return new GlobalVariables(Fr.fromString(obj.chainId), Fr.fromString(obj.version), Fr.fromString(obj.blockNumber), Fr.fromString(obj.timestamp), EthAddress.fromString(obj.coinbase), AztecAddress.fromString(obj.feeRecipient), GasFees.fromJSON(obj.gasFees));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new GlobalVariables(reader.readField(), reader.readField(), reader.readField(), reader.readField(), EthAddress.fromField(reader.readField()), AztecAddress.fromField(reader.readField()), GasFees.fromFields(reader));
    }
    static getFields(fields) {
        // Note: The order here must match the order in the HeaderLib solidity library.
        return [
            fields.chainId,
            fields.version,
            fields.blockNumber,
            fields.timestamp,
            fields.coinbase,
            fields.feeRecipient,
            fields.gasFees,
        ];
    }
    toBuffer() {
        return serializeToBuffer(...GlobalVariables.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...GlobalVariables.getFields(this));
        if (fields.length !== GLOBAL_VARIABLES_LENGTH) {
            throw new Error(`Invalid number of fields for GlobalVariables. Expected ${GLOBAL_VARIABLES_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    toJSON() {
        return {
            chainId: this.chainId.toString(),
            version: this.version.toString(),
            blockNumber: this.blockNumber.toString(),
            timestamp: this.timestamp.toString(),
            coinbase: this.coinbase.toString(),
            feeRecipient: this.feeRecipient.toString(),
            gasFees: this.gasFees.toJSON(),
        };
    }
    clone() {
        return GlobalVariables.fromBuffer(this.toBuffer());
    }
    isEmpty() {
        return (this.chainId.isZero() &&
            this.version.isZero() &&
            this.blockNumber.isZero() &&
            this.timestamp.isZero() &&
            this.coinbase.isZero() &&
            this.feeRecipient.isZero() &&
            this.gasFees.isEmpty());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX3ZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2dsb2JhbF92YXJpYWJsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc5RyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFDMUI7SUFDRSxnQ0FBZ0M7SUFDekIsT0FBVztJQUNsQixnQ0FBZ0M7SUFDekIsT0FBVztJQUNsQixvQ0FBb0M7SUFDN0IsV0FBZTtJQUN0QixpQ0FBaUM7SUFDMUIsU0FBYTtJQUNwQixpQ0FBaUM7SUFDMUIsUUFBb0I7SUFDM0IsK0JBQStCO0lBQ3hCLFlBQTBCO0lBQ2pDLHdDQUF3QztJQUNqQyxPQUFnQjtRQVpoQixZQUFPLEdBQVAsT0FBTyxDQUFJO1FBRVgsWUFBTyxHQUFQLE9BQU8sQ0FBSTtRQUVYLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1FBRWYsY0FBUyxHQUFULFNBQVMsQ0FBSTtRQUViLGFBQVEsR0FBUixRQUFRLENBQVk7UUFFcEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUN0QixDQUFDO0lBRUosT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTSxD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