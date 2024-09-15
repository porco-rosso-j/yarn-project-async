import { type AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
/**
 * Computes a hash of a given verification key.
 * @param vkBuf - The verification key.
 * @returns The hash of the verification key.
 */
export declare function hashVK(vkBuf: Buffer): Promise<Buffer>;
/**
 * Computes a note hash nonce, which will be used to create a unique note hash.
 * @param nullifierZero - The first nullifier in the tx.
 * @param noteHashIndex - The index of the note hash.
 * @returns A note hash nonce.
 */
export declare function computeNoteHashNonce(nullifierZero: Fr, noteHashIndex: number): Promise<Fr>;
/**
 * Computes a siloed note hash, given the contract address and the note hash itself.
 * A siloed note hash effectively namespaces a note hash to a specific contract.
 * @param contract - The contract address
 * @param innerNoteHash - The note hash to silo.
 * @returns A siloed note hash.
 */
export declare function siloNoteHash(contract: AztecAddress, uniqueNoteHash: Fr): Promise<Fr>;
/**
 * Computes a note content hash.
 * @param noteContent - The note content (e.g. note.items).
 * @returns A note content hash.
 */
export declare function computeNoteContentHash(noteContent: Fr[]): Promise<Fr>;
/**
 * Computes an inner note hash, given a storage slot and a note hash.
 * @param storageSlot - The storage slot.
 * @param noteHash - The note hash.
 * @returns An inner note hash.
 */
export declare function computeInnerNoteHash(storageSlot: Fr, noteHash: Fr): Promise<Fr>;
/**
 * Computes a unique note hash.
 * @dev Includes a nonce which contains data that guarantees the resulting note hash will be unique.
 * @param nonce - The contract address.
 * @param innerNoteHash - An inner note hash.
 * @returns A unique note hash.
 */
export declare function computeUniqueNoteHash(nonce: Fr, innerNoteHash: Fr): Promise<Fr>;
/**
 * Computes a siloed nullifier, given the contract address and the inner nullifier.
 * A siloed nullifier effectively namespaces a nullifier to a specific contract.
 * @param contract - The contract address.
 * @param innerNullifier - The nullifier to silo.
 * @returns A siloed nullifier.
 */
export declare function siloNullifier(contract: AztecAddress, innerNullifier: Fr): Promise<Fr>;
/**
 * Computes a public data tree value ready for insertion.
 * @param value - Raw public data tree value to hash into a tree-insertion-ready value.
 * @returns Value hash into a tree-insertion-ready value.

 */
export declare function computePublicDataTreeValue(value: Fr): Fr;
/**
 * Computes a public data tree index from contract address and storage slot.
 * @param contractAddress - Contract where insertion is occurring.
 * @param storageSlot - Storage slot where insertion is occurring.
 * @returns Public data tree index computed from contract address and storage slot.

 */
export declare function computePublicDataTreeLeafSlot(contractAddress: AztecAddress, storageSlot: Fr): Promise<Fr>;
/**
 * Computes the hash of a list of arguments.
 * @param args - Arguments to hash.
 * @returns Pedersen hash of the arguments.
 */
export declare function computeVarArgsHash(args: Fr[]): Promise<Fr>;
/**
 * Computes a hash of a secret.
 * @dev This function is used to generate secrets for the L1 to L2 message flow and for the TransparentNote.
 * @param secret - The secret to hash (could be generated however you want e.g. `Fr.random()`)
 * @returns The hash
 */
export declare function computeSecretHash(secret: Fr): Promise<Fr>;
export declare function computeL1ToL2MessageNullifier(contract: AztecAddress, messageHash: Fr, secret: Fr, messageIndex: bigint): Promise<Fr>;
//# sourceMappingURL=hash.d.ts.map