import { EntrypointPayload } from '@aztec/aztec.js/entrypoint';
import { PackedValues, TxExecutionRequest } from '@aztec/circuit-types';
import { AztecAddress, GasSettings, TxContext } from '@aztec/circuits.js';
import { FunctionSelector, encodeArguments } from '@aztec/foundation/abi';
import { getCanonicalMultiCallEntrypointAddress } from '@aztec/protocol-contracts/multi-call-entrypoint';
/**
 * Implementation for an entrypoint interface that can execute multiple function calls in a single transaction
 */
export class DefaultMultiCallEntrypoint {
    constructor(chainId, version, address = AztecAddress.ZERO) {
        this.chainId = chainId;
        this.version = version;
        this.address = address;
    }
    async setAddress() {
        this.address = await getCanonicalMultiCallEntrypointAddress();
    }
    async createTxExecutionRequest(executions) {
        const { calls, authWitnesses = [], packedArguments = [] } = executions;
        const payload = await EntrypointPayload.fromAppExecution(calls);
        const abi = this.getEntrypointAbi();
        const entrypointPackedArgs = await PackedValues.fromValues(encodeArguments(abi, [payload]));
        const gasSettings = executions.fee?.gasSettings ?? GasSettings.default();
        const txRequest = TxExecutionRequest.from({
            firstCallArgsHash: entrypointPackedArgs.hash,
            origin: this.address,
            functionSelector: FunctionSelector.fromNameAndParameters(abi.name, abi.parameters),
            txContext: new TxContext(this.chainId, this.version, gasSettings),
            argsOfCalls: [...payload.packedArguments, ...packedArguments, entrypointPackedArgs],
            authWitnesses,
        });
        return Promise.resolve(txRequest);
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
                    name: 'app_payload',
                    type: {
                        kind: 'struct',
                        path: 'authwit::entrypoint::app::AppPayload',
                        fields: [
                            {
                                name: 'function_calls',
                                type: {
                                    kind: 'array',
                                    length: 4,
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
                                                    path: 'authwit::aztec::protocol_types::address::AztecAddress',
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
            ],
            returnTypes: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9tdWx0aV9jYWxsX2VudHJ5cG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW50cnlwb2ludC9kZWZhdWx0X211bHRpX2NhbGxfZW50cnlwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLGlCQUFpQixFQUE2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxPQUFPLEVBQW9CLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVGLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRXpHOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUFvQixPQUFlLEVBQVUsT0FBZSxFQUFVLFVBQXdCLFlBQVksQ0FBQyxJQUFJO1FBQTNGLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBa0M7SUFBRyxDQUFDO0lBRW5ILEtBQUssQ0FBQyxVQUFVO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLHNDQUFzQyxFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVELEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxVQUFnQztRQUM3RCxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFB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