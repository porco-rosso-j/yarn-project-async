/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Fr, NoteSelector, loadContractArtifact, } from '@aztec/aztec.js';
import CounterContractArtifactJson from '../artifacts/counter_contract-Counter.json' assert { type: 'json' };
export const CounterContractArtifact = loadContractArtifact(CounterContractArtifactJson);
/**
 * Type-safe interface for contract Counter;
 */
export class CounterContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, CounterContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, CounterContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, headstart, owner, outgoing_viewer) {
        return new DeployMethod(Fr.ZERO, wallet, CounterContractArtifact, CounterContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet, headstart, owner, outgoing_viewer) {
        return new DeployMethod(publicKeysHash, wallet, CounterContractArtifact, CounterContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, CounterContractArtifact, CounterContract.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return CounterContractArtifact;
    }
    static get storage() {
        return {
            counters: {
                slot: new Fr(1n),
            },
        };
    }
    static get notes() {
        return {
            ValueNote: {
                id: new NoteSelector(1900156023),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db3VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUV0QyxvQkFBb0I7QUFDcEIsT0FBTyxFQUlMLFFBQVEsRUFFUixZQUFZLEVBTVosWUFBWSxFQUtaLEVBQUUsRUFJRixZQUFZLEVBS1osb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTywyQkFBMkIsTUFBTSw0Q0FBNEMsQ0FBQyxTQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUU3RyxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQywyQkFBbUQsQ0FBQyxDQUFDO0FBRWpIOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsWUFBWTtJQUMvQyxZQUFvQixRQUFxQyxFQUFFLE1BQWM7UUFDdkUsS0FBSyxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFxQixFQUFFLE1BQWM7UUFDMUQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBNkIsQ0FBQztJQUM1RixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUNsQixNQUFjLEVBQ2QsU0FBMEIsRUFDMUIsS0FBdUIsRUFDdkIsZUFBaUM7UUFFakMsT0FBTyxJQUFJLFlBQVksQ0FDckIsRUFBRSxDQUFDLElBQUksRUFDUCxNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLGVBQWUsQ0FBQyxFQUFFLEVBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLHdCQUF3QixDQUNwQyxjQUFrQixFQUNsQixNQUFjLEVBQ2QsU0FBMEIsRUFDMUIsS0FBdUIsRUFDdkIsZUFBaUM7UUFFakMsT0FBTyxJQUFJLFlBQVksQ0FDckIsY0FBYyxFQUNkLE1BQU0sRUFDTix1QkFBdUIsRUFDdkIsZUFBZSxDQUFDLEVBQUUsRUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUMxQixJQUF5RCxFQUN6RCxHQUFHLElBQStDO1FBRWxELE9BQU8sSUFBSSxZQUFZLENBQ3JCLElBQUksQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksRUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFDWCx1QkFBdUIsRUFDdkIsZUFBZSxDQUFDLEVBQUUsRUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzlCLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxDQUM3QixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyx1QkFBdUIsQ0FBQztJQUNqQyxDQUFDO0lBRU0sTUFBTSxLQUFLLE9BQU87UUFDdkIsT0FBTztZQUNMLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2pCO1NBQ21DLENBQUM7SUFDekMsQ0FBQztJQUVNLE1BQU0sS0FBSyxLQUFLO1FBQ3JCLE9BQU87WUFDTCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQzthQUNqQztTQUM0QixDQUFDO0lBQ2xDLENBQUM7Q0E4QkYifQ==