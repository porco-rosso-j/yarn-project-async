import { FunctionCall, PackedValues } from '@aztec/circuit-types';
import { type AztecAddress, Fr, type GasSettings, GeneratorIndex } from '@aztec/circuits.js';
import { FunctionType } from '@aztec/foundation/abi';
import { padArrayEnd } from '@aztec/foundation/collection';
import { pedersenHash } from '@aztec/foundation/crypto';
import { type Tuple } from '@aztec/foundation/serialize';

import { type FeePaymentMethod } from '../fee/fee_payment_method.js';

/**
 * Fee payment options for a transaction.
 */
export type FeeOptions = {
  /** The fee payment method to use */
  paymentMethod: FeePaymentMethod;
  /** The gas settings */
  gasSettings: GasSettings;
};

// These must match the values defined in:
// - noir-projects/aztec-nr/aztec/src/entrypoint/app.nr
const APP_MAX_CALLS = 4;
// - and noir-projects/aztec-nr/aztec/src/entrypoint/fee.nr
const FEE_MAX_CALLS = 2;

/* eslint-disable camelcase */
/** Encoded function call for account contract entrypoint */
type EncodedFunctionCall = {
  /** Arguments hash for the call */
  args_hash: Fr;
  /** Selector of the function to call */
  function_selector: Fr;
  /** Address of the contract to call */
  target_address: Fr;
  /** Whether the function is public or private */
  is_public: boolean;
  /** Whether the function can alter state */
  is_static: boolean;
};
/* eslint-enable camelcase */

/** Assembles an entrypoint payload */
export abstract class EntrypointPayload {
  #packedArguments: PackedValues[] = [];
  #functionCalls: EncodedFunctionCall[] = [];
  #nonce = Fr.random();
  #generatorIndex: number;

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

  protected constructor(generatorIndex: number) {
    /* eslint-enable camelcase */
    this.#generatorIndex = generatorIndex;
  }

  async init(functionCalls: FunctionCall[]) {
    for (const call of functionCalls) {
      this.#packedArguments.push(await PackedValues.fromValues(call.args));
    }

    /* eslint-disable camelcase */
    this.#functionCalls = functionCalls.map((call, index) => ({
      args_hash: this.#packedArguments[index].hash,
      function_selector: call.selector.toField(),
      target_address: call.to.toField(),
      is_public: call.type == FunctionType.PUBLIC,
      is_static: call.isStatic,
    }));

    return this;
  }

  /* eslint-disable camelcase */
  /**
   * The function calls to execute. This uses snake_case naming so that it is compatible with Noir encoding
   * @internal
   */
  get function_calls() {
    return this.#functionCalls;
  }
  /* eslint-enable camelcase */

  /**
   * The nonce
   * @internal
   */
  get nonce() {
    return this.#nonce;
  }

  /**
   * The packed arguments for the function calls
   */
  get packedArguments() {
    return this.#packedArguments;
  }

  /**
   * Serializes the payload to an array of fields
   * @returns The fields of the payload
   */
  abstract toFields(): Fr[];

  /**
   * Hashes the payload
   * @returns The hash of the payload
   */
  async hash() {
    return await pedersenHash(this.toFields(), this.#generatorIndex);
  }

  /** Serializes the function calls to an array of fields. */
  protected functionCallsToFields() {
    return this.#functionCalls.flatMap(call => [
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
  static async fromFunctionCalls(functionCalls: FunctionCall[]) {
    const payload = new AppEntrypointPayload(0);
    return await payload.init(functionCalls);
  }

  /**
   * Creates an execution payload for the app-portion of a transaction from a set of function calls
   * @param functionCalls - The function calls to execute
   * @returns The execution payload
   */
  static async fromAppExecution(functionCalls: FunctionCall[] | Tuple<FunctionCall, 4>) {
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
  static async fromFeeOptions(sender: AztecAddress, feeOpts?: FeeOptions) {
    const calls = (await feeOpts?.paymentMethod.getFunctionCalls(feeOpts?.gasSettings)) ?? [];
    const feePayer = await feeOpts?.paymentMethod.getFeePayer(feeOpts?.gasSettings);
    const isFeePayer = !!feePayer && feePayer.equals(sender);
    const paddedCalls = padArrayEnd(calls, FunctionCall.empty(), FEE_MAX_CALLS);
    const payload = new FeeEntrypointPayload(GeneratorIndex.FEE_PAYLOAD, isFeePayer);
    return await payload.init(paddedCalls);
  }
}

/** Entrypoint payload for app phase execution. */
class AppEntrypointPayload extends EntrypointPayload {
  override toFields(): Fr[] {
    return [...this.functionCallsToFields(), this.nonce];
  }
}

/** Entrypoint payload for fee payment to be run during setup phase. */
class FeeEntrypointPayload extends EntrypointPayload {
  #isFeePayer: boolean;

  constructor(generatorIndex: number, isFeePayer: boolean) {
    super(generatorIndex);
    this.#isFeePayer = isFeePayer;
  }

  override toFields(): Fr[] {
    return [...this.functionCallsToFields(), this.nonce, new Fr(this.#isFeePayer)];
  }

  /* eslint-disable camelcase */
  /** Whether the sender should be appointed as fee payer. */
  get is_fee_payer() {
    return this.#isFeePayer;
  }
  /* eslint-enable camelcase */
}
