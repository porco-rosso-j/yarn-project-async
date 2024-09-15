import { Fr, Point } from '@aztec/circuits.js';
import { randomBytes, sha256Trunc } from '@aztec/foundation/crypto';
/**
 * Represents an individual encrypted log entry.
 */
export class EncryptedL2NoteLog {
    constructor(
    /** The encrypted data contents of the log. */
    data) {
        this.data = data;
    }
    get length() {
        return this.data.length;
    }
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer() {
        return this.data;
    }
    /** Returns a JSON-friendly representation of the log. */
    toJSON() {
        return {
            data: this.data.toString('hex'),
        };
    }
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj) {
        return new EncryptedL2NoteLog(Buffer.from(obj.data, 'hex'));
    }
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(data) {
        return new EncryptedL2NoteLog(data);
    }
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash() {
        const preimage = this.toBuffer();
        return sha256Trunc(preimage);
    }
    getSiloedHash() {
        return this.hash();
    }
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random() {
        const randomEphPubKey = Point.random();
        const randomLogContent = randomBytes(144 - Point.SIZE_IN_BYTES);
        const data = Buffer.concat([Fr.random().toBuffer(), randomLogContent, randomEphPubKey.toBuffer()]);
        return new EncryptedL2NoteLog(data);
    }
    static empty() {
        return new EncryptedL2NoteLog(Buffer.alloc(0));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2wyX25vdGVfbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ3MvZW5jcnlwdGVkX2wyX25vdGVfbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7SUFDRSw4Q0FBOEM7SUFDOUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFDM0IsQ0FBQztJQUVKLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELHlEQUF5RDtJQUNsRCxNQUFNO1FBQ1gsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRCxxREFBcUQ7SUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUNuQyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLElBQUk7UUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakMsT0FBTyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLGFBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxNQUFNO1FBQ2xCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGIn0=