import { type PublicInputsAndRecursiveProof, type SimulationError, type Tx, TxEffect, TxHash } from '@aztec/circuit-types';
import { type AvmExecutionHints, Fr, type Gas, type GasFees, type Header, KernelCircuitPublicInputs, type NESTED_RECURSIVE_PROOF_LENGTH, type Proof, type PublicDataUpdateRequest, type PublicKernelCircuitPrivateInputs, type PublicKernelCircuitPublicInputs, type PublicKernelTailCircuitPrivateInputs, type RecursiveProof, type VerificationKeyData } from '@aztec/circuits.js';
import { type CircuitName } from '../stats/stats.js';
/**
 * Used to communicate to the prover which type of circuit to prove
 */
export declare enum PublicKernelType {
    NON_PUBLIC = "non-public",
    SETUP = "setup",
    APP_LOGIC = "app-logic",
    TEARDOWN = "teardown",
    TAIL = "tail"
}
export type PublicKernelTailRequest = {
    type: PublicKernelType.TAIL;
    inputs: PublicKernelTailCircuitPrivateInputs;
};
export type PublicKernelNonTailRequest = {
    type: PublicKernelType.SETUP | PublicKernelType.APP_LOGIC | PublicKernelType.TEARDOWN;
    inputs: PublicKernelCircuitPrivateInputs;
};
export type PublicKernelRequest = PublicKernelTailRequest | PublicKernelNonTailRequest;
export declare const AVM_REQUEST: "AVM";
export type AvmProvingRequest = {
    type: typeof AVM_REQUEST;
    functionName: string;
    bytecode: Buffer;
    calldata: Fr[];
    avmHints: AvmExecutionHints;
    kernelRequest: PublicKernelNonTailRequest;
};
export type PublicProvingRequest = AvmProvingRequest | PublicKernelRequest;
/**
 * Represents a tx that has been processed by the sequencer public processor,
 * so its kernel circuit public inputs are filled in.
 */
export type ProcessedTx = Pick<Tx, 'proof' | 'noteEncryptedLogs' | 'encryptedLogs' | 'unencryptedLogs'> & {
    /**
     * Output of the private tail or public tail kernel circuit for this tx.
     */
    data: KernelCircuitPublicInputs;
    /**
     * Hash of the transaction.
     */
    hash: TxHash;
    /**
     * Flag indicating the tx is 'empty' meaning it's a padding tx to take us to a power of 2.
     */
    isEmpty: boolean;
    /**
     * Reason the tx was reverted.
     */
    revertReason: SimulationError | undefined;
    /**
     * The inputs for AVM and kernel proving.
     */
    publicProvingRequests: PublicProvingRequest[];
    /**
     * Gas usage per public execution phase.
     * Doesn't account for any base costs nor DA gas used in private execution.
     */
    gasUsed: Partial<Record<PublicKernelType, Gas>>;
    /**
     * All public data updates for this transaction, including those created
     * or updated by the protocol, such as balance updates from fee payments.
     */
    finalPublicDataUpdateRequests: PublicDataUpdateRequest[];
};
export type RevertedTx = ProcessedTx & {
    data: PublicKernelCircuitPublicInputs & {
        reverted: true;
    };
    revertReason: SimulationError;
};
export declare function isRevertedTx(tx: ProcessedTx): tx is RevertedTx;
export declare function partitionReverts(txs: ProcessedTx[]): {
    reverted: RevertedTx[];
    nonReverted: ProcessedTx[];
};
/**
 * Represents a tx that failed to be processed by the sequencer public processor.
 */
export type FailedTx = {
    /**
     * The failing transaction.
     */
    tx: Tx;
    /**
     * The error that caused the tx to fail.
     */
    error: Error;
};
/**
 * Makes a processed tx out of source tx.
 * @param tx - Source tx.
 * @param kernelOutput - Output of the kernel circuit simulation for this tx.
 * @param proof - Proof of the kernel circuit for this tx.
 */
export declare function makeProcessedTx(tx: Tx, kernelOutput: KernelCircuitPublicInputs, proof: Proof, publicProvingRequests: PublicProvingRequest[], revertReason?: SimulationError, gasUsed?: ProcessedTx['gasUsed'], finalPublicDataUpdateRequests?: PublicDataUpdateRequest[]): ProcessedTx;
export type PaddingProcessedTx = ProcessedTx & {
    verificationKey: VerificationKeyData;
    recursiveProof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
};
/**
 * Makes a padding empty tx with a valid proof.
 * @returns A valid padding processed tx.
 */
export declare function makePaddingProcessedTx(kernelOutput: PublicInputsAndRecursiveProof<KernelCircuitPublicInputs>): PaddingProcessedTx;
/**
 * Makes an empty tx from an empty kernel circuit public inputs.
 * @returns A processed empty tx.
 */
export declare function makeEmptyProcessedTx(header: Header, chainId: Fr, version: Fr, vkTreeRoot: Fr): ProcessedTx;
export declare function toTxEffect(tx: ProcessedTx, gasFees: GasFees): TxEffect;
export declare function validateProcessedTx(tx: ProcessedTx): void;
export declare function mapPublicKernelToCircuitName(kernelType: PublicKernelRequest['type']): CircuitName;
//# sourceMappingURL=processed_tx.d.ts.map