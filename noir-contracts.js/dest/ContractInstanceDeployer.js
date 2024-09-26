/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, EventSelector, Fr, loadContractArtifact, } from '@aztec/aztec.js';
import ContractInstanceDeployerContractArtifactJson from '../artifacts/contract_instance_deployer_contract-ContractInstanceDeployer.json' assert { type: 'json' };
export const ContractInstanceDeployerContractArtifact = loadContractArtifact(ContractInstanceDeployerContractArtifactJson);
/**
 * Type-safe interface for contract ContractInstanceDeployer;
 */
export class ContractInstanceDeployerContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, ContractInstanceDeployerContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, ContractInstanceDeployerContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet) {
        return new DeployMethod(Fr.ZERO, wallet, ContractInstanceDeployerContractArtifact, ContractInstanceDeployerContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet) {
        return new DeployMethod(publicKeysHash, wallet, ContractInstanceDeployerContractArtifact, ContractInstanceDeployerContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, ContractInstanceDeployerContractArtifact, ContractInstanceDeployerContract.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return ContractInstanceDeployerContractArtifact;
    }
    // Partial application is chosen is to avoid the duplication of so much codegen.
    static decodeEvent(fieldsLength, eventSelector, fields) {
        return (payload) => {
            if (payload === undefined) {
                return undefined;
            }
            if (!eventSelector.equals(payload.eventTypeId)) {
                return undefined;
            }
            if (payload.event.items.length !== fieldsLength) {
                throw new Error('Something is weird here, we have matching EventSelectors, but the actual payload has mismatched length');
            }
            return fields.reduce((acc, curr, i) => ({
                ...acc,
                [curr]: payload.event.items[i],
            }), {});
        };
    }
    static get events() {
        return {
            ContractInstanceDeployed: {
                decode: this.decodeEvent(8, EventSelector.fromSignature('ContractInstanceDeployed(Field,Field,Field,Field,Field,Field,Field,Field)'), [
                    'DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE',
                    'address',
                    'version',
                    'salt',
                    'contract_class_id',
                    'initialization_hash',
                    'public_keys_hash',
                    'deployer',
                ]),
                eventSelector: EventSelector.fromSignature('ContractInstanceDeployed(Field,Field,Field,Field,Field,Field,Field,Field)'),
                fieldNames: [
                    'DEPLOYER_CONTRACT_INSTANCE_DEPLOYED_MAGIC_VALUE',
                    'address',
                    'version',
                    'salt',
                    'contract_class_id',
                    'initialization_hash',
                    'public_keys_hash',
                    'deployer',
                ],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RJbnN0YW5jZURlcGxveWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbnRyYWN0SW5zdGFuY2VEZXBsb3llci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFFdEMsb0JBQW9CO0FBQ3BCLE9BQU8sRUFJTCxRQUFRLEVBRVIsWUFBWSxFQU1aLFlBQVksRUFHWixhQUFhLEVBRWIsRUFBRSxFQVNGLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sNENBQTRDLE1BQU0sZ0ZBQWdGLENBQUMsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFFbEssTUFBTSxDQUFDLE1BQU0sd0NBQXdDLEdBQUcsb0JBQW9CLENBQzFFLDRDQUFvRSxDQUNyRSxDQUFDO0FBYUY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0NBQWlDLFNBQVEsWUFBWTtJQUNoRSxZQUFvQixRQUFxQyxFQUFFLE1BQWM7UUFDdkUsS0FBSyxDQUFDLFFBQVEsRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFxQixFQUFFLE1BQWM7UUFDMUQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUNoQixPQUFPLEVBQ1AsZ0NBQWdDLENBQUMsUUFBUSxFQUN6QyxNQUFNLENBQ3NDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLENBQ3JCLEVBQUUsQ0FBQyxJQUFJLEVBQ1AsTUFBTSxFQUNOLHdDQUF3QyxFQUN4QyxnQ0FBZ0MsQ0FBQyxFQUFFLEVBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUMvQixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVH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