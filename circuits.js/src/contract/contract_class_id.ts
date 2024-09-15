import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { type ContractClass } from '@aztec/types/contracts';

import { GeneratorIndex } from '../constants.gen.js';
import { computePrivateFunctionsRoot } from './private_function.js';

/**
 * Returns the id of a contract class computed as its hash.
 *
 * ```
 * version = 1
 * private_function_leaves = private_functions.map(fn => pedersen([fn.function_selector as Field, fn.vk_hash], GENERATOR__FUNCTION_LEAF))
 * private_functions_root = merkleize(private_function_leaves)
 * bytecode_commitment = calculate_commitment(packed_bytecode)
 * contract_class_id = pedersen([version, artifact_hash, private_functions_root, bytecode_commitment], GENERATOR__CLASS_IDENTIFIER)
 * ```
 * @param contractClass - Contract class.
 * @returns The identifier.
 */
export async function computeContractClassId(contractClass: ContractClass | ContractClassIdPreimage): Promise<Fr> {
  return (await computeContractClassIdWithPreimage(contractClass)).id;
}

/** Computes a contract class id and returns it along with its preimage. */
export async function computeContractClassIdWithPreimage(
  contractClass: ContractClass | ContractClassIdPreimage,
): Promise<ContractClassIdPreimage & { id: Fr; }> {
  const artifactHash = contractClass.artifactHash;
  const privateFunctionsRoot =
    'privateFunctionsRoot' in contractClass
      ? contractClass.privateFunctionsRoot
      :  await computePrivateFunctionsRoot(contractClass.privateFunctions);
  const publicBytecodeCommitment =
    'publicBytecodeCommitment' in contractClass
      ? contractClass.publicBytecodeCommitment
      :  computePublicBytecodeCommitment(contractClass.packedBytecode);
  const id = await pedersenHash(
    [artifactHash, privateFunctionsRoot, publicBytecodeCommitment],
    GeneratorIndex.CONTRACT_LEAF, // TODO(@spalladino): Review all generator indices in this file
  );
  return { id, artifactHash, privateFunctionsRoot, publicBytecodeCommitment };
}

/** Returns the preimage of a contract class id given a contract class. */
export async function computeContractClassIdPreimage(contractClass: ContractClass): Promise<ContractClassIdPreimage> {
  const privateFunctionsRoot = await computePrivateFunctionsRoot(contractClass.privateFunctions);
  const publicBytecodeCommitment = computePublicBytecodeCommitment(contractClass.packedBytecode);
  return { artifactHash: contractClass.artifactHash, privateFunctionsRoot, publicBytecodeCommitment };
}

/** Preimage of a contract class id. */
export type ContractClassIdPreimage = {
  artifactHash: Fr;
  privateFunctionsRoot: Fr;
  publicBytecodeCommitment: Fr;
};

// TODO(#5860): Replace with actual implementation
// Changed to work with canonical contracts that may have non-deterministic noir compiles and we want to keep the address constant
export function computePublicBytecodeCommitment(_bytecode: Buffer) {
  return new Fr(5);
}
