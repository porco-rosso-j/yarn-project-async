import { makeTuple } from '@aztec/foundation/array';
import { AztecAddress } from '@aztec/foundation/aztec-address';
import { isArrayEmpty } from '@aztec/foundation/collection';
import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer, serializeToFields, } from '@aztec/foundation/serialize';
import { GeneratorIndex, MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_CALL, MAX_NOTE_HASHES_PER_CALL, MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, MAX_NULLIFIERS_PER_CALL, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, MAX_NULLIFIER_READ_REQUESTS_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_DATA_READS_PER_CALL, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_CALL, PUBLIC_CIRCUIT_PUBLIC_INPUTS_LENGTH, } from '../constants.gen.js';
import { isEmptyArray } from '../utils/index.js';
import { CallContext } from './call_context.js';
import { ContractStorageRead } from './contract_storage_read.js';
import { ContractStorageUpdateRequest } from './contract_storage_update_request.js';
import { Gas } from './gas.js';
import { GlobalVariables } from './global_variables.js';
import { Header } from './header.js';
import { L2ToL1Message } from './l2_to_l1_message.js';
import { LogHash } from './log_hash.js';
import { NoteHash } from './note_hash.js';
import { Nullifier } from './nullifier.js';
import { ReadRequest } from './read_request.js';
import { RevertCode } from './revert_code.js';
/**
 * Public inputs to a public circuit.
 */
