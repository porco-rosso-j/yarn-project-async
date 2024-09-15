var _EntrypointPayload_packedArguments, _EntrypointPayload_functionCalls, _EntrypointPayload_nonce, _EntrypointPayload_generatorIndex, _FeeEntrypointPayload_isFeePayer;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { FunctionCall } from '@aztec/circuit-types';
import { Fr, GeneratorIndex } from '@aztec/circuits.js';
import { FunctionType } from '@aztec/foundation/abi';
import { padArrayEnd } from '@aztec/foundation/collection';
import { pedersenHash } from '@aztec/foundation/crypto';
// These must match the values defined in:
// - noir-projects/aztec-nr/aztec/src/entrypoint/app.nr
const APP_MAX_CALLS = 4;
// - and noir-projects/aztec-nr/aztec/src/entrypoint/fee.nr
const FEE_MAX_CALLS = 2;
/* eslint-enable camelcase */
/** Assembles an entrypoint payload */
export class EntrypointPayload {
    constructor(functionCalls, generatorIndex) {
        _EntrypointPayload_packedArguments.set(this, []);
        _EntrypointPayload_functionCalls.set(this, []);
        _EntrypointPayload_nonce.set(this, Fr.random());
        _EntrypointPayload_generatorIndex.set(this, void 0);
        for (const call of functionCalls) {
            // TODO: create init ?
            //this.#packedArguments.push(await PackedValues.fromValues(call.args));
        }
        /* eslint-disable camelcase */
        __classPrivateFieldSet(this, _EntrypointPayload_functionCalls, functionCalls.map((call, index) => ({
            args_hash: __classPrivateFieldGet(this, _EntrypointPayload_packedArguments, "f")[index].hash,
            function_selector: call.selector.toField(),
            target_address: call.to.toField(),
            is_public: call.type == FunctionType.PUBLIC,
            is_static: call.isStatic,
        })), "f");
        /* eslint-enable camelcase */
        __classPrivateFieldSet(this, _EntrypointPayload_generatorIndex, generatorIndex, "f");
    }
    /* eslint-disable camelcase */
    /**
     * The function calls to execute. This uses snake_case naming so that it is compatible with Noir encoding
     * @internal
     */
    get function_calls() {
        return __classPrivateFieldGet(this, _EntrypointPayload_functionCalls, "f");
    }
    /* eslint-enable camelcase */
    /**
     * The nonce
     * @internal
     */
    get nonce() {
        return __classPrivateFieldGet(this, _EntrypointPayload_nonce, "f");
    }
    /**
     * The packed arguments for the function calls
     */
    get packedArguments() {
        return __classPrivateFieldGet(this, _EntrypointPayload_packedArguments, "f");
    }
    /**
     * Hashes the payload
     * @returns The hash of the payload
     */
    async hash() {
        return await pedersenHash(this.toFields(), __classPrivateFieldGet(this, _EntrypointPayload_generatorIndex, "f"));
    }
    /** Serializes the function calls to an array of fields. */
    functionCallsToFields() {
        return __classPrivateFieldGet(this, _EntrypointPayload_functionCalls, "f").flatMap(call => [
            call.args_hash,
            call.function_selector,
            call.target_address,
            new Fr(call.is_public),
            new Fr(call.is_static),
        ]);
    }
    /**
     * Creates an execution payload for a dapp from a set of function calls
     * @param functionCalls - The function calls to execute
     * @returns The execution payload
     */
    static fromFunctionCalls(functionCalls) {
        return new AppEntrypointPayload(functionCalls, 0);
    }
    /**
     * Creates an execution payload for the app-portion of a transaction from a set of function calls
     * @param functionCalls - The function calls to execute
     * @returns The execution payload
     */
    static fromAppExecution(functionCalls) {
        if (functionCalls.length > APP_MAX_CALLS) {
            throw new Error(`Expected at most ${APP_MAX_CALLS} function calls, got ${functionCalls.length}`);
        }
        const paddedCalls = padArrayEnd(functionCalls, FunctionCall.empty(), APP_MAX_CALLS);
        return new AppEntrypointPayload(paddedCalls, GeneratorIndex.SIGNATURE_PAYLOAD);
    }
    /**
     * Creates an execution payload to pay the fee for a transaction
     * @param sender - The address sending this payload
     * @param feeOpts - The fee payment options
     * @returns The execution payload
     */
    static async fromFeeOptions(sender, feeOpts) {
        const calls = (await feeOpts?.paymentMethod.getFunctionCalls(feeOpts?.gasSettings)) ?? [];
        const feePayer = await feeOpts?.paymentMethod.getFeePayer(feeOpts?.gasSettings);
        const isFeePayer = !!feePayer && feePayer.equals(sender);
        const paddedCalls = padArrayEnd(calls, FunctionCall.empty(), FEE_MAX_CALLS);
        return new FeeEntrypointPayload(paddedCalls, GeneratorIndex.FEE_PAYLOAD, isFeePayer);
    }
}
_EntrypointPayload_packedArguments = new WeakMap(), _EntrypointPayload_functionCalls = new WeakMap(), _EntrypointPayload_nonce = new WeakMap(), _EntrypointPayload_generatorIndex = new WeakMap();
/** Entrypoint payload for app phase execution. */
class AppEntrypointPayload extends EntrypointPayload {
    toFields() {
        return [...this.functionCallsToFields(), this.nonce];
    }
}
/** Entrypoint payload for fee payment to be run during setup phase. */
class FeeEntrypointPayload extends EntrypointPayload {
    constructor(functionCalls, generatorIndex, isFeePayer) {
        super(functionCalls, generatorIndex);
        _FeeEntrypointPayload_isFeePayer.set(this, void 0);
        __classPrivateFieldSet(this, _FeeEntrypointPayload_isFeePayer, isFeePayer, "f");
    }
    toFields() {
        return [...this.functionCallsToFields(), this.nonce, new Fr(__classPrivateFieldGet(this, _FeeEntrypointPayload_isFeePayer, "f"))];
    }
    /* eslint-disable camelcase */
    /** Whether the sender should be appointed as fee payer. */
    get is_fee_payer() {
        return __classPrivateFieldGet(this, _FeeEntrypointPayload_isFeePayer, "f");
    }
}
_FeeEntrypointPayload_isFeePayer = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeXBvaW50L3BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFnQixNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBcUIsRUFBRSxFQUFvQixjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWV4RCwwQ0FBMEM7QUFDMUMsdURBQXVEO0FBQ3ZELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN4QiwyREFBMkQ7QUFDM0QsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBZ0J4Qiw2QkFBNkI7QUFFN0Isc0NBQXNDO0FBQ3RDLE1BQU0sT0FBZ0IsaUJBQWlCO0lBTXJDLFlBQXNCLGFBQTZCLEVBQUUsY0FBc0I7UUFMM0UsNkNBQW1DLEVBQUUsRUFBQztRQUN0QywyQ0FBd0MsRUFBRSxFQUFDO1FBQzNDLG1DQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQztRQUNyQixvREFBd0I7UUFHdEIsS0FBSyxNQUFNLElBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNqQyxzQkFBc0I7WUFDdEIsdUVBQXVFO1FBQ3pFLENBQUM7UUFFRCw4QkFBOEI7UUFDOUIsdUJBQUEsSUFBSSxvQ0FBa0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEQsU0FBUyxFQUFFLHVCQUFBLElBQUksMENBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSTtZQUM1QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8s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