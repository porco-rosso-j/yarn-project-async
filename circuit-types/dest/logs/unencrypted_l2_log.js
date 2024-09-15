import { AztecAddress } from '@aztec/circuits.js';
import { randomBytes, sha256Trunc } from '@aztec/foundation/crypto';
import { BufferReader, prefixBufferWithLength, toHumanReadable } from '@aztec/foundation/serialize';
/**
 * Represents an individual unencrypted log entry.
 */
export class UnencryptedL2Log {
    constructor(
    /**
     * Address of the contract that emitted the event
     * NOTE: It would make sense to have the address only in `FunctionL2Logs` because contract address is shared for all
     * function logs. I didn't do this because it would require us to have 2 FunctionL2Logs classes (one with contract
     * address and one without) for unencrypted and encrypted because encrypted logs can't expose the address in an
     * unencrypted form. For this reason separating the classes seems like a premature optimization.
     * TODO: Optimize this once it makes sense.
     */
    contractAddress, 
    /** The data contents of the log. */
    data) {
        this.contractAddress = contractAddress;
        this.data = data;
    }
    get length() {
        // We want the length of the buffer output from function_l2_logs -> toBuffer to equal the stored log length in the kernels.
        // The kernels store the length of the processed log as 4 bytes; thus for this length value to match the log length stored in the kernels,
        // we need to add four to the length here.
        // https://github.com/AztecProtocol/aztec-packages/issues/6578#issuecomment-2125003435
        return this.data.length + AztecAddress.SIZE_IN_BYTES + 4;
    }
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer() {
        return Buffer.concat([this.contractAddress.toBuffer(), prefixBufferWithLength(this.data)]);
    }
    /**
     * Serializes log to a human readable string.
     * Outputs the log data as ascii if all bytes are valid ascii characters between 32 and 126, or as hex otherwise.
     * @returns A human readable representation of the log.
     */
    toHumanReadable() {
        const payload = toHumanReadable(this.data);
        return `UnencryptedL2Log(contractAddress: ${this.contractAddress.toString()}, data: ${payload})`;
    }
    /** Returns a JSON-friendly representation of the log. */
    toJSON() {
        return {
            contractAddress: this.contractAddress.toString(),
            data: this.data.toString('hex'),
        };
    }
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj) {
        return new UnencryptedL2Log(AztecAddress.fromString(obj.contractAddress), Buffer.from(obj.data, 'hex'));
    }
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer or buffer reader containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const contractAddress = AztecAddress.fromBuffer(reader);
        const data = reader.readBuffer();
        return new UnencryptedL2Log(contractAddress, data);
    }
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash() {
        const preimage = this.toBuffer();
        return sha256Trunc(preimage);
    }
    /**
     * Calculates siloed hash of serialized logs.
     * In the kernels, we use the storage contract address and not the one encoded here.
     * They should match, so it seems fine to use the existing info here.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    getSiloedHash() {
        const hash = this.hash();
        return sha256Trunc(Buffer.concat([this.contractAddress.toBuffer(), hash]));
    }
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random() {
        const contractAddress = AztecAddress.random();
        const dataLength = randomBytes(1)[0];
        const data = randomBytes(dataLength);
        return new UnencryptedL2Log(contractAddress, data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5lbmNyeXB0ZWRfbDJfbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ3MvdW5lbmNyeXB0ZWRfbDJfbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFcEc7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCO0lBQ0U7Ozs7Ozs7T0FPRztJQUNhLGVBQTZCO0lBQzdDLG9DQUFvQztJQUNwQixJQUFZO1FBRlosb0JBQWUsR0FBZixlQUFlLENBQWM7UUFFN0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUMzQixDQUFDO0lBRUosSUFBSSxNQUFNO1FBQ1IsMkhBQTJIO1FBQzNILDBJQUEwSTtRQUMxSSwwQ0FBMEM7UUFDMUMsc0ZBQXNGO1FBQ3RGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxlQUFlO1FBQ3BCLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsT0FBTyxxQ0FBcUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxPQUFPLEdBQUcsQ0FBQztJQUNuRyxDQUFDO0lBRUQseURBQXlEO0lBQ2xELE1BQU07UUFDWCxPQUFPO1lBQ0wsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRCxxREFBcUQ7SUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDcEQsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJO1FBQ1QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLGFBQWE7UUFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU07UUFDbEIsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YifQ==