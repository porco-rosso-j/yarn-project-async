/**
 * This is our public api.
 * Do NOT "export * from ..." here.
 * Everything here should be explicit, to ensure we can clearly see everything we're exposing to the world.
 * If it's exposed, people will use it, and then we can't remove/change the api without breaking client code.
 * At the time of writing we overexpose things that should only be internal.
 *
 * TODO: Review and narrow scope of public api.
 * We should also consider exposing subsections of the api via package.json exports, like we do with foundation.
 * This can allow consumers to import much smaller parts of the library to incur less overhead.
 * It will also allow web bundlers do perform intelligent chunking of bundles etc.
 * Some work as been done on this within the api folder, providing the alternative import style of e.g.:
 * ```typescript
 *   import { TxHash } from '@aztec.js/tx_hash'
 *   import { type ContractArtifact, type FunctionArtifact, FunctionSelector } from '@aztec/aztec.js/abi';
 *   import { AztecAddress } from '@aztec/aztec.js/aztec_address';
 *   import { EthAddress } from '@aztec/aztec.js/eth_address';
 * ```
 *
 * TODO: Ultimately reimplement this mega exporter by mega exporting a granular api (then deprecate it).
 */
export { BatchCall, Contract, ContractBase, ContractFunctionInteraction, DeployMethod, DeploySentTx, SentTx, } from './contract/index.js';
export { ContractDeployer } from './deployment/index.js';
export { CheatCodes, EthCheatCodes, computeAuthWitMessageHash, computeInnerAuthWitHashFromAction, computeInnerAuthWitHash, generatePublicKey, waitForAccountSynch, waitForPXE, } from './utils/index.js';
export { NoteSelector } from '@aztec/foundation/abi';
export { createPXEClient } from './rpc_clients/index.js';
export { AccountManager } from './account_manager/index.js';
export { AccountWallet, AccountWalletWithSecretKey, SignerlessWallet } from './wallet/index.js';
// // TODO https://github.com/AztecProtocol/aztec-packages/issues/2632 --> FunctionSelector might not need to be exposed
// // here once the issue is resolved.
export { AztecAddress, EthAddress, Fq, Fr, GlobalVariables, GrumpkinScalar, INITIAL_L2_BLOCK_NUM, Point, getContractClassFromArtifact, getContractInstanceFromDeployParams, } from '@aztec/circuits.js';
export { computeSecretHash } from '@aztec/circuits.js/hash';
export { computeAppNullifierSecretKey, deriveKeys, deriveMasterIncomingViewingSecretKey, deriveMasterNullifierSecretKey, } from '@aztec/circuits.js/keys';
export { Grumpkin, Schnorr } from '@aztec/circuits.js/barretenberg';
export { AuthWitness, Body, Comparator, CompleteAddress, EncryptedL2BlockL2Logs, EncryptedLogHeader, EncryptedNoteLogIncomingBody, EncryptedLogOutgoingBody, EventType, ExtendedNote, FunctionCall, L1Actor, L1ToL2Message, L2Actor, L2Block, L2BlockL2Logs, EncryptedNoteL2BlockL2Logs, LogId, LogType, MerkleTreeId, Note, PackedValues, SiblingPath, Tx, TxExecutionRequest, TxHash, TxReceipt, TxStatus, UnencryptedL2BlockL2Logs, UnencryptedL2Log, createAztecNodeClient, merkleTreeIds, 
// mockTx,
TaggedLog, L1NotePayload, L1EventPayload, } from '@aztec/circuit-types';
// TODO: These kinds of things have no place on our public api.
// External devs will almost certainly have their own methods of doing these things.
// If we want to use them in our own "aztec.js consuming code", import them from foundation as needed.
export { encodeArguments } from '@aztec/foundation/abi';
export { toBigIntBE } from '@aztec/foundation/bigint-buffer';
export { sha256 } from '@aztec/foundation/crypto';
export { makeFetch } from '@aztec/foundation/json-rpc/client';
export { createDebugLogger, onLog } from '@aztec/foundation/log';
export { retry, retryUntil } from '@aztec/foundation/retry';
export { to2Fields, toBigInt } from '@aztec/foundation/serialize';
export { sleep } from '@aztec/foundation/sleep';
export { elapsed } from '@aztec/foundation/timer';
export { fileURLToPath } from '@aztec/foundation/url';
export { deployL1Contract, deployL1Contracts, } from '@aztec/ethereum';
// Start of section that exports public api via granular api.
// Here you *can* do `export *` as the granular api defacto exports things explicitly.
// This entire index file will be deprecated at some point after we're satisfied.
export * from './api/abi.js';
export * from './api/fee.js';
export * from './api/init.js';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUNMLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLDJCQUEyQixFQUkzQixZQUFZLEVBQ1osWUFBWSxFQUVaLE1BQU0sR0FFUCxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpELE9BQU8sRUFFTCxVQUFVLEVBRVYsYUFBYSxFQUtiLHlCQUF5QixFQUN6QixpQ0FBaUMsRUFDakMsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsVUFBVSxHQUNYLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUt6RCxPQUFPLEVBQUUsY0FBYyxFQUF3QixNQUFNLDRCQUE0QixDQUFDO0FBRWxGLE9BQU8sRUFBRSxhQUFhLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLEVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUV4Ryx3SEFBd0g7QUFDeEgsc0NBQXNDO0FBQ3RDLE9BQU8sRUFDTCxZQUFZLEVBQ1osVUFBVSxFQUNWLEVBQUUsRUFDRixFQUFFLEVBQ0YsZUFBZSxFQUNmLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsS0FBSyxFQUNMLDRCQUE0QixFQUM1QixtQ0FBbUMsR0FDcEMsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLFVBQVUsRUFDVixvQ0FBb0MsRUFDcEMsOEJBQThCLEdBQy9CLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRSxPQUFPLEVBQ0wsV0FBVyxFQUVYLElBQUksRUFDSixVQUFVLEVBQ1YsZUFBZSxFQUNmLHNCQUFzQixFQUN0QixrQkFBa0IsRUFDbEIsNEJBQTRCLEVBQzVCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixPQUFPLEVBQ1AsYUFBYSxFQUNiLE9BQU8sRUFDUCxPQUFPLEVBQ1AsYUFBYSxFQUNiLDBCQUEwQixFQUUxQixLQUFLLEVBQ0wsT0FBTyxFQUNQLFlBQVksRUFDWixJQUFJLEVBRUosWUFBWSxFQUdaLFdBQVcsRUFFWCxFQUFFLEVBQ0Ysa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWE7QUFDYixVQUFVO0FBQ1YsU0FBUyxFQUNULGFBQWEsRUFDYixjQUFjLEdBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUs5QiwrREFBK0Q7QUFDL0Qsb0ZBQW9GO0FBQ3BGLHNHQUFzRztBQUN0RyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFlLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RCxPQUFPLEVBR0wsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLDZEQUE2RDtBQUM3RCxzRkFBc0Y7QUFDdEYsaUZBQWlGO0FBQ2pGLGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMsZUFBZSxDQUFDIn0=