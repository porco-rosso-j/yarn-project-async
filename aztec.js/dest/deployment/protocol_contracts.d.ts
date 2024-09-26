import { UnsafeContract } from '../contract/unsafe_contract.js';
import { type Wallet } from '../wallet/index.js';
/** Returns a Contract wrapper for the class registerer. */
export declare function getRegistererContract(wallet: Wallet): Promise<UnsafeContract>;
/** Returns a Contract wrapper for the instance deployer. */
export declare function getDeployerContract(wallet: Wallet): Promise<UnsafeContract>;
//# sourceMappingURL=protocol_contracts.d.ts.map