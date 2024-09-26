import { FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { createDebugLogger } from '@aztec/foundation/log';
import { computeRootFromSiblingPath } from '../merkle/index.js';
import { computeArtifactFunctionTree, computeArtifactHash, computeArtifactHashPreimage, computeFunctionArtifactHash, computeFunctionMetadataHash, getArtifactMerkleTreeHasher, } from './artifact_hash.js';
/**
 * Creates a membership proof for an unconstrained function in a contract class, to be verified via `isValidUnconstrainedFunctionMembershipProof`.
 * @param selector - Selector of the function to create the proof for.
 * @param artifact - Artifact of the contract class where the function is defined.
 */
export async function createUnconstrainedFunctionMembershipProof(selector, artifact) {
    const log = createDebugLogger('aztec:circuits:function_membership_proof');
    // Locate function artifact
    const fn = artifact.functions.find(fn => selector.equals(fn));
    if (!fn) {
        throw new Error(`Function with selector ${selector.toString()} not found`);
    }
    else if (fn.functionType !== FunctionType.UNCONSTRAINED) {
        throw new Error(`Function ${fn.name} with selector ${selector.toString()} is not unconstrained`);
    }
    // Compute preimage for the artifact hash
    const { privateFunctionRoot: privateFunctionsArtifactTreeRoot, metadataHash: artifactMetadataHash } = await computeArtifactHashPreimage(artifact);
    // Compute the sibling path for the "artifact tree"
    const functionMetadataHash = computeFunctionMetadataHash(fn);
    const functionArtifactHash = computeFunctionArtifactHash({ ...fn, functionMetadataHash });
    const artifactTree = (await computeArtifactFunctionTree(artifact, FunctionType.UNCONSTRAINED));
    const artifactTreeLeafIndex = artifactTree.getIndex(functionArtifactHash.toBuffer());
    const artifactTreeSiblingPath = artifactTree.getSiblingPath(artifactTreeLeafIndex).map(Fr.fromBuffer);
    log.debug(`Computed proof for unconstrained function with selector ${selector.toString()}`, {
        functionArtifactHash,
        functionMetadataHash,
        artifactMetadataHash,
        artifactFunctionTreeSiblingPath: artifactTreeSiblingPath.map(fr => fr.toString()).join(','),
        privateFunctionsArtifactTreeRoot,
    });
    return {
        artifactTreeSiblingPath,
        artifactTreeLeafIndex,
        artifactMetadataHash,
        functionMetadataHash,
        privateFunctionsArtifactTreeRoot,
    };
}
/**
 * Verifies that an unconstrained function with a membership proof as emitted by the ClassRegisterer contract is valid,
 * as defined in the protocol specs at contract-deployment/classes:
 *
 * ```
 * // Load contract class from local db
 * contract_class = db.get_contract_class(contract_class_id)
 *
 * // Compute artifact leaf and assert it belongs to the artifact
 * artifact_function_leaf = sha256(selector, metadata_hash, sha256(bytecode))
 * computed_artifact_unconstrained_function_tree_root = compute_root(artifact_function_leaf, artifact_function_tree_sibling_path, artifact_function_tree_leaf_index)
 * computed_artifact_hash = sha256(private_functions_artifact_tree_root, computed_artifact_unconstrained_function_tree_root, artifact_metadata_hash)
 * assert computed_artifact_hash == contract_class.artifact_hash
 * ```
 * @param fn - Function to check membership proof for.
 * @param contractClass - In which contract class the function is expected to be.
 */
export async function isValidUnconstrainedFunctionMembershipProof(fn, contractClass) {
    const log = createDebugLogger('aztec:circuits:function_membership_proof');
    const functionArtifactHash = computeFunctionArtifactHash(fn);
    const computedArtifactFunctionTreeRoot = Fr.fromBuffer(await computeRootFromSiblingPath(functionArtifactHash.toBuffer(), fn.artifactTreeSiblingPath.map(fr => fr.toBuffer()), fn.artifactTreeLeafIndex, getArtifactMerkleTreeHasher()));
    const computedArtifactHash = await computeArtifactHash({
        privateFunctionRoot: fn.privateFunctionsArtifactTreeRoot,
        unconstrainedFunctionRoot: computedArtifactFunctionTreeRoot,
        metadataHash: fn.artifactMetadataHash,
    });
    if (!contractClass.artifactHash.equals(computedArtifactHash)) {
        log.debug(`Artifact hash mismatch`, {
            expected: contractClass.artifactHash,
            computedArtifactHash,
            computedFunctionArtifactHash: functionArtifactHash,
            computedArtifactFunctionTreeRoot,
            privateFunctionsArtifactTreeRoot: fn.privateFunctionsArtifactTreeRoot,
            metadataHash: fn.artifactMetadataHash,
            artifactFunctionTreeSiblingPath: fn.artifactTreeSiblingPath.map(fr => fr.toString()).join(','),
        });
        return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5jb25zdHJhaW5lZF9mdW5jdGlvbl9tZW1iZXJzaGlwX3Byb29mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0L3VuY29uc3RyYWluZWRfZnVuY3Rpb25fbWVtYmVyc2hpcF9wcm9vZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdELFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25HLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU8xRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG1CQUFtQixFQUNuQiwyQkFBMkIsRUFDM0IsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQiwyQkFBMkIsR0FDNUIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSwwQ0FBMEMsQ0FDOUQsUUFBMEIsRUFDMUIsUUFBMEI7SUFFMUIsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUUxRSwyQkFBMkI7SUFDM0IsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1IsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RSxDQUFDO1NBQU0sSUFBSSxFQUFFLENBQUMsWUFBWSxLQUFLLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxRCxNQUFNLElBQUksS0FBSyxDQUFD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