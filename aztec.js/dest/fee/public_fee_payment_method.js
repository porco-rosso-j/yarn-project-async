import { FunctionSelector, FunctionType } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
/**
 * Holds information about how the fee for a transaction is to be paid.
 */
export class PublicFeePaymentMethod {
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
    wallet) {
        this.asset = asset;
        this.paymentContract = paymentContract;
        this.wallet = wallet;
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
        return Promise.resolve([
            (await this.wallet.setPublicAuthWit({
                caller: this.paymentContract,
                action: {
                    name: 'transfer_public',
                    args: [this.wallet.getAddress(), this.paymentContract, maxFee, nonce],
                    selector: FunctionSelector.fromSignature('transfer_public((Field),(Field),Field,Field)'),
                    type: FunctionType.PUBLIC,
                    isStatic: false,
                    to: this.asset,
                    returnTypes: [],
                },
            }, true)).request(),
            {
                name: 'fee_entrypoint_public',
                to: this.paymentContract,
                selector: FunctionSelector.fromSignature('fee_entrypoint_public(Field,(Field),Field)'),
                type: FunctionType.PRIVATE,
                isStatic: false,
                args: [maxFee, this.asset, nonce],
                returnTypes: [],
            },
        ]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2ZlZV9wYXltZW50X21ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mZWUvcHVibGljX2ZlZV9wYXltZW50X21ldGhvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBSzlDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQztJQUNFOztPQUVHO0lBQ08sS0FBbUI7SUFDN0I7O09BRUc7SUFDTyxlQUE2QjtJQUN2Qzs7T0FFRztJQUNPLE1BQXFCO1FBUnJCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFJbkIsb0JBQWUsR0FBZixlQUFlLENBQWM7UUFJN0IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUM5QixDQUFDO0lBRUo7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBd0I7UUFDN0MsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV6QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDckIsQ0FDRSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQ2hDO2dCQUNFLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDNUIsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO29CQUNyRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDhDQUE4QyxDQUFDO29CQUN4RixJQUFJLEVBQUUsWUFBWSxDQUFDLE1BQU07b0JBQ3pCLFFBQVEsRUFBRSxLQUFLO29CQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDZCxXQUFXLEVBQUUsRUFBRTtpQkFDaEI7YUFDRixFQUNELElBQUksQ0FDTCxDQUNGLENBQUMsT0FBTyxFQUFFO1lBQ1g7Z0JBQ0UsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUN4QixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDRDQUE0QyxDQUFDO2dCQUN0RixJQUFJLEVBQUUsWUFBWSxDQUFDLE9BQU87Z0JBQzFCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDakMsV0FBVyxFQUFFLEVBQUU7YUFDaEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YifQ==