export class PublicCircuitPublicInputs {
    constructor(
    /**
     * Current call context.
     */
    callContext, 
    /**
     * Pedersen hash of the arguments of the call.
     */
    argsHash, 
    /**
     * Pedersen hash of the return values of the call.
     */
    returnsHash, 
    /**
     * Note Hash tree read requests executed during the call.
     */
    noteHashReadRequests, 
    /**
     * Nullifier read requests executed during the call.
     */
    nullifierReadRequests, 
    /**
     * Nullifier non existent read requests executed during the call.
     */
    nullifierNonExistentReadRequests, 
    /**
     * L1 to L2 Message Read Requests per call.
     */
    l1ToL2MsgReadRequests, 
    /**
     * Contract storage update requests executed during the call.
     */
    contractStorageUpdateRequests, 
    /**
     * Contract storage reads executed during the call.
     */
    contractStorageReads, 
    /**
     * Public call stack of the current kernel iteration.
     */
    publicCallStackHashes, 
    /**
     * New note hashes created within a public execution call
     */
    noteHashes, 
    /**
     * New nullifiers created within a public execution call
     */
    nullifiers, 
    /**
     * New L2 to L1 messages generated during the call.
     */
    l2ToL1Msgs, 
    /**
     * The side effect counter when this context was started.
     */
    startSideEffectCounter, 
    /**
     * The side effect counter when this context finished.
     */
    endSideEffectCounter, 
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes, 
    /**
     * Header of a block whose state is used during public execution. Set by sequencer to be a header of a block
     * previous to the one in which the tx is included.
     */
    historicalHeader, 
    /** Global variables for the block. */
    globalVariables, 
    /**
     * Address of the prover.
     */
    proverAddress, 
    /**
     * Flag indicating if the call was reverted.
     */
    revertCode, 
    /** How much gas was available for execution. */
    startGasLeft, 
    /** How much gas was left after execution. */
    endGasLeft, 
    /** Transaction fee in the fee-payment asset. Zero in all phases except teardown. */
    transactionFee) {
        this.callContext = callContext;
        this.argsHash = argsHash;
        this.returnsHash = returnsHash;
        this.noteHashReadRequests = noteHashReadRequests;
        this.nullifierReadRequests = nullifierReadRequests;
        this.nullifierNonExistentReadRequests = nullifierNonExistentReadRequests;
        this.l1ToL2MsgReadRequests = l1ToL2MsgReadRequests;
        this.contractStorageUpdateRequests = contractStorageUpdateRequests;
        this.contractStorageReads = contractStorageReads;
        this.publicCallStackHashes = publicCallStackHashes;
        this.noteHashes = noteHashes;
        this.nullifiers = nullifiers;
        this.l2ToL1Msgs = l2ToL1Msgs;
        this.startSideEffectCounter = startSideEffectCounter;
        this.endSideEffectCounter = endSideEffectCounter;
        this.unencryptedLogsHashes = unencryptedLogsHashes;
        this.historicalHeader = historicalHeader;
        this.globalVariables = globalVariables;
        this.proverAddress = proverAddress;
        this.revertCode = revertCode;
        this.startGasLeft = startGasLeft;
        this.endGasLeft = endGasLeft;
        this.transactionFee = transactionFee;
    }
    /**
     * Create PublicCircuitPublicInputs from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCircuitPublicInputs object.
     */
    static from(fields) {
        return new PublicCircuitPublicInputs(...PublicCircuitPublicInputs.getFields(fields));
    }
    /**
     * Returns an empty instance.
     * @returns An empty instance.
     */
    static empty() {
        return new PublicCircuitPublicInputs(CallContext.empty(), Fr.ZERO, Fr.ZERO, makeTuple(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, ReadRequest.empty), makeTuple(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, ContractStorageUpdateRequest.empty), makeTuple(MAX_PUBLIC_DATA_READS_PER_CALL, ContractStorageRead.empty), makeTuple(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, Fr.zero), makeTuple(MAX_NOTE_HASHES_PER_CALL, NoteHash.empty), makeTuple(MAX_NULLIFIERS_PER_CALL, Nullifier.empty), makeTuple(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message.empty), Fr.ZERO, Fr.ZERO, makeTuple(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash.empty), Header.empty(), GlobalVariables.empty(), AztecAddress.ZERO, RevertCode.OK, Gas.empty(), Gas.empty(), Fr.ZERO);
    }
    isEmpty() {
        const isFrArrayEmpty = (arr) => isArrayEmpty(arr, item => item.isZero());
        return (this.callContext.isEmpty() &&
            this.argsHash.isZero() &&
            this.returnsHash.isZero() &&
            isEmptyArray(this.nullifierReadRequests) &&
            isEmptyArray(this.nullifierNonExistentReadRequests) &&
            isEmptyArray(this.l1ToL2MsgReadRequests) &&
            isEmptyArray(this.contractStorageUpdateRequests) &&
            isEmptyArray(this.contractStorageReads) &&
            isFrArrayEmpty(this.publicCallStackHashes) &&
            isEmptyArray(this.noteHashes) &&
            isEmptyArray(this.nullifiers) &&
            isEmptyArray(this.l2ToL1Msgs) &&
            this.startSideEffectCounter.isZero() &&
            this.endSideEffectCounter.isZero() &&
            isEmptyArray(this.unencryptedLogsHashes) &&
            this.historicalHeader.isEmpty() &&
            this.globalVariables.isEmpty() &&
            this.proverAddress.isZero() &&
            this.revertCode.isOK() &&
            this.startGasLeft.isEmpty() &&
            this.endGasLeft.isEmpty() &&
            this.transactionFee.isZero());
    }
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields) {
        return [
            fields.callContext,
            fields.argsHash,
            fields.returnsHash,
            fields.noteHashReadRequests,
            fields.nullifierReadRequests,
            fields.nullifierNonExistentReadRequests,
            fields.l1ToL2MsgReadRequests,
            fields.contractStorageUpdateRequests,
            fields.contractStorageReads,
            fields.publicCallStackHashes,
            fields.noteHashes,
            fields.nullifiers,
            fields.l2ToL1Msgs,
            fields.startSideEffectCounter,
            fields.endSideEffectCounter,
            fields.unencryptedLogsHashes,
            fields.historicalHeader,
            fields.globalVariables,
            fields.proverAddress,
            fields.revertCode,
            fields.startGasLeft,
            fields.endGasLeft,
            fields.transactionFee,
        ];
    }
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer() {
        return serializeToBuffer(...PublicCircuitPublicInputs.getFields(this));
    }
    toFields() {
        const fields = serializeToFields(...PublicCircuitPublicInputs.getFields(this));
        if (fields.length !== PUBLIC_CIRCUIT_PUBLIC_INPUTS_LENGTH) {
            throw new Error(`Invalid number of fields for PublicCircuitPublicInputs. Expected ${PUBLIC_CIRCUIT_PUBLIC_INPUTS_LENGTH}, got ${fields.length}`);
        }
        return fields;
    }
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new PublicCircuitPublicInputs(reader.readObject(CallContext), reader.readObject(Fr), reader.readObject(Fr), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, ContractStorageUpdateRequest), reader.readArray(MAX_PUBLIC_DATA_READS_PER_CALL, ContractStorageRead), reader.readArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, Fr), reader.readArray(MAX_NOTE_HASHES_PER_CALL, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_CALL, Nullifier), reader.readArray(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message), reader.readObject(Fr), reader.readObject(Fr), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash), reader.readObject(Header), reader.readObject(GlobalVariables), reader.readObject(AztecAddress), reader.readObject(RevertCode), reader.readObject(Gas), reader.readObject(Gas), reader.readObject(Fr));
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicCircuitPublicInputs(CallContext.fromFields(reader), reader.readField(), reader.readField(), reader.readArray(MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, ReadRequest), reader.readArray(MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, ContractStorageUpdateRequest), reader.readArray(MAX_PUBLIC_DATA_READS_PER_CALL, ContractStorageRead), reader.readFieldArray(MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL), reader.readArray(MAX_NOTE_HASHES_PER_CALL, NoteHash), reader.readArray(MAX_NULLIFIERS_PER_CALL, Nullifier), reader.readArray(MAX_L2_TO_L1_MSGS_PER_CALL, L2ToL1Message), reader.readField(), reader.readField(), reader.readArray(MAX_UNENCRYPTED_LOGS_PER_CALL, LogHash), Header.fromFields(reader), GlobalVariables.fromFields(reader), AztecAddress.fromFields(reader), RevertCode.fromFields(reader), Gas.fromFields(reader), Gas.fromFields(reader), reader.readField());
    }
    async hash() {
        return await pedersenHash(this.toFields(), GeneratorIndex.PUBLIC_CIRCUIT_PUBLIC_INPUTS);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2NpcmN1aXRfcHVibGljX2lucHV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3RzL3B1YmxpY19jaXJjdWl0X3B1YmxpY19pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFFWCxpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0sNkJBQTZCLENBQUM7QUFHckMsT0FBTyxFQUNMLGNBQWMsRUFDZCx1Q0FBdUMsRUFDdkMsMEJBQTBCLEVBQzFCLHdCQUF3QixFQUN4QixvQ0FBb0MsRUFDcEMsdUJBQXVCLEVBQ3ZCLGlEQUFpRCxFQUNqRCxvQ0FBb0MsRUFDcEMscUNBQXFDLEVBQ3JDLDhCQUE4QixFQUM5Qix3Q0FBd0MsRUFDeEMsNkJBQTZCLEVBQzdCLG1DQUFtQyxHQUNwQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDcEYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUM7O0dBRUc7QUFDSCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDO0lBQ0U7O09BRUc7SUFDSSxXQUF3QjtJQUMvQjs7T0FFRztJQUNJLFFBQVk7SUFDbkI7O09BRUc7SUFDSSxXQUFlO0lBQ3RCOztPQUVHO0lBQ0ksb0JBQXFGO0lBQzVGOztPQUVHO0lBQ0kscUJBQXNGO0lBQzdGOztPQUVHO0lBQ0ksZ0NBR047SUFDRDs7T0FFRztJQUNJLHFCQUF5RjtJQUNoRzs7T0FFRztJQUNJLDZCQUdOO0lBQ0Q7O09BRUc7SUFDSSxvQkFBdUY7SUFDOUY7O09BRUc7SUFDSSxxQkFBOEU7SUFDckY7O09BRUc7SUFDSSxVQUE0RDtJQUNuRTs7T0FFRztJQUNJLFVBQTREO0lBQ25FOztPQUVHO0lBQ0ksVUFBbUU7SUFDMUU7O09BRUc7SUFDSSxzQkFBMEI7SUFDakM7O09BRUc7SUFDSSxvQkFBd0I7SUFDL0I7OztPQUdHO0lBQ0kscUJBQTJFO0lBQ2xGOzs7T0FHRztJQUNJLGdCQUF3QjtJQUMvQixzQ0FBc0M7SUFDL0IsZUFBZ0M7SUFDdkM7O09BRUc7SUFDSSxhQUEyQjtJQUVsQzs7T0FFRztJQUNJLFVBQXNCO0lBRTdCLGdEQUFnRDtJQUN6QyxZQUFpQjtJQUV4Qiw2Q0FBNkM7SUFDdEMsVUFBZTtJQUV0QixvRkFBb0Y7SUFDN0UsY0FBa0I7UUE1RmxCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSXhCLGFBQVEsR0FBUixRQUFRLENBQUk7UUFJWixnQkFBVyxHQUFYLFdBQVcsQ0FBSTtRQUlmLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBaUU7UUFJckYsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFpRTtRQUl0RixxQ0FBZ0MsR0FBaEMsZ0NBQWdDLENBR3RDO1FBSU0sMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFvRTtRQUl6RixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBR25DO1FBSU0seUJBQW9CLEdBQXBCLG9CQUFvQixDQUFtRTtRQUl2RiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXlEO1FBSTlFLGVBQVUsR0FBVixVQUFVLENBQWtEO1FBSTVELGVBQVUsR0FBVixVQUFVLENBQWtEO1FBSTVELGVBQVUsR0FBVixVQUFVLENBQXlEO1FBSW5FLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBSTtRQUkxQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQUk7UUFLeEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzRDtRQUszRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFFeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSWhDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBSzNCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFHdEIsaUJBQVksR0FBWixZQUFZLENBQUs7UUFHakIsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUdmLG1CQUFjLEdBQWQsY0FBYyxDQUFJO0lBQ3hCLENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUEyQztRQUNyRCxPQUFPLElBQUkseUJBQXlCLENBQUMsR0FBRyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUs7UUFDakIsT0FBTyxJQUFJLHlCQUF5QixDQUNsQyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQ25CLEVBQUUsQ0FBQyxJQUFJLEVBQ1AsRUFBRSxDQUFDLElBQUksRUFDUCxTQUFTLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUNsRSxTQUFTLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUNsRSxTQUFTLENBQUMsaURBQWlELEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUMvRSxTQUFTLENBQUMsdUNBQXVDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUNyRSxTQUFTLENBQUMsd0NBQXdDLEVBQUUsNEJBQTRCLENBQUMsS0FBSyxDQUFDLEVBQ3ZGLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFDcEUsU0FBUyxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFDekQsU0FBUyxDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDbkQsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDbkQsU0FBUyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFDMUQsRUFBRSxDQUFDLElBQUksRUFDUCxFQUFFLENBQUMsSUFBSSxFQUNQLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ3ZELE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFDZCxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQ3ZCLFlBQVksQ0FBQyxJQUFJLEVBQ2pCLFVBQVUsQ0FBQyxFQUFFLEVBQ2IsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUNYLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFDWCxFQUFFLENBQUMsSUFBSSxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0UsT0FBTyxDQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7WUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUM7WUFDaEQsWUFBWSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztZQUN2QyxjQUFjLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQzFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtZQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FDN0IsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUEyQztRQUMxRCxPQUFPO1lBQ0wsTUFBTSxDQUFDLFdBQVc7WUFDbEIsTUFBTSxDQUFDLFFBQVE7WUFDZixNQUFNLENBQUMsV0FBVztZQUNsQixNQUFNLENBQUMsb0JBQW9CO1lBQzNCLE1BQU0sQ0FBQyxxQkFBcUI7WUFDNUIsTUFBTSxDQUFDLGdDQUFnQztZQUN2QyxNQUFNLENBQUMscUJBQXFCO1lBQzVCLE1BQU0sQ0FBQyw2QkFBNkI7WUFDcEMsTUFBTSxDQUFDLG9CQUFvQjtZQUMzQixNQUFNLENBQUMscUJBQXFCO1lBQzVCLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLE1BQU0sQ0FBQyxzQkFBc0I7WUFDN0IsTUFBTSxDQUFDLG9CQUFvQjtZQUMzQixNQUFNLENBQUMscUJBQXFCO1lBQzVCLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDdkIsTUFBTSxDQUFDLGVBQWU7WUFDdEIsTUFBTSxDQUFDLGFBQWE7WUFDcEIsTUFBTSxDQUFDLFVBQVU7WUFDakIsTUFBTSxDQUFDLFlBQVk7WUFDbkIsTUFBTSxDQUFDLFVBQVU7WUFDakIsTUFBTSxDQUFDLGNBQWM7U0FDYixDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLGlCQUFpQixDQUFDLEdBQUcseUJBQXlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxtQ0FBbUMsRUFBRSxDQUFDO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQ2Isb0VBQW9FLG1DQUFtQyxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FDaEksQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUkseUJBQXlCLENBQ2xDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQzlCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3JCLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxDQUFDLEVBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0NBQW9DLEVBQUUsV0FBVyxDQUFDLEVBQ25FLE1BQU0sQ0FBQyxTQUFTLENBQUMsaURBQWlELEVBQUUsV0FBVyxDQUFDLEVBQ2hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsdUNBQXVDLEVBQUUsV0FBVyxDQUFDLEVBQ3RFLE1BQU0sQ0FBQyxTQUFTLENBQUMsd0NBQXdDLEVBQUUsNEJBQTRCLENBQUMsRUFDeEYsTUFBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBbUIsQ0FBQyxFQUNyRSxNQUFNLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsQ0FBQyxFQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxFQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxFQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxFQUMzRCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUNyQixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLE9BQU8sQ0FBQyxFQUN4RCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUNsQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUMvQixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxPQUFPLElBQUkseUJBQXlCLENBQ2xDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzlCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDbEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxFQUFFLFdBQVcsQ0FBQyxFQUNuRSxNQUFNLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxFQUFFLFdBQVcsQ0FBQyxFQUNuRSxNQUFNLENBQUMsU0FBUyxDQUFDLGlEQUFpRCxFQUFFLFdBQVcsQ0FBQyxFQUNoRixNQUFNLENBQUMsU0FBUyxDQUFDLHVDQUF1QyxFQUFFLFdBQVcsQ0FBQyxFQUN0RSxNQUFNLENBQUMsU0FBUyxDQUFDLHdDQUF3QyxFQUFFLDRCQUE0QixDQUFDLEVBQ3hGLE1BQU0sQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsbUJBQW1CLENBQUMsRUFDckUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUM1RCxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxFQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxFQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxFQUMzRCxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQ2xCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxPQUFPLENBQUMsRUFDeEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDekIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDbEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDL0IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDN0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDdEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFDdEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUNuQixDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNGIn0=