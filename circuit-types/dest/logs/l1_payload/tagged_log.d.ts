import { AztecAddress, type GrumpkinScalar, type KeyValidationRequest, type PublicKey } from '@aztec/circuits.js';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type EncryptedL2Log } from '../encrypted_l2_log.js';
import { L1EventPayload } from './l1_event_payload.js';
import { L1NotePayload } from './l1_note_payload.js';
/**
 * Encrypted log payload with a tag used for retrieval by clients.
 */
export declare class TaggedLog<Payload extends L1NotePayload | L1EventPayload> {
    payload: Payload;
    incomingTag: Fr;
    outgoingTag: Fr;
    constructor(payload: Payload, incomingTag?: Fr, outgoingTag?: Fr);
    /**
     * Deserializes the TaggedLog object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of TaggedLog.
     */
    static fromBuffer(buffer: Buffer | BufferReader, payloadType: typeof L1EventPayload): TaggedLog<L1EventPayload>;
    static fromBuffer(buffer: Buffer | BufferReader, payloadType?: typeof L1NotePayload): TaggedLog<L1NotePayload>;
    /**
     * Serializes the TaggedLog object into a Buffer.
     * @returns Buffer representation of the TaggedLog object (unencrypted).
     */
    toBuffer(): Buffer;
    static random(payloadType?: typeof L1NotePayload, contract?: AztecAddress): TaggedLog<L1NotePayload>;
    static random(payloadType: typeof L1EventPayload): TaggedLog<L1EventPayload>;
    encrypt(ephSk: GrumpkinScalar, recipient: AztecAddress, ivpk: PublicKey, ovKeys: KeyValidationRequest): Promise<Buffer>;
    static decryptAsIncoming(encryptedLog: EncryptedL2Log, ivsk: GrumpkinScalar, payloadType: typeof L1EventPayload): Promise<TaggedLog<L1EventPayload> | undefined>;
    static decryptAsIncoming(data: Buffer | bigint[], ivsk: GrumpkinScalar, payloadType?: typeof L1NotePayload): Promise<TaggedLog<L1NotePayload> | undefined>;
    static decryptAsOutgoing(encryptedLog: EncryptedL2Log, ivsk: GrumpkinScalar, payloadType: typeof L1EventPayload): Promise<TaggedLog<L1EventPayload> | undefined>;
    static decryptAsOutgoing(data: Buffer | bigint[], ivsk: GrumpkinScalar, payloadType?: typeof L1NotePayload): Promise<TaggedLog<L1NotePayload> | undefined>;
}
//# sourceMappingURL=tagged_log.d.ts.map