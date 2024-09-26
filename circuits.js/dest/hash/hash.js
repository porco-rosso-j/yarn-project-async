import { padArrayEnd } from '@aztec/foundation/collection';
import { pedersenHash, pedersenHashBuffer } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { numToUInt8, numToUInt16BE, numToUInt32BE } from '@aztec/foundation/serialize';
import chunk from 'lodash.chunk';
import { ARGS_HASH_CHUNK_COUNT, ARGS_HASH_CHUNK_LENGTH, GeneratorIndex, MAX_ARGS_LENGTH } from '../constants.gen.js';
import { VerificationKey } from '../structs/index.js';
/**
 * Computes a hash of a given verification key.
 * @param vkBuf - The verification key.
 * @returns The hash of the verification key.
 */
export function hashVK(vkBuf) {
    const vk = VerificationKey.fromBuffer(vkBuf);
    const toHash = Buffer.concat([
        numToUInt8(vk.circuitType),
        numToUInt16BE(5), // fr::coset_generator(0)?
        numToUInt32BE(vk.circuitSize),
        numToUInt32BE(vk.numPublicInputs),
        ...Object.values(vk.commitments)
            .map(e => [e.y.toBuffer(), e.x.toBuffer()])
            .flat(),
        // Montgomery form of fr::one()? Not sure. But if so, why?
        Buffer.from('1418144d5b080fcac24cdb7649bdadf246a6cb2426e324bedb94fb05118f023a', 'hex'),
    ]);
    return pedersenHashBuffer(toHash);
}
/**
 * Computes a note hash nonce, which will be used to create a unique note hash.
 * @param nullifierZero - The first nullifier in the tx.
 * @param noteHashIndex - The index of the note hash.
 * @returns A note hash nonce.
 */
export async function computeNoteHashNonce(nullifierZero, noteHashIndex) {
    return await pedersenHash([nullifierZero, noteHashIndex], GeneratorIndex.NOTE_HASH_NONCE);
}
/**
 * Computes a siloed note hash, given the contract address and the note hash itself.
 * A siloed note hash effectively namespaces a note hash to a specific contract.
 * @param contract - The contract address
 * @param innerNoteHash - The note hash to silo.
 * @returns A siloed note hash.
 */
export async function siloNoteHash(contract, uniqueNoteHash) {
    return await pedersenHash([contract, uniqueNoteHash], GeneratorIndex.SILOED_NOTE_HASH);
}
/**
 * Computes a note content hash.
 * @param noteContent - The note content (e.g. note.items).
 * @returns A note content hash.
 */
export async function computeNoteContentHash(noteContent) {
    return await pedersenHash(noteContent, GeneratorIndex.NOTE_CONTENT_HASH);
}
/**
 * Computes an inner note hash, given a storage slot and a note hash.
 * @param storageSlot - The storage slot.
 * @param noteHash - The note hash.
 * @returns An inner note hash.
 */
export async function computeInnerNoteHash(storageSlot, noteHash) {
    return await pedersenHash([storageSlot, noteHash], GeneratorIndex.INNER_NOTE_HASH);
}
/**
 * Computes a unique note hash.
 * @dev Includes a nonce which contains data that guarantees the resulting note hash will be unique.
 * @param nonce - The contract address.
 * @param innerNoteHash - An inner note hash.
 * @returns A unique note hash.
 */
export async function computeUniqueNoteHash(nonce, innerNoteHash) {
    return await pedersenHash([nonce, innerNoteHash], GeneratorIndex.UNIQUE_NOTE_HASH);
}
/**
 * Computes a siloed nullifier, given the contract address and the inner nullifier.
 * A siloed nullifier effectively namespaces a nullifier to a specific contract.
 * @param contract - The contract address.
 * @param innerNullifier - The nullifier to silo.
 * @returns A siloed nullifier.
 */
export async function siloNullifier(contract, innerNullifier) {
    return await pedersenHash([contract, innerNullifier], GeneratorIndex.OUTER_NULLIFIER);
}
/**
 * Computes a public data tree value ready for insertion.
 * @param value - Raw public data tree value to hash into a tree-insertion-ready value.
 * @returns Value hash into a tree-insertion-ready value.

 */
export function computePublicDataTreeValue(value) {
    return value;
}
/**
 * Computes a public data tree index from contract address and storage slot.
 * @param contractAddress - Contract where insertion is occurring.
 * @param storageSlot - Storage slot where insertion is occurring.
 * @returns Public data tree index computed from contract address and storage slot.

 */
export async function computePublicDataTreeLeafSlot(contractAddress, storageSlot) {
    return await pedersenHash([contractAddress, storageSlot], GeneratorIndex.PUBLIC_LEAF_INDEX);
}
/**
 * Computes the hash of a list of arguments.
 * @param args - Arguments to hash.
 * @returns Pedersen hash of the arguments.
 */
export async function computeVarArgsHash(args) {
    if (args.length === 0) {
        return Fr.ZERO;
    }
    if (args.length > MAX_ARGS_LENGTH) {
        throw new Error(`Hashing ${args.length} args exceeds max of ${MAX_ARGS_LENGTH}`);
    }
    let chunksHashes = await Promise.all(chunk(args, ARGS_HASH_CHUNK_LENGTH).map(async (c) => {
        if (c.length < ARGS_HASH_CHUNK_LENGTH) {
            c = padArrayEnd(c, Fr.ZERO, ARGS_HASH_CHUNK_LENGTH);
        }
        return await pedersenHash(c, GeneratorIndex.FUNCTION_ARGS);
    }));
    if (chunksHashes.length < ARGS_HASH_CHUNK_COUNT) {
        chunksHashes = padArrayEnd(chunksHashes, Fr.ZERO, ARGS_HASH_CHUNK_COUNT);
    }
    return await pedersenHash(chunksHashes, GeneratorIndex.FUNCTION_ARGS);
}
/**
 * Computes a hash of a secret.
 * @dev This function is used to generate secrets for the L1 to L2 message flow and for the TransparentNote.
 * @param secret - The secret to hash (could be generated however you want e.g. `Fr.random()`)
 * @returns The hash
 */
export async function computeSecretHash(secret) {
    return await pedersenHash([secret], GeneratorIndex.SECRET_HASH);
}
export async function computeL1ToL2MessageNullifier(contract, messageHash, secret, messageIndex) {
    const innerMessageNullifier = await pedersenHash([messageHash, secret, messageIndex], GeneratorIndex.MESSAGE_NULLIFIER);
    return await siloNullifier(contract, innerMessageNullifier);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYXNoL2hhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkYsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXREOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsTUFBTSxDQUFDLEtBQWE7SUFDbEMsTUFBTSxFQUFFLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSwwQkFBMEI7UUFDNUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDN0IsYUFBYSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDakMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7YUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxF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