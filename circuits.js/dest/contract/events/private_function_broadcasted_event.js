import { FunctionSelector, bufferFromFields } from '@aztec/foundation/abi';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import chunk from 'lodash.chunk';
import { ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, FUNCTION_TREE_HEIGHT, MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS, REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE, REGISTERER_PRIVATE_FUNCTION_BROADCASTED_ADDITIONAL_FIELDS, REGISTERER_PRIVATE_FUNCTION_BROADCASTED_MAGIC_VALUE, } from '../../constants.gen.js';
/** Event emitted from the ContractClassRegisterer. */
export class PrivateFunctionBroadcastedEvent {
    constructor(contractClassId, artifactMetadataHash, unconstrainedFunctionsArtifactTreeRoot, privateFunctionTreeSiblingPath, privateFunctionTreeLeafIndex, artifactFunctionTreeSiblingPath, artifactFunctionTreeLeafIndex, privateFunction) {
        this.contractClassId = contractClassId;
        this.artifactMetadataHash = artifactMetadataHash;
        this.unconstrainedFunctionsArtifactTreeRoot = unconstrainedFunctionsArtifactTreeRoot;
        this.privateFunctionTreeSiblingPath = privateFunctionTreeSiblingPath;
        this.privateFunctionTreeLeafIndex = privateFunctionTreeLeafIndex;
        this.artifactFunctionTreeSiblingPath = artifactFunctionTreeSiblingPath;
        this.artifactFunctionTreeLeafIndex = artifactFunctionTreeLeafIndex;
        this.privateFunction = privateFunction;
    }
    static isPrivateFunctionBroadcastedEvent(log) {
        return toBigIntBE(log.subarray(0, 32)) == REGISTERER_PRIVATE_FUNCTION_BROADCASTED_MAGIC_VALUE;
    }
    static fromLogs(logs, registererContractAddress) {
        return logs
            .filter(log => PrivateFunctionBroadcastedEvent.isPrivateFunctionBroadcastedEvent(log.data))
            .filter(log => log.contractAddress.equals(registererContractAddress))
            .map(log => this.fromLogData(log.data));
    }
    static fromLogData(log) {
        if (!this.isPrivateFunctionBroadcastedEvent(log)) {
            throw new Error(`Log data for PrivateFunctionBroadcastedEvent is not prefixed with magic value 0x${REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE}`);
        }
        const expectedLength = 32 *
            (MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS +
                REGISTERER_PRIVATE_FUNCTION_BROADCASTED_ADDITIONAL_FIELDS);
        if (log.length !== expectedLength) {
            throw new Error(`Unexpected PrivateFunctionBroadcastedEvent log length: got ${log.length} but expected ${expectedLength}`);
        }
        const reader = new BufferReader(log.subarray(32));
        const event = PrivateFunctionBroadcastedEvent.fromBuffer(reader);
        if (!reader.isEmpty()) {
            throw new Error(`Unexpected data after parsing PrivateFunctionBroadcastedEvent: ${reader.readToEnd().toString('hex')}`);
        }
        return event;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const contractClassId = reader.readObject(Fr);
        const artifactMetadataHash = reader.readObject(Fr);
        const unconstrainedFunctionsArtifactTreeRoot = reader.readObject(Fr);
        const privateFunctionTreeSiblingPath = reader.readArray(FUNCTION_TREE_HEIGHT, Fr);
        const privateFunctionTreeLeafIndex = reader.readObject(Fr).toNumber();
        const artifactFunctionTreeSiblingPath = reader.readArray(ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, Fr);
        const artifactFunctionTreeLeafIndex = reader.readObject(Fr).toNumber();
        const privateFunction = BroadcastedPrivateFunction.fromBuffer(reader);
        return new PrivateFunctionBroadcastedEvent(contractClassId, artifactMetadataHash, unconstrainedFunctionsArtifactTreeRoot, privateFunctionTreeSiblingPath, privateFunctionTreeLeafIndex, artifactFunctionTreeSiblingPath, artifactFunctionTreeLeafIndex, privateFunction);
    }
    toFunctionWithMembershipProof() {
        return {
            ...this.privateFunction,
            bytecode: this.privateFunction.bytecode,
            functionMetadataHash: this.privateFunction.metadataHash,
            artifactMetadataHash: this.artifactMetadataHash,
            unconstrainedFunctionsArtifactTreeRoot: this.unconstrainedFunctionsArtifactTreeRoot,
            privateFunctionTreeSiblingPath: this.privateFunctionTreeSiblingPath,
            privateFunctionTreeLeafIndex: this.privateFunctionTreeLeafIndex,
            artifactTreeSiblingPath: this.artifactFunctionTreeSiblingPath.filter(fr => !fr.isZero()),
            artifactTreeLeafIndex: this.artifactFunctionTreeLeafIndex,
        };
    }
}
export class BroadcastedPrivateFunction {
    constructor(
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    selector, 
    /** Artifact metadata hash */
    metadataHash, 
    /** Hash of the verification key associated to this private function. */
    vkHash, 
    /** ACIR and Brillig bytecode */
    bytecode) {
        this.selector = selector;
        this.metadataHash = metadataHash;
        this.vkHash = vkHash;
        this.bytecode = bytecode;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const selector = FunctionSelector.fromField(reader.readObject(Fr));
        const metadataHash = reader.readObject(Fr);
        const vkHash = reader.readObject(Fr);
        const encodedBytecode = reader.readBytes(MAX_PACKED_BYTECODE_SIZE_PER_PRIVATE_FUNCTION_IN_FIELDS * 32);
        const bytecode = bufferFromFields(chunk(encodedBytecode, Fr.SIZE_IN_BYTES).map(Buffer.from).map(Fr.fromBuffer));
        return new BroadcastedPrivateFunction(selector, metadataHash, vkHash, bytecode);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9mdW5jdGlvbl9icm9hZGNhc3RlZF9ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9ldmVudHMvcHJpdmF0ZV9mdW5jdGlvbl9icm9hZGNhc3RlZF9ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSw2QkFBNkIsQ0FBQztBQUd2RSxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFakMsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyxvQkFBb0IsRUFDcEIsdURBQXVELEVBQ3ZELGdEQUFnRCxFQUNoRCx5REFBeUQsRUFDekQsbURBQW1ELEdBQ3BELE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsc0RBQXNEO0FBQ3RELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDa0IsZUFBbUIsRUFDbkIsb0JBQXdCLEVBQ3hCLHNDQUEwQyxFQUMxQyw4QkFBc0UsRUFDdEUsNEJBQW9DLEVBQ3BDLCtCQUFvRixFQUNwRiw2QkFBcUMsRUFDckMsZUFBMkM7UUFQM0Msb0JBQWUsR0FBZixlQUFlLENBQUk7UUFDbkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFJO1FBQ3hCLDJDQUFzQyxHQUF0QyxzQ0FBc0MsQ0FBSTtRQUMxQyxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQXdDO1FBQ3RFLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBUTtRQUNwQyxvQ0FBK0IsR0FBL0IsK0JBQStCLENBQXFEO1FBQ3BGLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBUTtRQUNyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBNEI7SUFDMUQs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