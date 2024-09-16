var _EntrypointPayload_packedArguments, _EntrypointPayload_functionCalls, _EntrypointPayload_nonce, _EntrypointPayload_generatorIndex, _FeeEntrypointPayload_isFeePayer;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { FunctionCall, PackedValues } from '@aztec/circuit-types';
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
    // protected constructor(functionCalls: FunctionCall[], generatorIndex: number) {
    //   for (const call of functionCalls) {
    //     // TODO: create init ?
    //     //this.#packedArguments.push(await PackedValues.fromValues(call.args));
    //   }
    //   /* eslint-disable camelcase */
    //   this.#functionCalls = functionCalls.map((call, index) => ({
    //     args_hash: this.#packedArguments[index].hash,
    //     function_selector: call.selector.toField(),
    //     target_address: call.to.toField(),
    //     is_public: call.type == FunctionType.PUBLIC,
    //     is_static: call.isStatic,
    //   }));
    //   /* eslint-enable camelcase */
    //   this.#generatorIndex = generatorIndex;
    // }
    constructor(generatorIndex) {
        _EntrypointPayload_packedArguments.set(this, []);
        _EntrypointPayload_functionCalls.set(this, []);
        _EntrypointPayload_nonce.set(this, Fr.random());
        _EntrypointPayload_generatorIndex.set(this, void 0);
        /* eslint-enable camelcase */
        __classPrivateFieldSet(this, _EntrypointPayload_generatorIndex, generatorIndex, "f");
    }
    async init(functionCalls) {
        for (const call of functionCalls) {
            __classPrivateFieldGet(this, _EntrypointPayload_packedArguments, "f").push(await PackedValues.fromValues(call.args));
        }
        /* eslint-disable camelcase */
        __classPrivateFieldSet(this, _EntrypointPayload_functionCalls, functionCalls.map((call, index) => ({
            args_hash: __classPrivateFieldGet(this, _EntrypointPayload_packedArguments, "f")[index].hash,
            function_selector: call.selector.toField(),
            target_address: call.to.toField(),
            is_public: call.type == FunctionType.PUBLIC,
            is_static: call.isStatic,
        })), "f");
        return this;
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
    static async fromFunctionCalls(functionCalls) {
        const payload = new AppEntrypointPayload(0);
        return await payload.init(functionCalls);
    }
    /**
     * Creates an execution payload for the app-portion of a transaction from a set of function calls
     * @param functionCalls - The function calls to execute
     * @returns The execution payload
     */
    static async fromAppExecution(functionCalls) {
        if (functionCalls.length > APP_MAX_CALLS) {
            throw new Error(`Expected at most ${APP_MAX_CALLS} function calls, got ${functionCalls.length}`);
        }
        const paddedCalls = padArrayEnd(functionCalls, FunctionCall.empty(), APP_MAX_CALLS);
        const payload = new AppEntrypointPayload(GeneratorIndex.SIGNATURE_PAYLOAD);
        return await payload.init(paddedCalls);
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
        const payload = new FeeEntrypointPayload(GeneratorIndex.FEE_PAYLOAD, isFeePayer);
        return await payload.init(paddedCalls);
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
    constructor(generatorIndex, isFeePayer) {
        super(generatorIndex);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeXBvaW50L3BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBcUIsRUFBRSxFQUFvQixjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWV4RCwwQ0FBMEM7QUFDMUMsdURBQXVEO0FBQ3ZELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN4QiwyREFBMkQ7QUFDM0QsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBZ0J4Qiw2QkFBNkI7QUFFN0Isc0NBQXNDO0FBQ3RDLE1BQU0sT0FBZ0IsaUJBQWlCO0lBTXJDLGlGQUFpRjtJQUNqRix3Q0FBd0M7SUFDeEMsNkJBQTZCO0lBQzdCLDhFQUE4RTtJQUM5RSxNQUFNO0lBRU4sbUNBQW1DO0lBQ25DLGdFQUFnRTtJQUNoRSxvREFBb0Q7SUFDcEQsa0RBQWtEO0lBQ2xELHlDQUF5QztJQUN6QyxtREFBbUQ7SUFDbkQsZ0NBQWdDO0lBQ2hDLFNBQVM7SUFDVCxrQ0FBa0M7SUFFbEMsMkNBQTJDO0lBQzNDLElBQUk7SUFFSixZQUFzQixjQUFzQjtRQXhCNUMsNkNBQW1DLEVBQUUsRUFBQztRQUN0QywyQ0FBd0MsRUFBRSxFQUFDO1FBQzNDLG1DQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBQztRQUNyQixvREFBd0I7UUFzQnRCLDZCQUE2QjtRQUM3Qix1QkFBQSxJQUFJLHFDQUFtQixjQUFjLE1BQUEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsS0FBSyxDQUFD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