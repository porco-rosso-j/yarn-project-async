import { FunctionSelector, Header } from '@aztec/circuits.js';
import { EventSelector } from '@aztec/foundation/abi';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { createJsonRpcClient, defaultFetch } from '@aztec/foundation/json-rpc/client';
import { NullifierMembershipWitness } from '../../interfaces/nullifier_tree.js';
import { L2Block } from '../../l2_block.js';
import { EncryptedNoteL2BlockL2Logs, ExtendedUnencryptedL2Log, LogId, UnencryptedL2BlockL2Logs, } from '../../logs/index.js';
import { PublicDataWitness } from '../../public_data_witness.js';
import { SiblingPath } from '../../sibling_path/index.js';
import { PublicSimulationOutput, Tx, TxHash, TxReceipt } from '../../tx/index.js';
import { TxEffect } from '../../tx_effect.js';
/**
 * Creates a JSON-RPC client to remotely talk to an Aztec Node.
 * @param url - The URL of the Aztec Node.
 * @param fetch - The fetch implementation to use.
 * @returns A JSON-RPC client of Aztec Node.
 */
export function createAztecNodeClient(url, fetch = defaultFetch) {
    return createJsonRpcClient(url, {
        AztecAddress,
        EthAddress,
        ExtendedUnencryptedL2Log,
        Fr,
        EventSelector,
        FunctionSelector,
        Header,
        L2Block,
        TxEffect,
        LogId,
        TxHash,
        PublicDataWitness,
        SiblingPath,
    }, {
        PublicSimulationOutput,
        Tx,
        TxReceipt,
        EncryptedNoteL2BlockL2Logs,
        UnencryptedL2BlockL2Logs,
        NullifierMembershipWitness,
    }, false, 'node', fetch);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp0ZWNfbm9kZV9jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXp0ZWNfbm9kZS9ycGMvYXp0ZWNfbm9kZV9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHdEYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDaEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsd0JBQXdCLEVBQ3hCLEtBQUssRUFDTCx3QkFBd0IsR0FDekIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEdBQVcsRUFBRSxLQUFLLEdBQUcsWUFBWTtJQUNyRSxPQUFPLG1CQUFtQixDQUN4QixHQUFHLEVBQ0g7UUFDRSxZQUFZO1FBQ1osVUFBVTtRQUNWLHdCQUF3QjtRQUN4QixFQUFFO1FBQ0YsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixNQUFNO1FBQ04sT0FBTztRQUNQLFFBQVE7UUFDUixLQUFLO1FBQ0wsTUFBTTtRQUNOLGlCQUFpQjtRQUNqQixXQUFXO0tBQ1osRUFDRDtRQUNFLHNCQUFzQjtRQUN0QixFQUFFO1FBQ0YsU0FBUztRQUNULDBCQUEwQjtRQUMxQix3QkFBd0I7UUFDeEIsMEJBQTBCO0tBQzNCLEVBQ0QsS0FBSyxFQUNMLE1BQU0sRUFDTixLQUFLLENBQ08sQ0FBQztBQUNqQixDQUFDIn0=