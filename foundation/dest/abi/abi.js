import { inflate } from 'pako';
/**
 * Aztec.nr function types.
 */
export var FunctionType;
(function (FunctionType) {
    FunctionType["PRIVATE"] = "private";
    FunctionType["PUBLIC"] = "public";
    FunctionType["UNCONSTRAINED"] = "unconstrained";
})(FunctionType || (FunctionType = {}));
/**
 * Gets a function artifact including debug metadata given its name or selector.
 */
export function getFunctionArtifact(artifact, functionNameOrSelector) {
    const functionArtifact = artifact.functions.find(f => typeof functionNameOrSelector === 'string'
        ? f.name === functionNameOrSelector
        : functionNameOrSelector.equals(f.name, f.parameters));
    if (!functionArtifact) {
        throw new Error(`Unknown function ${functionNameOrSelector}`);
    }
    const debugMetadata = getFunctionDebugMetadata(artifact, functionArtifact);
    return { ...functionArtifact, debug: debugMetadata };
}
/**
 * Gets the debug metadata of a given function from the contract artifact
 * @param artifact - The contract build artifact
 * @param functionName - The name of the function
 * @returns The debug metadata of the function
 */
export function getFunctionDebugMetadata(contractArtifact, functionArtifact) {
    if (functionArtifact.debugSymbols && contractArtifact.fileMap) {
        const programDebugSymbols = JSON.parse(inflate(Buffer.from(functionArtifact.debugSymbols, 'base64'), { to: 'string', raw: true }));
        // TODO(https://github.com/AztecProtocol/aztec-packages/issues/5813)
        // We only support handling debug info for the contract function entry point.
        // So for now we simply index into the first debug info.
        return { debugSymbols: programDebugSymbols.debug_infos[0], files: contractArtifact.fileMap };
    }
    return undefined;
}
/**
 * Returns an initializer from the contract, assuming there is at least one. If there are multiple initializers,
 * it returns the one named "constructor" or "initializer"; if there is none with that name, it returns the first
 * initializer it finds, prioritizing initializers with no arguments and then private ones.
 * @param contractArtifact - The contract artifact.
 * @returns An initializer function, or none if there are no functions flagged as initializers in the contract.
 */
export function getDefaultInitializer(contractArtifact) {
    const initializers = contractArtifact.functions.filter(f => f.isInitializer);
    return initializers.length > 1
        ? initializers.find(f => f.name === 'constructor') ??
            initializers.find(f => f.name === 'initializer') ??
            initializers.find(f => f.parameters?.length === 0) ??
            initializers.find(f => f.functionType === FunctionType.PRIVATE) ??
            initializers[0]
        : initializers[0];
}
/**
 * Returns an initializer from the contract.
 * @param initializerNameOrArtifact - The name of the constructor, or the artifact of the constructor, or undefined
 * to pick the default initializer.
 */
export function getInitializer(contract, initializerNameOrArtifact) {
    if (typeof initializerNameOrArtifact === 'string') {
        const found = contract.functions.find(f => f.name === initializerNameOrArtifact);
        if (!found) {
            throw new Error(`Constructor method ${initializerNameOrArtifact} not found in contract artifact`);
        }
        else if (!found.isInitializer) {
            throw new Error(`Method ${initializerNameOrArtifact} is not an initializer`);
        }
        return found;
    }
    else if (initializerNameOrArtifact === undefined) {
        return getDefaultInitializer(contract);
    }
    else {
        if (!initializerNameOrArtifact.isInitializer) {
            throw new Error(`Method ${initializerNameOrArtifact.name} is not an initializer`);
        }
        return initializerNameOrArtifact;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FiaS9hYmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQThJL0I7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLCtDQUErQixDQUFBO0FBQ2pDLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQXVNRDs7R0FFRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsUUFBMEIsRUFDMUIsc0JBQWlEO0lBRWpELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDbkQsT0FBTyxzQkFBc0IsS0FBSyxRQUFRO1FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHNCQUFzQjtRQUNuQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUN4RCxDQUFDO0lBQ0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0Isc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRSxPQUFPLEVBQUUsR0FBRyxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFDdkQsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHdCQUF3QixDQUN0QyxnQkFBa0MsRUFDbEMsZ0JBQWtDO0lBRWxDLElBQUksZ0JBQWdCLENBQUMsWUFBWSxJQUFJLGdCQUFn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