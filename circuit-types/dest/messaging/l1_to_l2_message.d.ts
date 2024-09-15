import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { L1Actor } from './l1_actor.js';
import { L2Actor } from './l2_actor.js';
/**
 * The format of an L1 to L2 Message.
 */
export declare class L1ToL2Message {
    /**
     * The sender of the message on L1.
     */
    readonly sender: L1Actor;
    /**
     * The recipient of the message on L2.
     */
    readonly recipient: L2Actor;
    /**
     * The message content.
     */
    readonly content: Fr;
    /**
     * The hash of the spending secret.
     */
    readonly secretHash: Fr;
    constructor(
    /**
     * The sender of the message on L1.
     */
    sender: L1Actor, 
    /**
     * The recipient of the message on L2.
     */
    recipient: L2Actor, 
    /**
     * The message content.
     */
    content: Fr, 
    /**
     * The hash of the spending secret.
     */
    secretHash: Fr);
    /**
     * Returns each element within its own field so that it can be consumed by an acvm oracle call.
     * @returns The message as an array of fields (in order).
     */
    toFields(): Fr[];
    toBuffer(): Buffer;
    hash(): Fr;
    static fromBuffer(buffer: Buffer | BufferReader): L1ToL2Message;
    toString(): string;
    static fromString(data: string): L1ToL2Message;
    static empty(): L1ToL2Message;
    static random(): L1ToL2Message;
}
//# sourceMappingURL=l1_to_l2_message.d.ts.map