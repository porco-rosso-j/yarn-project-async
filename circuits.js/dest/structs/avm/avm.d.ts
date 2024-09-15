import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { Gas } from '../gas.js';
import { PublicCircuitPublicInputs } from '../public_circuit_public_inputs.js';
import { Vector } from '../shared.js';
export declare class AvmKeyValueHint {
    readonly key: Fr;
    readonly value: Fr;
    constructor(key: Fr, value: Fr);
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty(): boolean;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields: FieldsOf<AvmKeyValueHint>): AvmKeyValueHint;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<AvmKeyValueHint>): readonly [Fr, Fr];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff: Buffer | BufferReader): AvmKeyValueHint;
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str: string): AvmKeyValueHint;
}
export declare class AvmExternalCallHint {
    readonly success: Fr;
    readonly gasUsed: Gas;
    readonly endSideEffectCounter: Fr;
    readonly returnData: Vector<Fr>;
    /**
     * Creates a new instance.
     * @param success whether the external call was successful (= did NOT revert).
     * @param returnData the data returned by the external call.
     * @param gasUsed gas used by the external call (not including the cost of the CALL opcode itself).
     * @param endSideEffectCounter value of side effect counter at the end of the external call.
     */
    constructor(success: Fr, returnData: Fr[], gasUsed: Gas, endSideEffectCounter: Fr);
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty(): boolean;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields: FieldsOf<AvmExternalCallHint>): AvmExternalCallHint;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<AvmExternalCallHint>): readonly [Fr, Vector<Fr>, Gas, Fr];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff: Buffer | BufferReader): AvmExternalCallHint;
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str: string): AvmExternalCallHint;
}
export declare class AvmContractInstanceHint {
    readonly address: Fr;
    readonly exists: Fr;
    readonly salt: Fr;
    readonly deployer: Fr;
    readonly contractClassId: Fr;
    readonly initializationHash: Fr;
    readonly publicKeysHash: Fr;
    constructor(address: Fr, exists: Fr, salt: Fr, deployer: Fr, contractClassId: Fr, initializationHash: Fr, publicKeysHash: Fr);
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty(): boolean;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields: FieldsOf<AvmContractInstanceHint>): AvmContractInstanceHint;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<AvmContractInstanceHint>): readonly [Fr, Fr, Fr, Fr, Fr, Fr, Fr];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff: Buffer | BufferReader): AvmContractInstanceHint;
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str: string): AvmContractInstanceHint;
}
export declare class AvmExecutionHints {
    readonly storageValues: Vector<AvmKeyValueHint>;
    readonly noteHashExists: Vector<AvmKeyValueHint>;
    readonly nullifierExists: Vector<AvmKeyValueHint>;
    readonly l1ToL2MessageExists: Vector<AvmKeyValueHint>;
    readonly externalCalls: Vector<AvmExternalCallHint>;
    readonly contractInstances: Vector<AvmContractInstanceHint>;
    constructor(storageValues: AvmKeyValueHint[], noteHashExists: AvmKeyValueHint[], nullifierExists: AvmKeyValueHint[], l1ToL2MessageExists: AvmKeyValueHint[], externalCalls: AvmExternalCallHint[], contractInstances: AvmContractInstanceHint[]);
    /**
     * Return an empty instance.
     * @returns an empty instance.
     */
    empty(): AvmExecutionHints;
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty(): boolean;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmExecutionHints instance.
     */
    static from(fields: FieldsOf<AvmExecutionHints>): AvmExecutionHints;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<AvmExecutionHints>): readonly [Vector<AvmKeyValueHint>, Vector<AvmKeyValueHint>, Vector<AvmKeyValueHint>, Vector<AvmKeyValueHint>, Vector<AvmExternalCallHint>, Vector<AvmContractInstanceHint>];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff: Buffer | BufferReader): AvmExecutionHints;
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str: string): AvmCircuitInputs;
    /**
     * Construct an empty instance.
     * @returns The empty instance.
     */
    static empty(): AvmExecutionHints;
}
export declare class AvmCircuitInputs {
    readonly functionName: string;
    readonly bytecode: Buffer;
    readonly calldata: Fr[];
    readonly publicInputs: PublicCircuitPublicInputs;
    readonly avmHints: AvmExecutionHints;
    constructor(functionName: string, // only informational
    bytecode: Buffer, calldata: Fr[], publicInputs: PublicCircuitPublicInputs, avmHints: AvmExecutionHints);
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer(): Buffer;
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString(): string;
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty(): boolean;
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmCircuitInputs instance.
     */
    static from(fields: FieldsOf<AvmCircuitInputs>): AvmCircuitInputs;
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields: FieldsOf<AvmCircuitInputs>): readonly [string, Buffer, Fr[], PublicCircuitPublicInputs, AvmExecutionHints];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff: Buffer | BufferReader): AvmCircuitInputs;
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str: string): AvmCircuitInputs;
}
//# sourceMappingURL=avm.d.ts.map