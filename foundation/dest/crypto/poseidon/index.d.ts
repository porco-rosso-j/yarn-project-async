import { Fr } from '../../fields/fields.js';
import { type Fieldable } from '../../serialize/serialize.js';
/**
 * Create a poseidon hash (field) from an array of input fields.
 * @param input - The input fields to hash.
 * @returns The poseidon hash.
 */
export declare function poseidon2Hash(input: Fieldable[]): Promise<Fr>;
/**
 * Runs a Poseidon2 permutation.
 * @param input the input state. Expected to be of size 4.
 * @returns the output state, size 4.
 */
export declare function poseidon2Permutation(input: Fieldable[]): Promise<Fr[]>;
//# sourceMappingURL=index.d.ts.map