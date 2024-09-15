import { computeSecretHash } from '@aztec/circuits.js/hash';
import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
/**
 * Holds information about how the fee for a transaction is to be paid.
 */
export class PrivateFeePaymentMethod {
    constructor(
    /**
     * The asset used to pay the fee.
     */
    asset, 
    /**
     * Address which will hold the fee payment.
     */
    paymentContract, 
    /**
     * An auth witness provider to authorize fee payments
     */
    wallet, 
    /**
     * A secret to shield the rebate amount from the FPC.
     * Use this to claim the shielded amount to private balance
     */
    rebateSecret = Fr.random()) {
        this.asset = asset;
        this.paymentContract = paymentContract;
        this.wallet = wallet;
        this.rebateSecret = rebateSecret;
    }
    /**
     * The asset used to pay the fee.
     * @returns The asset used to pay the fee.
     */
    getAsset() {
        return this.asset;
    }
    getFeePayer() {
        return Promise.resolve(this.paymentContract);
    }
    /**
     * Creates a function call to pay the fee in the given asset.
     * @param gasSettings - The gas settings.
     * @returns The function call to pay the fee.
     */
    async getFunctionCalls(gasSettings) {
        const nonce = Fr.random();
        const maxFee = gasSettings.getFeeLimit();
        await this.wallet.createAuthWit({
            caller: this.paymentContract,
            action: {
                name: 'unshield',
                args: [this.wallet.getCompleteAddress().address, this.paymentContract, maxFee, nonce],
                selector: FunctionSelector.fromSignature('unshield((Field),(Field),Field,Field)'),
                type: FunctionType.PRIVATE,
                isStatic: false,
                to: this.asset,
                returnTypes: [],
            },
        });
        const secretHashForRebate = await computeSecretHash(this.rebateSecret);
        return [
            {
                name: 'fee_entrypoint_private',
                to: this.paymentContract,
                selector: FunctionSelector.fromSignature('fee_entrypoint_private(Field,(Field),Field,Field)'),
                type: FunctionType.PRIVATE,
                isStatic: false,
                args: [maxFee, this.asset, secretHashForRebate, nonce],
                returnTypes: [],
            },
        ];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9mZWVfcGF5bWVudF9tZXRob2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmVlL3ByaXZhdGVfZmVlX3BheW1lbnRfbWV0aG9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLOUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDO0lBQ0U7O09BRUc7SUFDSyxLQUFtQjtJQUMzQjs7T0FFRztJQUNLLGVBQTZCO0lBRXJDOztPQUVHO0lBQ0ssTUFBYztJQUV0Qjs7O09BR0c7SUFDSyxlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUU7UUFmMUIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUluQixvQkFBZSxHQUFmLGVBQWUsQ0FBYztRQUs3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTWQsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFdBQXdCO1FBQzdDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDNUIsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDckYsUUFBUSxFQUFFLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQztnQkFDakYsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPO2dCQUMxQixRQUFRLEVBQUUsS0FBSztnQkFDZixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2QsV0FBVyxFQUFFLEVBQUU7YUFDaEI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLG1CQUFtQixHQUFHLE1BQU0saUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZFLE9BQU87WUFDTDtnQkFDRSxJQUFJLEVBQUUsd0JBQXdCO2dCQUM5QixFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3hCLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbURBQW1ELENBQUM7Z0JBQzdGLElBQUksRUFBRSxZQUFZLENBQUMsT0FBTztnQkFDMUIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDO2dCQUN0RCxXQUFXLEVBQUUsRUFBRTthQUNoQjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==