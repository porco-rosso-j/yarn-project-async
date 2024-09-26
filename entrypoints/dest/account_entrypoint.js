import { EntrypointPayload } from '@aztec/aztec.js/entrypoint';
import { PackedValues, TxExecutionRequest } from '@aztec/circuit-types';
import { GasSettings, TxContext } from '@aztec/circuits.js';
import { FunctionSelector, encodeArguments } from '@aztec/foundation/abi';
import { DEFAULT_CHAIN_ID, DEFAULT_VERSION } from './constants.js';
/**
 * Implementation for an entrypoint interface that follows the default entrypoint signature
 * for an account, which accepts an AppPayload and a FeePayload as defined in noir-libs/aztec-noir/src/entrypoint module
 */
export class DefaultAccountEntrypoint {
    constructor(address, auth, chainId = DEFAULT_CHAIN_ID, version = DEFAULT_VERSION) {
        this.address = address;
        this.auth = auth;
        this.chainId = chainId;
        this.version = version;
    }
    async createTxExecutionRequest(exec) {
        const { calls, fee } = exec;
        const appPayload = await EntrypointPayload.fromAppExecution(calls);
        const feePayload = await EntrypointPayload.fromFeeOptions(this.address, fee);
        const abi = this.getEntrypointAbi();
        const entrypointPackedArgs = await PackedValues.fromValues(encodeArguments(abi, [appPayload, feePayload]));
        const gasSettings = exec.fee?.gasSettings ?? GasSettings.default();
        const appPayloadHash = await appPayload.hash();
        console.log('appPayloadHash: ', appPayloadHash.toString());
        const appAuthWitness = await this.auth.createAuthWit(appPayloadHash);
        const feePayloadHash = await feePayload.hash();
        console.log('feePayloadHash: ', feePayloadHash.toString());
        const feeAuthWitness = await this.auth.createAuthWit(feePayloadHash);
        const txRequest = TxExecutionRequest.from({
            firstCallArgsHash: entrypointPackedArgs.hash,
            origin: this.address,
            functionSelector: FunctionSelector.fromNameAndParameters(abi.name, abi.parameters),
            txContext: new TxContext(this.chainId, this.version, gasSettings),
            argsOfCalls: [...appPayload.packedArguments, ...feePayload.packedArguments, entrypointPackedArgs],
            authWitnesses: [appAuthWitness, feeAuthWitness],
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
                {
                    name: 'fee_payload',
                    type: {
                        kind: 'struct',
                        path: 'authwit::entrypoint::fee::FeePayload',
                        fields: [
                            {
                                name: 'function_calls',
                                type: {
                                    kind: 'array',
                                    length: 2,
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
                            { name: 'is_fee_payer', type: { kind: 'boolean' } },
                        ],
                    },
                    visibility: 'public',
                },
            ],
            returnTypes: [],
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9lbnRyeXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FjY291bnRfZW50cnlwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQTRCLGlCQUFpQixFQUE2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQXFCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRSxPQUFPLEVBQW9CLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1UsT0FBcUIsRUFDckIsSUFBeUIsRUFDekIsVUFBa0IsZ0JBQWdCLEVBQ2xDLFVBQWtCLGVBQWU7UUFIakMsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUN6QixZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtJQUN4QyxDQUFDO0lBRUosS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQTBCO1FBQ3ZELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sVUFBVSxHQUFHLE1BQU0saUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsTUFBTSxVQUFVLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwQyxNQUFN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