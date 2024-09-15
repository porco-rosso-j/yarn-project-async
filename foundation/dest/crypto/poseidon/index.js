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
    const bb = await Barretenberg.new();
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
    const bb = await Barretenberg.new();
    const res = await bb.poseidon2Permutation(inputFields.map(i => new FrBarretenberg(i.toBuffer())));
    // We'd like this assertion but it's not possible to use it in the browser.
    // assert(res.length === 4, 'Output state must be of size 4');
    return res.map(o => Fr.fromBuffer(Buffer.from(o.toBuffer())));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3Bvc2VpZG9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxJQUFJLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVsRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUMsT0FBTyxFQUFrQixpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxLQUFrQjtJQUNwRCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQ1QsQ0FDRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQ3BCLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUN2RCxDQUNGLENBQUMsUUFBUSxFQUFFLENBQ2IsQ0FDRixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLG9CQUFvQixDQUFDLEtBQWtCO0lBQzNELE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLDJFQUEyRTtJQUMzRSwrREFBK0Q7SUFDL0QsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDcEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRywyRUFBMkU7SUFDM0UsOERBQThEO0lBQzlELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEUsQ0FBQyJ9