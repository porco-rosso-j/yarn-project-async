var _AggregateTxValidator_validators;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
export class AggregateTxValidator {
    constructor(...validators) {
        _AggregateTxValidator_validators.set(this, void 0);
        if (validators.length === 0) {
            throw new Error('At least one validator must be provided');
        }
        __classPrivateFieldSet(this, _AggregateTxValidator_validators, validators, "f");
    }
    async validateTxs(txs) {
        const invalidTxs = [];
        let txPool = txs;
        for (const validator of __classPrivateFieldGet(this, _AggregateTxValidator_validators, "f")) {
            const [valid, invalid] = await validator.validateTxs(txPool);
            invalidTxs.push(...invalid);
            txPool = valid;
        }
        return [txPool, invalidTxs];
    }
}
_AggregateTxValidator_validators = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlX3R4X3ZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90eC92YWxpZGF0b3IvYWdncmVnYXRlX3R4X3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLE1BQU0sT0FBTyxvQkFBb0I7SUFFL0IsWUFBWSxHQUFHLFVBQTRCO1FBRDNDLG1EQUE4QjtRQUU1QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCx1QkFBQSxJQUFJLG9DQUFlLFVBQVUsTUFBQSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQVE7UUFDeEIsTUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixLQUFLLE1BQU0sU0FBUyxJQUFJLHVCQUFBLElBQUksd0NBQVksRUFBRSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsTUFBTSxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUM1QixNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRiJ9