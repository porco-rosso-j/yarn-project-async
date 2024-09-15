// import {
//   AztecAddress,
//   CallRequest,
//   GasSettings,
//   LogHash,
//   MAX_NULLIFIERS_PER_TX,
//   MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX,
//   Nullifier,
//   PartialPrivateTailPublicInputsForPublic,
//   PrivateKernelTailCircuitPublicInputs,
//   PublicAccumulatedDataBuilder,
//   PublicCallRequest,
//   computeContractClassId,
//   getContractClassFromArtifact,
//   makeEmptyProof,
// } from '@aztec/circuits.js';
// import {
//   makeCombinedAccumulatedData,
//   makeCombinedConstantData,
//   makePublicCallRequest,
// } from '@aztec/circuits.js/testing';
// import { type ContractArtifact, NoteSelector } from '@aztec/foundation/abi';
// import { makeTuple } from '@aztec/foundation/array';
// import { times } from '@aztec/foundation/collection';
// import { randomBytes } from '@aztec/foundation/crypto';
// import { Fr } from '@aztec/foundation/fields';
// import { type ContractInstanceWithAddress, SerializableContractInstance } from '@aztec/types/contracts';
export {};
// import { EncryptedNoteTxL2Logs, EncryptedTxL2Logs, Note, UnencryptedTxL2Logs } from './logs/index.js';
// import { ExtendedNote } from './notes/index.js';
// import { NestedProcessReturnValues, PublicSimulationOutput, SimulatedTx, Tx, TxHash } from './tx/index.js';
// export const randomTxHash = (): TxHash => new TxHash(randomBytes(32));
// export const mockTx = (
//   seed = 1,
//   {
//     hasLogs = false,
//     numberOfNonRevertiblePublicCallRequests = MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX / 2,
//     numberOfRevertiblePublicCallRequests = MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX / 2,
//     publicCallRequests = [],
//     publicTeardownCallRequest = PublicCallRequest.empty(),
//     feePayer = AztecAddress.ZERO,
//   }: {
//     hasLogs?: boolean;
//     numberOfNonRevertiblePublicCallRequests?: number;
//     numberOfRevertiblePublicCallRequests?: number;
//     publicCallRequests?: PublicCallRequest[];
//     publicTeardownCallRequest?: PublicCallRequest;
//     feePayer?: AztecAddress;
//   } = {},
// ) => {
//   const totalPublicCallRequests =
//     numberOfNonRevertiblePublicCallRequests + numberOfRevertiblePublicCallRequests || publicCallRequests.length;
//   if (publicCallRequests.length && publicCallRequests.length !== totalPublicCallRequests) {
//     throw new Error(
//       `Provided publicCallRequests does not match the required number of call requests. Expected ${totalPublicCallRequests}. Got ${publicCallRequests.length}`,
//     );
//   }
//   const isForPublic = totalPublicCallRequests > 0 || publicTeardownCallRequest.isEmpty() === false;
//   const data = PrivateKernelTailCircuitPublicInputs.empty();
//   const firstNullifier = new Nullifier(new Fr(seed + 1), 0, Fr.ZERO);
//   const noteEncryptedLogs = EncryptedNoteTxL2Logs.empty(); // Mock seems to have no new notes => no note logs
//   const encryptedLogs = hasLogs ? EncryptedTxL2Logs.random(2, 3) : EncryptedTxL2Logs.empty(); // 2 priv function invocations creating 3 encrypted logs each
//   const unencryptedLogs = hasLogs ? UnencryptedTxL2Logs.random(2, 1) : UnencryptedTxL2Logs.empty(); // 2 priv function invocations creating 1 unencrypted log each
//   data.constants.txContext.gasSettings = GasSettings.default();
//   data.feePayer = feePayer;
//   if (isForPublic) {
//     data.forRollup = undefined;
//     data.forPublic = PartialPrivateTailPublicInputsForPublic.empty();
//     publicCallRequests = publicCallRequests.length
//       ? publicCallRequests.slice().sort((a, b) => b.sideEffectCounter - a.sideEffectCounter)
//       : times(totalPublicCallRequests, i => makePublicCallRequest(seed + 0x100 + i));
//     const revertibleBuilder = new PublicAccumulatedDataBuilder();
//     const nonRevertibleBuilder = new PublicAccumulatedDataBuilder();
//     const nonRevertibleNullifiers = makeTuple(MAX_NULLIFIERS_PER_TX, Nullifier.empty);
//     nonRevertibleNullifiers[0] = firstNullifier;
//     data.forPublic.endNonRevertibleData = nonRevertibleBuilder
//       .withNullifiers(nonRevertibleNullifiers)
//       .withPublicCallStack(
//         makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, i =>
//           i < numberOfNonRevertiblePublicCallRequests
//             ? await publicCallRequests[numberOfRevertiblePublicCallRequests + i].toCallRequest()
//             : CallRequest.empty(),
//         ),
//       )
//       .build();
//     data.forPublic.end = revertibleBuilder
//       .withPublicCallStack(
//         makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, i =>
//           i < numberOfRevertiblePublicCallRequests ? publicCallRequests[i].toCallRequest() : CallRequest.empty(),
//         ),
//       )
//       .build();
//     data.forPublic.publicTeardownCallStack = makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_TX, () => CallRequest.empty());
//     data.forPublic.publicTeardownCallStack[0] = publicTeardownCallRequest.isEmpty()
//       ? CallRequest.empty()
//       : publicTeardownCallRequest.toCallRequest();
//     if (hasLogs) {
//       let i = 1; // 0 used in first nullifier
//       let nonRevertibleIndex = 0;
//       let revertibleIndex = 0;
//       let functionCount = 0;
//       encryptedLogs.functionLogs.forEach(functionLog => {
//         functionLog.logs.forEach(log => {
//           // ts complains if we dont check .forPublic here, even though it is defined ^
//           if (data.forPublic) {
//             const hash = new LogHash(
//               Fr.fromBuffer(log.getSiloedHash()),
//               i++,
//               // +4 for encoding the length of the buffer
//               new Fr(log.length + 4),
//             );
//             // make the first log non-revertible
//             if (functionCount === 0) {
//               data.forPublic.endNonRevertibleData.encryptedLogsHashes[nonRevertibleIndex++] = hash;
//             } else {
//               data.forPublic.end.encryptedLogsHashes[revertibleIndex++] = hash;
//             }
//           }
//         });
//         functionCount++;
//       });
//       nonRevertibleIndex = 0;
//       revertibleIndex = 0;
//       functionCount = 0;
//       unencryptedLogs.functionLogs.forEach(functionLog => {
//         functionLog.logs.forEach(log => {
//           if (data.forPublic) {
//             const hash = new LogHash(
//               Fr.fromBuffer(log.getSiloedHash()),
//               i++,
//               // +4 for encoding the length of the buffer
//               new Fr(log.length + 4),
//             );
//             // make the first log non-revertible
//             if (functionCount === 0) {
//               data.forPublic.endNonRevertibleData.unencryptedLogsHashes[nonRevertibleIndex++] = hash;
//             } else {
//               data.forPublic.end.unencryptedLogsHashes[revertibleIndex++] = hash;
//             }
//           }
//         });
//         functionCount++;
//       });
//     }
//   } else {
//     data.forRollup!.end.nullifiers[0] = firstNullifier.value;
//     data.forRollup!.end.noteEncryptedLogsHash = Fr.fromBuffer(noteEncryptedLogs.hash());
//     data.forRollup!.end.encryptedLogsHash = Fr.fromBuffer(encryptedLogs.hash());
//     data.forRollup!.end.unencryptedLogsHash = Fr.fromBuffer(unencryptedLogs.hash());
//   }
//   const tx = new Tx(
//     data,
//     makeEmptyProof(),
//     noteEncryptedLogs,
//     encryptedLogs,
//     unencryptedLogs,
//     publicCallRequests,
//     publicTeardownCallRequest,
//   );
//   return tx;
// };
// export const mockTxForRollup = (seed = 1, { hasLogs = false }: { hasLogs?: boolean } = {}) =>
//   mockTx(seed, { hasLogs, numberOfNonRevertiblePublicCallRequests: 0, numberOfRevertiblePublicCallRequests: 0 });
// export const mockSimulatedTx = (seed = 1, hasLogs = true) => {
//   const tx = mockTx(seed, { hasLogs });
//   const dec = new NestedProcessReturnValues([new Fr(1n), new Fr(2n), new Fr(3n), new Fr(4n)]);
//   const output = new PublicSimulationOutput(
//     tx.encryptedLogs,
//     tx.unencryptedLogs,
//     undefined,
//     makeCombinedConstantData(),
//     makeCombinedAccumulatedData(),
//     [dec],
//     {},
//   );
//   return new SimulatedTx(tx, dec, output);
// };
// export const randomContractArtifact = (): ContractArtifact => ({
//   name: randomBytes(4).toString('hex'),
//   functions: [],
//   outputs: {
//     structs: {},
//     globals: {},
//   },
//   fileMap: {},
//   storageLayout: {},
//   notes: {},
// });
// export const randomContractInstanceWithAddress = (
//   opts: { contractClassId?: Fr } = {},
//   address: AztecAddress = AztecAddress.random(),
// ): ContractInstanceWithAddress => SerializableContractInstance.random(opts).withAddress(address);
// export const randomDeployedContract = async () => {
//   const artifact = randomContractArtifact();
//   const contractClassId = await computeContractClassId(await getContractClassFromArtifact(artifact));
//   return { artifact, instance: randomContractInstanceWithAddress({ contractClassId }) };
// };
// export const randomExtendedNote = ({
//   note = Note.random(),
//   owner = AztecAddress.random(),
//   contractAddress = AztecAddress.random(),
//   txHash = randomTxHash(),
//   storageSlot = Fr.random(),
//   noteTypeId = NoteSelector.random(),
// }: Partial<ExtendedNote> = {}) => {
//   return new ExtendedNote(note, owner, contractAddress, storageSlot, noteTypeId, txHash);
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbW9ja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVztBQUNYLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYiwyQkFBMkI7QUFDM0IseUNBQXlDO0FBQ3pDLGVBQWU7QUFDZiw2Q0FBNkM7QUFDN0MsMENBQTBDO0FBQzFDLGtDQUFrQztBQUNsQyx1QkFBdUI7QUFDdkIsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyxvQkFBb0I7QUFDcEIsK0JBQStCO0FBQy9CLFdBQVc7QUFDWCxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCLDJCQUEyQjtBQUMzQix1Q0FBdUM7QUFDdkMsK0VBQStFO0FBQy9FLHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFDeEQsMERBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCwyR0FBMkc7O0FBRTNHLHlHQUF5RztBQUN6RyxtREFBbUQ7QUFDbkQsOEdBQThHO0FBRTlHLHlFQUF5RTtBQUV6RSwwQkFBMEI7QUFDMUIsY0FBYztBQUNkLE1BQU07QUFDTix1QkFBdUI7QUFDdkIseUZBQXlGO0FBQ3pGLHNGQUFzRjtBQUN0RiwrQkFBK0I7QUFDL0IsNkRBQTZEO0FBQzdELG9DQUFvQztBQUNwQyxTQUFTO0FBQ1QseUJBQXlCO0FBQ3pCLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQsZ0RBQWdEO0FBQ2hELHFEQUFxRDtBQUNyRCwrQkFBK0I7QUFDL0IsWUFBWTtBQUNaLFNBQVM7QUFDVCxvQ0FBb0M7QUFDcEMsbUhBQW1IO0FBQ25ILDhGQUE4RjtBQUM5Rix1QkFBdUI7QUFDdkIsa0tBQWtLO0FBQ2xLLFNBQVM7QUFDVCxNQUFNO0FBRU4sc0dBQXNHO0FBQ3RHLCtEQUErRDtBQUMvRCx3RUFBd0U7QUFDeEUsZ0hBQWdIO0FBQ2hILDhKQUE4SjtBQUM5SixxS0FBcUs7QUFDckssa0VBQWtFO0FBQ2xFLDhCQUE4QjtBQUU5Qix1QkFBdUI7QUFDdkIsa0NBQWtDO0FBQ2xDLHdFQUF3RTtBQUV4RSxxREFBcUQ7QUFDckQsK0ZBQStGO0FBQy9GLHdGQUF3RjtBQUV4RixvRUFBb0U7QUFDcEUsdUVBQXVFO0FBRXZFLHlGQUF5RjtBQUN6RixtREFBbUQ7QUFFbkQsaUVBQWlFO0FBQ2pFLGlEQUFpRDtBQUNqRCw4QkFBOEI7QUFDOUIsOERBQThEO0FBQzlELHdEQUF3RDtBQUN4RCxtR0FBbUc7QUFDbkcscUNBQXFDO0FBQ3JDLGFBQWE7QUFDYixVQUFVO0FBQ1Ysa0JBQWtCO0FBRWxCLDZDQUE2QztBQUM3Qyw4QkFBOEI7QUFDOUIsOERBQThEO0FBQzlELG9IQUFvSDtBQUNwSCxhQUFhO0FBQ2IsVUFBVTtBQUNWLGtCQUFrQjtBQUVsQiwwSEFBMEg7QUFDMUgsc0ZBQXNGO0FBQ3RGLDhCQUE4QjtBQUM5QixxREFBcUQ7QUFFckQscUJBQXFCO0FBQ3JCLGdEQUFnRDtBQUNoRCxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLCtCQUErQjtBQUMvQiw0REFBNEQ7QUFDNUQsNENBQTRDO0FBQzVDLDBGQUEwRjtBQUMxRixrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLG9EQUFvRDtBQUNwRCxxQkFBcUI7QUFDckIsNERBQTREO0FBQzVELHdDQUF3QztBQUN4QyxpQkFBaUI7QUFDakIsbURBQW1EO0FBQ25ELHlDQUF5QztBQUN6QyxzR0FBc0c7QUFDdEcsdUJBQXVCO0FBQ3ZCLGtGQUFrRjtBQUNsRixnQkFBZ0I7QUFDaEIsY0FBYztBQUNkLGNBQWM7QUFDZCwyQkFBMkI7QUFDM0IsWUFBWTtBQUNaLGdDQUFnQztBQUNoQyw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLDhEQUE4RDtBQUM5RCw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLHdDQUF3QztBQUN4QyxvREFBb0Q7QUFDcEQscUJBQXFCO0FBQ3JCLDREQUE0RDtBQUM1RCx3Q0FBd0M7QUFDeEMsaUJBQWlCO0FBQ2pCLG1EQUFtRDtBQUNuRCx5Q0FBeUM7QUFDekMsd0dBQXdHO0FBQ3hHLHVCQUF1QjtBQUN2QixvRkFBb0Y7QUFDcEYsZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZCxjQUFjO0FBQ2QsMkJBQTJCO0FBQzNCLFlBQVk7QUFDWixRQUFRO0FBQ1IsYUFBYTtBQUNiLGdFQUFnRTtBQUNoRSwyRkFBMkY7QUFDM0YsbUZBQW1GO0FBQ25GLHVGQUF1RjtBQUN2RixNQUFNO0FBRU4sdUJBQXVCO0FBQ3ZCLFlBQVk7QUFDWix3QkFBd0I7QUFDeEIseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQix1QkFBdUI7QUFDdkIsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxPQUFPO0FBRVAsZUFBZTtBQUNmLEtBQUs7QUFFTCxnR0FBZ0c7QUFDaEcsb0hBQW9IO0FBRXBILGlFQUFpRTtBQUNqRSwwQ0FBMEM7QUFDMUMsaUdBQWlHO0FBQ2pHLCtDQUErQztBQUMvQyx3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQixrQ0FBa0M7QUFDbEMscUNBQXFDO0FBQ3JDLGFBQWE7QUFDYixVQUFVO0FBQ1YsT0FBTztBQUNQLDZDQUE2QztBQUM3QyxLQUFLO0FBRUwsbUVBQW1FO0FBQ25FLDBDQUEwQztBQUMxQyxtQkFBbUI7QUFDbkIsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkIsT0FBTztBQUNQLGlCQUFpQjtBQUNqQix1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLE1BQU07QUFFTixxREFBcUQ7QUFDckQseUNBQXlDO0FBQ3pDLG1EQUFtRDtBQUNuRCxvR0FBb0c7QUFFcEcsc0RBQXNEO0FBQ3RELCtDQUErQztBQUMvQyx3R0FBd0c7QUFDeEcsMkZBQTJGO0FBQzNGLEtBQUs7QUFFTCx1Q0FBdUM7QUFDdkMsMEJBQTBCO0FBQzFCLG1DQUFtQztBQUNuQyw2Q0FBNkM7QUFDN0MsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQix3Q0FBd0M7QUFDeEMsc0NBQXNDO0FBQ3RDLDRGQUE0RjtBQUM1RixLQUFLIn0=