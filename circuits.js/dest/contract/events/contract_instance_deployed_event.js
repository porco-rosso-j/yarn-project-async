import { AztecAddress } from '@aztec/foundation/aztec-address';
import { toBigIntBE } from '@aztec/foundation/bigint-buffer';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { DEPLOYER_CONTRACT_ADDRESS, DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE } from '../../constants.gen.js';
/** Event emitted from the ContractInstanceDeployer. */
export class ContractInstanceDeployedEvent {
    constructor(address, version, salt, contractClassId, initializationHash, publicKeysHash, deployer) {
        this.address = address;
        this.version = version;
        this.salt = salt;
        this.contractClassId = contractClassId;
        this.initializationHash = initializationHash;
        this.publicKeysHash = publicKeysHash;
        this.deployer = deployer;
    }
    static isContractInstanceDeployedEvent(log) {
        return toBigIntBE(log.subarray(0, 32)) == DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE;
    }
    static fromLogs(logs) {
        return logs
            .filter(log => ContractInstanceDeployedEvent.isContractInstanceDeployedEvent(log.data))
            .filter(log => log.contractAddress.equals(AztecAddress.fromBigInt(DEPLOYER_CONTRACT_ADDRESS)))
            .map(log => ContractInstanceDeployedEvent.fromLogData(log.data));
    }
    static fromLogData(log) {
        if (!this.isContractInstanceDeployedEvent(log)) {
            const magicValue = DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE.toString(16);
            throw new Error(`Log data for ContractInstanceDeployedEvent is not prefixed with magic value 0x${magicValue}`);
        }
        const reader = new BufferReader(log.subarray(32));
        const address = reader.readObject(AztecAddress);
        const version = reader.readObject(Fr).toNumber();
        const salt = reader.readObject(Fr);
        const contractClassId = reader.readObject(Fr);
        const initializationHash = reader.readObject(Fr);
        const publicKeysHash = reader.readObject(Fr);
        const deployer = reader.readObject(AztecAddress);
        return new ContractInstanceDeployedEvent(address, version, salt, contractClassId, initializationHash, publicKeysHash, deployer);
    }
    toContractInstance() {
        if (this.version !== 1) {
            throw new Error(`Unexpected contract instance version ${this.version}`);
        }
        return {
            address: this.address,
            version: this.version,
            contractClassId: this.contractClassId,
            initializationHash: this.initializationHash,
            publicKeysHash: this.publicKeysHash,
            salt: this.salt,
            deployer: this.deployer,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfaW5zdGFuY2VfZGVwbG95ZWRfZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3QvZXZlbnRzL2NvbnRyYWN0X2luc3RhbmNlX2RlcGxveWVkX2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUczRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsK0NBQStDLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwSCx1REFBdUQ7QUFDdkQsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUNrQixPQUFxQixFQUNyQixPQUFlLEVBQ2YsSUFBUSxFQUNSLGVBQW1CLEVBQ25CLGtCQUFzQixFQUN0QixjQUFrQixFQUNsQixRQUFzQjtRQU50QixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFJO1FBQ1Isb0JBQWUsR0FBZixlQUFlLENBQUk7UUFDbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFJO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQWM7SUFDckMsQ0FBQztJQUVKLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxHQUFXO1FBQ2hELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksK0NBQStDLENBQUM7SUFDNUYsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBdUQ7UUFDckUsT0FBTyxJQUFJO2FBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsK0JBQStCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RGLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO2FBQzdGLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMvQyxNQUFNLFVBQVUsR0FBRywrQ0FBK0MsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEYsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUNqSCxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqRCxPQUFPLElBQUksNkJBQTZCLENBQ3RDLE9BQU8sRUFDUCxPQUFPLEVBQ1AsSUFBSSxFQUNKLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLFFBQVEsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9