import { Fr } from '@aztec/circuits.js';
import { DefaultAccountEntrypoint } from '@aztec/entrypoints/account';
/**
 * Default implementation for an account interface. Requires that the account uses the default
 * entrypoint signature, which accept an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
export class DefaultAccountInterface {
    constructor(authWitnessProvider, address, nodeInfo) {
        this.authWitnessProvider = authWitnessProvider;
        this.address = address;
        this.entrypoint = new DefaultAccountEntrypoint(address.address, authWitnessProvider, nodeInfo.chainId, nodeInfo.protocolVersion);
        this.chainId = new Fr(nodeInfo.chainId);
        this.version = new Fr(nodeInfo.protocolVersion);
    }
    createTxExecutionRequest(execution) {
        return this.entrypoint.createTxExecutionRequest(execution);
    }
    createAuthWit(messageHash) {
        return this.authWitnessProvider.createAuthWit(messageHash);
    }
    getCompleteAddress() {
        return this.address;
    }
    getAddress() {
        return this.address.address;
    }
    getChainId() {
        return this.chainId;
    }
    getVersion() {
        return this.version;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVmYXVsdHMvYWNjb3VudF9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUEyQyxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUd0RTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sdUJBQXVCO0lBS2xDLFlBQ1UsbUJBQXdDLEVBQ3hDLE9BQXdCLEVBQ2hDLFFBQXVEO1FBRi9DLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFHaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHdCQUF3QixDQUM1QyxPQUFPLENBQUMsT0FBTyxFQUNmLG1CQUFtQixFQUNuQixRQUFRLENBQUMsT0FBTyxFQUNoQixRQUFRLENBQUMsZUFBZSxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHdCQUF3QixDQUFDLFNBQStCO1FBQ3RELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsYUFBYSxDQUFDLFdBQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==