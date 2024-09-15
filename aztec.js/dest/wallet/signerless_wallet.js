import { DefaultEntrypoint } from '../entrypoint/default_entrypoint.js';
import { BaseWallet } from './base_wallet.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SignerlessWallet extends BaseWallet {
    constructor(pxe, entrypoint) {
        super(pxe);
        this.entrypoint = entrypoint;
    }
    async createTxExecutionRequest(execution) {
        let entrypoint = this.entrypoint;
        if (!entrypoint) {
            const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
            entrypoint = new DefaultEntrypoint(chainId, protocolVersion);
        }
        return entrypoint.createTxExecutionRequest(execution);
    }
    getChainId() {
        throw new Error('SignerlessWallet: Method getChainId not implemented.');
    }
    getVersion() {
        throw new Error('SignerlessWallet: Method getVersion not implemented.');
    }
    getPublicKeysHash() {
        throw new Error('SignerlessWallet: Method getPublicKeysHash not implemented.');
    }
    getCompleteAddress() {
        throw new Error('SignerlessWallet: Method getCompleteAddress not implemented.');
    }
    createAuthWit(_intent) {
        throw new Error('SignerlessWallet: Method createAuthWit not implemented.');
    }
    rotateNullifierKeys(_newNskM) {
        throw new Error('SignerlessWallet: Method rotateNullifierKeys not implemented.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmVybGVzc193YWxsZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FsbGV0L3NpZ25lcmxlc3Nfd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU5Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxVQUFVO0lBQzlDLFlBQVksR0FBUSxFQUFVLFVBQWdDO1FBQzVELEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQURpQixlQUFVLEdBQVYsVUFBVSxDQUFzQjtJQUU5RCxDQUFDO0lBQ0QsS0FBSyxDQUFDLHdCQUF3QixDQUFDLFNBQStCO1FBQzVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xFLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsT0FBTyxVQUFVLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQXFEO1FBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsUUFBWTtRQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNGIn0=