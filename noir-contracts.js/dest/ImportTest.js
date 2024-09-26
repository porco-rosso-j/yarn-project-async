/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Fr, NoteSelector, loadContractArtifact, } from '@aztec/aztec.js';
import ImportTestContractArtifactJson from '../artifacts/import_test_contract-ImportTest.json' assert { type: 'json' };
export const ImportTestContractArtifact = loadContractArtifact(ImportTestContractArtifactJson);
/**
 * Type-safe interface for contract ImportTest;
 */
export class ImportTestContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, ImportTestContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, ImportTestContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet) {
        return new DeployMethod(Fr.ZERO, wallet, ImportTestContractArtifact, ImportTestContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet) {
        return new DeployMethod(publicKeysHash, wallet, ImportTestContractArtifact, ImportTestContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, ImportTestContractArtifact, ImportTestContract.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return ImportTestContractArtifact;
    }
    static get storage() {
        return {
            example_constant: {
                slot: new Fr(1n),
            },
            example_set: {
                slot: new Fr(2n),
            },
        };
    }
    static get notes() {
        return {
            ValueNote: {
                id: new NoteSelector(1900156023),
            },
            TestNote: {
                id: new NoteSelector(1541719451),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9JbXBvcnRUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUV0QyxvQkFBb0I7QUFDcEIsT0FBTyxFQUlMLFFBQVEsRUFFUixZQUFZLEVBTVosWUFBWSxFQUtaLEVBQUUsRUFJRixZQUFZLEVBS1osb0JBQW9CLEdBQ3JCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyw4QkFBOEIsTUFBTSxtREFBbUQsQ0FBQyxTQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUV2SCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxvQkFBb0IsQ0FBQyw4QkFBc0QsQ0FBQyxDQUFDO0FBRXZIOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFlBQVk7SUFDbEQsWUFBb0IsUUFBcUMsRUFBRSxNQUFjO1FBQ3ZFLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBcUIsRUFBRSxNQUFjO1FBQzFELE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBZ0MsQ0FBQztJQUNsRyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWM7UUFDakMsT0FBTyxJQUFJLFlBQVksQ0FDckIsRUFBRSxDQUFDLElBQUksRUFDUCxNQUFNLEVBQ04sMEJBQTBCLEVBQzFCLGtCQUFrQixDQUFDLEVBQUUsRUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBa0IsRUFBRSxNQUFjO1FBQ3ZFLE9BQU8sSUFBSSxZQUFZLENBQ3JCLGNBQWMsRUFDZCxNQUFNLEVBQ04sMEJBQTBCLEVBQzFCLGtCQUFrQixDQUFDLEVBQUUsRUFDckIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUMxQixJQUF5RCxFQUN6RCxHQUFHLElBQWtEO1FBRXJELE9BQU8sSUFBSSxZQUFZLENBQ3JCLElBQUksQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksRUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFDWCwwQkFBMEIsRUFDMUIsa0JBQWtCLENBQUMsRUFBRSxFQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDOUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLDBCQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLEtBQUssT0FBTztRQUN2QixPQUFPO1lBQ0wsZ0JBQWdCLEVBQUU7Z0JBQ2hCLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQjtTQUMyRCxDQUFDO0lBQ2pFLENBQUM7SUFFTSxNQUFNLEtBQUssS0FBSztRQUNyQixPQUFPO1lBQ0wsU0FBUyxFQUFFO2dCQUNULEVBQUUsRUFBRSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUM7YUFDakM7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsRUFBRSxFQUFFLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQzthQUNqQztTQUN5QyxDQUFDO0lBQy9DLENBQUM7Q0EyQkYifQ==