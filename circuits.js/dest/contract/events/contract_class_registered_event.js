import { bufferFromFields } from '@aztec/foundation/abi';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import chunk from 'lodash.chunk';
import { REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE } from '../../constants.gen.js';
import { computeContractClassId, computePublicBytecodeCommitment } from '../contract_class_id.js';
import { unpackBytecode } from '../public_bytecode.js';
/** Event emitted from the ContractClassRegisterer. */
export class ContractClassRegisteredEvent {
    constructor(contractClassId, version, artifactHash, privateFunctionsRoot, packedPublicBytecode) {
        this.contractClassId = contractClassId;
        this.version = version;
        this.artifactHash = artifactHash;
        this.privateFunctionsRoot = privateFunctionsRoot;
        this.packedPublicBytecode = packedPublicBytecode;
    }
    static isContractClassRegisteredEvent(log) {
        return toBigIntBE(log.subarray(0, 32)) == REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE;
    }
    static fromLogs(logs, registererContractAddress) {
        return logs
            .filter(log => ContractClassRegisteredEvent.isContractClassRegisteredEvent(log.data))
            .filter(log => log.contractAddress.equals(registererContractAddress))
            .map(log => this.fromLogData(log.data));
    }
    static fromLogData(log) {
        if (!this.isContractClassRegisteredEvent(log)) {
            throw new Error(`Log data for ContractClassRegisteredEvent is not prefixed with magic value 0x${REGISTERER_CONTRACT_CLASS_REGISTERED_MAGIC_VALUE}`);
        }
        const reader = new BufferReader(log.subarray(32));
        const contractClassId = reader.readObject(Fr);
        const version = reader.readObject(Fr).toNumber();
        const artifactHash = reader.readObject(Fr);
        const privateFunctionsRoot = reader.readObject(Fr);
        const packedPublicBytecode = bufferFromFields(chunk(reader.readToEnd(), Fr.SIZE_IN_BYTES).map(Buffer.from).map(Fr.fromBuffer));
        return new ContractClassRegisteredEvent(contractClassId, version, artifactHash, privateFunctionsRoot, packedPublicBytecode);
    }
    async toContractClassPublic() {
        const computedClassId = await computeContractClassId({
            artifactHash: this.artifactHash,
            privateFunctionsRoot: this.privateFunctionsRoot,
            publicBytecodeCommitment: computePublicBytecodeCommitment(this.packedPublicBytecode),
        });
        if (!computedClassId.equals(this.contractClassId)) {
            throw new Error(`Invalid contract class id: computed ${computedClassId.toString()} but event broadcasted ${this.contractClassId.toString()}`);
        }
        if (this.version !== 1) {
            throw new Error(`Unexpected contract class version ${this.version}`);
        }
        return {
            id: this.contractClassId,
            artifactHash: this.artifactHash,
            packedBytecode: this.packedPublicBytecode,
            privateFunctionsRoot: this.privateFunctionsRoot,
            publicFunctions: unpackBytecode(this.packedPublicBytecode),
            version: this.version,
            privateFunctions: [],
            unconstrainedFunctions: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfY2xhc3NfcmVnaXN0ZXJlZF9ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9ldmVudHMvY29udHJhY3RfY2xhc3NfcmVnaXN0ZXJlZF9ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUczRCxPQUFPLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFakMsT0FBTyxFQUFFLGdEQUFnRCxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLCtCQUErQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZELHNEQUFzRDtBQUN0RCxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQ2tCLGVBQW1CLEVBQ25CLE9BQWUsRUFDZixZQUFnQixFQUNoQixvQkFBd0IsRUFDeEIsb0JBQTRCO1FBSjVCLG9CQUFlLEdBQWYsZUFBZSxDQUFJO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixpQkFBWSxHQUFaLFlBQVksQ0FBSTtRQUNoQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQUk7UUFDeEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFRO0lBQzNDLENBQUM7SUFFSixNQUFNLENBQUMsOEJBQThCLENBQUMsR0FBVztRQUMvQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLGdEQUFnRCxDQUFDO0lBQzdGLENB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