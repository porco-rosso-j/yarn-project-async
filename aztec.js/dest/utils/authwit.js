import { PackedValues } from '@aztec/circuit-types';
import { Fr, GeneratorIndex } from '@aztec/circuits.js';
import { pedersenHash } from '@aztec/foundation/crypto';
import { ContractFunctionInteraction } from '../contract/contract_function_interaction.js';
// docs:start:authwit_computeAuthWitMessageHash
/**
 * Compute an authentication witness message hash from an intent and metadata
 *
 * If using the `IntentInnerHash`, the consumer is the address that can "consume" the authwit, for token approvals it is the token contract itself.
 * The `innerHash` itself will be the message that a contract is allowed to execute.
 * At the point of "approval checking", the validating contract (account for private and registry for public) will be computing the message hash
 * (`H(consumer, chainid, version, inner_hash)`) where the all but the `inner_hash` is injected from the context (consumer = msg_sender),
 * and use it for the authentication check.
 * Therefore, any allowed `innerHash` will therefore also have information around where it can be spent (version, chainId) and who can spend it (consumer).
 *
 * If using the `IntentAction`, the caller is the address that is making the call, for a token approval from Alice to Bob, this would be Bob.
 * The action is then used along with the `caller` to compute the `innerHash` and the consumer.
 *
 *
 * @param intent - The intent to approve (consumer and innerHash or caller and action)
 *                 The consumer is the address that can "consume" the authwit, for token approvals it is the token contract itself.
 *                 The caller is the address that is making the call, for a token approval from Alice to Bob, this would be Bob.
 *                 The caller becomes part of the `inner_hash` and is dealt with entirely in application logic.
 * @param metadata - The metadata for the intent (chainId, version)
 * @returns The message hash for the action
 */
export const computeAuthWitMessageHash = async (intent, metadata) => {
    const chainId = metadata.chainId;
    const version = metadata.version;
    if ('caller' in intent) {
        const action = intent.action instanceof ContractFunctionInteraction ? intent.action.request() : intent.action;
        return computeOuterAuthWitHash(action.to.toField(), chainId, version, await computeInnerAuthWitHashFromAction(intent.caller, action));
    }
    else {
        const inner = Buffer.isBuffer(intent.innerHash) ? Fr.fromBuffer(intent.innerHash) : intent.innerHash;
        return computeOuterAuthWitHash(intent.consumer, chainId, version, inner);
    }
};
// docs:end:authwit_computeAuthWitMessageHash
export const computeInnerAuthWitHashFromAction = async (caller, action) => await computeInnerAuthWitHash([
    caller.toField(),
    action.selector.toField(),
    (await PackedValues.fromValues(action.args)).hash,
]);
/**
 * Compute the inner hash for an authentication witness.
 * This is the "intent" of the message, before siloed with the consumer.
 * It is used as part of the `computeAuthWitMessageHash` but can also be used
 * in case the message is not a "call" to a function, but arbitrary data.
 * @param args - The arguments to hash
 * @returns The inner hash for the witness
 */
export const computeInnerAuthWitHash = async (args) => {
    return await pedersenHash(args, GeneratorIndex.AUTHWIT_INNER);
};
/**
 * Compute the outer hash for an authentication witness.
 * This is the value siloed with its "consumer" and what the `on_behalf_of`
 * should be signing.
 * The consumer is who will be consuming the message, for token approvals it
 * is the token contract itself (because the token makes the call to check the approval).
 * It is used as part of the `computeAuthWitMessageHash` but can also be used
 * in case the message is not a "call" to a function, but arbitrary data.
 * @param consumer - The address that can "consume" the authwit
 * @param chainId - The chain id that can "consume" the authwit
 * @param version - The version that can "consume" the authwit
 * @param innerHash - The inner hash for the witness
 * @returns The outer hash for the witness
 */
const computeOuterAuthWitHash = async (consumer, chainId, version, innerHash) => {
    return await pedersenHash([consumer.toField(), chainId, version, innerHash], GeneratorIndex.AUTHWIT_OUTER);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aHdpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdXRod2l0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBcUIsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFxQixFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBMEIzRiwrQ0FBK0M7QUFDL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUFFLE1BQXNDLEVBQUUsUUFBd0IsRUFBRSxFQUFFO0lBQ2xILE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDakMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUVqQyxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUN2QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxZQUFZLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlHLE9BQU8sdUJBQXVCLENBQzVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQ25CLE9BQU8sRUFDUCxPQUFPLEVBQ1AsTUFBTSxpQ0FBaUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUMvRCxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckcsT0FBTyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNGLDZDQUE2QztBQUU3QyxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBRyxLQUFLLEVBQUUsTUFBb0IsRUFBRSxNQUFvQixFQUFFLEVBQUUsQ0FDcEcsTUFBTSx1QkFBdUIsQ0FBQztJQUM1QixNQUFNLENBQUMsT0FBTyxFQUFFO0lBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ3pCLENBQUMsTUFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7Q0FDbEQsQ0FBQyxDQUFDO0FBRUw7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEtBQUssRUFBRSxJQUFVLEVBQUUsRUFBRTtJQUMxRCxPQUFPLE1BQU0sWUFBWSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEUsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sdUJBQXVCLEdBQUcsS0FBSyxFQUFFLFFBQXNCLEVBQUUsT0FBVyxFQUFFLE9BQVcsRUFBRSxTQUFhLEVBQUUsRUFBRTtJQUN4RyxPQUFPLE1BQU0sWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdHLENBQUMsQ0FBQyJ9