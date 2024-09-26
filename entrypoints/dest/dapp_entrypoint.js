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
        const payload = await EntrypointPayload.fromFunctionCalls(calls);
        const abi = this.getEntrypointAbi();
        const entrypointPackedArgs = await PackedValues.fromValues(encodeArguments(abi, [payload, this.userAddress]));
        const gasSettings = exec.fee?.gasSettings ?? GasSettings.default();
        const functionSelector = FunctionSelector.fromNameAndParameters(abi.name, abi.parameters);
        const innerHash = await computeInnerAuthWitHash([Fr.ZERO, functionSelector.toField(), entrypointPackedArgs.hash]);
        console.log('innerHash: ', innerHash.toString());
        const outerHash = await computeAuthWitMessageHash({ consumer: this.dappEntrypointAddress, innerHash }, { chainId: new Fr(this.chainId), version: new Fr(this.version) });
        console.log('outerHash: ', outerHash.toString());
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