// import { BarretenbergSync, Fr as FrBarretenberg } from '@aztec/bb.js';
import { Barretenberg, Fr as FrBarretenberg } from '@aztec/bb.js';
import { Fr } from '../../fields/fields.js';
import { serializeToFields } from '../../serialize/serialize.js';
/**
 * Create a pedersen commitment (point) from an array of input fields.
 * Left pads any inputs less than 32 bytes.
 */
export async function pedersenCommit(input) {
    if (!input.every(i => i.length <= 32)) {
        throw new Error('All Pedersen Commit input buffers must be <= 32 bytes.');
    }
    input = input.map(i => (i.length < 32 ? Buffer.concat([Buffer.alloc(32 - i.length, 0), i]) : i));
    const bb = Barretenberg.new();
    const point = await bb.pedersenCommit(input.map(i => new FrBarretenberg(i)));
    // toBuffer returns Uint8Arrays (browser/worker-boundary friendly).
    // TODO: rename toTypedArray()?
    return [Buffer.from(point.x.toBuffer()), Buffer.from(point.y.toBuffer())];
}
/**
 * Create a pedersen hash (field) from an array of input fields.
 * @param input - The input fieldables to hash.
 * @param index - The separator index to use for the hash.
 * @returns The pedersen hash.
 */
export async function pedersenHash(input, index = 0) {
    const inputFields = serializeToFields(input);
    const bb = Barretenberg.new();
    const result = await bb.pedersenHash(inputFields.map(i => new FrBarretenberg(i.toBuffer())), // TODO(#4189): remove this stupid conversion
    index);
    return Fr.fromBuffer(Buffer.from(result.toBuffer()));
}
/**
 * Create a pedersen hash from an arbitrary length buffer.
 */
export async function pedersenHashBuffer(input, index = 0) {
    const bb = Barretenberg.new();
    return Buffer.from((await bb.pedersenHashBuffer(input, index)).toBuffer());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkZXJzZW4ud2FzbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jcnlwdG8vcGVkZXJzZW4vcGVkZXJzZW4ud2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5RUFBeUU7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1QyxPQUFPLEVBQWtCLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFakY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxjQUFjLENBQUMsS0FBZTtJQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNELEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsbUVBQW1FO0lBQ25FLCtCQUErQjtJQUMvQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FBQyxLQUFrQixFQUFFLEtBQUssR0FBRyxDQUFDO0lBQzlELE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQ2xDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLDZDQUE2QztJQUNyRyxLQUFLLENBQ04sQ0FBQztJQUVGLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsS0FBSyxHQUFHLENBQUM7SUFDL0QsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDN0UsQ0FBQyJ9