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
            const emptyAppPayload = await EntrypointPayload.fromAppExecution([]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2FjY291bnRfbWV0aG9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjY291bnRfbWFuYWdlci9kZXBsb3lfYWNjb3VudF9tZXRob2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBR0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixtQkFBbUIsR0FDcEIsTUFBTSx1QkFBdUIsQ0FBQztBQUsvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBc0IsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU3RDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxZQUFZO0lBSW5ELFlBQ0UsbUJBQXdDLEVBQ3hDLGNBQWtCLEVBQ2xCLE1BQWMsRUFDZCxRQUEwQixFQUMxQixPQUFjLEVBQUUsRUFDaEIseUJBQXFELEVBQ3JELHdCQUFvRDtRQUVwRCxLQUFLLENBQ0gsY0FBYyxFQUNkLE1BQU0sRUFDTixRQUFRLEVBQ1IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQzNELElBQUksRUFDSix5QkFBeUIsQ0FDMUIsQ0FBQztRQW5CSiwyREFBMEM7UUFDMUMsMERBQWtEO1FBb0JoRCx1QkFBQSxJQUFJLDRDQUF3QixtQkFBbUIsTUFBQSxDQUFDO1FBQ2hELHVCQUFBLElBQUksMkNBQ0YsT0FBTyx3QkFBd0IsS0FBSyxRQUFRO1lBQzFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUM7WUFDekQsQ0FBQyxDQUFDLHdCQUF3QixNQUFBLENBQUM7SUFDakMsQ0FBQztJQUVrQixLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBc0I7UUFDeEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0QsSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLHVCQUFBLElBQUksK0NBQW9CLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsTUFBTSxlQUFlLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRSxNQUFNLFVBQVUsR0FBRyxNQUFNLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRWpGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLElBQUksRUFBRSx1QkFBQSxJQUFJLCtDQUFvQixDQUFDLElBQUk7Z0JBQ25DLEVBQUUsRUFBRSxPQUFPO2dCQUNYLElBQUksRUFBRSxlQUFlLENBQUMsdUJBQUEsSUFBSSwrQ0FBb0IsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDOUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLHFCQUFxQixDQUM5Qyx1QkFBQSxJQUFJLCtDQUFvQixDQUFDLElBQUksRUFDN0IsdUJBQUEsSUFBSSwrQ0FBb0IsQ0FBQyxVQUFVLENBQ3BDO2dCQUNELElBQUksRUFBRSx1QkFBQSxJQUFJLCtDQUFvQixDQUFDLFlBQVk7Z0JBQzNDLFFBQVEsRUFBRSx1QkFBQSxJQUFJLCtDQUFvQixDQUFDLFFBQVE7Z0JBQzNDLFdBQVcsRUFBRSx1QkFBQSxJQUFJLCtDQUFvQixDQUFDLFdBQVc7YUFDbEQsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGFBQWEsS0FBbEIsSUFBSSxDQUFDLGFBQWEsR0FBSyxFQUFFLEVBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsS0FBcEIsSUFBSSxDQUFDLGVBQWUsR0FBSyxFQUFFLEVBQUM7WUFFNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSx1QkFBQSxJQUFJLGdEQUFxQixDQUFDLGFBQWEsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSx1QkFBQSxJQUFJLGdEQUFxQixDQUFDLGFBQWEsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGIn0=