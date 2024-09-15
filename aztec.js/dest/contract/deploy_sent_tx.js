import { createDebugLogger } from '@aztec/foundation/log';
import { SentTx } from './sent_tx.js';
/**
 * A contract deployment transaction sent to the network, extending SentTx with methods to create a contract instance.
 */
export class DeploySentTx extends SentTx {
    constructor(wallet, txHashPromise, postDeployCtor, 
    /** The deployed contract instance */
    instance) {
        super(wallet, txHashPromise);
        this.postDeployCtor = postDeployCtor;
        this.instance = instance;
        this.log = createDebugLogger('aztec:js:deploy_sent_tx');
    }
    /**
     * Awaits for the tx to be mined and returns the contract instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The deployed contract instance.
     */
    async deployed(opts) {
        const receipt = await this.wait(opts);
        this.log.info(`Contract ${this.instance.address.toString()} successfully deployed.`);
        return receipt.contract;
    }
    /**
     * Awaits for the tx to be mined and returns the receipt along with a contract instance. Throws if tx is not mined.
     * @param opts - Options for configuring the waiting for the tx to be mined.
     * @returns The transaction receipt with the deployed contract instance.
     */
    async wait(opts) {
        const receipt = await super.wait(opts);
        const contract = await this.getContractObject(opts?.wallet);
        return { ...receipt, contract };
    }
    getContractObject(wallet) {
        const isWallet = (pxe) => !!pxe.createTxExecutionRequest;
        const contractWallet = wallet ?? (isWallet(this.pxe) && this.pxe);
        if (!contractWallet) {
            throw new Error(`A wallet is required for creating a contract instance`);
        }
        return this.postDeployCtor(this.instance.address, contractWallet);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X3NlbnRfdHguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvZGVwbG95X3NlbnRfdHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFPMUQsT0FBTyxFQUFFLE1BQU0sRUFBaUIsTUFBTSxjQUFjLENBQUM7QUFjckQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sWUFBb0QsU0FBUSxNQUFNO0lBRzdFLFlBQ0UsTUFBb0IsRUFDcEIsYUFBOEIsRUFDdEIsY0FBNkU7SUFDckYscUNBQXFDO0lBQzlCLFFBQXFDO1FBRTVDLEtBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFKckIsbUJBQWMsR0FBZCxjQUFjLENBQStEO1FBRTlFLGFBQVEsR0FBUixRQUFRLENBQTZCO1FBUHRDLFFBQUcsR0FBRyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBVTNELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUF1QjtRQUMzQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUNyRixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDYSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQXVCO1FBQ2hELE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUQsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxNQUFlO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBaUIsRUFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFjLENBQUMsd0JBQXdCLENBQUM7UUFDbEcsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBdUIsQ0FBQztJQUMxRixDQUFDO0NBQ0YifQ==