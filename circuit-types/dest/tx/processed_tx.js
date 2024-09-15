import { EncryptedNoteTxL2Logs, EncryptedTxL2Logs, PublicDataWrite, TxEffect, TxHash, UnencryptedTxL2Logs, } from '@aztec/circuit-types';
import { Fr, KernelCircuitPublicInputs, makeEmptyProof, } from '@aztec/circuits.js';
/**
 * Used to communicate to the prover which type of circuit to prove
 */
export var PublicKernelType;
(function (PublicKernelType) {
    PublicKernelType["NON_PUBLIC"] = "non-public";
    PublicKernelType["SETUP"] = "setup";
    PublicKernelType["APP_LOGIC"] = "app-logic";
    PublicKernelType["TEARDOWN"] = "teardown";
    PublicKernelType["TAIL"] = "tail";
})(PublicKernelType || (PublicKernelType = {}));
export const AVM_REQUEST = 'AVM';
export function isRevertedTx(tx) {
    return !tx.data.revertCode.isOK();
}
export function partitionReverts(txs) {
    return txs.reduce(({ reverted, nonReverted }, tx) => {
        if (isRevertedTx(tx)) {
            reverted.push(tx);
        }
        else {
            nonReverted.push(tx);
        }
        return { reverted, nonReverted };
    }, { reverted: [], nonReverted: [] });
}
/**
 * Makes a processed tx out of source tx.
 * @param tx - Source tx.
 * @param kernelOutput - Output of the kernel circuit simulation for this tx.
 * @param proof - Proof of the kernel circuit for this tx.
 */
export function makeProcessedTx(tx, kernelOutput, proof, publicProvingRequests, revertReason, gasUsed = {}, finalPublicDataUpdateRequests) {
    return {
        hash: tx.getTxHash(),
        data: kernelOutput,
        proof,
        // TODO(4712): deal with non-revertible logs here
        noteEncryptedLogs: tx.noteEncryptedLogs,
        encryptedLogs: tx.encryptedLogs,
        unencryptedLogs: tx.unencryptedLogs,
        isEmpty: false,
        revertReason,
        publicProvingRequests,
        gasUsed,
        finalPublicDataUpdateRequests: finalPublicDataUpdateRequests ?? kernelOutput.end.publicDataUpdateRequests,
    };
}
/**
 * Makes a padding empty tx with a valid proof.
 * @returns A valid padding processed tx.
 */
export function makePaddingProcessedTx(kernelOutput) {
    const hash = new TxHash(Fr.ZERO.toBuffer());
    return {
        hash,
        noteEncryptedLogs: EncryptedNoteTxL2Logs.empty(),
        encryptedLogs: EncryptedTxL2Logs.empty(),
        unencryptedLogs: UnencryptedTxL2Logs.empty(),
        data: kernelOutput.inputs,
        proof: kernelOutput.proof.binaryProof,
        isEmpty: true,
        revertReason: undefined,
        publicProvingRequests: [],
        gasUsed: {},
        finalPublicDataUpdateRequests: [],
        verificationKey: kernelOutput.verificationKey,
        recursiveProof: kernelOutput.proof,
    };
}
/**
 * Makes an empty tx from an empty kernel circuit public inputs.
 * @returns A processed empty tx.
 */
