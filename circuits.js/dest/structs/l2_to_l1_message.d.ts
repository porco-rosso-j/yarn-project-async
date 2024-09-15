import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
export declare class L2ToL1Message {
    recipient: EthAddress;
    content: Fr;
    counter: number;
    constructor(recipient: EthAddress, content: Fr, counter: number);
    /**
     * Creates an empty L2ToL1Message with default values.
     * @returns An instance of L2ToL1Message with empty fields.
     */
    static empty(): L2ToL1Message;
    /**
     * Checks if another L2ToL1Message is equal to this instance.
     * @param other Another L2ToL1Message instance to compare with.
     * @returns True if both recipient and content are equal.
     */
    equals(other: L2ToL1Message): boolean;
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the L2ToL1Message into an array of fields.
     * @returns An array of fields representing the serialized message.
     */
    toFields(): Fr[];
    /**
     * Deserializes an array of fields into an L2ToL1Message instance.
     * @param fields An array of fields to deserialize from.
     * @returns An instance of L2ToL1Message.
     */
    static fromFields(fields: Fr[] | FieldReader): L2ToL1Message;
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns A new instance of L2ToL1Message.
     */
    static fromBuffer(buffer: Buffer | BufferReader): L2ToL1Message;
    /**
     * Convenience method to check if the message is empty.
     * @returns True if both recipient and content are zero.
     */
    isEmpty(): boolean;
}
export declare class ScopedL2ToL1Message {
    message: L2ToL1Message;
    contractAddress: AztecAddress;
    constructor(message: L2ToL1Message, contractAddress: AztecAddress);
    static empty(): ScopedL2ToL1Message;
    equals(other: ScopedL2ToL1Message): boolean;
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): ScopedL2ToL1Message;
    isEmpty(): boolean;
}
//# sourceMappingURL=l2_to_l1_message.d.ts.map