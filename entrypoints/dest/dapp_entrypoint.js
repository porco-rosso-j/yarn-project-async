import { computeAuthWitMessageHash, computeInnerAuthWitHash } from '@aztec/aztec.js';
import { EntrypointPayload } from '@aztec/aztec.js/entrypoint';
import { PackedValues, TxExecutionRequest } from '@aztec/circuit-types';
import { Fr, GasSettings, TxContext } from '@aztec/circuits.js';
import { FunctionSelector, encodeArguments } from '@aztec/foundation/abi';
import { DEFAULT_CHAIN_ID, DEFAULT_VERSION } from './constants.js';
/**
 * Implementation for an entrypoint interface that follows the default entrypoint signature
 * for an account, which accepts an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
export class DefaultDappEntrypoint {
    constructor(userAddress, userAuthWitnessProvider, dappEntrypointAddress, chainId = DEFAULT_CHAIN_ID, version = DEFAULT_VERSION) {
        this.userAddress = userAddress;
        this.userAuthWitnessProvider = userAuthWitnessProvider;
        this.dappEntrypointAddress = dappEntrypointAddress;
        this.chainId = chainId;
        this.version = version;
    }
    async createTxExecutionRequest(exec) {
        const { calls } = exec;
        if (calls.length !== 1) {
            throw new Error(`Expected exactly 1 function call, got ${calls.length}`);
        }
        const payload = EntrypointPayload.fromFunctionCalls(calls);
        const abi = this.getEntrypointAbi();
        const entrypointPackedArgs = await PackedValues.fromValues(encodeArguments(abi, [payload, this.userAddress]));
        const gasSettings = exec.fee?.gasSettings ?? GasSettings.default();
        const functionSelector = FunctionSelector.fromNameAndParameters(abi.name, abi.parameters);
        const innerHash = await computeInnerAuthWitHash([Fr.ZERO, functionSelector.toField(), entrypointPackedArgs.hash]);
        const outerHash = await computeAuthWitMessageHash({ consumer: this.dappEntrypointAddress, innerHash }, { chainId: new Fr(this.chainId), version: new Fr(this.version) });
        const authWitness = await this.userAuthWitnessProvider.createAuthWit(outerHash);
        const txRequest = TxExecutionRequest.from({
            firstCallArgsHash: entrypointPackedArgs.hash,
            origin: this.dappEntrypointAddress,
            functionSelector,
            txContext: new TxContext(this.chainId, this.version, gasSettings),
            argsOfCalls: [...payload.packedArguments, entrypointPackedArgs],
            authWitnesses: [authWitness],
        });
        return txRequest;
    }
    getEntrypointAbi() {
        return {
            name: 'entrypoint',
            isInitializer: false,
            functionType: 'private',
            isInternal: false,
            isStatic: false,
            parameters: [
                {
                    name: 'payload',
                    type: {
                        kind: 'struct',
                        path: 'dapp_payload::DAppPayload',
                        fields: [
                            {
                                name: 'function_calls',
                                type: {
                                    kind: 'array',
                                    length: 1,
                                    type: {
                                        kind: 'struct',
                                        path: 'authwit::entrypoint::function_call::FunctionCall',
                                        fields: [
                                            { name: 'args_hash', type: { kind: 'field' } },
                                            {
                                                name: 'function_selector',
                                                type: {
                                                    kind: 'struct',
                                                    path: 'authwit::aztec::protocol_types::abis::function_selector::FunctionSelector',
                                                    fields: [{ name: 'inner', type: { kind: 'integer', sign: 'unsigned', width: 32 } }],
                                                },
                                            },
                                            {
                                                name: 'target_address',
                                                type: {
                                                    kind: 'struct',
                                                    path: 'authwit::aztec::protocol_types::address::aztec_address::AztecAddress',
                                                    fields: [{ name: 'inner', type: { kind: 'field' } }],
                                                },
                                            },
                                            { name: 'is_public', type: { kind: 'boolean' } },
                                            { name: 'is_static', type: { kind: 'boolean' } },
                                        ],
                                    },
                                },
                            },
                            { name: 'nonce', type: { kind: 'field' } },
                        ],
                    },
                    visibility: 'public',
                },
                {
                    name: 'user_address',
                    type: {
                        kind: 'struct',
                        path: 'authwit::aztec::protocol_types::address::aztec_address::AztecAddress',
                        fields: [{ name: 'inner', type: { kind: 'field' } }],
                    },
                    visibility: 'public',
                },
            ],
            returnTypes: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFwcF9lbnRyeXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RhcHBfZW50cnlwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVyRixPQUFPLEVBQTRCLGlCQUFpQixFQUE2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQXFCLEVBQUUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkYsT0FBTyxFQUFvQixnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU1RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkU7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNVLFdBQXlCLEVBQ3pCLHVCQUE0QyxFQUM1QyxxQkFBbUMsRUFDbkMsVUFBa0IsZ0JBQWdCLEVBQ2xDLFVBQWtCLGVBQWU7UUFKakMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFDekIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFxQjtRQUM1QywwQkFBcUIsR0FBckIscUJBQXFCLENBQWM7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBMkI7UUFDbEMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7SUFDeEMsQ0FBQztJQUVKLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUEwQjtRQUN2RCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMs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