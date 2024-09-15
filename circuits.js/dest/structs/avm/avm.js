import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { Gas } from '../gas.js';
import { PublicCircuitPublicInputs } from '../public_circuit_public_inputs.js';
import { Vector } from '../shared.js';
// TODO: Consider just using Tuple.
export class AvmKeyValueHint {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...AvmKeyValueHint.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty() {
        return this.key.isEmpty() && this.value.isEmpty();
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields) {
        return new AvmKeyValueHint(...AvmKeyValueHint.getFields(fields));
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [fields.key, fields.value];
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff) {
        const reader = BufferReader.asReader(buff);
        return new AvmKeyValueHint(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str) {
        return AvmKeyValueHint.fromBuffer(Buffer.from(str, 'hex'));
    }
}
export class AvmExternalCallHint {
    /**
     * Creates a new instance.
     * @param success whether the external call was successful (= did NOT revert).
     * @param returnData the data returned by the external call.
     * @param gasUsed gas used by the external call (not including the cost of the CALL opcode itself).
     * @param endSideEffectCounter value of side effect counter at the end of the external call.
     */
    constructor(success, returnData, gasUsed, endSideEffectCounter) {
        this.success = success;
        this.gasUsed = gasUsed;
        this.endSideEffectCounter = endSideEffectCounter;
        this.returnData = new Vector(returnData);
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...AvmExternalCallHint.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty() {
        return (this.success.isZero() &&
            this.returnData.items.length == 0 &&
            this.gasUsed.isEmpty() &&
            this.endSideEffectCounter.isZero());
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields) {
        return new AvmExternalCallHint(fields.success, fields.returnData.items, fields.gasUsed, fields.endSideEffectCounter);
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [fields.success, fields.returnData, fields.gasUsed, fields.endSideEffectCounter];
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff) {
        const reader = BufferReader.asReader(buff);
        return new AvmExternalCallHint(Fr.fromBuffer(reader), reader.readVector(Fr), reader.readObject(Gas), Fr.fromBuffer(reader));
    }
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str) {
        return AvmExternalCallHint.fromBuffer(Buffer.from(str, 'hex'));
    }
}
export class AvmContractInstanceHint {
    constructor(address, exists, salt, deployer, contractClassId, initializationHash, publicKeysHash) {
        this.address = address;
        this.exists = exists;
        this.salt = salt;
        this.deployer = deployer;
        this.contractClassId = contractClassId;
        this.initializationHash = initializationHash;
        this.publicKeysHash = publicKeysHash;
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...AvmContractInstanceHint.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty() {
        return (this.address.isZero() &&
            this.exists.isZero() &&
            this.salt.isZero() &&
            this.deployer.isZero() &&
            this.contractClassId.isZero() &&
            this.initializationHash.isZero() &&
            this.publicKeysHash.isZero());
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmHint instance.
     */
    static from(fields) {
        return new AvmContractInstanceHint(...AvmContractInstanceHint.getFields(fields));
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [
            fields.address,
            fields.exists,
            fields.salt,
            fields.deployer,
            fields.contractClassId,
            fields.initializationHash,
            fields.publicKeysHash,
        ];
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff) {
        const reader = BufferReader.asReader(buff);
        return new AvmContractInstanceHint(Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str) {
        return AvmContractInstanceHint.fromBuffer(Buffer.from(str, 'hex'));
    }
}
// TODO(dbanks12): rename AvmCircuitHints
export class AvmExecutionHints {
    constructor(storageValues, noteHashExists, nullifierExists, l1ToL2MessageExists, externalCalls, contractInstances) {
        this.storageValues = new Vector(storageValues);
        this.noteHashExists = new Vector(noteHashExists);
        this.nullifierExists = new Vector(nullifierExists);
        this.l1ToL2MessageExists = new Vector(l1ToL2MessageExists);
        this.externalCalls = new Vector(externalCalls);
        this.contractInstances = new Vector(contractInstances);
    }
    /**
     * Return an empty instance.
     * @returns an empty instance.
     */
    empty() {
        return new AvmExecutionHints([], [], [], [], [], []);
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...AvmExecutionHints.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty() {
        return (this.storageValues.items.length == 0 &&
            this.noteHashExists.items.length == 0 &&
            this.nullifierExists.items.length == 0 &&
            this.l1ToL2MessageExists.items.length == 0 &&
            this.externalCalls.items.length == 0 &&
            this.contractInstances.items.length == 0);
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmExecutionHints instance.
     */
    static from(fields) {
        return new AvmExecutionHints(fields.storageValues.items, fields.noteHashExists.items, fields.nullifierExists.items, fields.l1ToL2MessageExists.items, fields.externalCalls.items, fields.contractInstances.items);
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [
            fields.storageValues,
            fields.noteHashExists,
            fields.nullifierExists,
            fields.l1ToL2MessageExists,
            fields.externalCalls,
            fields.contractInstances,
        ];
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff) {
        const reader = BufferReader.asReader(buff);
        return new AvmExecutionHints(reader.readVector(AvmKeyValueHint), reader.readVector(AvmKeyValueHint), reader.readVector(AvmKeyValueHint), reader.readVector(AvmKeyValueHint), reader.readVector(AvmExternalCallHint), reader.readVector(AvmContractInstanceHint));
    }
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str) {
        return AvmCircuitInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
    /**
     * Construct an empty instance.
     * @returns The empty instance.
     */
    static empty() {
        return new AvmExecutionHints([], [], [], [], [], []);
    }
}
export class AvmCircuitInputs {
    constructor(functionName, // only informational
    bytecode, calldata, publicInputs, avmHints) {
        this.functionName = functionName;
        this.bytecode = bytecode;
        this.calldata = calldata;
        this.publicInputs = publicInputs;
        this.avmHints = avmHints;
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        const functionNameBuffer = Buffer.from(this.functionName);
        return serializeToBuffer(functionNameBuffer.length, functionNameBuffer, this.bytecode.length, this.bytecode, this.calldata.length, this.calldata, this.publicInputs.toBuffer(), this.avmHints.toBuffer());
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Is the struct empty?
     * @returns whether all members are empty.
     */
    isEmpty() {
        return (this.functionName.length == 0 &&
            this.bytecode.length == 0 &&
            this.calldata.length == 0 &&
            this.publicInputs.isEmpty() &&
            this.avmHints.isEmpty());
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new AvmCircuitInputs instance.
     */
    static from(fields) {
        return new AvmCircuitInputs(...AvmCircuitInputs.getFields(fields));
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [fields.functionName, fields.bytecode, fields.calldata, fields.publicInputs, fields.avmHints];
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buff) {
        const reader = BufferReader.asReader(buff);
        return new AvmCircuitInputs(
        /*functionName=*/ reader.readBuffer().toString(), 
        /*bytecode=*/ reader.readBuffer(), 
        /*calldata=*/ reader.readVector(Fr), PublicCircuitPublicInputs.fromBuffer(reader), AvmExecutionHints.fromBuffer(reader));
    }
    /**
     * Deserializes from a hex string.
     * @param str - Hex string to read from.
     * @returns The deserialized instance.
     */
    static fromString(str) {
        return AvmCircuitInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMvYXZtL2F2bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzlFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV0QyxtQ0FBbUM7QUFDbkMsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBNEIsR0FBTyxFQUFrQixLQUFTO1FBQWxDLFFBQUcsR0FBSCxHQUFHLENBQUk7UUFBa0IsVUFBSyxHQUFMLEtBQUssQ0FBSTtJQUFHLENBQUM7SUFFbEU7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBaUM7UUFDM0MsT0FBTyxJQUFJLGVBQWUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7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