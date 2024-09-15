import { type AuthWitness, type EventMetadata, type EventType, type ExtendedNote, type GetUnencryptedLogsResponse, type IncomingNotesFilter, type L2Block, type LogFilter, type OutgoingNotesFilter, type PXE, type PXEInfo, type SimulatedTx, type SyncStatus, type Tx, type TxEffect, type TxExecutionRequest, type TxHash, type TxReceipt } from '@aztec/circuit-types';
import { type NoteProcessorStats } from '@aztec/circuit-types/stats';
import { type AztecAddress, type CompleteAddress, type Fq, type Fr, type PartialAddress, type Point } from '@aztec/circuits.js';
import { type ContractArtifact } from '@aztec/foundation/abi';
import { type ContractClassWithId, type ContractInstanceWithAddress } from '@aztec/types/contracts';
import { type NodeInfo } from '@aztec/types/interfaces';
import { type Wallet } from '../account/wallet.js';
import { type ExecutionRequestInit } from '../entrypoint/entrypoint.js';
import { type IntentAction, type IntentInnerHash } from '../utils/authwit.js';
/**
 * A base class for Wallet implementations
 */
export declare abstract class BaseWallet implements Wallet {
    protected readonly pxe: PXE;
    constructor(pxe: PXE);
    abstract getCompleteAddress(): CompleteAddress;
    abstract getChainId(): Fr;
    abstract getVersion(): Fr;
    abstract createTxExecutionRequest(exec: ExecutionRequestInit): Promise<TxExecutionRequest>;
    abstract createAuthWit(intent: Fr | Buffer | IntentInnerHash | IntentAction): Promise<AuthWitness>;
    abstract rotateNullifierKeys(newNskM: Fq): Promise<void>;
    getAddress(): AztecAddress;
    getContractInstance(address: AztecAddress): Promise<ContractInstanceWithAddress | undefined>;
    getContractClass(id: Fr): Promise<ContractClassWithId | undefined>;
    getContractArtifact(id: Fr): Promise<ContractArtifact | undefined>;
    addCapsule(capsule: Fr[]): Promise<void>;
    registerAccount(secretKey: Fr, partialAddress: PartialAddress): Promise<CompleteAddress>;
    rotateNskM(address: AztecAddress, secretKey: Fq): Promise<void>;
    registerRecipient(account: CompleteAddress): Promise<void>;
    getRegisteredAccounts(): Promise<CompleteAddress[]>;
    getRegisteredAccount(address: AztecAddress): Promise<CompleteAddress | undefined>;
    getRecipients(): Promise<CompleteAddress[]>;
    getRecipient(address: AztecAddress): Promise<CompleteAddress | undefined>;
    registerContract(contract: {
        /** Instance */ instance: ContractInstanceWithAddress;
        /** Associated artifact */ artifact?: ContractArtifact;
    }): Promise<void>;
    registerContractClass(artifact: ContractArtifact): Promise<void>;
    getContracts(): Promise<AztecAddress[]>;
    proveTx(txRequest: TxExecutionRequest, simulatePublic: boolean): Promise<Tx>;
    simulateTx(txRequest: TxExecutionRequest, simulatePublic: boolean, msgSender: AztecAddress): Promise<SimulatedTx>;
    sendTx(tx: Tx): Promise<TxHash>;
    getTxEffect(txHash: TxHash): Promise<TxEffect | undefined>;
    getTxReceipt(txHash: TxHash): Promise<TxReceipt>;
    getIncomingNotes(filter: IncomingNotesFilter): Promise<ExtendedNote[]>;
    getOutgoingNotes(filter: OutgoingNotesFilter): Promise<ExtendedNote[]>;
    getNoteNonces(note: ExtendedNote): Promise<Fr[]>;
    getPublicStorageAt(contract: AztecAddress, storageSlot: Fr): Promise<any>;
    addNote(note: ExtendedNote): Promise<void>;
    addNullifiedNote(note: ExtendedNote): Promise<void>;
    getBlock(number: number): Promise<L2Block | undefined>;
    simulateUnconstrained(functionName: string, args: any[], to: AztecAddress, from?: AztecAddress | undefined): Promise<any>;
    getUnencryptedLogs(filter: LogFilter): Promise<GetUnencryptedLogsResponse>;
    getBlockNumber(): Promise<number>;
    getNodeInfo(): Promise<NodeInfo>;
    isGlobalStateSynchronized(): Promise<boolean>;
    isAccountStateSynchronized(account: AztecAddress): Promise<boolean>;
    getSyncStatus(): Promise<SyncStatus>;
    getSyncStats(): Promise<{
        [key: string]: NoteProcessorStats;
    }>;
    addAuthWitness(authWitness: AuthWitness): Promise<void>;
    getAuthWitness(messageHash: Fr): Promise<Fr[] | undefined>;
    isContractClassPubliclyRegistered(id: Fr): Promise<boolean>;
    isContractPubliclyDeployed(address: AztecAddress): Promise<boolean>;
    getPXEInfo(): Promise<PXEInfo>;
    getEvents<T>(type: EventType, eventMetadata: EventMetadata<T>, from: number, limit: number, vpks?: Point[]): Promise<T[]>;
}
//# sourceMappingURL=base_wallet.d.ts.map