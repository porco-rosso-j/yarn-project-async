import { AuthWitness, EncryptedNoteL2BlockL2Logs, ExtendedNote, ExtendedUnencryptedL2Log, L2Block, LogId, Note, NullifierMembershipWitness, SimulatedTx, Tx, TxEffect, TxExecutionRequest, TxHash, TxReceipt, UnencryptedL2BlockL2Logs, } from '@aztec/circuit-types';
import { AztecAddress, CompleteAddress, EthAddress, Fr, FunctionSelector, GrumpkinScalar, Point, } from '@aztec/circuits.js';
import { NoteSelector } from '@aztec/foundation/abi';
import { createJsonRpcClient, makeFetch } from '@aztec/foundation/json-rpc/client';
/**
 * Creates a JSON-RPC client to remotely talk to PXE.
 * @param url - The URL of the PXE.
 * @param fetch - The fetch implementation to use.
 * @returns A JSON-RPC client of PXE.
 */
export const createPXEClient = (url, fetch = makeFetch([1, 2, 3], false)) => createJsonRpcClient(url, {
    AuthWitness,
    AztecAddress,
    CompleteAddress,
    FunctionSelector,
    EthAddress,
    ExtendedNote,
    ExtendedUnencryptedL2Log,
    Fr,
    GrumpkinScalar,
    L2Block,
    TxEffect,
    LogId,
    Note,
    Point,
    TxExecutionRequest,
    TxHash,
    NoteSelector,
}, { Tx, SimulatedTx, TxReceipt, EncryptedNoteL2BlockL2Logs, UnencryptedL2BlockL2Logs, NullifierMembershipWitness }, false, 'pxe', fetch);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHhlX2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ycGNfY2xpZW50cy9weGVfY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXLEVBQ1gsMEJBQTBCLEVBQzFCLFlBQVksRUFDWix3QkFBd0IsRUFDeEIsT0FBTyxFQUNQLEtBQUssRUFDTCxJQUFJLEVBQ0osMEJBQTBCLEVBRTFCLFdBQVcsRUFDWCxFQUFFLEVBQ0YsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixNQUFNLEVBQ04sU0FBUyxFQUNULHdCQUF3QixHQUN6QixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFDTCxZQUFZLEVBQ1osZUFBZSxFQUNmLFVBQVUsRUFDVixFQUFFLEVBQ0YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxLQUFLLEdBQ04sTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRW5GOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFPLEVBQUUsQ0FDdkYsbUJBQW1CLENBQ2pCLEdBQUcsRUFDSDtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixFQUFFO0lBQ0YsY0FBYztJQUNkLE9BQU87SUFDUCxRQUFRO0lBQ1IsS0FBSztJQUNMLElBQUk7SUFDSixLQUFLO0lBQ0wsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixZQUFZO0NBQ2IsRUFDRCxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFLHdCQUF3QixFQUFFLDBCQUEwQixFQUFFLEVBQ2hILEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxDQUNDLENBQUMifQ==