import { Fr } from '@aztec/bb.js';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
const EMPTY_PROOF_SIZE = 42;
/**
 * The Proof class is a wrapper around the circuits proof.
 * Underlying it is a buffer of proof data in a form a barretenberg prover understands.
 * It provides methods to easily create, serialize, and deserialize the proof data for efficient
 * communication and storage.
 */
export class Proof {
    constructor(
    /**
     * Holds the serialized proof data in a binary buffer format.
     */
    buffer, numPublicInputs) {
        this.buffer = buffer;
        this.numPublicInputs = numPublicInputs;
    }
    /**
     * Create a Proof from a Buffer or BufferReader.
     * Expects a length-encoding.
     *
     * @param buffer - A Buffer or BufferReader containing the length-encoded proof data.
     * @returns A Proof instance containing the decoded proof data.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const size = reader.readNumber();
        const buf = reader.readBytes(size);
        const numPublicInputs = reader.readNumber();
        return new Proof(buf, numPublicInputs);
    }
    /**
     * Convert the Proof instance to a custom Buffer format.
     * This function serializes the Proof's buffer length and data sequentially into a new Buffer.
     *
     * @returns A Buffer containing the serialized proof data in custom format.
     */
    toBuffer() {
        return serializeToBuffer(this.buffer.length, this.buffer, this.numPublicInputs);
    }
    /**
     * Serialize the Proof instance to a hex string.
     * @returns The hex string representation of the proof data.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    withoutPublicInputs() {
        if (this.numPublicInputs > 0) {
            return this.buffer.subarray(Fr.SIZE_IN_BYTES * this.numPublicInputs);
        }
        else {
            return this.buffer;
        }
    }
    /**
     * Deserialize a Proof instance from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns - A new Proof instance.
     */
    static fromString(str) {
        return Proof.fromBuffer(Buffer.from(str, 'hex'));
    }
}
/**
 * Makes an empty proof.
 * Note: Used for local devnet milestone where we are not proving anything yet.
 * @returns The empty "proof".
 */
export function makeEmptyProof() {
    return new Proof(Buffer.alloc(EMPTY_PROOF_SIZE, 0), 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvb2YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0cy9wcm9vZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RSxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUU1Qjs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBR2hCO0lBQ0U7O09BRUc7SUFDSSxNQUFjLEVBRWQsZUFBdUI7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVkLG9CQUFlLEdBQWYsZUFBZSxDQUFRO0lBQzdCLENBQUM7SUFFSjs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVDLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFFBQVE7UUFDYixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7O09BR0c7SUFDSSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkUsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQyJ9