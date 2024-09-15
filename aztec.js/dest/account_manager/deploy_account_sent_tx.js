import { DefaultWaitOpts, SentTx } from '../contract/index.js';
import { waitForAccountSynch } from '../utils/account.js';
/**
 * A deployment transaction for an account contract sent to the network, extending SentTx with methods to get the resulting wallet.
 */
export class DeployAccountSentTx extends SentTx {
    constructor(pxe, txHashPromise, getWalletPromise) {
        super(pxe, txHashPromise);
        this.getWalletPromise = getWalletPromise;
    }
    /**
     * Awaits for the tx to be mined and returns the contract instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The deployed contract instance.
     */
    async getWallet(opts) {
        const receipt = await this.wait(opts);
        return receipt.wallet;
    }
    /**
     * Awaits for the tx to be mined and returns the receipt along with a wallet instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The transaction receipt with the wallet for the deployed account contract.
     */
    async wait(opts = DefaultWaitOpts) {
        const receipt = await super.wait(opts);
        const wallet = await this.getWalletPromise;
        await waitForAccountSynch(this.pxe, wallet.getCompleteAddress(), opts);
        return { ...receipt, wallet };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2FjY291bnRfc2VudF90eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY2NvdW50X21hbmFnZXIvZGVwbG95X2FjY291bnRfc2VudF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBaUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVExRDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxNQUFNO0lBQzdDLFlBQVksR0FBUSxFQUFFLGFBQThCLEVBQVUsZ0JBQWlDO1FBQzdGLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFEa0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtJQUUvRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBZTtRQUNwQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ2EsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFpQixlQUFlO1FBQ3pELE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxNQUFNLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDRiJ9