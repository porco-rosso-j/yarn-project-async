import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, type Tuple } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL, MAX_L2_TO_L1_MSGS_PER_CALL, MAX_NOTE_HASHES_PER_CALL, MAX_NOTE_HASH_READ_REQUESTS_PER_CALL, MAX_NULLIFIERS_PER_CALL, MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL, MAX_NULLIFIER_READ_REQUESTS_PER_CALL, MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL, MAX_PUBLIC_DATA_READS_PER_CALL, MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL, MAX_UNENCRYPTED_LOGS_PER_CALL } from '../constants.gen.js';
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
export declare class PublicCircuitPublicInputs {
    /**
     * Current call context.
     */
    callContext: CallContext;
    /**
     * Pedersen hash of the arguments of the call.
     */
    argsHash: Fr;
    /**
     * Pedersen hash of the return values of the call.
     */
    returnsHash: Fr;
    /**
     * Note Hash tree read requests executed during the call.
     */
    noteHashReadRequests: Tuple<ReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_CALL>;
    /**
     * Nullifier read requests executed during the call.
     */
    nullifierReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_CALL>;
    /**
     * Nullifier non existent read requests executed during the call.
     */
    nullifierNonExistentReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL>;
    /**
     * L1 to L2 Message Read Requests per call.
     */
    l1ToL2MsgReadRequests: Tuple<ReadRequest, typeof MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL>;
    /**
     * Contract storage update requests executed during the call.
     */
    contractStorageUpdateRequests: Tuple<ContractStorageUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL>;
    /**
     * Contract storage reads executed during the call.
     */
    contractStorageReads: Tuple<ContractStorageRead, typeof MAX_PUBLIC_DATA_READS_PER_CALL>;
    /**
     * Public call stack of the current kernel iteration.
     */
    publicCallStackHashes: Tuple<Fr, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>;
    /**
     * New note hashes created within a public execution call
     */
    noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_CALL>;
    /**
     * New nullifiers created within a public execution call
     */
    nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_CALL>;
    /**
     * New L2 to L1 messages generated during the call.
     */
    l2ToL1Msgs: Tuple<L2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_CALL>;
    /**
     * The side effect counter when this context was started.
     */
    startSideEffectCounter: Fr;
    /**
     * The side effect counter when this context finished.
     */
    endSideEffectCounter: Fr;
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_CALL>;
    /**
     * Header of a block whose state is used during public execution. Set by sequencer to be a header of a block
     * previous to the one in which the tx is included.
     */
    historicalHeader: Header;
    /** Global variables for the block. */
    globalVariables: GlobalVariables;
    /**
     * Address of the prover.
     */
    proverAddress: AztecAddress;
    /**
     * Flag indicating if the call was reverted.
     */
    revertCode: RevertCode;
    /** How much gas was available for execution. */
    startGasLeft: Gas;
    /** How much gas was left after execution. */
    endGasLeft: Gas;
    /** Transaction fee in the fee-payment asset. Zero in all phases except teardown. */
    transactionFee: Fr;
    constructor(
    /**
     * Current call context.
     */
    callContext: CallContext, 
    /**
     * Pedersen hash of the arguments of the call.
     */
    argsHash: Fr, 
    /**
     * Pedersen hash of the return values of the call.
     */
    returnsHash: Fr, 
    /**
     * Note Hash tree read requests executed during the call.
     */
    noteHashReadRequests: Tuple<ReadRequest, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_CALL>, 
    /**
     * Nullifier read requests executed during the call.
     */
    nullifierReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_READ_REQUESTS_PER_CALL>, 
    /**
     * Nullifier non existent read requests executed during the call.
     */
    nullifierNonExistentReadRequests: Tuple<ReadRequest, typeof MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL>, 
    /**
     * L1 to L2 Message Read Requests per call.
     */
    l1ToL2MsgReadRequests: Tuple<ReadRequest, typeof MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL>, 
    /**
     * Contract storage update requests executed during the call.
     */
    contractStorageUpdateRequests: Tuple<ContractStorageUpdateRequest, typeof MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL>, 
    /**
     * Contract storage reads executed during the call.
     */
    contractStorageReads: Tuple<ContractStorageRead, typeof MAX_PUBLIC_DATA_READS_PER_CALL>, 
    /**
     * Public call stack of the current kernel iteration.
     */
    publicCallStackHashes: Tuple<Fr, typeof MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL>, 
    /**
     * New note hashes created within a public execution call
     */
    noteHashes: Tuple<NoteHash, typeof MAX_NOTE_HASHES_PER_CALL>, 
    /**
     * New nullifiers created within a public execution call
     */
    nullifiers: Tuple<Nullifier, typeof MAX_NULLIFIERS_PER_CALL>, 
    /**
     * New L2 to L1 messages generated during the call.
     */
    l2ToL1Msgs: Tuple<L2ToL1Message, typeof MAX_L2_TO_L1_MSGS_PER_CALL>, 
    /**
     * The side effect counter when this context was started.
     */
    startSideEffectCounter: Fr, 
    /**
     * The side effect counter when this context finished.
     */
    endSideEffectCounter: Fr, 
    /**
     * Hash of the unencrypted logs emitted in this function call.
     * Note: Truncated to 31 bytes to fit in Fr.
     */
    unencryptedLogsHashes: Tuple<LogHash, typeof MAX_UNENCRYPTED_LOGS_PER_CALL>, 
    /**
     * Header of a block whose state is used during public execution. Set by sequencer to be a header of a block
     * previous to the one in which the tx is included.
     */
    historicalHeader: Header, 
    /** Global variables for the block. */
    globalVariables: GlobalVariables, 
    /**
     * Address of the prover.
     */
    proverAddress: AztecAddress, 
    /**
     * Flag indicating if the call was reverted.
     */
    revertCode: RevertCode, 
    /** How much gas was available for execution. */
    startGasLeft: Gas, 
    /** How much gas was left after execution. */
    endGasLeft: Gas, 
    /** Transaction fee in the fee-payment asset. Zero in all phases except teardown. */
    transactionFee: Fr);
    /**
     * Create PublicCircuitPublicInputs from a fields dictionary.
     * @param fields - The dictionary.
     * @returns A PublicCircuitPublicInputs object.
     */
    static from(fields: FieldsOf<PublicCircuitPublicInputs>): PublicCircuitPublicInputs;
    /**
     * Returns an empty instance.
     * @returns An empty instance.
     */
    static empty(): PublicCircuitPublicInputs;
    isEmpty(): boolean;
    /**
     * Serialize into a field array. Low-level utility.
     * @param fields - Object with fields.
     * @returns The array.
     */
    static getFields(fields: FieldsOf<PublicCircuitPublicInputs>): readonly [CallContext, Fr, Fr, [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest, ReadRequest], [ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest, ContractStorageUpdateRequest], [ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead, ContractStorageRead], [Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr, Fr], [NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash, NoteHash], [Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier, Nullifier], [L2ToL1Message, L2ToL1Message], Fr, Fr, [LogHash, LogHash, LogHash, LogHash], Header, GlobalVariables, AztecAddress, RevertCode, Gas, Gas, Fr];
    /**
     * Serialize this as a buffer.
     * @returns The buffer.
     */
    toBuffer(): Buffer;
    toFields(): Fr[];
    /**
     * Deserializes from a buffer or reader.
     * @param buffer - Buffer or reader to read from.
     * @returns The deserialized instance.
     */
    static fromBuffer(buffer: Buffer | BufferReader): PublicCircuitPublicInputs;
    static fromFields(fields: Fr[] | FieldReader): PublicCircuitPublicInputs;
    hash(): Promise<Fr>;
}
//# sourceMappingURL=public_circuit_public_inputs.d.ts.map