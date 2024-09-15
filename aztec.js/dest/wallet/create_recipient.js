import { CompleteAddress } from '@aztec/circuits.js';
/**
 * Creates a random address and registers it as a recipient on the pxe server. Useful for testing.
 * @param pxe - PXE.
 * @returns Complete address of the registered recipient.
 */
export async function createRecipient(pxe) {
    const completeAddress = await CompleteAddress.random();
    // docs:start:register-recipient
    await pxe.registerRecipient(completeAddress);
    // docs:end:register-recipient
    return completeAddress;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3JlY2lwaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93YWxsZXQvY3JlYXRlX3JlY2lwaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsZUFBZSxDQUFDLEdBQVE7SUFDNUMsTUFBTSxlQUFlLEdBQUcsTUFBTSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkQsZ0NBQWdDO0lBQ2hDLE1BQU0sR0FBRyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLDhCQUE4QjtJQUM5QixPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDIn0=