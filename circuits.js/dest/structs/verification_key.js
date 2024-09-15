import { makeTuple } from '@aztec/foundation/array';
import { times } from '@aztec/foundation/collection';
import { Fq, Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { VERIFICATION_KEY_LENGTH_IN_FIELDS } from '../constants.gen.js';
import { CircuitType } from './shared.js';
/**
 * Curve data.
 */
export class G1AffineElement {
    constructor(x, y) {
        this.x = typeof x === 'bigint' ? new Fq(x) : x;
        this.y = typeof y === 'bigint' ? new Fq(y) : y;
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.x, this.y);
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The G1AffineElement.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new G1AffineElement(Fq.fromBuffer(reader), Fq.fromBuffer(reader));
    }
}
/**
 * Used store and serialize a key-value map of commitments where key is the name of the commitment and value is
 * the commitment itself. The name can be e.g. Q_1, Q_2, SIGMA_1 etc.
 */
export class CommitmentMap {
    constructor(
    /**
     * An object used to store the commitments.
     */
    record) {
        this.record = record;
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        const values = Object.entries(this.record);
        return serializeToBuffer(values.length, ...values.flat());
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or BufferReader to read from.
     * @returns The CommitmentMap.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new CommitmentMap(reader.readMap(G1AffineElement));
    }
}
export const CIRCUIT_SIZE_INDEX = 3;
export const CIRCUIT_PUBLIC_INPUTS_INDEX = 4;
export const CIRCUIT_RECURSIVE_INDEX = 5;
/**
 * Provides a 'fields' representation of a circuit's verification key
 */
export class VerificationKeyAsFields {
    constructor(key, hash) {
        this.key = key;
        this.hash = hash;
    }
    get numPublicInputs() {
        return Number(this.key[CIRCUIT_PUBLIC_INPUTS_INDEX]);
    }
    get circuitSize() {
        return Number(this.key[CIRCUIT_SIZE_INDEX]);
    }
    get isRecursive() {
        return this.key[CIRCUIT_RECURSIVE_INDEX] == Fr.ONE;
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.key, this.hash);
    }
    toFields() {
        return [...this.key, this.hash];
    }
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The VerificationKeyAsFields.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new VerificationKeyAsFields(reader.readArray(VERIFICATION_KEY_LENGTH_IN_FIELDS, Fr), reader.readObject(Fr));
    }
    /**
     * Builds a fake verification key that should be accepted by circuits.
     * @returns A fake verification key.
     */
    static makeFake(seed = 1) {
        return new VerificationKeyAsFields(makeTuple(VERIFICATION_KEY_LENGTH_IN_FIELDS, Fr.random, seed), Fr.random());
    }
    /**
     * Builds an 'empty' verification key
     * @returns An 'empty' verification key
     */
    static makeEmpty() {
        return new VerificationKeyAsFields(makeTuple(VERIFICATION_KEY_LENGTH_IN_FIELDS, Fr.zero), Fr.zero());
    }
}
export class VerificationKey {
    constructor(
    /**
     * For Plonk, this is equivalent to the proving system used to prove and verify.
     */
    circuitType, 
    /**
     * The number of gates in this circuit.
     */
    circuitSize, 
    /**
     * The number of public inputs in this circuit.
     */
    numPublicInputs, 
    /**
     * The commitments for this circuit.
     */
    commitments, 
    /**
     * Contains a recursive proof?
     */
    containsRecursiveProof, 
    /**
     * Recursion stack.
     */
    recursiveProofPublicInputIndices) {
        this.circuitType = circuitType;
        this.circuitSize = circuitSize;
        this.numPublicInputs = numPublicInputs;
        this.commitments = commitments;
        this.containsRecursiveProof = containsRecursiveProof;
        this.recursiveProofPublicInputIndices = recursiveProofPublicInputIndices;
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.circuitType, this.circuitSize, this.numPublicInputs, new CommitmentMap(this.commitments), this.containsRecursiveProof, serializeToBuffer(this.recursiveProofPublicInputIndices.length, this.recursiveProofPublicInputIndices));
    }
    /**
     * Deserializes class from a buffer.
     * @returns A VerificationKey instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new VerificationKey(reader.readNumber(), reader.readNumber(), reader.readNumber(), reader.readObject(CommitmentMap).record, reader.readBoolean(), reader.readNumberVector());
    }
    /**
     * Builds a fake verification key that should be accepted by circuits.
     * @returns A fake verification key.
     */
    static makeFake() {
        return new VerificationKey(CircuitType.ULTRA, // This is entirely arbitrary
        2048, 116, {}, // Empty set of commitments
        false, times(16, i => i));
    }
}
export class VerificationKeyData {
    constructor(keyAsFields, keyAsBytes) {
        this.keyAsFields = keyAsFields;
        this.keyAsBytes = keyAsBytes;
    }
    get numPublicInputs() {
        return this.keyAsFields.numPublicInputs;
    }
    get circuitSize() {
        return this.keyAsFields.circuitSize;
    }
    get isRecursive() {
        return this.keyAsFields.isRecursive;
    }
    static makeFake() {
        return new VerificationKeyData(VerificationKeyAsFields.makeFake(), VerificationKey.makeFake().toBuffer());
    }
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(this.keyAsFields, this.keyAsBytes.length, this.keyAsBytes);
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const verificationKeyAsFields = reader.readObject(VerificationKeyAsFields);
        const length = reader.readNumber();
        const bytes = reader.readBytes(length);
        return new VerificationKeyData(verificationKeyAsFields, bytes);
    }
    static fromString(str) {
        return VerificationKeyData.fromBuffer(Buffer.from(str, 'hex'));
    }
    clone() {
        return VerificationKeyData.fromBuffer(this.toBuffer());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uX2tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3ZlcmlmaWNhdGlvbl9rZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFVMUIsWUFBWSxDQUFjLEVBQUUsQ0FBYztRQUN4QyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQTZCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENB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