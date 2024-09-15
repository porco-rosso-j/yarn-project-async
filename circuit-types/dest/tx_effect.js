import { EncryptedNoteTxL2Logs, EncryptedTxL2Logs, PublicDataWrite, TxHash, UnencryptedTxL2Logs, } from '@aztec/circuit-types';
import { Fr, MAX_L2_TO_L1_MSGS_PER_TX, MAX_NOTE_HASHES_PER_TX, MAX_NULLIFIERS_PER_TX, MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, RevertCode, } from '@aztec/circuits.js';
import { makeTuple } from '@aztec/foundation/array';
import { sha256Trunc } from '@aztec/foundation/crypto';
import { BufferReader, serializeArrayOfBufferableToVector, serializeToBuffer } from '@aztec/foundation/serialize';
import { inspect } from 'util';
export class TxEffect {
    constructor(
    /**
     * Whether the transaction reverted during public app logic.
     */
    revertCode, 
    /**
     * The transaction fee, denominated in FPA.
     */
    transactionFee, 
    /**
     * The note hashes to be inserted into the note hash tree.
     */
    noteHashes, 
    /**
     * The nullifiers to be inserted into the nullifier tree.
     */
    nullifiers, 
    /**
     * The hash of L2 to L1 messages to be inserted into the messagebox on L1.
     * TODO(just-mitch): rename to l2ToL1MsgHashes
     */
    l2ToL1Msgs, 
    /**
     * The public data writes to be inserted into the public data tree.
     */
    publicDataWrites, 
    /**
     * The logs and logs lengths of the txEffect
     */
    noteEncryptedLogsLength, encryptedLogsLength, unencryptedLogsLength, noteEncryptedLogs, encryptedLogs, unencryptedLogs) {
        this.revertCode = revertCode;
        this.transactionFee = transactionFee;
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.publicDataWrites = publicDataWrites;
        this.noteEncryptedLogsLength = noteEncryptedLogsLength;
        this.encryptedLogsLength = encryptedLogsLength;
        this.unencryptedLogsLength = unencryptedLogsLength;
        this.noteEncryptedLogs = noteEncryptedLogs;
        this.encryptedLogs = encryptedLogs;
        this.unencryptedLogs = unencryptedLogs;
        // TODO(#4638): Clean this up once we have isDefault() everywhere --> then we don't have to deal with 2 different
        // functions (isZero and isEmpty)
        if (noteHashes.length > MAX_NOTE_HASHES_PER_TX) {
            throw new Error(`Too many note hashes: ${noteHashes.length}, max: ${MAX_NOTE_HASHES_PER_TX}`);
        }
        noteHashes.forEach(h => {
            if (h.isZero()) {
                throw new Error('Note hash is zero');
            }
        });
        if (nullifiers.length > MAX_NULLIFIERS_PER_TX) {
            throw new Error(`Too many nullifiers: ${nullifiers.length}, max: ${MAX_NULLIFIERS_PER_TX}`);
        }
        nullifiers.forEach(h => {
            if (h.isZero()) {
                throw new Error('Nullifier is zero');
            }
        });
        if (l2ToL1Msgs.length > MAX_L2_TO_L1_MSGS_PER_TX) {
            throw new Error(`Too many L2 to L1 messages: ${l2ToL1Msgs.length}, max: ${MAX_L2_TO_L1_MSGS_PER_TX}`);
        }
        l2ToL1Msgs.forEach(h => {
            if (h.isZero()) {
                throw new Error('L2 to L1 message is zero');
            }
        });
        if (publicDataWrites.length > MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX) {
            throw new Error(`Too many public data writes: ${publicDataWrites.length}, max: ${MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX}`);
        }
        publicDataWrites.forEach(h => {
            if (h.isEmpty()) {
                throw new Error('Public data write is empty');
            }
        });
    }
    toBuffer() {
        return serializeToBuffer([
            this.revertCode,
            this.transactionFee,
            serializeArrayOfBufferableToVector(this.noteHashes, 1),
            serializeArrayOfBufferableToVector(this.nullifiers, 1),
            serializeArrayOfBufferableToVector(this.l2ToL1Msgs, 1),
            serializeArrayOfBufferableToVector(this.publicDataWrites, 1),
            this.noteEncryptedLogsLength,
            this.encryptedLogsLength,
            this.unencryptedLogsLength,
            this.noteEncryptedLogs,
            this.encryptedLogs,
            this.unencryptedLogs,
        ]);
    }
    /**
     * Deserializes the TxEffect object from a Buffer.
     * @param buffer - Buffer or BufferReader object to deserialize.
     * @returns An instance of TxEffect.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new TxEffect(RevertCode.fromBuffer(reader), Fr.fromBuffer(reader), reader.readVectorUint8Prefix(Fr), reader.readVectorUint8Prefix(Fr), reader.readVectorUint8Prefix(Fr), reader.readVectorUint8Prefix(PublicDataWrite), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), reader.readObject(EncryptedNoteTxL2Logs), reader.readObject(EncryptedTxL2Logs), reader.readObject(UnencryptedTxL2Logs));
    }
    /**
     * Computes the hash of the TxEffect object.
     * @returns The hash of the TxEffect object.
     * @dev This function must correspond with compute_tx_effects_hash() in Noir and TxsDecoder.sol decode().
     */
    hash() {
        const padBuffer = (buf, length) => Buffer.concat([buf, Buffer.alloc(length - buf.length)]);
        const noteHashesBuffer = padBuffer(serializeToBuffer(this.noteHashes), Fr.SIZE_IN_BYTES * MAX_NOTE_HASHES_PER_TX);
        const nullifiersBuffer = padBuffer(serializeToBuffer(this.nullifiers), Fr.SIZE_IN_BYTES * MAX_NULLIFIERS_PER_TX);
        const l2ToL1MsgsBuffer = padBuffer(serializeToBuffer(this.l2ToL1Msgs), Fr.SIZE_IN_BYTES * MAX_L2_TO_L1_MSGS_PER_TX);
        const publicDataWritesBuffer = padBuffer(serializeToBuffer(this.publicDataWrites), PublicDataWrite.SIZE_IN_BYTES * MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX);
        const noteEncryptedLogsHashKernel0 = this.noteEncryptedLogs.hash();
        const encryptedLogsHashKernel0 = this.encryptedLogs.hash();
        const unencryptedLogsHashKernel0 = this.unencryptedLogs.hash();
        const inputValue = Buffer.concat([
            this.revertCode.toHashPreimage(),
            this.transactionFee.toBuffer(),
            noteHashesBuffer,
            nullifiersBuffer,
            l2ToL1MsgsBuffer,
            publicDataWritesBuffer,
            this.noteEncryptedLogsLength.toBuffer(),
            this.encryptedLogsLength.toBuffer(),
            this.unencryptedLogsLength.toBuffer(),
            noteEncryptedLogsHashKernel0,
            encryptedLogsHashKernel0,
            unencryptedLogsHashKernel0,
        ]);
        return sha256Trunc(inputValue);
    }
    static random(numPrivateCallsPerTx = 2, numPublicCallsPerTx = 3, numEncryptedLogsPerCall = 2, numUnencryptedLogsPerCall = 1) {
        const noteEncryptedLogs = EncryptedNoteTxL2Logs.random(numPrivateCallsPerTx, numEncryptedLogsPerCall);
        const encryptedLogs = EncryptedTxL2Logs.random(numPrivateCallsPerTx, numEncryptedLogsPerCall);
        const unencryptedLogs = UnencryptedTxL2Logs.random(numPublicCallsPerTx, numUnencryptedLogsPerCall);
        return new TxEffect(RevertCode.random(), Fr.random(), makeTuple(MAX_NOTE_HASHES_PER_TX, Fr.random), makeTuple(MAX_NULLIFIERS_PER_TX, Fr.random), makeTuple(MAX_L2_TO_L1_MSGS_PER_TX, Fr.random), makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataWrite.random), new Fr(noteEncryptedLogs.getKernelLength()), new Fr(encryptedLogs.getKernelLength()), new Fr(unencryptedLogs.getKernelLength()), noteEncryptedLogs, encryptedLogs, unencryptedLogs);
    }
    static empty() {
        return new TxEffect(RevertCode.OK, Fr.ZERO, [], [], [], [], Fr.ZERO, Fr.ZERO, Fr.ZERO, EncryptedNoteTxL2Logs.empty(), EncryptedTxL2Logs.empty(), UnencryptedTxL2Logs.empty());
    }
    isEmpty() {
        return this.nullifiers.length === 0;
    }
    /**
     * Returns a string representation of the TxEffect object.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    [inspect.custom]() {
        // print out the non-empty fields
        return `TxEffect { 
      revertCode: ${this.revertCode},
      transactionFee: ${this.transactionFee},
      note hashes: [${this.noteHashes.map(h => h.toString()).join(', ')}],
      nullifiers: [${this.nullifiers.map(h => h.toString()).join(', ')}],
      l2ToL1Msgs: [${this.l2ToL1Msgs.map(h => h.toString()).join(', ')}],
      publicDataWrites: [${this.publicDataWrites.map(h => h.toString()).join(', ')}],
      noteEncryptedLogsLength: ${this.noteEncryptedLogsLength},
      encryptedLogsLength: ${this.encryptedLogsLength},
      unencryptedLogsLength: ${this.unencryptedLogsLength},
      noteEncryptedLogs: ${JSON.stringify(this.noteEncryptedLogs.toJSON())},
      encryptedLogs: ${JSON.stringify(this.encryptedLogs.toJSON())},
      unencryptedLogs: ${JSON.stringify(this.unencryptedLogs.toJSON())}
     }`;
    }
    /**
     * Deserializes an TxEffect object from a string.
     * @param str - String to deserialize.
     * @returns An instance of TxEffect.
     */
    static fromString(str) {
        return TxEffect.fromBuffer(Buffer.from(str, 'hex'));
    }
    get txHash() {
        return new TxHash(this.nullifiers[0].toBuffer());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3R4X2VmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsTUFBTSxFQUNOLG1CQUFtQixHQUNwQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFDTCxFQUFFLEVBQ0Ysd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsNENBQTRDLEVBQzVDLFVBQVUsR0FDWCxNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxrQ0FBa0MsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWxILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsTUFBTSxPQUFPLFFBQVE7SUFDbkI7SUFDRTs7T0FFRztJQUNJLFVBQXNCO0lBQzdCOztPQUVHO0lBQ0ksY0FBa0I7SUFDekI7O09BRUc7SUFDSSxVQUFnQjtJQUN2Qjs7T0FFRztJQUNJLFVBQWdCO0lBQ3ZCOzs7T0FHRztJQUNJLFVBQWdCO0lBQ3ZCOztPQUVHO0lBQ0ksZ0JBQW1DO0lBQzFDOztPQUVHO0lBQ0ksdUJBQTJCLEVBQzNCLG1CQUF1QixFQUN2QixxQkFBeUIsRUFDekIsaUJBQXdDLEVBQ3hDLGFBQWdDLEVBQ2hDLGVBQW9DO1FBOUJwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSXRCLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBSWxCLGVBQVUsR0FBVixVQUFVLENBQU07UUFJaEIsZUFBVSxHQUFWLFVBQVUsQ0FBTTtRQUtoQixlQUFVLEdBQVYsVUFBVSxDQUFNO1FBSWhCLHFCQUFnQixHQUFo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