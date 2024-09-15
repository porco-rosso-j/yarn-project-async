import { type FunctionCall } from '@aztec/circuit-types';
import { type AztecAddress, Fr } from '@aztec/circuits.js';
import { NativeFeePaymentMethod } from './native_fee_payment_method.js';
/**
 * Pay fee directly with native gas token claimed on the same tx.
 */
export declare class NativeFeePaymentMethodWithClaim extends NativeFeePaymentMethod {
    private claimAmount;
    private claimSecret;
    constructor(sender: AztecAddress, claimAmount: bigint | Fr, claimSecret: Fr);
    /**
     * Creates a function call to pay the fee in gas token.
     * @returns A function call
     */
    getFunctionCalls(): Promise<FunctionCall[]>;
}
//# sourceMappingURL=native_fee_payment_method_with_claim.d.ts.map