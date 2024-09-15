import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * The recipient of an L2 message.
 */
export declare class L2Actor {
    /**
     * The recipient of the message.
     */
    readonly recipient: AztecAddress;
    /**
     * The version of the protocol.
     */
    readonly version: number;
    constructor(
    /**
     * The recipient of the message.
     */
    recipient: AztecAddress, 
    /**
     * The version of the protocol.
     */
    version: number);
    static empty(): L2Actor;
    toFields(): Fr[];
    toBuffer(): Buffer;
    static fromBuffer(buffer: Buffer | BufferReader): L2Actor;
    static random(): L2Actor;
}
//# sourceMappingURL=l2_actor.d.ts.map