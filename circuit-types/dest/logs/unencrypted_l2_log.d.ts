import { AztecAddress } from '@aztec/circuits.js';
import { BufferReader } from '@aztec/foundation/serialize';
/**
 * Represents an individual unencrypted log entry.
 */
export declare class UnencryptedL2Log {
    /**
     * Address of the contract that emitted the event
     * NOTE: It would make sense to have the address only in `FunctionL2Logs` because contract address is shared for all
     * function logs. I didn't do this because it would require us to have 2 FunctionL2Logs classes (one with contract
     * address and one without) for unencrypted and encrypted because encrypted logs can't expose the address in an
     * unencrypted form. For this reason separating the classes seems like a premature optimization.
     * TODO: Optimize this once it makes sense.
     */
    readonly contractAddress: AztecAddress;
    /** The data contents of the log. */
    readonly data: Buffer;
    constructor(
    /**
     * Address of the contract that emitted the event
     * NOTE: It would make sense to have the address only in `FunctionL2Logs` because contract address is shared for all
     * function logs. I didn't do this because it would require us to have 2 FunctionL2Logs classes (one with contract
     * address and one without) for unencrypted and encrypted because encrypted logs can't expose the address in an
     * unencrypted form. For this reason separating the classes seems like a premature optimization.
     * TODO: Optimize this once it makes sense.
     */
    contractAddress: AztecAddress, 
    /** The data contents of the log. */
    data: Buffer);
    get length(): number;
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer(): Buffer;
    /**
     * Serializes log to a human readable string.
     * Outputs the log data as ascii if all bytes are valid ascii characters between 32 and 126, or as hex otherwise.
     * @returns A human readable representation of the log.
     */
    toHumanReadable(): string;
    /** Returns a JSON-friendly representation of the log. */
    toJSON(): object;
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj: any): UnencryptedL2Log;
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer or buffer reader containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(buffer: Buffer | BufferReader): UnencryptedL2Log;
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash(): Buffer;
    /**
     * Calculates siloed hash of serialized logs.
     * In the kernels, we use the storage contract address and not the one encoded here.
     * They should match, so it seems fine to use the existing info here.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    getSiloedHash(): Buffer;
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random(): UnencryptedL2Log;
}
//# sourceMappingURL=unencrypted_l2_log.d.ts.map