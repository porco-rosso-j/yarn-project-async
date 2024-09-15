import { CallContext } from '../call_context.js';
import { Header } from '../header.js';
import { TxContext } from '../tx_context.js';
export declare class PrivateContextInputs {
    callContext: CallContext;
    historicalHeader: Header;
    txContext: TxContext;
    startSideEffectCounter: number;
    constructor(callContext: CallContext, historicalHeader: Header, txContext: TxContext, startSideEffectCounter: number);
    static empty(): PrivateContextInputs;
    toFields(): import("@aztec/foundation/fields").Fr[];
}
//# sourceMappingURL=private_context_inputs.d.ts.map