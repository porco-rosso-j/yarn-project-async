import { MAX_PACKED_PUBLIC_BYTECODE_SIZE_IN_FIELDS, getContractClassFromArtifact } from '@aztec/circuits.js';
import { type ContractArtifact, bufferAsFields } from '@aztec/foundation/abi';

import { type ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
import { type Wallet } from '../wallet/index.js';
import { getRegistererContract } from './protocol_contracts.js';

/** Sets up a call to register a contract class given its artifact. */
export async function registerContractClass(
  wallet: Wallet,
  artifact: ContractArtifact,
): Promise<ContractFunctionInteraction> {
  const { artifactHash, privateFunctionsRoot, publicBytecodeCommitment, packedBytecode } =
    await getContractClassFromArtifact(artifact);

  console.log('[registerContractClass] artifactHash: ', artifactHash.toString());
  console.log('[registerContractClass] privateFunctionsRoot: ', privateFunctionsRoot.toString());
  console.log('[registerContractClass] publicBytecodeCommitment: ', publicBytecodeCommitment.toString());
  // console.log('[registerContractClass] packedBytecode: ', packedBytecode.toString());
  const encodedBytecode = bufferAsFields(packedBytecode, MAX_PACKED_PUBLIC_BYTECODE_SIZE_IN_FIELDS);
  const registerer = await getRegistererContract(wallet);
  console.log('[registerContractClass] registerer: ', registerer.address.toString());
  await wallet.addCapsule(encodedBytecode);
  return registerer.methods.register(artifactHash, privateFunctionsRoot, publicBytecodeCommitment);
}
