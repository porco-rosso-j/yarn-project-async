/**
 * Represents an individual encrypted log entry.
 */
export declare class EncryptedL2NoteLog {
    /** The encrypted data contents of the log. */
    readonly data: Buffer;
    constructor(
    /** The encrypted data contents of the log. */
    data: Buffer);
    get length(): number;
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer(): Buffer;
    /** Returns a JSON-friendly representation of the log. */
    toJSON(): object;
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj: any): EncryptedL2NoteLog;
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(data: Buffer): EncryptedL2NoteLog;
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash(): Buffer;
    getSiloedHash(): Buffer;
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random(): EncryptedL2NoteLog;
    static empty(): EncryptedL2NoteLog;
}
//# sourceMappingURL=encrypted_l2_note_log.d.ts.map