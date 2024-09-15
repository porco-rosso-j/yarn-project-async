import { Fr, FunctionSelector } from '@aztec/circuits.js';
import { FunctionType } from '@aztec/foundation/abi';
import { GasTokenAddress } from '@aztec/protocol-contracts/gas-token';
import { NativeFeePaymentMethod } from './native_fee_payment_method.js';
/**
 * Pay fee directly with native gas token claimed on the same tx.
 */
export class NativeFeePaymentMethodWithClaim extends NativeFeePaymentMethod {
    constructor(sender, claimAmount, claimSecret) {
        super(sender);
        this.claimAmount = claimAmount;
        this.claimSecret = claimSecret;
    }
    /**
     * Creates a function call to pay the fee in gas token.
     * @returns A function call
     */
    getFunctionCalls() {
        return Promise.resolve([
            {
                to: GasTokenAddress,
                name: 'claim',
                selector: FunctionSelector.fromSignature('claim((Field),Field,Field)'),
                isStatic: false,
                args: [this.sender, new Fr(this.claimAmount), this.claimSecret],
                returnTypes: [],
                type: FunctionType.PRIVATE,
            },
        ]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlX2ZlZV9wYXltZW50X21ldGhvZF93aXRoX2NsYWltLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZlZS9uYXRpdmVfZmVlX3BheW1lbnRfbWV0aG9kX3dpdGhfY2xhaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFxQixFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXhFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLHNCQUFzQjtJQUN6RSxZQUFZLE1BQW9CLEVBQVUsV0FBd0IsRUFBVSxXQUFlO1FBQ3pGLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUQwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFJO0lBRTNGLENBQUM7SUFFRDs7O09BR0c7SUFDTSxnQkFBZ0I7UUFDdkIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3JCO2dCQUNFLEVBQUUsRUFBRSxlQUFlO2dCQUNuQixJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDO2dCQUN0RSxRQUFRLEVBQUUsS0FBSztnQkFDZixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUMvRCxXQUFXLEVBQUUsRUFBRTtnQkFDZixJQUFJLEVBQUUsWUFBWSxDQUFDLE9BQU87YUFDM0I7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YifQ==