var _DeployAccountMethod_authWitnessProvider, _DeployAccountMethod_feePaymentArtifact;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { FunctionSelector, encodeArguments, getFunctionArtifact, } from '@aztec/foundation/abi';
import { Contract } from '../contract/contract.js';
import { DeployMethod } from '../contract/deploy_method.js';
import { EntrypointPayload } from '../entrypoint/payload.js';
/**
 * Contract interaction for deploying an account contract. Handles fee preparation and contract initialization.
 */
export class DeployAccountMethod extends DeployMethod {
    constructor(authWitnessProvider, publicKeysHash, wallet, artifact, args = [], constructorNameOrArtifact, feePaymentNameOrArtifact) {
        super(publicKeysHash, wallet, artifact, (address, wallet) => Contract.at(address, artifact, wallet), args, constructorNameOrArtifact);
        _DeployAccountMethod_authWitnessProvider.set(this, void 0);
        _DeployAccountMethod_feePaymentArtifact.set(this, void 0);
        __classPrivateFieldSet(this, _DeployAccountMethod_authWitnessProvider, authWitnessProvider, "f");
        __classPrivateFieldSet(this, _DeployAccountMethod_feePaymentArtifact, typeof feePaymentNameOrArtifact === 'string'
            ? getFunctionArtifact(artifact, feePaymentNameOrArtifact)
            : feePaymentNameOrArtifact, "f");
    }
    async getInitializeFunctionCalls(options) {
        const exec = await super.getInitializeFunctionCalls(options);
        if (options.fee && __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f")) {
            const { address } = await this.getInstance();
            const emptyAppPayload = EntrypointPayload.fromAppExecution([]);
            const feePayload = await EntrypointPayload.fromFeeOptions(address, options?.fee);
            exec.calls.push({
                name: __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").name,
                to: address,
                args: encodeArguments(__classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f"), [emptyAppPayload, feePayload]),
                selector: FunctionSelector.fromNameAndParameters(__classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").name, __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").parameters),
                type: __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").functionType,
                isStatic: __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").isStatic,
                returnTypes: __classPrivateFieldGet(this, _DeployAccountMethod_feePaymentArtifact, "f").returnTypes,
            });
            exec.authWitnesses ?? (exec.authWitnesses = []);
            exec.packedArguments ?? (exec.packedArguments = []);
            exec.authWitnesses.push(await __classPrivateFieldGet(this, _DeployAccountMethod_authWitnessProvider, "f").createAuthWit(await emptyAppPayload.hash()));
            exec.authWitnesses.push(await __classPrivateFieldGet(this, _DeployAccountMethod_authWitnessProvider, "f").createAuthWit(await feePayload.hash()));
            exec.packedArguments.push(...emptyAppPayload.packedArguments);
            exec.packedArguments.push(...feePayload.packedArguments);
        }
        return exec;
    }
}
_DeployAccountMethod_authWitnessProvider = new WeakMap(), _DeployAccountMethod_feePaymentArtifact = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2FjY291bnRfbWV0aG9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjY291bnRfbWFuYWdlci9kZXBsb3lfYWNjb3VudF9tZXRob2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBR0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixtQkFBbUIsR0FDcEIsTUFBTSx1QkFBdUIsQ0FBQztBQUsvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBc0IsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU3RDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxZQUFZO0lBSW5ELFlBQ0UsbUJBQXdDLEVBQ3hDLGNBQWtCLEVBQ2xCLE1BQWMsRUFDZCxRQUEwQixFQUMxQixPQUFjLEVBQUUsRUFDaEIseUJBQXFELEVBQ3JELHdCQUFvRDtRQUVwRCxLQUFLLENBQ0gsY0FBYyxFQUNkLE1BQU0sRUFDTixRQUFRLEVBQ1IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQzNELElBQUksRUFDSix5QkFBeUIsQ0FDMUIsQ0FBQztRQW5CSiwyREFBMEM7UUFDMUMsMERBQWtEO1FBb0JoRCx1QkFBQSxJQUFJLDRDQUF3QixtQkFBbUIsTUFBQSxDQUFDO1FBQ2hELHVCQUFBLElBQUksMkNBQ0YsT0FBTyx3QkFBd0IsS0FBSyxRQUFRO1lBQzFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUM7WUFDekQsQ0FBQyxDQUFDLHdCQUF3QixNQUFBLENBQUM7SUFDakMsQ0FBQztJQUVrQixLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBc0I7UUFDeEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0QsSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLHVCQUFBLElBQUksK0NBQW9CLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZCxJQUFJLEVBQUUsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxJQUFJO2dCQUNuQyxFQUFFLEVBQUUsT0FBTztnQkFDWCxJQUFJLEVBQUUsZUFBZSxDQUFDLHVCQUFBLElBQUksK0NBQW9CLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzlFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FDOUMsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxJQUFJLEVBQzdCLHVCQUFBLElBQUksK0NBQW9CLENBQUMsVUFBVSxDQUNwQztnQkFDRCxJQUFJLEVBQUUsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxZQUFZO2dCQUMzQyxRQUFRLEVBQUUsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxRQUFRO2dCQUMzQyxXQUFXLEVBQUUsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxXQUFXO2FBQ2xELENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxhQUFhLEtBQWxCLElBQUksQ0FBQyxhQUFhLEdBQUssRUFBRSxFQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEtBQXBCLElBQUksQ0FBQyxlQUFlLEdBQUssRUFBRSxFQUFDO1lBRTVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sdUJBQUEsSUFBSSxnREFBcUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sdUJBQUEsSUFBSSxnREFBcUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiJ9