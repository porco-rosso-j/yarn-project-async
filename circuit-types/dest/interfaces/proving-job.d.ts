import { type AvmCircuitInputs, type BaseOrMergeRollupPublicInputs, type BaseParityInputs, type BaseRollupInputs, type KernelCircuitPublicInputs, type MergeRollupInputs, type NESTED_RECURSIVE_PROOF_LENGTH, type PrivateKernelEmptyInputData, type Proof, type PublicKernelCircuitPublicInputs, type RECURSIVE_PROOF_LENGTH, type RecursiveProof, type RootParityInput, type RootParityInputs, type RootRollupInputs, type RootRollupPublicInputs, type VerificationKeyData } from '@aztec/circuits.js';
import type { PublicKernelNonTailRequest, PublicKernelTailRequest } from '../tx/processed_tx.js';
export type ProofAndVerificationKey = {
    proof: Proof;
    verificationKey: VerificationKeyData;
};
export type PublicInputsAndRecursiveProof<T> = {
    inputs: T;
    proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
    verificationKey: VerificationKeyData;
};
export declare function makePublicInputsAndRecursiveProof<T>(inputs: T, proof: RecursiveProof<typeof NESTED_RECURSIVE_PROOF_LENGTH>, verificationKey: VerificationKeyData): PublicInputsAndRecursiveProof<T>;
export type ProvingJob<T extends ProvingRequest> = {
    id: string;
    request: T;
};
export declare enum ProvingRequestType {
    PRIVATE_KERNEL_EMPTY = 0,
    PUBLIC_VM = 1,
    PUBLIC_KERNEL_NON_TAIL = 2,
    PUBLIC_KERNEL_TAIL = 3,
    BASE_ROLLUP = 4,
    MERGE_ROLLUP = 5,
    ROOT_ROLLUP = 6,
    BASE_PARITY = 7,
    ROOT_PARITY = 8
}
export type ProvingRequest = {
    type: ProvingRequestType.PUBLIC_VM;
    inputs: AvmCircuitInputs;
} | {
    type: ProvingRequestType.PUBLIC_KERNEL_NON_TAIL;
    kernelType: PublicKernelNonTailRequest['type'];
    inputs: PublicKernelNonTailRequest['inputs'];
} | {
    type: ProvingRequestType.PUBLIC_KERNEL_TAIL;
    kernelType: PublicKernelTailRequest['type'];
    inputs: PublicKernelTailRequest['inputs'];
} | {
    type: ProvingRequestType.BASE_PARITY;
    inputs: BaseParityInputs;
} | {
    type: ProvingRequestType.ROOT_PARITY;
    inputs: RootParityInputs;
} | {
    type: ProvingRequestType.BASE_ROLLUP;
    inputs: BaseRollupInputs;
} | {
    type: ProvingRequestType.MERGE_ROLLUP;
    inputs: MergeRollupInputs;
} | {
    type: ProvingRequestType.ROOT_ROLLUP;
    inputs: RootRollupInputs;
} | {
    type: ProvingRequestType.PRIVATE_KERNEL_EMPTY;
    inputs: PrivateKernelEmptyInputData;
};
export type ProvingRequestPublicInputs = {
    [ProvingRequestType.PRIVATE_KERNEL_EMPTY]: PublicInputsAndRecursiveProof<KernelCircuitPublicInputs>;
    [ProvingRequestType.PUBLIC_VM]: ProofAndVerificationKey;
    [ProvingRequestType.PUBLIC_KERNEL_NON_TAIL]: PublicInputsAndRecursiveProof<PublicKernelCircuitPublicInputs>;
    [ProvingRequestType.PUBLIC_KERNEL_TAIL]: PublicInputsAndRecursiveProof<KernelCircuitPublicInputs>;
    [ProvingRequestType.BASE_ROLLUP]: PublicInputsAndRecursiveProof<BaseOrMergeRollupPublicInputs>;
    [ProvingRequestType.MERGE_ROLLUP]: PublicInputsAndRecursiveProof<BaseOrMergeRollupPublicInputs>;
    [ProvingRequestType.ROOT_ROLLUP]: PublicInputsAndRecursiveProof<RootRollupPublicInputs>;
    [ProvingRequestType.BASE_PARITY]: RootParityInput<typeof RECURSIVE_PROOF_LENGTH>;
    [ProvingRequestType.ROOT_PARITY]: RootParityInput<typeof NESTED_RECURSIVE_PROOF_LENGTH>;
};
export type ProvingRequestResult<T extends ProvingRequestType> = ProvingRequestPublicInputs[T];
export interface ProvingJobSource {
    /**
     * Gets the next proving job. `heartbeat` must be called periodically to keep the job alive.
     * @returns The proving job, or undefined if there are no jobs available.
     */
    getProvingJob(): Promise<ProvingJob<ProvingRequest> | undefined>;
    /**
     * Keeps the job alive. If this isn't called regularly then the job will be
     * considered abandoned and re-queued for another consumer to pick up
     * @param jobId The ID of the job to heartbeat.
     */
    heartbeat(jobId: string): Promise<void>;
    /**
     * Resolves a proving job.
     * @param jobId - The ID of the job to resolve.
     * @param result - The result of the proving job.
     */
    resolveProvingJob<T extends ProvingRequestType>(jobId: string, result: ProvingRequestResult<T>): Promise<void>;
    /**
     * Rejects a proving job.
     * @param jobId - The ID of the job to reject.
     * @param reason - The reason for rejecting the job.
     */
    rejectProvingJob(jobId: string, reason: Error): Promise<void>;
}
//# sourceMappingURL=proving-job.d.ts.map