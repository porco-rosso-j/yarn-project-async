import { type AccountInterface, type AuthWitnessProvider } from '@aztec/aztec.js/account';
import { type ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { type AuthWitness, type TxExecutionRequest } from '@aztec/circuit-types';
import { type AztecAddress, type CompleteAddress, Fr } from '@aztec/circuits.js';
import { type NodeInfo } from '@aztec/types/interfaces';
/**
 * Default implementation for an account interface. Requires that the account uses the default
 * entrypoint signature, which accept an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
export declare class DefaultAccountInterface implements AccountInterface {
    private authWitnessProvider;
    private address;
    private entrypoint;
    private chainId;
    private version;
    constructor(authWitnessProvider: AuthWitnessProvider, address: CompleteAddress, nodeInfo: Pick<NodeInfo, 'chainId' | 'protocolVersion'>);
    createTxExecutionRequest(execution: ExecutionRequestInit): Promise<TxExecutionRequest>;
    createAuthWit(messageHash: Fr): Promise<AuthWitness>;
    getCompleteAddress(): CompleteAddress;
    getAddress(): AztecAddress;
    getChainId(): Fr;
    getVersion(): Fr;
}
//# sourceMappingURL=account_interface.d.ts.map