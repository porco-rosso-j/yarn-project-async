import { GasTokenAddress } from '@aztec/protocol-contracts/gas-token';
/**
 * Pay fee directly in the native gas token.
 */
export class NativeFeePaymentMethod {
    constructor(sender) {
        this.sender = sender;
    }
    getAsset() {
        return GasTokenAddress;
    }
    getFunctionCalls() {
        return Promise.resolve([]);
    }
    getFeePayer() {
        return Promise.resolve(this.sender);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlX2ZlZV9wYXltZW50X21ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mZWUvbmF0aXZlX2ZlZV9wYXltZW50X21ldGhvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFJdEU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLFlBQXNCLE1BQW9CO1FBQXBCLFdBQU0sR0FBTixNQUFNLENBQWM7SUFBRyxDQUFDO0lBRTlDLFFBQVE7UUFDTixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0YifQ==