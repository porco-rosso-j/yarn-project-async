import { type PXE, type TxHash, type TxReceipt } from '@aztec/circuit-types';
import { type FieldsOf } from '@aztec/foundation/types';
import { type Wallet } from '../account/index.js';
import { SentTx, type WaitOpts } from '../contract/index.js';
/** Extends a transaction receipt with a wallet instance for the newly deployed contract. */
export type DeployAccountTxReceipt = FieldsOf<TxReceipt> & {
    /** Wallet that corresponds to the newly deployed account contract. */
    wallet: Wallet;
};
/**
 * A deployment transaction for an account contract sent to the network, extending SentTx with methods to get the resulting wallet.
 */
export declare class DeployAccountSentTx extends SentTx {
    private getWalletPromise;
    constructor(pxe: PXE, txHashPromise: Promise<TxHash>, getWalletPromise: Promise<Wallet>);
    /**
     * Awaits for the tx to be mined and returns the contract instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The deployed contract instance.
     */
    getWallet(opts?: WaitOpts): Promise<Wallet>;
    /**
     * Awaits for the tx to be mined and returns the receipt along with a wallet instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The transaction receipt with the wallet for the deployed account contract.
     */
    wait(opts?: WaitOpts): Promise<DeployAccountTxReceipt>;
}
//# sourceMappingURL=deploy_account_sent_tx.d.ts.map