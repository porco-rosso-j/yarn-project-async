import { FunctionSelector } from '@aztec/foundation/abi';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type UnconstrainedFunction, type UnconstrainedFunctionWithMembershipProof } from '@aztec/types/contracts';
import { ARTIFACT_FUNCTION_TREE_MAX_HEIGHT } from '../../constants.gen.js';
/** Event emitted from the ContractClassRegisterer. */
export declare class UnconstrainedFunctionBroadcastedEvent {
    readonly contractClassId: Fr;
    readonly artifactMetadataHash: Fr;
    readonly privateFunctionsArtifactTreeRoot: Fr;
    readonly artifactFunctionTreeSiblingPath: Tuple<Fr, typeof ARTIFACT_FUNCTION_TREE_MAX_HEIGHT>;
    readonly artifactFunctionTreeLeafIndex: number;
    readonly unconstrainedFunction: BroadcastedUnconstrainedFunction;
    constructor(contractClassId: Fr, artifactMetadataHash: Fr, privateFunctionsArtifactTreeRoot: Fr, artifactFunctionTreeSiblingPath: Tuple<Fr, typeof ARTIFACT_FUNCTION_TREE_MAX_HEIGHT>, artifactFunctionTreeLeafIndex: number, unconstrainedFunction: BroadcastedUnconstrainedFunction);
    static isUnconstrainedFunctionBroadcastedEvent(log: Buffer): boolean;
    static fromLogs(logs: {
        contractAddress: AztecAddress;
        data: Buffer;
    }[], registererContractAddress: AztecAddress): UnconstrainedFunctionBroadcastedEvent[];
    static fromLogData(log: Buffer): UnconstrainedFunctionBroadcastedEvent;
    static fromBuffer(buffer: Buffer | BufferReader): UnconstrainedFunctionBroadcastedEvent;
    toFunctionWithMembershipProof(): UnconstrainedFunctionWithMembershipProof;
}
export declare class BroadcastedUnconstrainedFunction implements UnconstrainedFunction {
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    readonly selector: FunctionSelector;
    /** Artifact metadata hash */
    readonly metadataHash: Fr;
    /** Brillig bytecode */
    readonly bytecode: Buffer;
    constructor(
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    selector: FunctionSelector, 
    /** Artifact metadata hash */
    metadataHash: Fr, 
    /** Brillig bytecode */
    bytecode: Buffer);
    static fromBuffer(buffer: Buffer | BufferReader): BroadcastedUnconstrainedFunction;
}
//# sourceMappingURL=unconstrained_function_broadcasted_event.d.ts.map