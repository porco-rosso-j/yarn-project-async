import { type ContractArtifact } from '@aztec/foundation/abi';
/**
 * Validates the given ContractArtifact object by checking its functions and their parameters.
 * Ensures that the ABI has at least one function, a constructor, valid bytecode, and correct parameter types.
 * Throws an error if any inconsistency is detected during the validation process.
 *
 * @param artifact - The ContractArtifact object to be validated.
 * @returns A boolean value indicating whether the artifact is valid or not.
 */
export declare function abiChecker(artifact: ContractArtifact): boolean;
//# sourceMappingURL=checker.d.ts.map