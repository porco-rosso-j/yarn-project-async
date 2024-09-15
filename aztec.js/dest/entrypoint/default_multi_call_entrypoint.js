import { EntrypointPayload } from '@aztec/aztec.js/entrypoint';
import { PackedValues, TxExecutionRequest } from '@aztec/circuit-types';
import { GasSettings, TxContext } from '@aztec/circuits.js';
import { FunctionSelector, encodeArguments } from '@aztec/foundation/abi';
import { getCanonicalMultiCallEntrypointAddress } from '@aztec/protocol-contracts/multi-call-entrypoint';
/**
 * Implementation for an entrypoint interface that can execute multiple function calls in a single transaction
 */
export class DefaultMultiCallEntrypoint {
    constructor(chainId, version, address = getCanonicalMultiCallEntrypointAddress()) {
        this.chainId = chainId;
        this.version = version;
        this.address = address;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9tdWx0aV9jYWxsX2VudHJ5cG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW50cnlwb2ludC9kZWZhdWx0X211bHRpX2NhbGxfZW50cnlwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLGlCQUFpQixFQUE2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQXFCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRSxPQUFPLEVBQW9CLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVGLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRXpHOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNVLE9BQWUsRUFDZixPQUFlLEVBQ2YsVUFBd0Isc0NBQXNDLEVBQUU7UUFGaEUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUF5RDtJQUN2RSxDQUFDO0lBRUosS0FBSyxDQUFDLHdCQUF3QixDQUFDLFVBQWdDO1FBQzdELE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxlQUFlLEdBQUcsRUFBRSxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHLE1BQU0saUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxD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