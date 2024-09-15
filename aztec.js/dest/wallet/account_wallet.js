import { AztecAddress, CANONICAL_KEY_REGISTRY_ADDRESS, Fq, Fr, derivePublicKeyFromSecretKey } from '@aztec/circuits.js';
import { FunctionType } from '@aztec/foundation/abi';
import { AuthRegistryAddress } from '@aztec/protocol-contracts/auth-registry';
import { ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
import { computeAuthWitMessageHash, computeInnerAuthWitHashFromAction, } from '../utils/authwit.js';
import { BaseWallet } from './base_wallet.js';
/**
 * A wallet implementation that forwards authentication requests to a provided account.
 */
export class AccountWallet extends BaseWallet {
    constructor(pxe, account) {
        super(pxe);
        this.account = account;
    }
    createTxExecutionRequest(exec) {
        return this.account.createTxExecutionRequest(exec);
    }
    getChainId() {
        return this.account.getChainId();
    }
    getVersion() {
        return this.account.getVersion();
    }
    /**
     * Computes an authentication witness from either a message hash or an intent.
     *
     * If a message hash is provided, it will create a witness for the hash directly.
     * Otherwise, it will compute the message hash using the intent, along with the
     * chain id and the version values provided by the wallet.
     *
     * @param messageHashOrIntent - The message hash of the intent to approve
     * @returns The authentication witness
     */
    async createAuthWit(messageHashOrIntent) {
        let messageHash;
        if (Buffer.isBuffer(messageHashOrIntent)) {
            messageHash = Fr.fromBuffer(messageHashOrIntent);
        }
        else if (messageHashOrIntent instanceof Fr) {
            messageHash = messageHashOrIntent;
        }
        else {
            messageHash = await this.getMessageHash(messageHashOrIntent);
        }
        const witness = await this.account.createAuthWit(messageHash);
        await this.pxe.addAuthWitness(witness);
        return witness;
    }
    /**
     * Returns a function interaction to set a message hash as authorized or revoked in this account.
     *
     * Public calls can then consume this authorization.
     *
     * @param messageHashOrIntent - The message hash or intent to authorize/revoke
     * @param authorized - True to authorize, false to revoke authorization.
     * @returns - A function interaction.
     */
    async setPublicAuthWit(messageHashOrIntent, authorized) {
        let messageHash;
        if (Buffer.isBuffer(messageHashOrIntent)) {
            messageHash = Fr.fromBuffer(messageHashOrIntent);
        }
        else if (messageHashOrIntent instanceof Fr) {
            messageHash = messageHashOrIntent;
        }
        else {
            messageHash = await this.getMessageHash(messageHashOrIntent);
        }
        return new ContractFunctionInteraction(this, AuthRegistryAddress, this.getSetAuthorizedAbi(), [
            messageHash,
            authorized,
        ]);
    }
    async getInnerHashAndConsumer(intent) {
        if ('caller' in intent && 'action' in intent) {
            const action = intent.action instanceof ContractFunctionInteraction ? intent.action.request() : intent.action;
            return {
                innerHash: await computeInnerAuthWitHashFromAction(intent.caller, action),
                consumer: action.to,
            };
        }
        else if (Buffer.isBuffer(intent.innerHash)) {
            return { innerHash: Fr.fromBuffer(intent.innerHash), consumer: intent.consumer };
        }
        return { innerHash: intent.innerHash, consumer: intent.consumer };
    }
    /**
     * Returns the message hash for the given intent
     *
     * @param intent - A tuple of (consumer and inner hash) or (caller and action)
     * @returns The message hash
     */
    async getMessageHash(intent) {
        const chainId = this.getChainId();
        const version = this.getVersion();
        return await computeAuthWitMessageHash(intent, { chainId, version });
    }
    /**
     * Lookup the validity of an authwit in private and public contexts.
     *
     * Uses the chain id and version of the wallet.
     *
     * @param onBehalfOf - The address of the "approver"
     * @param intent - The consumer and inner hash or the caller and action to lookup
     *
     * @returns - A struct containing the validity of the authwit in private and public contexts.
     */
    async lookupValidity(onBehalfOf, intent) {
        const { innerHash, consumer } = await this.getInnerHashAndConsumer(intent);
        const messageHash = await this.getMessageHash(intent);
        const results = { isValidInPrivate: false, isValidInPublic: false };
        // Check private
        const witness = await this.getAuthWitness(messageHash);
        if (witness !== undefined) {
            results.isValidInPrivate = (await new ContractFunctionInteraction(this, onBehalfOf, this.getLookupValidityAbi(), [
                consumer,
                innerHash,
            ]).simulate());
        }
        // check public
        results.isValidInPublic = (await new ContractFunctionInteraction(this, AuthRegistryAddress, this.getIsConsumableAbi(), [onBehalfOf, messageHash]).simulate());
        return results;
    }
    /**
     * Rotates the account master nullifier key pair.
     * @param newNskM - The new master nullifier secret key we want to use.
     * @remarks - This function also calls the canonical key registry with the account's new derived master nullifier public key.
     * We are doing it this way to avoid user error, in the case that a user rotates their keys in the key registry,
     * but fails to do so in the key store. This leads to unspendable notes.
     *
     * This does not hinder our ability to spend notes tied to a previous master nullifier public key, provided we have the master nullifier secret key for it.
     */
    async rotateNullifierKeys(newNskM = Fq.random()) {
        // We rotate our secret key in the keystore first, because if the subsequent interaction fails, there are no bad side-effects.
        // If vice versa (the key registry is called first), but the call to the PXE fails, we will end up in a situation with unspendable notes, as we have not committed our
        // nullifier secret key to our wallet.
        await this.pxe.rotateNskM(this.getAddress(), newNskM);
        const interaction = new ContractFunctionInteraction(this, AztecAddress.fromBigInt(CANONICAL_KEY_REGISTRY_ADDRESS), this.getRotateNpkMAbi(), [this.getAddress(), (await derivePublicKeyFromSecretKey(newNskM)).toNoirStruct(), Fr.ZERO]);
        await (await interaction.send()).wait();
    }
    /** Returns the complete address of the account that implements this wallet. */
    getCompleteAddress() {
        return this.account.getCompleteAddress();
    }
    /** Returns the address of the account that implements this wallet. */
    getAddress() {
        return this.getCompleteAddress().address;
    }
    getSetAuthorizedAbi() {
        return {
            name: 'set_authorized',
            isInitializer: false,
            functionType: FunctionType.PUBLIC,
            isInternal: true,
            isStatic: false,
            parameters: [
                {
                    name: 'message_hash',
                    type: { kind: 'field' },
                    visibility: 'private',
                },
                {
                    name: 'authorize',
                    type: { kind: 'boolean' },
                    visibility: 'private',
                },
            ],
            returnTypes: [],
        };
    }
    getLookupValidityAbi() {
        return {
            name: 'lookup_validity',
            isInitializer: false,
            functionType: FunctionType.UNCONSTRAINED,
            isInternal: false,
            isStatic: false,
            parameters: [{ name: 'message_hash', type: { kind: 'field' }, visibility: 'private' }],
            returnTypes: [{ kind: 'boolean' }],
        };
    }
    getIsConsumableAbi() {
        return {
            name: 'unconstrained_is_consumable',
            isInitializer: false,
            functionType: FunctionType.UNCONSTRAINED,
            isInternal: false,
            isStatic: false,
            parameters: [
                {
                    name: 'address',
                    type: {
                        fields: [{ name: 'inner', type: { kind: 'field' } }],
                        kind: 'struct',
                        path: 'authwit::aztec::protocol_types::address::aztec_address::AztecAddress',
                    },
                    visibility: 'private',
                },
                { name: 'message_hash', type: { kind: 'field' }, visibility: 'private' },
            ],
            returnTypes: [{ kind: 'boolean' }],
        };
    }
    getRotateNpkMAbi() {
        return {
            name: 'rotate_npk_m',
            isInitializer: false,
            functionType: FunctionType.PUBLIC,
            isInternal: false,
            isStatic: false,
            parameters: [
                {
                    name: 'address',
                    type: {
                        fields: [{ name: 'inner', type: { kind: 'field' } }],
                        kind: 'struct',
                        path: 'authwit::aztec::protocol_types::address::aztec_address::AztecAddress',
                    },
                    visibility: 'private',
                },
                {
                    name: 'new_npk_m',
                    type: {
                        fields: [
                            { name: 'x', type: { kind: 'field' } },
                            { name: 'y', type: { kind: 'field' } },
                            { name: 'is_infinite', type: { kind: 'boolean' } },
                        ],
                        kind: 'struct',
                        path: 'std::embedded_curve_ops::EmbeddedCurvePoint',
                    },
                    visibility: 'private',
                },
                { name: 'nonce', type: { kind: 'field' }, visibility: 'private' },
            ],
            returnTypes: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF93YWxsZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FsbGV0L2FjY291bnRfd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsOEJBQThCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hILE9BQU8sRUFBaUQsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFHOUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFM0YsT0FBTyxFQUdMLHlCQUF5QixFQUN6QixpQ0FBaUMsR0FDbEMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQVU7SUFDM0MsWUFBWSxHQUFRLEVBQVksT0FBeUI7UUFDdkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRG1CLFlBQU8sR0FBUCxPQUFPLENBQWtCO0lBRXpELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxJQUEwQjtRQUNqRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsbUJBQWlFO1FBQ25GLElBQUksV0FBZSxDQUFDO1FBQ3BCLElBQUksTUFBTSxD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