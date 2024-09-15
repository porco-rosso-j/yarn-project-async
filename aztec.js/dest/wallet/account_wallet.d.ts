import { type AuthWitness, type PXE, type TxExecutionRequest } from '@aztec/circuit-types';
import { AztecAddress, Fq, Fr } from '@aztec/circuits.js';
import { type AccountInterface } from '../account/interface.js';
import { ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
import { type ExecutionRequestInit } from '../entrypoint/entrypoint.js';
import { type IntentAction, type IntentInnerHash } from '../utils/authwit.js';
import { BaseWallet } from './base_wallet.js';
/**
 * A wallet implementation that forwards authentication requests to a provided account.
 */
export declare class AccountWallet extends BaseWallet {
    protected account: AccountInterface;
    constructor(pxe: PXE, account: AccountInterface);
    createTxExecutionRequest(exec: ExecutionRequestInit): Promise<TxExecutionRequest>;
    getChainId(): Fr;
    getVersion(): Fr;
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
    createAuthWit(messageHashOrIntent: Fr | Buffer | IntentAction | IntentInnerHash): Promise<AuthWitness>;
    /**
     * Returns a function interaction to set a message hash as authorized or revoked in this account.
     *
     * Public calls can then consume this authorization.
     *
     * @param messageHashOrIntent - The message hash or intent to authorize/revoke
     * @param authorized - True to authorize, false to revoke authorization.
     * @returns - A function interaction.
     */
    setPublicAuthWit(messageHashOrIntent: Fr | Buffer | IntentInnerHash | IntentAction, authorized: boolean): Promise<ContractFunctionInteraction>;
    private getInnerHashAndConsumer;
    /**
     * Returns the message hash for the given intent
     *
     * @param intent - A tuple of (consumer and inner hash) or (caller and action)
     * @returns The message hash
     */
    private getMessageHash;
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
    lookupValidity(onBehalfOf: AztecAddress, intent: IntentInnerHash | IntentAction): Promise<{
        /** boolean flag indicating if the authwit is valid in private context */
        isValidInPrivate: boolean;
        /** boolean flag indicating if the authwit is valid in public context */
        isValidInPublic: boolean;
    }>;
    /**
     * Rotates the account master nullifier key pair.
     * @param newNskM - The new master nullifier secret key we want to use.
     * @remarks - This function also calls the canonical key registry with the account's new derived master nullifier public key.
     * We are doing it this way to avoid user error, in the case that a user rotates their keys in the key registry,
     * but fails to do so in the key store. This leads to unspendable notes.
     *
     * This does not hinder our ability to spend notes tied to a previous master nullifier public key, provided we have the master nullifier secret key for it.
     */
    rotateNullifierKeys(newNskM?: Fq): Promise<void>;
    /** Returns the complete address of the account that implements this wallet. */
    getCompleteAddress(): import("@aztec/circuit-types").CompleteAddress;
    /** Returns the address of the account that implements this wallet. */
    getAddress(): AztecAddress;
    private getSetAuthorizedAbi;
    private getLookupValidityAbi;
    private getIsConsumableAbi;
    private getRotateNpkMAbi;
}
//# sourceMappingURL=account_wallet.d.ts.map