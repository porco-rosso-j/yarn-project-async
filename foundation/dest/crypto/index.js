import { BarretenbergSync } from '@aztec/bb.js';
export * from './keccak/index.js';
export * from './random/index.js';
export * from './sha256/index.js';
export * from './sha512/index.js';
export * from './pedersen/index.js';
export * from './poseidon/index.js';
/**
 * Init the bb singleton. This constructs (if not already) the barretenberg sync api within bb.js itself.
 * It takes about 100-200ms to initialize. It may not seem like much, but when in conjunction with many other things
 * initializing, developers may want to pick precisely when to incur this cost.
 * If in a test environment, we'll just do it on module load.
 */
export async function init() {
    await BarretenbergSync.initSingleton();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRCxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyxxQkFBcUIsQ0FBQztBQUVwQzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSTtJQUN4QixNQUFNLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3pDLENBQUMifQ==