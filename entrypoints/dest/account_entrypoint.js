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
        const appPayload = EntrypointPayload.fromAppExecution(calls);
        const feePayload = await EntrypointPayload.fromFeeOptions(this.address, fee);
        const abi = this.getEntrypointAbi();
        const entrypointPackedArgs = await PackedValues.fromValues(encodeArguments(abi, [appPayload, feePayload]));
        const gasSettings = exec.fee?.gasSettings ?? GasSettings.default();
        const appAuthWitness = await this.auth.createAuthWit(await appPayload.hash());
        const feeAuthWitness = await this.auth.createAuthWit(await feePayload.hash());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9lbnRyeXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FjY291bnRfZW50cnlwb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQTRCLGlCQUFpQixFQUE2QixNQUFNLDRCQUE0QixDQUFDO0FBQ3BILE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQXFCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRSxPQUFPLEVBQW9CLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ1UsT0FBcUIsRUFDckIsSUFBeUIsRUFDekIsVUFBa0IsZ0JBQWdCLEVBQ2xDLFVBQWtCLGVBQWU7UUFIakMsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUN6QixZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtJQUN4QyxDQUFDO0lBRUosS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQTBCO1FBQ3ZELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELE1BQU0sVUFBVSxHQUFHLE1BQU0saUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFN0UsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0csTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5FLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5RSxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFOUUsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQ3hDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLElBQUk7WUFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3BCLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNsRixTQUFTLEVBQUUsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztZQUNqRSxXQUFXLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLG9CQUFvQixDQUFDO1lBQ2pHLGFBQWEsRUFBRSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUM7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixPQUFPO1lBQ0wsSUFBSSxFQUFFLFlBQVk7WUFDbEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRTt3QkFDSixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsc0NBQXNDO3dCQUM1QyxNQUFNLEVBQUU7NEJBQ047Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFO29DQUNKLElBQUksRUFBRSxPQUFPO29DQUNiLE1BQU0sRUFBRSxDQUFDO29DQUNULElBQUksRUFBRTt3Q0FDSixJQUFJLEVBQUUsUUFBUTt3Q0FDZCxJQUFJLEVBQUUsa0RBQWtEO3dDQUN4RCxNQUFNLEVBQUU7NENBQ04sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTs0Q0FDOUM7Z0RBQ0UsSUFBSSxFQUFFLG1CQUFtQjtnREFDekIsSUFBSSxFQUFFO29EQUNKLElBQUksRUFBRSxRQUFRO29EQUNkLElBQUksRUFBRSwyRUFBMkU7b0RBQ2pGLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7aURBQ3BGOzZDQUNGOzRDQUNEO2dEQUNFLElBQUksRUFBRSxnQkFBZ0I7Z0RBQ3RCLElBQUksRUFBRTtvREFDSixJQUFJLEVBQUUsUUFBUTtvREFDZCxJQUFJLEVBQUUsdURBQXVEO29EQUM3RCxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7aURBQ3JEOzZDQUNGOzRDQUNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUU7NENBQ2hELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUU7eUNBQ2pEO3FDQUNGO2lDQUNGOzZCQUNGOzRCQUNELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7eUJBQzNDO3FCQUNGO29CQUNELFVBQVUsRUFBRSxRQUFRO2lCQUNyQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3dCQUNkLElBQUksRUFBRSxzQ0FBc0M7d0JBQzVDLE1BQU0sRUFBRTs0QkFDTjtnQ0FDRSxJQUFJLEVBQUUsZ0JBQWdCO2dDQUN0QixJQUFJLEVBQUU7b0NBQ0osSUFBSSxFQUFFLE9BQU87b0NBQ2IsTUFBTSxFQUFFLENBQUM7b0NBQ1QsSUFBSSxFQUFFO3dDQUNKLElBQUksRUFBRSxRQUFRO3dDQUNkLElBQUksRUFBRSxrREFBa0Q7d0NBQ3hELE1BQU0sRUFBRTs0Q0FDTixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFOzRDQUM5QztnREFDRSxJQUFJLEVBQUUsbUJBQW1CO2dEQUN6QixJQUFJLEVBQUU7b0RBQ0osSUFBSSxFQUFFLFFBQVE7b0RBQ2QsSUFBSSxFQUFFLDJFQUEyRTtvREFDakYsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztpREFDcEY7NkNBQ0Y7NENBQ0Q7Z0RBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnREFDdEIsSUFBSSxFQUFFO29EQUNKLElBQUksRUFBRSxRQUFRO29EQUNkLElBQUksRUFBRSx1REFBdUQ7b0RBQzdELE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztpREFDckQ7NkNBQ0Y7NENBQ0QsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTs0Q0FDaEQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTt5Q0FDakQ7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7NEJBQ0QsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTs0QkFDMUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTt5QkFDcEQ7cUJBQ0Y7b0JBQ0QsVUFBVSxFQUFFLFFBQVE7aUJBQ3JCO2FBQ0Y7WUFDRCxXQUFXLEVBQUUsRUFBRTtTQUNELENBQUM7SUFDbkIsQ0FBQztDQUNGIn0=