export function makeEmptyProcessedTx(header, chainId, version, vkTreeRoot) {
    const emptyKernelOutput = KernelCircuitPublicInputs.empty();
    emptyKernelOutput.constants.historicalHeader = header;
    emptyKernelOutput.constants.txContext.chainId = chainId;
    emptyKernelOutput.constants.txContext.version = version;
    emptyKernelOutput.constants.vkTreeRoot = vkTreeRoot;
    const emptyProof = makeEmptyProof();
    const hash = new TxHash(Fr.ZERO.toBuffer());
    return {
        hash,
        noteEncryptedLogs: EncryptedNoteTxL2Logs.empty(),
        encryptedLogs: EncryptedTxL2Logs.empty(),
        unencryptedLogs: UnencryptedTxL2Logs.empty(),
        data: emptyKernelOutput,
        proof: emptyProof,
        isEmpty: true,
        revertReason: undefined,
        publicProvingRequests: [],
        gasUsed: {},
        finalPublicDataUpdateRequests: [],
    };
}
export function toTxEffect(tx, gasFees) {
    return new TxEffect(tx.data.revertCode, tx.data.getTransactionFee(gasFees), tx.data.end.noteHashes.filter(h => !h.isZero()), tx.data.end.nullifiers.filter(h => !h.isZero()), tx.data.end.l2ToL1Msgs.filter(h => !h.isZero()), tx.finalPublicDataUpdateRequests.map(t => new PublicDataWrite(t.leafSlot, t.newValue)).filter(h => !h.isEmpty()), tx.data.end.noteEncryptedLogPreimagesLength, tx.data.end.encryptedLogPreimagesLength, tx.data.end.unencryptedLogPreimagesLength, tx.noteEncryptedLogs || EncryptedNoteTxL2Logs.empty(), tx.encryptedLogs || EncryptedTxL2Logs.empty(), tx.unencryptedLogs || UnencryptedTxL2Logs.empty());
}
function validateProcessedTxLogs(tx) {
    const noteEncryptedLogs = tx.noteEncryptedLogs || EncryptedNoteTxL2Logs.empty();
    let kernelHash = tx.data.end.noteEncryptedLogsHash;
    let referenceHash = Fr.fromBuffer(noteEncryptedLogs.hash());
    if (!referenceHash.equals(kernelHash)) {
        throw new Error(`Note encrypted logs hash mismatch. Expected ${referenceHash.toString()}, got ${kernelHash.toString()}.
             Processed: ${JSON.stringify(noteEncryptedLogs.toJSON())}`);
    }
    const encryptedLogs = tx.encryptedLogs || EncryptedTxL2Logs.empty();
    kernelHash = tx.data.end.encryptedLogsHash;
    referenceHash = Fr.fromBuffer(encryptedLogs.hash());
    if (!referenceHash.equals(kernelHash)) {
        throw new Error(`Encrypted logs hash mismatch. Expected ${referenceHash.toString()}, got ${kernelHash.toString()}.
             Processed: ${JSON.stringify(encryptedLogs.toJSON())}`);
    }
    const unencryptedLogs = tx.unencryptedLogs || UnencryptedTxL2Logs.empty();
    kernelHash = tx.data.end.unencryptedLogsHash;
    referenceHash = Fr.fromBuffer(unencryptedLogs.hash());
    if (!referenceHash.equals(kernelHash)) {
        throw new Error(`Unencrypted logs hash mismatch. Expected ${referenceHash.toString()}, got ${kernelHash.toString()}.
             Processed: ${JSON.stringify(unencryptedLogs.toJSON())}
             Kernel Length: ${tx.data.end.unencryptedLogPreimagesLength}`);
    }
    let referenceLength = new Fr(noteEncryptedLogs.getKernelLength());
    let kernelLength = tx.data.end.noteEncryptedLogPreimagesLength;
    if (!referenceLength.equals(kernelLength)) {
        throw new Error(`Note encrypted logs length mismatch. Expected ${referenceLength.toString()}, got ${kernelLength.toString()}.
             Processed: ${JSON.stringify(noteEncryptedLogs.toJSON())}`);
    }
    referenceLength = new Fr(encryptedLogs.getKernelLength());
    kernelLength = tx.data.end.encryptedLogPreimagesLength;
    if (!referenceLength.equals(kernelLength)) {
        throw new Error(`Encrypted logs length mismatch. Expected ${referenceLength.toString()}, got ${kernelLength.toString()}.
             Processed: ${JSON.stringify(encryptedLogs.toJSON())}`);
    }
    referenceLength = new Fr(unencryptedLogs.getKernelLength());
    kernelLength = tx.data.end.unencryptedLogPreimagesLength;
    if (!referenceLength.equals(kernelLength)) {
        throw new Error(`Unencrypted logs length mismatch. Expected ${referenceLength.toString()}, got ${kernelLength.toString()}.
             Processed: ${JSON.stringify(unencryptedLogs.toJSON())}`);
    }
}
export function validateProcessedTx(tx) {
    validateProcessedTxLogs(tx);
    // TODO: validate other fields
}
export function mapPublicKernelToCircuitName(kernelType) {
    switch (kernelType) {
        case PublicKernelType.SETUP:
            return 'public-kernel-setup';
        case PublicKernelType.APP_LOGIC:
            return 'public-kernel-app-logic';
        case PublicKernelType.TEARDOWN:
            return 'public-kernel-teardown';
        case PublicKernelType.TAIL:
            return 'public-kernel-tail';
        default:
            throw new Error(`Unknown kernel type: ${kernelType}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2VkX3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R4L3Byb2Nlc3NlZF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixlQUFlLEVBSWYsUUFBUSxFQUNSLE1BQU0sRUFDTixtQkFBbUIsR0FDcEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBRUwsRUFBRSxFQUlGLHlCQUF5QixFQVN6QixjQUFjLEdBQ2YsTUFBTSxvQkFBb0IsQ0FBQztBQUk1Qjs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDMUIsNkNBQXlCLENBQUE7SUFDekIsbUNBQWUsQ0FBQTtJQUNmLDJDQUF1QixDQUFBO0lBQ3ZCLHlDQUFxQixDQUFBO0lBQ3JCLGlDQUFhLENBQUE7QUFDZixDQUFDLEVBTlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQU0zQjtBQWNELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxLQUFjLENBQUM7QUEwRDFDLE1BQU0sVUFBVSxZQUFZLENBQUMsRUFBZTtJQUMxQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFrQjtJQUNqRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQ2YsQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNoQyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQzthQUFNLENBQUM7WUFDTixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUMsRUFDRCxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBeUMsQ0FDekUsQ0FBQztBQUNKLENBQUM7QUFnQkQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUM3QixFQUFNLEVBQ04sWUFBdUMsRUFDdkMsS0FBWSxFQUNaLHFCQUE2QyxFQUM3QyxZQUE4QixFQUM5QixVQUFrQyxFQUFFLEVBQ3BDLDZCQUF5RDtJQUV6RCxPQUFPO1FBQ0wsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDcEIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsS0FBSztRQUNMLGlEQUFpRDtRQUNqRCxpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCO1FBQ3ZDLGFBQWEsRUFBRSxFQUFFLENBQUMsYUFBYTtRQUMvQixlQUFlLEVBQUUsRUFBRSxDQUFDLGVBQWU7UUFDbkMsT0FBTyxFQUFFLEtBQUs7UUFDZCxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLE9BQU87UUFDUCw2QkFBNkIsRUFBRSw2QkFBNkIsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLHdCQUF3QjtLQUMxRyxDQUFDO0FBQ0osQ0FBQztBQU9EOzs7R0FHRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsWUFBc0U7SUFFdEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU87UUFDTCxJQUFJO1FBQ0osaUJBQWlCLEVBQUUscUJBQXFCLENBQUMsS0FBSyxFQUFFO1FBQ2hELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7UUFDeEMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLEtBQUssRUFBRTtRQUM1QyxJQUFJLEVBQUUsWUFBWSxDQUFDLE1BQU07UUFDekIsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsV0FBVztRQUNyQyxPQUFPLEVBQUUsSUFBSTtRQUNiLFlBQVksRUFBRSxTQUFTO1FBQ3ZCLHFCQUFxQixFQUFFLEVBQUU7UUFDekIsT0FBTyxFQUFFLEVBQUU7UUFDWCw2QkFBNkIsRUFBRSxFQUFFO1FBQ2pDLGVBQWUsRUFBRSxZQUFZLENBQUMsZUFBZTtRQUM3QyxjQUFjLEVBQUUsWUFBWSxDQUFDLEtBQUs7S0FDbkMsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsTUFBYyxFQUFFLE9BQVcsRUFBRSxPQUFXLEVBQUUsVUFBYztJQUMzRixNQUFNLGlCQUFpQixHQUFHLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVELGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7SUFDdEQsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3hELGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN4RCxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNwRCxNQUFNLFVBQVUsR0FBRyxjQUFjLEVBQUUsQ0FBQztJQUVwQyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDNUMsT0FBTztRQUNMLElBQUk7UUFDSixpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUU7UUFDaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLEtBQUssRUFBRTtRQUN4QyxlQUFlLEVBQUUsbUJBQW1CLENBQUMsS0FBSyxFQUFFO1FBQzVDLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsS0FBSyxFQUFFLFVBQVU7UUFDakIsT0FBTyxFQUFFLElBQUk7UUFDYixZQUFZLEVBQUUsU0FBUztRQUN2QixxQkFBcUIsRUFBRSxFQUFFO1FBQ3pCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsNkJBQTZCLEVBQUUsRUFBRTtLQUNsQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsRUFBZSxFQUFFLE9BQWdCO0lBQzFELE9BQU8sSUFBSSxRQUFRLENBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNsQixFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFDL0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQy9DLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUMvQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUNoSCxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFDM0MsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQ3ZDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUN6QyxFQUFFLENBQUMsaUJBQWlCLElBQUkscUJBQXFCLENBQUMsS0FBSyxFQUFFLEVBQ3JELEVBQUUsQ0FBQyxhQUFhLElBQUksaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQzdDLEVBQUUsQ0FBQyxlQUFlLElBQUksbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQ2xELENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxFQUFlO0lBQzlDLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixJQUFJLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0lBQ25ELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ2IsK0NBQStDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFOzBCQUNqRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FDakUsQ0FBQztJQUNKLENBQUM7SUFDRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxJQUFJLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BFLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQyxhQUFhLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFOzBCQUM1RSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQzdELENBQUM7SUFDSixDQUFDO0lBQ0QsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLGVBQWUsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDN0MsYUFBYSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxNQUFNLElBQUksS0FBSyxDQUNiLDRDQUE0QyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRTswQkFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7OEJBQ3BDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLENBQ3BFLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNsRSxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztJQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQzFDLE1BQU0sSUFBSSxLQUFLLENBQ2IsaURBQWlELGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFOzBCQUN2RixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FDakUsQ0FBQztJQUNKLENBQUM7SUFDRCxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDMUQsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FDYiw0Q0FBNEMsZUFBZSxDQUFDLFFBQVEsRUFBRSxTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUU7MEJBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FDN0QsQ0FBQztJQUNKLENBQUM7SUFDRCxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDNUQsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0lBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FBOEMsZUFBZSxDQUFDLFFBQVEsRUFBRSxTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUU7MEJBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FDL0QsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEVBQWU7SUFDakQsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsOEJBQThCO0FBQ2hDLENBQUM7QUFFRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsVUFBdUM7SUFDbEYsUUFBUSxVQUFVLEVBQUUsQ0FBQztRQUNuQixLQUFLLGdCQUFnQixDQUFDLEtBQUs7WUFDekIsT0FBTyxxQkFBcUIsQ0FBQztRQUMvQixLQUFLLGdCQUFnQixDQUFDLFNBQVM7WUFDN0IsT0FBTyx5QkFBeUIsQ0FBQztRQUNuQyxLQUFLLGdCQUFnQixDQUFDLFFBQVE7WUFDNUIsT0FBTyx3QkFBd0IsQ0FBQztRQUNsQyxLQUFLLGdCQUFnQixDQUFDLElBQUk7WUFDeEIsT0FBTyxvQkFBb0IsQ0FBQztRQUM5QjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztBQUNILENBQUMifQ==