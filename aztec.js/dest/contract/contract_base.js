import { computePartialAddress } from '@aztec/circuits.js';
import { FunctionSelector, } from '@aztec/foundation/abi';
import { ContractFunctionInteraction } from './contract_function_interaction.js';
/**
 * Abstract implementation of a contract extended by the Contract class and generated contract types.
 */
export class ContractBase {
    constructor(
    /** The deployed contract instance definition. */
    instance, 
    /** The Application Binary Interface for the contract. */
    artifact, 
    /** The wallet used for interacting with this contract. */
    wallet) {
        this.instance = instance;
        this.artifact = artifact;
        this.wallet = wallet;
        /**
         * An object containing contract methods mapped to their respective names.
         */
        this.methods = {};
        artifact.functions.forEach((f) => {
            const interactionFunction = (...args) => {
                return new ContractFunctionInteraction(this.wallet, this.instance.address, f, args);
            };
            this.methods[f.name] = Object.assign(interactionFunction, {
                /**
                 * A getter for users to fetch the function selector.
                 * @returns Selector of the function.
                 */
                get selector() {
                    return FunctionSelector.fromNameAndParameters(f.name, f.parameters);
                },
            });
        });
    }
    /** Address of the contract. */
    get address() {
        return this.instance.address;
    }
    /** Partial address of the contract. */
    get partialAddress() {
        return computePartialAddress(this.instance);
    }
    /**
     * Creates a new instance of the contract wrapper attached to a different wallet.
     * @param wallet - Wallet to use for sending txs.
     * @returns A new contract instance.
     */
    withWallet(wallet) {
        return new ContractBase(this.instance, this.artifact, wallet);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdF9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNELE9BQU8sRUFLTCxnQkFBZ0IsR0FDakIsTUFBTSx1QkFBdUIsQ0FBQztBQUkvQixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQTJCakY7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBWTtJQU12QjtJQUNFLGlEQUFpRDtJQUNqQyxRQUFxQztJQUNyRCx5REFBeUQ7SUFDekMsUUFBMEI7SUFDMUMsMERBQTBEO0lBQ2hELE1BQWM7UUFKUixhQUFRLEdBQVIsUUFBUSxDQUE2QjtRQUVyQyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUVoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBWDFCOztXQUVHO1FBQ0ksWUFBTyxHQUF1QyxFQUFFLENBQUM7UUFVdEQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFtQixFQUFFLEVBQUU7WUFDakQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO2dCQUN4RDs7O21CQUdHO2dCQUNILElBQUksUUFBUTtvQkFDVixPQUFPLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1Q0FBdUM7SUFDdkMsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksVUFBVSxDQUFDLE1BQWM7UUFDOUIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFTLENBQUM7SUFDeEUsQ0FBQztDQUNGIn0=