export declare const randomBytes: (len: number) => Buffer;
/**
 * Generate a random integer less than max.
 * @param max - The maximum value.
 * @returns A random integer.
 *
 * TODO(#3949): This is insecure as it's modulo biased. Nuke or safeguard before mainnet.
 */
export declare const randomInt: (max: number) => number;
/**
 * Generate a random bigint less than max.
 * @param max - The maximum value.
 * @returns A random bigint.
 *
 * TODO(#3949): This is insecure as it's modulo biased. Nuke or safeguard before mainnet.
 */
export declare const randomBigInt: (max: bigint) => bigint;
//# sourceMappingURL=index.d.ts.map