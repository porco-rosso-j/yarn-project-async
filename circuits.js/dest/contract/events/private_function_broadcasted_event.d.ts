import { FunctionSelector } from '@aztec/foundation/abi';
import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, type Tuple } from '@aztec/foundation/serialize';
import { type ExecutablePrivateFunctionWithMembershipProof, type PrivateFunction } from '@aztec/types/contracts';
import { ARTIFACT_FUNCTION_TREE_MAX_HEIGHT, FUNCTION_TREE_HEIGHT } from '../../constants.gen.js';
/** Event emitted from the ContractClassRegisterer. */
export declare class PrivateFunctionBroadcastedEvent {
    readonly contractClassId: Fr;
    readonly artifactMetadataHash: Fr;
    readonly unconstrainedFunctionsArtifactTreeRoot: Fr;
    readonly privateFunctionTreeSiblingPath: Tuple<Fr, typeof FUNCTION_TREE_HEIGHT>;
    readonly privateFunctionTreeLeafIndex: number;
    readonly artifactFunctionTreeSiblingPath: Tuple<Fr, typeof ARTIFACT_FUNCTION_TREE_MAX_HEIGHT>;
    readonly artifactFunctionTreeLeafIndex: number;
    readonly privateFunction: BroadcastedPrivateFunction;
    constructor(contractClassId: Fr, artifactMetadataHash: Fr, unconstrainedFunctionsArtifactTreeRoot: Fr, privateFunctionTreeSiblingPath: Tuple<Fr, typeof FUNCTION_TREE_HEIGHT>, privateFunctionTreeLeafIndex: number, artifactFunctionTreeSiblingPath: Tuple<Fr, typeof ARTIFACT_FUNCTION_TREE_MAX_HEIGHT>, artifactFunctionTreeLeafIndex: number, privateFunction: BroadcastedPrivateFunction);
    static isPrivateFunctionBroadcastedEvent(log: Buffer): boolean;
    static fromLogs(logs: {
        contractAddress: AztecAddress;
        data: Buffer;
    }[], registererContractAddress: AztecAddress): PrivateFunctionBroadcastedEvent[];
    static fromLogData(log: Buffer): PrivateFunctionBroadcastedEvent;
    static fromBuffer(buffer: Buffer | BufferReader): PrivateFunctionBroadcastedEvent;
    toFunctionWithMembershipProof(): ExecutablePrivateFunctionWithMembershipProof;
}
export declare class BroadcastedPrivateFunction implements PrivateFunction {
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    readonly selector: FunctionSelector;
    /** Artifact metadata hash */
    readonly metadataHash: Fr;
    /** Hash of the verification key associated to this private function. */
    readonly vkHash: Fr;
    /** ACIR and Brillig bytecode */
    readonly bytecode: Buffer;
    constructor(
    /** Selector of the function. Calculated as the hash of the method name and parameters. The specification of this is not enforced by the protocol. */
    selector: FunctionSelector, 
    /** Artifact metadata hash */
    metadataHash: Fr, 
    /** Hash of the verification key associated to this private function. */
    vkHash: Fr, 
    /** ACIR and Brillig bytecode */
    bytecode: Buffer);
    static fromBuffer(buffer: Buffer | BufferReader): BroadcastedPrivateFunction;
}
//# sourceMappingURL=private_function_broadcasted_event.d.ts.map