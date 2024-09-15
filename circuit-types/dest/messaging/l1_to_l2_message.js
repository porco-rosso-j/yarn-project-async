import { sha256ToField } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { L1Actor } from './l1_actor.js';
import { L2Actor } from './l2_actor.js';
/**
 * The format of an L1 to L2 Message.
 */
export class L1ToL2Message {
    constructor(
    /**
     * The sender of the message on L1.
     */
    sender, 
    /**
     * The recipient of the message on L2.
     */
    recipient, 
    /**
     * The message content.
     */
    content, 
    /**
     * The hash of the spending secret.
     */
    secretHash) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.secretHash = secretHash;
    }
    /**
     * Returns each element within its own field so that it can be consumed by an acvm oracle call.
     * @returns The message as an array of fields (in order).
     */
    toFields() {
        return [...this.sender.toFields(), ...this.recipient.toFields(), this.content, this.secretHash];
    }
    toBuffer() {
        return serializeToBuffer(this.sender, this.recipient, this.content, this.secretHash);
    }
    hash() {
        return sha256ToField(this.toFields());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const sender = reader.readObject(L1Actor);
        const recipient = reader.readObject(L2Actor);
        const content = Fr.fromBuffer(reader);
        const secretHash = Fr.fromBuffer(reader);
        return new L1ToL2Message(sender, recipient, content, secretHash);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(data) {
        const buffer = Buffer.from(data, 'hex');
        return L1ToL2Message.fromBuffer(buffer);
    }
    static empty() {
        return new L1ToL2Message(L1Actor.empty(), L2Actor.empty(), Fr.ZERO, Fr.ZERO);
    }
    static random() {
        return new L1ToL2Message(L1Actor.random(), L2Actor.random(), Fr.random(), Fr.random());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDFfdG9fbDJfbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdpbmcvbDFfdG9fbDJfbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUN4QjtJQUNFOztPQUVHO0lBQ2EsTUFBZTtJQUMvQjs7T0FFRztJQUNhLFNBQWtCO0lBQ2xDOztPQUVHO0lBQ2EsT0FBVztJQUMzQjs7T0FFRztJQUNhLFVBQWM7UUFaZCxXQUFNLEdBQU4sTUFBTSxDQUFTO1FBSWYsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUlsQixZQUFPLEdBQVAsT0FBTyxDQUFJO1FBSVgsZUFBVSxHQUFWLFVBQVUsQ0FBSTtJQUM3QixDQUFDO0lBRUo7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQzVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0YifQ==