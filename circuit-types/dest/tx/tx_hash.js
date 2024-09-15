import { randomBytes } from '@aztec/foundation/crypto';
import { BufferReader, deserializeBigInt, serializeBigInt } from '@aztec/foundation/serialize';
/**
 * A class representing hash of Aztec transaction.
 */
export class TxHash {
    constructor(
    /**
     * The buffer containing the hash.
     */
    buffer) {
        this.buffer = buffer;
        if (buffer.length !== TxHash.SIZE) {
            throw new Error(`Expected buffer to have length ${TxHash.SIZE} but was ${buffer.length}`);
        }
    }
    /**
     * Returns the raw buffer of the hash.
     * @returns The buffer containing the hash.
     */
    toBuffer() {
        return this.buffer;
    }
    /**
     * Creates a TxHash from a buffer.
     * @param buffer - The buffer to create from.
     * @returns A new TxHash object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new TxHash(reader.readBytes(TxHash.SIZE));
    }
    /**
     * Checks if this hash and another hash are equal.
     * @param hash - A hash to compare with.
     * @returns True if the hashes are equal, false otherwise.
     */
    equals(hash) {
        return this.buffer.equals(hash.buffer);
    }
    /**
     * Returns true if this hash is zero.
     * @returns True if this hash is zero.
     */
    isZero() {
        return this.buffer.equals(Buffer.alloc(32, 0));
    }
    /**
     * Convert this hash to a hex string.
     * @returns The hex string.
     */
    toString() {
        return this.buffer.toString('hex');
    }
    /**
     * Convert this hash to a big int.
     * @returns The big int.
     */
    toBigInt() {
        return deserializeBigInt(this.buffer, 0, TxHash.SIZE).elem;
    }
    /**
     * Creates a tx hash from a bigint.
     * @param hash - The tx hash as a big int.
     * @returns The TxHash.
     */
    static fromBigInt(hash) {
        return new TxHash(serializeBigInt(hash, TxHash.SIZE));
    }
    /**
     * Converts this hash from a buffer of 28 bytes.
     * Verifies the input is 28 bytes.
     * @param buffer - The 28 byte buffer to construct from.
     * @returns A TxHash created from the input buffer with 4 bytes 0 padding at the front.
     */
    static fromBuffer28(buffer) {
        if (buffer.length != 28) {
            throw new Error(`Expected TxHash input buffer to be 28 bytes`);
        }
        const padded = Buffer.concat([Buffer.alloc(this.SIZE - 28), buffer]);
        return new TxHash(padded);
    }
    /**
     * Converts a string into a TxHash object.
     * @param str - The TX hash in string format.
     * @returns A new TxHash object.
     */
    static fromString(str) {
        return new TxHash(Buffer.from(str, 'hex'));
    }
    /**
     * Generates a random TxHash.
     * @returns A new TxHash object.
     */
    static random() {
        return new TxHash(Buffer.from(randomBytes(TxHash.SIZE)));
    }
}
/**
 * The size of the hash in bytes.
 */
TxHash.SIZE = 32;
/**
 * TxHash with value zero.
 */
TxHash.ZERO = new TxHash(Buffer.alloc(TxHash.SIZE));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eC90eF9oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9GOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFXakI7SUFDRTs7T0FFRztJQUNJLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXJCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsTUFBTSxDQUFDLElBQUksWUFBWSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM1RixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQ3BELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLElBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzdELENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ25DLE9BQU8sSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQWM7UUFDdkMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDbEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsTUFBTTtRQUNsQixPQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7QUE1R0Q7O0dBRUc7QUFDVyxXQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXhCOztHQUVHO0FBQ1csV0FBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMifQ==