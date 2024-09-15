import { AppendOnlyTreeSnapshot, AztecAddress, ContentCommitment, EthAddress, Fr, GasFees, GlobalVariables, Header, NUM_BYTES_PER_SHA256, PartialStateReference, StateReference, } from '@aztec/circuits.js';
import { fr } from '@aztec/circuits.js/testing';
import { toBufferBE } from '@aztec/foundation/bigint-buffer';
/**
 * Makes header.
 */
export function makeHeader(seed = 0, blockNumber = undefined, txsEffectsHash = undefined, inHash = undefined) {
    return new Header(makeAppendOnlyTreeSnapshot(seed + 0x100), makeContentCommitment(seed + 0x200, txsEffectsHash, inHash), makeStateReference(seed + 0x600), makeGlobalVariables((seed += 0x700), blockNumber), fr(seed + 0x800));
}
/**
 * Makes arbitrary append only tree snapshot.
 * @param seed - The seed to use for generating the append only tree snapshot.
 * @returns An append only tree snapshot.
 */
export function makeAppendOnlyTreeSnapshot(seed = 1) {
    return new AppendOnlyTreeSnapshot(new Fr(seed), seed);
}
/**
 * Makes content commitment
 */
function makeContentCommitment(seed = 0, txsEffectsHash = undefined, inHash = undefined) {
    return new ContentCommitment(new Fr(seed), txsEffectsHash ?? toBufferBE(BigInt(seed + 0x100), NUM_BYTES_PER_SHA256), inHash ?? toBufferBE(BigInt(seed + 0x200), NUM_BYTES_PER_SHA256), toBufferBE(BigInt(seed + 0x300), NUM_BYTES_PER_SHA256));
}
/**
 * Makes arbitrary state reference.
 * @param seed - The seed to use for generating the state reference.
 * @returns A state reference.
 */
function makeStateReference(seed = 0) {
    return new StateReference(makeAppendOnlyTreeSnapshot(seed), makePartialStateReference(seed + 1));
}
/**
 * Makes arbitrary partial state reference.
 * @param seed - The seed to use for generating the partial state reference.
 * @returns A partial state reference.
 */
function makePartialStateReference(seed = 0) {
    return new PartialStateReference(makeAppendOnlyTreeSnapshot(seed), makeAppendOnlyTreeSnapshot(seed + 1), makeAppendOnlyTreeSnapshot(seed + 2));
}
/**
 * Makes global variables.
 * @param seed - The seed to use for generating the global variables.
 * @param blockNumber - The block number to use for generating the global variables.
 * If blockNumber is undefined, it will be set to seed + 2.
 * @returns Global variables.
 */
export function makeGlobalVariables(seed = 1, blockNumber = undefined) {
    if (blockNumber !== undefined) {
        return new GlobalVariables(new Fr(seed), new Fr(seed + 1), new Fr(blockNumber), new Fr(seed + 3), EthAddress.fromField(new Fr(seed + 4)), AztecAddress.fromField(new Fr(seed + 5)), new GasFees(new Fr(seed + 6), new Fr(seed + 7)));
    }
    return new GlobalVariables(new Fr(seed), new Fr(seed + 1), new Fr(seed + 2), new Fr(seed + 3), EthAddress.fromField(new Fr(seed + 4)), AztecAddress.fromField(new Fr(seed + 5)), new GasFees(new Fr(seed + 6), new Fr(seed + 7)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibDJfYmxvY2tfY29kZV90b19wdXJnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sMl9ibG9ja19jb2RlX3RvX3B1cmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsRUFBRSxFQUNGLE9BQU8sRUFDUCxlQUFlLEVBQ2YsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsY0FBYyxHQUNmLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUU3RDs7R0FFRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQ3hCLElBQUksR0FBRyxDQUFDLEVBQ1IsY0FBa0MsU0FBUyxFQUMzQyxpQkFBcUMsU0FBUyxFQUM5QyxTQUE2QixTQUFTO0lBRXRDLE9BQU8sSUFBSSxNQUFNLENBQ2YsMEJBQTBCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUN4QyxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFDM0Qsa0JBQWtCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUNoQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRSxXQUFXLENBQUMsRUFDakQsRUFBRSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FDakIsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLElBQUksR0FBRyxDQUFDO0lBQ2pELE9BQU8sSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQ7O0dBRUc7QUFD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