import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { sha256 } from '@aztec/foundation/crypto';
import { Fr, reduceFn } from '@aztec/foundation/fields';
import { createDebugLogger } from '@aztec/foundation/log';
import { numToUInt8 } from '@aztec/foundation/serialize';
import { MerkleTreeCalculator } from '../merkle/merkle_tree_calculator.js';
const VERSION = 1;
// TODO(miranda): Artifact and artifact metadata hashes are currently the only SHAs not truncated by a byte.
// They are never recalculated in the circuit or L1 contract, but they are input to circuits, so perhaps modding here is preferable?
// TODO(@spalladino) Reducing sha256 to a field may have security implications. Validate this with crypto team.
const sha256Fr = reduceFn(sha256, Fr);
/**
 * Returns the artifact hash of a given compiled contract artifact.
 *
 * ```
 * private_functions_artifact_leaves = artifact.private_functions.map fn =>
 *   sha256(fn.selector, fn.metadata_hash, sha256(fn.bytecode))
 * private_functions_artifact_tree_root = merkleize(private_functions_artifact_leaves)
 *
 * unconstrained_functions_artifact_leaves = artifact.unconstrained_functions.map fn =>
 *   sha256(fn.selector, fn.metadata_hash, sha256(fn.bytecode))
 * unconstrained_functions_artifact_tree_root = merkleize(unconstrained_functions_artifact_leaves)
 *
 * version = 1
 * artifact_hash = sha256(
 *   version,
 *   private_functions_artifact_tree_root,
 *   unconstrained_functions_artifact_tree_root,
 *   artifact_metadata,
 * )
 * ```
 * @param artifact - Artifact to calculate the hash for.
 */
export function computeArtifactHash(artifact) {
    if ('privateFunctionRoot' in artifact && 'unconstrainedFunctionRoot' in artifact && 'metadataHash' in artifact) {
        const { privateFunctionRoot, unconstrainedFunctionRoot, metadataHash } = artifact;
        const preimage = [privateFunctionRoot, unconstrainedFunctionRoot, metadataHash].map(x => x.toBuffer());
        return sha256Fr(Buffer.concat([numToUInt8(VERSION), ...preimage]));
    }
    const preimage = computeArtifactHashPreimage(artifact);
    const artifactHash = computeArtifactHash(computeArtifactHashPreimage(artifact));
    getLogger().debug('Computed artifact hash', { artifactHash, ...preimage });
    return artifactHash;
}
export function computeArtifactHashPreimage(artifact) {
    const privateFunctionRoot = computeArtifactFunctionTreeRoot(artifact, FunctionType.PRIVATE);
    const unconstrainedFunctionRoot = computeArtifactFunctionTreeRoot(artifact, FunctionType.UNCONSTRAINED);
    const metadataHash = computeArtifactMetadataHash(artifact);
    return { privateFunctionRoot, unconstrainedFunctionRoot, metadataHash };
}
export function computeArtifactMetadataHash(artifact) {
    // TODO: #6021 We need to make sure the artifact is deterministic from any specific compiler run. This relates to selectors not being sorted and being
    // apparently random in the order they appear after compiled w/ nargo. We can try to sort this upon loading an artifact.
    // TODO: #6021: Should we use the sorted event selectors instead? They'd need to be unique for that.
    // Response - The output selectors need to be sorted, because if not noir makes no guarantees on the order of outputs for some reason
    const metadata = { name: artifact.name, outputs: artifact.outputs };
    const exceptions = [
        'AuthRegistry',
        'KeyRegistry',
        'GasToken',
        'ContractInstanceDeployer',
        'ContractClassRegisterer',
    ];
    // This is a temporary workaround for the canonical contracts to have deterministic deployments.
    if (exceptions.includes(artifact.name)) {
        return sha256Fr(Buffer.from(JSON.stringify({ name: artifact.name }), 'utf-8'));
    }
    return sha256Fr(Buffer.from(JSON.stringify(metadata), 'utf-8'));
}
export function computeArtifactFunctionTreeRoot(artifact, fnType) {
    const root = computeArtifactFunctionTree(artifact, fnType)?.root;
    return root ? Fr.fromBuffer(root) : Fr.ZERO;
}
export function computeArtifactFunctionTree(artifact, fnType) {
    const leaves = computeFunctionLeaves(artifact, fnType);
    // TODO(@spalladino) Consider implementing a null-object for empty trees
    if (leaves.length === 0) {
        return undefined;
    }
    const height = Math.ceil(Math.log2(leaves.length));
    const calculator = new MerkleTreeCalculator(height, Buffer.alloc(32), getArtifactMerkleTreeHasher());
    return calculator.computeTree(leaves.map(x => x.toBuffer()));
}
function computeFunctionLeaves(artifact, fnType) {
    return artifact.functions
        .filter(f => f.functionType === fnType)
        .map(f => ({ ...f, selector: FunctionSelector.fromNameAndParameters(f.name, f.parameters) }))
        .sort((a, b) => a.selector.value - b.selector.value)
        .map(computeFunctionArtifactHash);
}
export function computeFunctionArtifactHash(fn) {
    const selector = 'selector' in fn ? fn.selector : FunctionSelector.fromNameAndParameters(fn);
    // TODO(#5860): make bytecode part of artifact hash preimage again
    // const bytecodeHash = sha256Fr(fn.bytecode).toBuffer();
    // const metadataHash = 'functionMetadataHash' in fn ? fn.functionMetadataHash : computeFunctionMetadataHash(fn);
    // return sha256Fr(Buffer.concat([numToUInt8(VERSION), selector.toBuffer(), metadataHash.toBuffer(), bytecodeHash]));
    return sha256Fr(Buffer.concat([numToUInt8(VERSION), selector.toBuffer()]));
}
export function computeFunctionMetadataHash(fn) {
    return sha256Fr(Buffer.from(JSON.stringify(fn.returnTypes), 'utf8'));
}
function getLogger() {
    return createDebugLogger('aztec:circuits:artifact_hash');
}
export function getArtifactMerkleTreeHasher() {
    return (l, r) => sha256Fr(Buffer.concat([l, r])).toBuffer();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWZhY3RfaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9hcnRpZmFjdF9oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0QsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVsQiw0R0FBNEc7QUFDNUcsb0lBQW9JO0FBQ3BJLCtHQUErRztBQUMvRyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQXlHO0lBRXpHLElBQUkscUJBQXFCLElBQUksUUFBUSxJQUFJLDJCQUEyQixJQUFJLFFBQVEsSUFBSSxjQUFjLElBQUksUUFBUSxFQUFFLENBQUM7UUFDL0csTUFBTSxFQUFFLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUNsRixNQUFNLFFBQVEsR0FBRyxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLE9BQU8sUUFBUSxDQUFDLE1BQU0s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