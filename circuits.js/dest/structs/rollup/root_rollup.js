import { Fr } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer, serializeToFields } from '@aztec/foundation/serialize';
import { ARCHIVE_HEIGHT, L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, NESTED_RECURSIVE_PROOF_LENGTH, NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP, } from '../../constants.gen.js';
import { Header } from '../header.js';
import { RootParityInput } from '../parity/root_parity_input.js';
import { AppendOnlyTreeSnapshot } from './append_only_tree_snapshot.js';
import { PreviousRollupData } from './previous_rollup_data.js';
/**
 * Represents inputs of the root rollup circuit.
 */
export class RootRollupInputs {
    constructor(
    /**
     * The previous rollup data.
     * Note: Root rollup circuit is the latest circuit the chain of circuits and the previous rollup data is the data
     * from 2 merge or base rollup circuits.
     */
    previousRollupData, 
    /**
     * The original and converted roots of the L1 to L2 messages subtrees.
     */
    l1ToL2Roots, 
    /**
     * New L1 to L2 messages.
     */
    newL1ToL2Messages, 
    /**
     * Sibling path of the new L1 to L2 message tree root.
     */
    newL1ToL2MessageTreeRootSiblingPath, 
    /**
     * Snapshot of the L1 to L2 message tree at the start of the rollup.
     */
    startL1ToL2MessageTreeSnapshot, 
    /**
     * Snapshot of the historical block roots tree at the start of the rollup.
     */
    startArchiveSnapshot, 
    /**
     * Sibling path of the new block tree root.
     */
    newArchiveSiblingPath) {
        this.previousRollupData = previousRollupData;
        this.l1ToL2Roots = l1ToL2Roots;
        this.newL1ToL2Messages = newL1ToL2Messages;
        this.newL1ToL2MessageTreeRootSiblingPath = newL1ToL2MessageTreeRootSiblingPath;
        this.startL1ToL2MessageTreeSnapshot = startL1ToL2MessageTreeSnapshot;
        this.startArchiveSnapshot = startArchiveSnapshot;
        this.newArchiveSiblingPath = newArchiveSiblingPath;
    }
    /**
     * Serializes the inputs to a buffer.
     * @returns - The inputs serialized to a buffer.
     */
    toBuffer() {
        return serializeToBuffer(...RootRollupInputs.getFields(this));
    }
    /**
     * Serializes the inputs to a hex string.
     * @returns The instance serialized to a hex string.
     */
    toString() {
        return this.toBuffer().toString('hex');
    }
    /**
     * Creates a new instance from fields.
     * @param fields - Fields to create the instance from.
     * @returns A new RootRollupInputs instance.
     */
    static from(fields) {
        return new RootRollupInputs(...RootRollupInputs.getFields(fields));
    }
    /**
     * Extracts fields from an instance.
     * @param fields - Fields to create the instance from.
     * @returns An array of fields.
     */
    static getFields(fields) {
        return [
            fields.previousRollupData,
            fields.l1ToL2Roots,
            fields.newL1ToL2Messages,
            fields.newL1ToL2MessageTreeRootSiblingPath,
            fields.startL1ToL2MessageTreeSnapshot,
            fields.startArchiveSnapshot,
            fields.newArchiveSiblingPath,
        ];
    }
    /**
     * Deserializes the inputs from a buffer.
     * @param buffer - A buffer to deserialize from.
     * @returns A new RootRollupInputs instance.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new RootRollupInputs([reader.readObject(PreviousRollupData), reader.readObject(PreviousRollupData)], RootParityInput.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH), reader.readArray(NUMBER_OF_L1_L2_MESSAGES_PER_ROLLUP, Fr), reader.readArray(L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, Fr), reader.readObject(AppendOnlyTreeSnapshot), reader.readObject(AppendOnlyTreeSnapshot), reader.readArray(ARCHIVE_HEIGHT, Fr));
    }
    /**
     * Deserializes the inputs from a hex string.
     * @param str - A hex string to deserialize from.
     * @returns A new RootRollupInputs instance.
     */
    static fromString(str) {
        return RootRollupInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
/**
 * Represents public inputs of the root rollup circuit.
 *
 * NOTE: in practice, we'll hash all of this up into a single public input, for cheap on-chain verification.
 */
export class RootRollupPublicInputs {
    constructor(
    /** Snapshot of archive tree after this block/rollup been processed */
    archive, 
    /** The root for the protocol circuits vk tree */
    vkTreeRoot, 
    /** A header of an L2 block. */
    header) {
        this.archive = archive;
        this.vkTreeRoot = vkTreeRoot;
        this.header = header;
    }
    static getFields(fields) {
        return [fields.archive, fields.vkTreeRoot, fields.header];
    }
    toBuffer() {
        return serializeToBuffer(...RootRollupPublicInputs.getFields(this));
    }
    toFields() {
        return serializeToFields(...RootRollupPublicInputs.getFields(this));
    }
    static from(fields) {
        return new RootRollupPublicInputs(...RootRollupPublicInputs.getFields(fields));
    }
    /**
     * Deserializes a buffer into a `RootRollupPublicInputs` object.
     * @param buffer - The buffer to deserialize.
     * @returns The deserialized `RootRollupPublicInputs` object.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new RootRollupPublicInputs(reader.readObject(AppendOnlyTreeSnapshot), Fr.fromBuffer(reader), reader.readObject(Header));
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(str) {
        return RootRollupPublicInputs.fromBuffer(Buffer.from(str, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdF9yb2xsdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RydWN0cy9yb2xsdXAvcm9vdF9yb2xsdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQWMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUc3RyxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdDQUF3QyxFQUN4Qyw2QkFBNkIsRUFDN0IsbUNBQW1DLEdBQ3BDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCO0lBQ0U7Ozs7T0FJRztJQUNJLGtCQUE0RDtJQUNuRTs7T0FFRztJQUNJLFdBQWtFO0lBQ3pFOztPQUVHO0lBQ0ksaUJBQXdFO0lBQy9FOztPQUVHO0lBQ0ksbUNBQStGO0lBQ3RHOztPQUVHO0lBQ0ksOEJBQXNEO0lBQzdEOztPQUVHO0lBQ0ksb0JBQTRDO0lBQ25EOztPQUVHO0lBQ0kscUJBQXVEO1FBeEJ2RCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTBDO1FBSTVELGdCQUFXLEdBQVgsV0FBVyxDQUF1RDtRQUlsRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVEO1FBSXhFLHdDQUFtQyxHQUFuQyxtQ0FBbUMsQ0FBNEQ7UUFJL0YsbUNBQThCLEdBQTlCLDhCQUE4QixDQUF3QjtRQUl0RCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1FBSTVD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