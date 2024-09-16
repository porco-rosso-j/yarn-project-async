import { Barretenberg, Fr as FrBarretenberg } from '@aztec/bb.js';
import { Fr } from '../../fields/fields.js';
import { serializeToFields } from '../../serialize/serialize.js';
/**
 * Create a poseidon hash (field) from an array of input fields.
 * @param input - The input fields to hash.
 * @returns The poseidon hash.
 */
export async function poseidon2Hash(input) {
    const inputFields = serializeToFields(input);
    const bb = Barretenberg.new();
    return Fr.fromBuffer(Buffer.from((await bb.poseidon2Hash(inputFields.map(i => new FrBarretenberg(i.toBuffer())))).toBuffer()));
}
/**
 * Runs a Poseidon2 permutation.
 * @param input the input state. Expected to be of size 4.
 * @returns the output state, size 4.
 */
export async function poseidon2Permutation(input) {
    const inputFields = serializeToFields(input);
    // We'd like this assertion but it's not possible to use it in the browser.
    // assert(input.length === 4, 'Input state must be of size 4');
    const bb = Barretenberg.new();
    const res = await bb.poseidon2Permutation(inputFields.map(i => new FrBarretenberg(i.toBuffer())));
    // We'd like this assertion but it's not possible to use it in the browser.
    // assert(res.length === 4, 'Output state must be of size 4');
    return res.map(o => Fr.fromBuffer(Buffer.from(o.toBuffer())));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3Bvc2VpZG9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxJQUFJLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUMsT0FBTyxFQUFrQixpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxLQUFrQjtJQUNwRCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUNsQixNQUFNLENBQUMsSUFBSSxDQUNULENBQ0UsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUNwQixXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FDdkQsQ0FDRixDQUFDLFFBQVEsRUFBRSxDQUNiLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxvQkFBb0IsQ0FBQyxLQUFrQjtJQUMzRCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QywyRUFBMkU7SUFDM0UsK0RBQStEO0lBQy9ELE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QixNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLDJFQUEyRTtJQUMzRSw4REFBOEQ7SUFDOUQsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDIn0=