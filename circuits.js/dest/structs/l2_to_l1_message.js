import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { L2_TO_L1_MESSAGE_LENGTH } from '../constants.gen.js';
export class L2ToL1Message {
    constructor(recipient, content, counter) {
        this.recipient = recipient;
        this.content = content;
        this.counter = counter;
    }
    /**
     * Creates an empty L2ToL1Message with default values.
     * @returns An instance of L2ToL1Message with empty fields.
     */
    static empty() {
        return new L2ToL1Message(EthAddress.ZERO, Fr.zero(), 0);
    }
    /**
     * Checks if another L2ToL1Message is equal to this instance.
     * @param other Another L2ToL1Message instance to compare with.
     * @returns True if both recipient and content are equal.
     */
    equals(other) {
        return (this.recipient.equals(other.recipient) && this.content.equals(other.content) && this.counter === other.counter);
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.recipient, this.content, this.counter);
    }
    /**
     * Serializes the L2ToL1Message into an array of fields.
     * @returns An array of fields representing the serialized message.
     */
    toFields() {
        const fields = [this.recipient.toField(), this.content, new Fr(this.counter)];
        if (fields.length !== L2_TO_L1_MESSAGE_LENGTH) {
            throw new Error(`Invalid number of fields for L2ToL1Message. Expected ${L2_TO_L1_MESSAGE_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes an array of fields into an L2ToL1Message instance.
     * @param fields An array of fields to deserialize from.
     * @returns An instance of L2ToL1Message.
     */
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new L2ToL1Message(reader.readObject(EthAddress), reader.readField(), reader.readU32());
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of L2ToL1Message.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new L2ToL1Message(reader.readObject(EthAddress), reader.readObject(Fr), reader.readNumber());
    }
    /**
     * Convenience method to check if the message is empty.
     * @returns True if both recipient and content are zero.
     */
    isEmpty() {
        return this.recipient.isZero() && this.content.isZero() && !this.counter;
    }
}
export class ScopedL2ToL1Message {
    constructor(message, contractAddress) {
        this.message = message;
        this.contractAddress = contractAddress;
    }
    static empty() {
        return new ScopedL2ToL1Message(L2ToL1Message.empty(), AztecAddress.ZERO);
    }
    equals(other) {
        return this.message.equals(other.message) && this.contractAddress.equals(other.contractAddress);
    }
    toBuffer() {
        return serializeToBuffer(this.message, this.contractAddress);
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ScopedL2ToL1Message(reader.readObject(L2ToL1Message), reader.readObject(AztecAddress));
    }
    isEmpty() {
        return this.message.isEmpty() && this.contractAddress.isZero();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDJfdG9fbDFfbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL2wyX3RvX2wxX21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RCxNQUFNLE9BQU8sYUFBYTtJQUN4QixZQUFtQixTQUFxQixFQUFTLE9BQVcsRUFBUyxPQUFlO1FBQWpFLGNBQVMsR0FBVCxTQUFTLENBQVk7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUFHLENBQUM7SUFFeEY7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQW9CO1FBQ3pCLE9BQU8sQ0FDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FDL0csQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIs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