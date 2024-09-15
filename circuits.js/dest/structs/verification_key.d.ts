import { Fq, Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { VERIFICATION_KEY_LENGTH_IN_FIELDS } from '../constants.gen.js';
import { CircuitType } from './shared.js';
/**
 * Curve data.
 */
export declare class G1AffineElement {
    /**
     * Element's x coordinate.
     */
    x: Fq;
    /**
     * Element's y coordinate.
     */
    y: Fq;
    constructor(x: Fq | bigint, y: Fq | bigint);
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer  or BufferReader to read from.
     * @returns The G1AffineElement.
     */
    static fromBuffer(buffer: Buffer | BufferReader): G1AffineElement;
}
/**
 * Used store and serialize a key-value map of commitments where key is the name of the commitment and value is
 * the commitment itself. The name can be e.g. Q_1, Q_2, SIGMA_1 etc.
 */
export declare class CommitmentMap {
    /**
     * An object used to store the commitments.
     */
    record: {
        [name: string]: G1AffineElement;
    };
    constructor(
    /**
     * An object used to store the commitments.
     */
    record: {
        [name: string]: G1AffineElement;
    });
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer or BufferReader to read from.
     * @returns The CommitmentMap.
     */
    static fromBuffer(buffer: Buffer | BufferReader): CommitmentMap;
}
export declare const CIRCUIT_SIZE_INDEX = 3;
export declare const CIRCUIT_PUBLIC_INPUTS_INDEX = 4;
export declare const CIRCUIT_RECURSIVE_INDEX = 5;
/**
 * Provides a 'fields' representation of a circuit's verification key
 */
export declare class VerificationKeyAsFields {
    key: Tuple<Fr, typeof VERIFICATION_KEY_LENGTH_IN_FIELDS>;
    hash: Fr;
    constructor(key: Tuple<Fr, typeof VERIFICATION_KEY_LENGTH_IN_FIELDS>, hash: Fr);
    get numPublicInputs(): number;
    get circuitSize(): number;
    get isRecursive(): boolean;
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserializes from a buffer or reader, corresponding to a write in cpp.
     * @param buffer - Buffer to read from.
     * @returns The VerificationKeyAsFields.
     */
    static fromBuffer(buffer: Buffer | BufferReader): VerificationKeyAsFields;
    /**
     * Builds a fake verification key that should be accepted by circuits.
     * @returns A fake verification key.
     */
    static makeFake(seed?: number): VerificationKeyAsFields;
    /**
     * Builds an 'empty' verification key
     * @returns An 'empty' verification key
     */
    static makeEmpty(): VerificationKeyAsFields;
}
export declare class VerificationKey {
    /**
     * For Plonk, this is equivalent to the proving system used to prove and verify.
     */
    circuitType: CircuitType;
    /**
     * The number of gates in this circuit.
     */
    circuitSize: number;
    /**
     * The number of public inputs in this circuit.
     */
    numPublicInputs: number;
    /**
     * The commitments for this circuit.
     */
    commitments: Record<string, G1AffineElement>;
    /**
     * Contains a recursive proof?
     */
    containsRecursiveProof: boolean;
    /**
     * Recursion stack.
     */
    recursiveProofPublicInputIndices: number[];
    constructor(
    /**
     * For Plonk, this is equivalent to the proving system used to prove and verify.
     */
    circuitType: CircuitType, 
    /**
     * The number of gates in this circuit.
     */
    circuitSize: number, 
    /**
     * The number of public inputs in this circuit.
     */
    numPublicInputs: number, 
    /**
     * The commitments for this circuit.
     */
    commitments: Record<string, G1AffineElement>, 
    /**
     * Contains a recursive proof?
     */
    containsRecursiveProof: boolean, 
    /**
     * Recursion stack.
     */
    recursiveProofPublicInputIndices: number[]);
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    /**
     * Deserializes class from a buffer.
     * @returns A VerificationKey instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): VerificationKey;
    /**
     * Builds a fake verification key that should be accepted by circuits.
     * @returns A fake verification key.
     */
    static makeFake(): VerificationKey;
}
export declare class VerificationKeyData {
    readonly keyAsFields: VerificationKeyAsFields;
    readonly keyAsBytes: Buffer;
    constructor(keyAsFields: VerificationKeyAsFields, keyAsBytes: Buffer);
    get numPublicInputs(): number;
    get circuitSize(): number;
    get isRecursive(): boolean;
    static makeFake(): VerificationKeyData;
    /**
     * Serialize as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toString(): string;
    static fromBuffer(buffer: Buffer | BufferReader): VerificationKeyData;
    static fromString(str: string): VerificationKeyData;
    clone(): VerificationKeyData;
}
//# sourceMappingURL=verification_key.d.ts.map