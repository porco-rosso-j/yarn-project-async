import { type ProcessedTx } from '../processed_tx.js';
import { type Tx } from '../tx.js';
import { type TxValidator } from './tx_validator.js';
export declare class AggregateTxValidator<T extends Tx | ProcessedTx> implements TxValidator<T> {
    #private;
    constructor(...validators: TxValidator<T>[]);
    validateTxs(txs: T[]): Promise<[validTxs: T[], invalidTxs: T[]]>;
}
//# sourceMappingURL=aggregate_tx_validator.d.ts.map