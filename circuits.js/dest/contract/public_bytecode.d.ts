import { type ContractClass } from '@aztec/types/contracts';
/**
 * Packs together a set of public functions for a contract class.
 * @remarks This function should no longer be necessary once we have a single bytecode per contract.
 */
export declare function packBytecode(publicFns: ContractClass['publicFunctions']): Buffer;
/**
 * Unpacks a set of public functions for a contract class from packed bytecode.
 * @remarks This function should no longer be necessary once we have a single bytecode per contract.
 */
export declare function unpackBytecode(buffer: Buffer): ContractClass['publicFunctions'];
//# sourceMappingURL=public_bytecode.d.ts.map