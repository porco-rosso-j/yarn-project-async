import { makeTuple } from '@aztec/foundation/array';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { ARCHIVE_HEIGHT, MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PUBLIC_DATA_TREE_HEIGHT, } from '../../constants.gen.js';
import { GlobalVariables } from '../global_variables.js';
import { KernelData } from '../kernel/kernel_data.js';
import { MembershipWitness } from '../membership_witness.js';
import { PartialStateReference } from '../partial_state_reference.js';
import { PublicDataHint } from '../public_data_hint.js';
import { PublicDataTreeLeaf, PublicDataTreeLeafPreimage } from '../trees/index.js';
import { AppendOnlyTreeSnapshot } from './append_only_tree_snapshot.js';
import { StateDiffHints } from './state_diff_hints.js';
/**
 * Data which is forwarded through the base rollup circuits unchanged.
 */
export class ConstantRollupData {
    constructor(
    /** Archive tree snapshot at the very beginning of the entire rollup. */
    lastArchive, 
    /**
     * Root of the verification key tree.
     */
    vkTreeRoot, 
    /**
     * Global variables for the block
     */
    globalVariables) {
        this.lastArchive = lastArchive;
        this.vkTreeRoot = vkTreeRoot;
        this.globalVariables = globalVariables;
    }
    static from(fields) {
        return new ConstantRollupData(...ConstantRollupData.getFields(fields));
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new ConstantRollupData(reader.readObject(AppendOnlyTreeSnapshot), Fr.fromBuffer(reader), reader.readObject(GlobalVariables));
    }
    static getFields(fields) {
        return [fields.lastArchive, fields.vkTreeRoot, fields.globalVariables];
    }
    static empty() {
        return new ConstantRollupData(AppendOnlyTreeSnapshot.zero(), Fr.ZERO, GlobalVariables.empty());
    }
    toBuffer() {
        return serializeToBuffer(...ConstantRollupData.getFields(this));
    }
}
/**
 * Inputs to the base rollup circuit.
 */
export class BaseRollupInputs {
    constructor(
    /** Data of the 2 kernels that preceded this base rollup circuit. */
    kernelData, 
    /** Partial state reference at the start of the rollup. */
    start, 
    /** Hints used while proving state diff validity. */
    stateDiffHints, 
    /** Public data read hint for accessing the balance of the fee payer. */
    feePayerGasTokenBalanceReadHint, 
    /**
     * The public data writes to be inserted in the tree, sorted high slot to low slot.
     */
    sortedPublicDataWrites, 
    /**
     * The indexes of the sorted public data writes to the original ones.
     */
    sortedPublicDataWritesIndexes, 
    /**
     * The public data writes which need to be updated to perform the batch insertion of the new public data writes.
     * See `StandardIndexedTree.batchInsert` function for more details.
     */
    lowPublicDataWritesPreimages, 
    /**
     * Membership witnesses for the nullifiers which need to be updated to perform the batch insertion of the new
     * nullifiers.
     */
    lowPublicDataWritesMembershipWitnesses, 
    /**
     * Membership witnesses of blocks referred by each of the 2 kernels.
     */
    archiveRootMembershipWitness, 
    /**
     * Data which is not modified by the base rollup circuit.
     */
    constants) {
        this.kernelData = kernelData;
        this.start = start;
        this.stateDiffHints = stateDiffHints;
        this.feePayerGasTokenBalanceReadHint = feePayerGasTokenBalanceReadHint;
        this.sortedPublicDataWrites = sortedPublicDataWrites;
        this.sortedPublicDataWritesIndexes = sortedPublicDataWritesIndexes;
        this.lowPublicDataWritesPreimages = lowPublicDataWritesPreimages;
        this.lowPublicDataWritesMembershipWitnesses = lowPublicDataWritesMembershipWitnesses;
        this.archiveRootMembershipWitness = archiveRootMembershipWitness;
        this.constants = constants;
    }
    static from(fields) {
        return new BaseRollupInputs(...BaseRollupInputs.getFields(fields));
    }
    static getFields(fields) {
        return [
            fields.kernelData,
            fields.start,
            fields.stateDiffHints,
            fields.feePayerGasTokenBalanceReadHint,
            fields.sortedPublicDataWrites,
            fields.sortedPublicDataWritesIndexes,
            fields.lowPublicDataWritesPreimages,
            fields.lowPublicDataWritesMembershipWitnesses,
            fields.archiveRootMembershipWitness,
            fields.constants,
        ];
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...BaseRollupInputs.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - The buffer to deserialize from.
     * @returns A new BaseRollupInputs instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new BaseRollupInputs(reader.readObject(KernelData), reader.readObject(PartialStateReference), reader.readObject(StateDiffHints), reader.readObject(PublicDataHint), reader.readArray(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataTreeLeaf), reader.readNumbers(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX), reader.readArray(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataTreeLeafPreimage), reader.readArray(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, {
            fromBuffer: buffer => MembershipWitness.fromBuffer(buffer, PUBLIC_DATA_TREE_HEIGHT),
        }), MembershipWitness.fromBuffer(reader, ARCHIVE_HEIGHT), reader.readObject(ConstantRollupData));
    }
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new BaseRollupInputs instance.
     */
    static fromString(str) {
        return BaseRollupInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
    static empty() {
        return new BaseRollupInputs(KernelData.empty(), PartialStateReference.empty(), StateDiffHints.empty(), PublicDataHint.empty(), makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataTreeLeaf.empty), makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, () => 0), makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, PublicDataTreeLeafPreimage.empty), makeTuple(MAX_TOTAL_PUBLIC_DATA_UPDATE_REQUESTS_PER_TX, () => MembershipWitness.empty(PUBLIC_DATA_TREE_HEIGHT)), MembershipWitness.empty(ARCHIVE_HEIGHT), ConstantRollupData.empty());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yb2xsdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9yb2xsdXAvYmFzZV9yb2xsdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFjLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHMUYsT0FBTyxFQUNMLGNBQWMsRUFDZCw0Q0FBNEMsRUFDNUMsdUJBQXVCLEdBQ3hCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QjtJQUNFLHdFQUF3RTtJQUNqRSxXQUFtQztJQUUxQzs7T0FFRztJQUNJLFVBQWM7SUFDckI7O09BRUc7SUFDSSxlQUFnQztRQVRoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBd0I7UUFLbkMsZUFBVSxHQUFWLFVBQVUsQ0FBSTtRQUlkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN0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