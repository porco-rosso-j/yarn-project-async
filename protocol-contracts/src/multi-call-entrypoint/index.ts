import { type AztecAddress } from '@aztec/circuits.js';

import { type ProtocolContract, getCanonicalProtocolContract } from '../protocol_contract.js';
import { MultiCallEntrypointArtifact } from './artifact.js';

export async function getCanonicalMultiCallEntrypointContract(): Promise<ProtocolContract> {
  return await getCanonicalProtocolContract(MultiCallEntrypointArtifact, 1, []);
}

export async function getCanonicalMultiCallEntrypointAddress(): Promise<AztecAddress> {
  return (await getCanonicalMultiCallEntrypointContract()).address;
}
