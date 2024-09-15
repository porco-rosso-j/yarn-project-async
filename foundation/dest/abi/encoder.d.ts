import { Fr } from '../fields/index.js';
import { type FunctionAbi } from './abi.js';
/**
 * Encodes all the arguments for a function call.
 * @param abi - The function ABI entry.
 * @param args - The arguments to encode.
 * @returns The encoded arguments.
 */
export declare function encodeArguments(abi: FunctionAbi, args: any[]): Fr[];
/**
 * Returns the size of the arguments for a function ABI.
 * @param abi - The function ABI entry.
 * @returns The size of the arguments.
 */
export declare function countArgumentsSize(abi: FunctionAbi): number;
//# sourceMappingURL=encoder.d.ts.map