import { Fr, Point } from '@aztec/circuits.js';
import { randomBytes, sha256Trunc } from '@aztec/foundation/crypto';
/**
 * Represents an individual encrypted event log entry.
 */
export class EncryptedL2Log {
    constructor(data, maskedContractAddress) {
        this.data = data;
        this.maskedContractAddress = maskedContractAddress;
    }
    // We do not 'count' the maskedContractAddress in .length, as this method is called to calculate ciphertext length
    get length() {
        return this.data.length;
    }
    /**
     * Serializes log to a buffer.
     * @returns A buffer containing the serialized log.
     */
    toBuffer() {
        return Buffer.concat([this.maskedContractAddress.toBuffer(), this.data]);
    }
    /** Returns a JSON-friendly representation of the log. */
    toJSON() {
        return {
            data: this.data.toString('hex'),
            maskedContractAddress: this.maskedContractAddress.toString(),
        };
    }
    /** Converts a plain JSON object into an instance. */
    static fromJSON(obj) {
        return new EncryptedL2Log(Buffer.from(obj.data, 'hex'), Fr.fromString(obj.maskedContractAddress));
    }
    /**
     * Deserializes log from a buffer.
     * @param buffer - The buffer containing the log.
     * @returns Deserialized instance of `Log`.
     */
    static fromBuffer(data) {
        return new EncryptedL2Log(data.subarray(32), new Fr(data.subarray(0, 32)));
    }
    /**
     * Calculates hash of serialized logs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    hash() {
        return sha256Trunc(this.data);
    }
    /**
     * Calculates siloed hash of serialized encryptedlogs.
     * @returns Buffer containing 248 bits of information of sha256 hash.
     */
    getSiloedHash() {
        const hash = this.hash();
        return sha256Trunc(Buffer.concat([this.maskedContractAddress.toBuffer(), hash]));
    }
    /**
     * Crates a random log.
     * @returns A random log.
     */
    static random() {
        const randomEphPubKey = Point.random();
        const randomLogContent = randomBytes(144 - Point.SIZE_IN_BYTES);
        const data = Buffer.concat([Fr.random().toBuffer(), randomLogContent, randomEphPubKey.toBuffer()]);
        return new EncryptedL2Log(data, Fr.random());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVkX2wyX2xvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dzL2VuY3J5cHRlZF9sMl9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBNEIsSUFBWSxFQUFrQixxQkFBeUI7UUFBdkQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFrQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQUk7SUFBRyxDQUFDO0lBRXZGLGtIQUFrSDtJQUNsSCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCx5REFBeUQ7SUFDbEQsTUFBTTtRQUNYLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQy9CLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7U0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFRCxxREFBcUQ7SUFDOUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFRO1FBQzdCLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUNuQyxPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxJQUFJO1FBQ1QsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxhQUFhO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU07UUFDbEIsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRiJ9