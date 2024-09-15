import { type AuthWitness, type PXE, type TxExecutionRequest } from '@aztec/circuit-types';
import { type CompleteAddress, type Fq, type Fr } from '@aztec/circuits.js';
import { type EntrypointInterface, type ExecutionRequestInit } from '../entrypoint/entrypoint.js';
import { type IntentAction, type IntentInnerHash } from '../utils/authwit.js';
import { BaseWallet } from './base_wallet.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SignerlessWallet extends BaseWallet {
    private entrypoint?;
    constructor(pxe: PXE, entrypoint?: EntrypointInterface | undefined);
    createTxExecutionRequest(execution: ExecutionRequestInit): Promise<TxExecutionRequest>;
    getChainId(): Fr;
    getVersion(): Fr;
    getPublicKeysHash(): Fr;
    getCompleteAddress(): CompleteAddress;
    createAuthWit(_intent: Fr | Buffer | IntentInnerHash | IntentAction): Promise<AuthWitness>;
    rotateNullifierKeys(_newNskM: Fq): Promise<void>;
}
//# sourceMappingURL=signerless_wallet.d.ts.map