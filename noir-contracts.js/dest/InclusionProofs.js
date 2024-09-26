/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Fr, NoteSelector, loadContractArtifact, } from '@aztec/aztec.js';
import InclusionProofsContractArtifactJson from '../artifacts/inclusion_proofs_contract-InclusionProofs.json' assert { type: 'json' };
export const InclusionProofsContractArtifact = loadContractArtifact(InclusionProofsContractArtifactJson);
/**
 * Type-safe interface for contract InclusionProofs;
 */
export class InclusionProofsContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, InclusionProofsContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, InclusionProofsContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, public_value) {
        return new DeployMethod(Fr.ZERO, wallet, InclusionProofsContractArtifact, InclusionProofsContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet, public_value) {
        return new DeployMethod(publicKeysHash, wallet, InclusionProofsContractArtifact, InclusionProofsContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, InclusionProofsContractArtifact, InclusionProofsContract.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return InclusionProofsContractArtifact;
    }
    static get storage() {
        return {
            private_values: {
                slot: new Fr(1n),
            },
            public_value: {
                slot: new Fr(2n),
            },
            public_unused_value: {
                slot: new Fr(3n),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5jbHVzaW9uUHJvb2ZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0luY2x1c2lvblByb29mcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFFdEMsb0JBQW9CO0FBQ3BCLE9BQU8sRUFJTCxRQUFRLEVBRVIsWUFBWSxFQU1aLFlBQVksRUFLWixFQUFFLEVBSUYsWUFBWSxFQUtaLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sbUNBQW1DLE1BQU0sNkRBQTZELENBQUMsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFFdEksTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsb0JBQW9CLENBQ2pFLG1DQUEyRCxDQUM1RCxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUN2RCxZQUFvQixRQUFxQyxFQUFFLE1BQWM7UUFDdkUsS0FBSyxDQUFDLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFxQixFQUFFLE1BQWM7UUFDMUQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFxQyxDQUFDO0lBQzVHLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBYyxFQUFFLFlBQXVCO1FBQzFELE9BQU8sSUFBSSxZQUFZLENBQ3JCLEVBQUUsQ0FBQyxJQUFJLEVBQ1AsTUFBTSxFQUNOLCtCQUErQixFQUMvQix1QkFBdUIsQ0FBQyxFQUFFLEVBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLHdCQUF3QixDQUFDLGNBQWtCLEVBQUUsTUFBYyxFQUFFLFlBQXVCO1FBQ2hHLE9BQU8sSUFBSSxZQUFZLENBQ3JCLGNBQWMsRUFDZCxNQUFNLEVBQ04sK0JBQStCLEVBQy9CLHVCQUF1QixDQUFDLEVBQUUsRUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUMxQixJQUF5RCxFQUN6RCxHQUFHLElBQXVEO1FBRTFELE9BQU8sSUFBSSxZQUFZLENBQ3JCLElBQUksQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksRUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFDWCwrQkFBK0IsRUFDL0IsdUJBQXVCLENBQUMsRUFBRSxFQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDOUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLCtCQUErQixDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNLEtBQUssT0FBTztRQUN2QixPQUFPO1lBQ0wsY0FBYyxFQUFFO2dCQUNkLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQjtZQUNELG1CQUFtQixFQUFFO2dCQUNuQixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2pCO1NBQ2tGLENBQUM7SUFDeEYsQ0FBQztJQUVNLE1BQU0sS0FBSyxLQUFLO1FBQ3JCLE9BQU87WUFDTCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQzthQUNqQztTQUM0QixDQUFDO0lBQ2xDLENBQUM7Q0F5R0YifQ==