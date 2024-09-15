import { FunctionSelector, bufferFromFields } from '@aztec/foundation/abi';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { removeArrayPaddingEnd } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import chunk from 'lodash.chunk';
import { ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, MAX_PACKED_BYTECODE_SIZE_PER_UNCONSTRAINED_FUNCTION_IN_FIELDS, REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE, REGISTERER_UNCONSTRAINED_FUNCTION_BROADCASTED_ADDITIONAL_FIELDS, REGISTERER_UNCONSTRAINED_FUNCTION_BROADCASTED_MAGIC_VALUE, } from '../../constants.gen.js';
/** Event emitted from the ContractClassRegisterer. */
export class UnconstrainedFunctionBroadcastedEvent {
    constructor(contractClassId, artifactMetadataHash, privateFunctionsArtifactTreeRoot, artifactFunctionTreeSiblingPath, artifactFunctionTreeLeafIndex, unconstrainedFunction) {
        this.contractClassId = contractClassId;
        this.artifactMetadataHash = artifactMetadataHash;
        this.privateFunctionsArtifactTreeRoot = privateFunctionsArtifactTreeRoot;
        this.artifactFunctionTreeSiblingPath = artifactFunctionTreeSiblingPath;
        this.artifactFunctionTreeLeafIndex = artifactFunctionTreeLeafIndex;
        this.unconstrainedFunction = unconstrainedFunction;
    }
    static isUnconstrainedFunctionBroadcastedEvent(log) {
        return toBigIntBE(log.subarray(0, 32)) == REGISTERER_UNCONSTRAINED_FUNCTION_BROADCASTED_MAGIC_VALUE;
    }
    static fromLogs(logs, registererContractAddress) {
        return logs
            .filter(log => UnconstrainedFunctionBroadcastedEvent.isUnconstrainedFunctionBroadcastedEvent(log.data))
            .filter(log => log.contractAddress.equals(registererContractAddress))
            .map(log => this.fromLogData(log.data));
    }
    static fromLogData(log) {
        if (!this.isUnconstrainedFunctionBroadcastedEvent(log)) {
            throw new Error(`Log data for UnconstrainedFunctionBroadcastedEvent is not prefixed with magic value 0x${REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE}`);
        }
        const expectedLength = 32 *
            (MAX_PACKED_BYTECODE_SIZE_PER_UNCONSTRAINED_FUNCTION_IN_FIELDS +
                REGISTERER_UNCONSTRAINED_FUNCTION_BROADCASTED_ADDITIONAL_FIELDS);
        if (log.length !== expectedLength) {
            throw new Error(`Unexpected UnconstrainedFunctionBroadcastedEvent log length: got ${log.length} but expected ${expectedLength}`);
        }
        const reader = new BufferReader(log.subarray(32));
        const event = UnconstrainedFunctionBroadcastedEvent.fromBuffer(reader);
        if (!reader.isEmpty()) {
            throw new Error(`Unexpected data after parsing UnconstrainedFunctionBroadcastedEvent: ${reader.readToEnd().toString('hex')}`);
        }
        return event;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const contractClassId = reader.readObject(Fr);
        const artifactMetadataHash = reader.readObject(Fr);
        const privateFunctionsArtifactTreeRoot = reader.readObject(Fr);
        const artifactFunctionTreeSiblingPath = reader.readArray(ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, Fr);
        const artifactFunctionTreeLeafIndex = reader.readObject(Fr).toNumber();
        const unconstrainedFunction = BroadcastedUnconstrainedFunction.fromBuffer(reader);
        return new UnconstrainedFunctionBroadcastedEvent(contractClassId, artifactMetadataHash, privateFunctionsArtifactTreeRoot, artifactFunctionTreeSiblingPath, artifactFunctionTreeLeafIndex, unconstrainedFunction);
    }
    toFunctionWithMembershipProof() {
        // We should be able to safely remove the zero elements that pad the variable-length sibling path,
        // since a sibling with value zero can only occur on the tree leaves, so the sibling path will never end
        // in a zero. The only exception is a tree with depth 2 with one non-zero leaf, where the sibling path would
        // be a single zero element, but in that case the artifact tree should be just the single leaf.
        const artifactTreeSiblingPath = removeArrayPaddingEnd(this.artifactFunctionTreeSiblingPath, Fr.isZero);
        return {
            ...this.unconstrainedFunction,
            bytecode: this.unconstrainedFunction.bytecode,
            functionMetadataHash: this.unconstrainedFunction.metadataHash,
            artifactMetadataHash: this.artifactMetadataHash,
            privateFunctionsArtifactTreeRoot: this.privateFunctionsArtifactTreeRoot,
            artifactTreeSiblingPath,
            artifactTreeLeafIndex: this.artifactFunctionTreeLeafIndex,
        };
    }
}
export class BroadcastedUnconstrainedFunction {
    constructor(
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    selector, 
    /** Artifact metadata hash */
    metadataHash, 
    /** Brillig bytecode */
    bytecode) {
        this.selector = selector;
        this.metadataHash = metadataHash;
        this.bytecode = bytecode;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const selector = FunctionSelector.fromField(reader.readObject(Fr));
        const metadataHash = reader.readObject(Fr);
        const encodedBytecode = reader.readBytes(MAX_PACKED_BYTECODE_SIZE_PER_UNCONSTRAINED_FUNCTION_IN_FIELDS * 32);
        const bytecode = bufferFromFields(chunk(encodedBytecode, Fr.SIZE_IN_BYTES).map(Buffer.from).map(Fr.fromBuffer));
        return new BroadcastedUnconstrainedFunction(selector, metadataHash, bytecode);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5jb25zdHJhaW5lZF9mdW5jdGlvbl9icm9hZGNhc3RlZF9ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9ldmVudHMvdW5jb25zdHJhaW5lZF9mdW5jdGlvbl9icm9hZGNhc3RlZF9ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsTUFBTSw2QkFBNkIsQ0FBQztBQUd2RSxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFakMsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyw2REFBNkQsRUFDN0QsZ0RBQWdELEVBQ2hELCtEQUErRCxFQUMvRCx5REFBeUQsR0FDMUQsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxzREFBc0Q7QUFDdEQsTUFBTSxPQUFPLHFDQUFxQztJQUNoRCxZQUNrQixlQUFtQixFQUNuQixvQkFBd0IsRUFDeEIsZ0NBQW9DLEVBQ3BDLCtCQUFvRixFQUNwRiw2QkFBcUMsRUFDckMscUJBQXVEO1FBTHZELG9CQUFlLEdBQWYsZUFBZSxDQUFJO1FBQ25CLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBSTtRQUN4QixxQ0FBZ0MsR0FBaEMsZ0NBQWdDLENBQUk7UUFDcEMsb0NBQStCLEdBQS9CLCtCQUErQixDQUFxRDtRQUNwRixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQVE7UUFDckMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFrQztJQUN0RSxDQUFDO0lBRUosTUFBTSxDQUFDLHVDQUF1QyxDQUFDLEdBQVc7UUFD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