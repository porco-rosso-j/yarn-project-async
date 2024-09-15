import { type FunctionCall } from '@aztec/circuit-types';
import { type AztecAddress } from '@aztec/circuits.js';
import { type FeePaymentMethod } from './fee_payment_method.js';
/**
 * Pay fee directly in the native gas token.
 */
export declare class NativeFeePaymentMethod implements FeePaymentMethod {
    protected sender: AztecAddress;
    constructor(sender: AztecAddress);
    getAsset(): AztecAddress;
    getFunctionCalls(): Promise<FunctionCall[]>;
    getFeePayer(): Promise<AztecAddress>;
}
//# sourceMappingURL=native_fee_payment_method.d.ts.map