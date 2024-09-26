import { AztecAddress, CANONICAL_KEY_REGISTRY_ADDRESS } from '@aztec/circuits.js';

import { type ProtocolContract, getCanonicalProtocolContract } from '../protocol_contract.js';
import { KeyRegistryArtifact } from './artifact.js';

/** Returns the canonical deployment of the public key registry. */
export async function getCanonicalKeyRegistry(): Promise<ProtocolContract> {
  const contract = await getCanonicalProtocolContract(KeyRegistryArtifact, 1);

  if (!contract.address.equals(KeyRegistryAddress)) {
    throw new Error(
      `Incorrect address for key registry (got ${contract.address.toString()} but expected ${KeyRegistryAddress.toString()}). Check CANONICAL_KEY_REGISTRY_ADDRESS is set to the correct value in the constants files and run the protocol-contracts package tests.`,
    );
  }
  return contract;
}

export async function getCanonicalKeyRegistryAddress(): Promise<AztecAddress> {
  return (await getCanonicalKeyRegistry()).address;
}

export const KeyRegistryAddress = AztecAddress.fromBigInt(CANONICAL_KEY_REGISTRY_ADDRESS);
