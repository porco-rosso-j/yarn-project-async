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
    const bb = await Barretenberg.new();
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
    const bb = await Barretenberg.new();
    return Fr.fromBuffer(Buffer.from((await bb.pedersenHash(inputFields.map(i => new FrBarretenberg(i.toBuffer())), // TODO(#4189): remove this stupid conversion
    index)).toBuffer()));
}
/**
 * Create a pedersen hash from an arbitrary length buffer.
 */
export async function pedersenHashBuffer(input, index = 0) {
    const bb = await Barretenberg.new();
    return Buffer.from((await bb.pedersenHashBuffer(input, index)).toBuffer());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVkZXJzZW4ud2FzbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jcnlwdG8vcGVkZXJzZW4vcGVkZXJzZW4ud2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5RUFBeUU7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1QyxPQUFPLEVBQWtCLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFakY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxjQUFjLENBQUMsS0FBZTtJQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNELEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxtRUFBbUU7SUFDbkUsK0JBQStCO0lBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLEtBQWtCLEVBQUUsS0FBSyxHQUFHLENBQUM7SUFDOUQsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsTUFBTSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDcEMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUNsQixNQUFNLENBQUMsSUFBSSxDQUNULENBQ0UsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUNuQixXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSw2Q0FBNkM7SUFDckcsS0FBSyxDQUNOLENBQ0YsQ0FBQyxRQUFRLEVBQUUsQ0FDYixDQUNGLENBQUM7QUFDSixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEtBQWEsRUFBRSxLQUFLLEdBQUcsQ0FBQztJQUMvRCxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzdFLENBQUMifQ==