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
export async function computeArtifactHash(artifact) {
    if ('privateFunctionRoot' in artifact && 'unconstrainedFunctionRoot' in artifact && 'metadataHash' in artifact) {
        const { privateFunctionRoot, unconstrainedFunctionRoot, metadataHash } = artifact;
        const preimage = [privateFunctionRoot, unconstrainedFunctionRoot, metadataHash].map(x => x.toBuffer());
        return sha256Fr(Buffer.concat([numToUInt8(VERSION), ...preimage]));
    }
    const preimage = await computeArtifactHashPreimage(artifact);
    const artifactHash = await computeArtifactHash(await computeArtifactHashPreimage(artifact));
    getLogger().debug('Computed artifact hash', { artifactHash, ...preimage });
    return artifactHash;
}
export async function computeArtifactHashPreimage(artifact) {
    const privateFunctionRoot = await computeArtifactFunctionTreeRoot(artifact, FunctionType.PRIVATE);
    const unconstrainedFunctionRoot = await computeArtifactFunctionTreeRoot(artifact, FunctionType.UNCONSTRAINED);
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
export async function computeArtifactFunctionTreeRoot(artifact, fnType) {
    const root = (await computeArtifactFunctionTree(artifact, fnType))?.root;
    return root ? Fr.fromBuffer(root) : Fr.ZERO;
}
export async function computeArtifactFunctionTree(artifact, fnType) {
    const leaves = computeFunctionLeaves(artifact, fnType);
    // TODO(@spalladino) Consider implementing a null-object for empty trees
    if (leaves.length === 0) {
        return undefined;
    }
    const height = Math.ceil(Math.log2(leaves.length));
    // const calculator = new MerkleTreeCalculator(height, Buffer.alloc(32), getArtifactMerkleTreeHasher());
    const calculator = new MerkleTreeCalculator(height);
    await calculator.setHasher(Buffer.alloc(32), getArtifactMerkleTreeHasher());
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
// export function getArtifactMerkleTreeHasher() {
//   return (l: Buffer, r: Buffer) => sha256Fr(Buffer.concat([l, r])).toBuffer();
// }
export function getArtifactMerkleTreeHasher() {
    return async (l, r) => {
        return sha256Fr(Buffer.concat([l, r])).toBuffer();
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWZhY3RfaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9hcnRpZmFjdF9oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0QsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVsQiw0R0FBNEc7QUFDNUcsb0lBQW9JO0FBQ3BJLCtHQUErRztBQUMvRyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLG1CQUFtQixDQUN2QyxRQUF5RztJQUV6RyxJQUFJLHFCQUFxQixJQUFJLFFBQVEsSUFBSSwyQkFBMkIsSUFBSSxRQUFRLElBQUksY0FBYyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQy9HLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxZQUFZLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFDbEYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RyxPQUFPLFFBQVEs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