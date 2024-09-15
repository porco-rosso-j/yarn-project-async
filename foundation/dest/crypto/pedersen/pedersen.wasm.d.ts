import { Fr } from '../../fields/fields.js';
import { type Fieldable } from '../../serialize/serialize.js';
/**
 * Create a pedersen commitment (point) from an array of input fields.
 * Left pads any inputs less than 32 bytes.
 */
export declare function pedersenCommit(input: Buffer[]): Promise<Buffer[]>;
/**
 * Create a pedersen hash (field) from an array of input fields.
 * @param input - The input fieldables to hash.
 * @param index - The separator index to use for the hash.
 * @returns The pedersen hash.
 */
export declare function pedersenHash(input: Fieldable[], index?: number): Promise<Fr>;
/**
 * Create a pedersen hash from an arbitrary length buffer.
 */
export declare function pedersenHashBuffer(input: Buffer, index?: number): Promise<Buffer>;
//# sourceMappingURL=pedersen.wasm.d.ts.map