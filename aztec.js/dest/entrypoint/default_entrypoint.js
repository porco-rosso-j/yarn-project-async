import { PackedValues, TxExecutionRequest } from '@aztec/circuit-types';
import { GasSettings, TxContext } from '@aztec/circuits.js';
import { FunctionType } from '@aztec/foundation/abi';
/**
 * Default implementation of the entrypoint interface. It calls a function on a contract directly
 */
export class DefaultEntrypoint {
    constructor(chainId, protocolVersion) {
        this.chainId = chainId;
        this.protocolVersion = protocolVersion;
    }
    async createTxExecutionRequest(exec) {
        const { calls, authWitnesses = [], packedArguments = [] } = exec;
        if (calls.length > 1) {
            throw new Error(`Expected a single call, got ${calls.length}`);
        }
        const call = calls[0];
        if (call.type !== FunctionType.PRIVATE) {
            throw new Error('Public entrypoints are not allowed');
        }
        const entrypointPackedValues = await PackedValues.fromValues(call.args);
        const gasSettings = exec.fee?.gasSettings ?? GasSettings.default();
        const txContext = new TxContext(this.chainId, this.protocolVersion, gasSettings);
        return Promise.resolve(new TxExecutionRequest(call.to, call.selector, entrypointPackedValues.hash, txContext, [...packedArguments, entrypointPackedValues], authWitnesses));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9lbnRyeXBvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VudHJ5cG9pbnQvZGVmYXVsdF9lbnRyeXBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUlyRDs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFBb0IsT0FBZSxFQUFVLGVBQXVCO1FBQWhELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBUTtJQUFHLENBQUM7SUFFeEUsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQTBCO1FBQ3ZELE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxlQUFlLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRWpFLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxNQUFNLHNCQUFzQixHQUFHLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25FLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQ3BCLElBQUksa0JBQWtCLENBQ3BCLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLFFBQVEsRUFDYixzQkFBc0IsQ0FBQyxJQUFJLEVBQzNCLFNBQVMsRUFDVCxDQUFDLEdBQUcsZUFBZSxFQUFFLHNCQUFzQixDQUFDLEVBQzVDLGFBQWEsQ0FDZCxDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YifQ==