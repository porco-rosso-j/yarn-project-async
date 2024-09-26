import { type AztecAddress, type ContractClassIdPreimage } from '@aztec/circuits.js';
import { type ContractArtifact } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { type ContractClassWithId, type ContractInstanceWithAddress } from '@aztec/types/contracts';
/** Represents a canonical contract in the protocol. */
export interface ProtocolContract {
    /** Canonical deployed instance. */
    instance: ContractInstanceWithAddress;
    /** Contract class of this contract. */
    contractClass: ContractClassWithId & ContractClassIdPreimage;
    /** Complete contract artifact. */
    artifact: ContractArtifact;
    /** Deployment address for the canonical instance.  */
    address: AztecAddress;
}
/** Returns the canonical deployment a given artifact. */
export declare function getCanonicalProtocolContract(artifact: ContractArtifact, salt: Fr | number | bigint, constructorArgs?: any[]): Promise<ProtocolContract>;
//# sourceMappingURL=protocol_contract.d.ts.map