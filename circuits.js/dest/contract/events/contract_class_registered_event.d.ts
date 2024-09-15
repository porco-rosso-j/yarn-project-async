import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { type ContractClassPublic } from '@aztec/types/contracts';
/** Event emitted from the ContractClassRegisterer. */
export declare class ContractClassRegisteredEvent {
    readonly contractClassId: Fr;
    readonly version: number;
    readonly artifactHash: Fr;
    readonly privateFunctionsRoot: Fr;
    readonly packedPublicBytecode: Buffer;
    constructor(contractClassId: Fr, version: number, artifactHash: Fr, privateFunctionsRoot: Fr, packedPublicBytecode: Buffer);
    static isContractClassRegisteredEvent(log: Buffer): boolean;
    static fromLogs(logs: {
        contractAddress: AztecAddress;
        data: Buffer;
    }[], registererContractAddress: AztecAddress): ContractClassRegisteredEvent[];
    static fromLogData(log: Buffer): ContractClassRegisteredEvent;
    toContractClassPublic(): Promise<ContractClassPublic>;
}
//# sourceMappingURL=contract_class_registered_event.d.ts.map