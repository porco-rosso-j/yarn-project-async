import { FunctionCall, PackedValues } from '@aztec/circuit-types';
import { type AztecAddress, Fr, type GasSettings } from '@aztec/circuits.js';
import { type Tuple } from '@aztec/foundation/serialize';
import { type FeePaymentMethod } from '../fee/fee_payment_method.js';
/**
 * Fee payment options for a transaction.
 */
export type FeeOptions = {
    /** The fee payment method to use */
    paymentMethod: FeePaymentMethod;
    /** The gas settings */
    gasSettings: GasSettings;
};
/** Encoded function call for account contract entrypoint */
type EncodedFunctionCall = {
    /** Arguments hash for the call */
    args_hash: Fr;
    /** Selector of the function to call */
    function_selector: Fr;
    /** Address of the contract to call */
    target_address: Fr;
    /** Whether the function is public or private */
    is_public: boolean;
    /** Whether the function can alter state */
    is_static: boolean;
};
/** Assembles an entrypoint payload */
export declare abstract class EntrypointPayload {
    #private;
    protected constructor(generatorIndex: number);
    init(functionCalls: FunctionCall[]): Promise<this>;
    /**
     * The function calls to execute. This uses snake_case naming so that it is compatible with Noir encoding
     * @internal
     */
    get function_calls(): EncodedFunctionCall[];
    /**
     * The nonce
     * @internal
     */
    get nonce(): Fr;
    /**
     * The packed arguments for the function calls
     */
    get packedArguments(): PackedValues[];
    /**
     * Serializes the payload to an array of fields
     * @returns The fields of the payload
     */
    abstract toFields(): Fr[];
    /**
     * Hashes the payload
     * @returns The hash of the payload
     */
    hash(): Promise<Fr>;
    /** Serializes the function calls to an array of fields. */
    protected functionCallsToFields(): Fr[];
    /**
     * Creates an execution payload for a dapp from a set of function calls
     * @param functionCalls - The function calls to execute
     * @returns The execution payload
     */
    static fromFunctionCalls(functionCalls: FunctionCall[]): Promise<AppEntrypointPayload>;
    /**
     * Creates an execution payload for the app-portion of a transaction from a set of function calls
     * @param functionCalls - The function calls to execute
     * @returns The execution payload
     */
    static fromAppExecution(functionCalls: FunctionCall[] | Tuple<FunctionCall, 4>): Promise<AppEntrypointPayload>;
    /**
     * Creates an execution payload to pay the fee for a transaction
     * @param sender - The address sending this payload
     * @param feeOpts - The fee payment options
     * @returns The execution payload
     */
    static fromFeeOptions(sender: AztecAddress, feeOpts?: FeeOptions): Promise<FeeEntrypointPayload>;
}
/** Entrypoint payload for app phase execution. */
declare class AppEntrypointPayload extends EntrypointPayload {
    toFields(): Fr[];
}
/** Entrypoint payload for fee payment to be run during setup phase. */
declare class FeeEntrypointPayload extends EntrypointPayload {
    #private;
    constructor(generatorIndex: number, isFeePayer: boolean);
    toFields(): Fr[];
    /** Whether the sender should be appointed as fee payer. */
    get is_fee_payer(): boolean;
}
export {};
//# sourceMappingURL=payload.d.ts.map