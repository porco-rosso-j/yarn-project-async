import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type ContractInstanceWithAddress } from '@aztec/types/contracts';
/** Event emitted from the ContractInstanceDeployer. */
export declare class ContractInstanceDeployedEvent {
    readonly address: AztecAddress;
    readonly version: number;
    readonly salt: Fr;
    readonly contractClassId: Fr;
    readonly initializationHash: Fr;
    readonly publicKeysHash: Fr;
    readonly deployer: AztecAddress;
    constructor(address: AztecAddress, version: number, salt: Fr, contractClassId: Fr, initializationHash: Fr, publicKeysHash: Fr, deployer: AztecAddress);
    static isContractInstanceDeployedEvent(log: Buffer): boolean;
    static fromLogs(logs: {
        contractAddress: AztecAddress;
        data: Buffer;
    }[]): ContractInstanceDeployedEvent[];
    static fromLogData(log: Buffer): ContractInstanceDeployedEvent;
    toContractInstance(): ContractInstanceWithAddress;
}
//# sourceMappingURL=contract_instance_deployed_event.d.ts.map