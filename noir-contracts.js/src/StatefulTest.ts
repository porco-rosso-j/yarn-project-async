/* Autogenerated file, do not edit! */

/* eslint-disable */
import {
  AztecAddress,
  AztecAddressLike,
  CompleteAddress,
  Contract,
  ContractArtifact,
  ContractBase,
  ContractFunctionInteraction,
  ContractInstanceWithAddress,
  ContractMethod,
  DeployMethod,
  EthAddress,
  EthAddressLike,
  FieldLike,
  Fr,
  FunctionSelectorLike,
  NoirCompiledContract,
  Point,
  PublicKey,
  Wallet,
  WrappedFieldLike,
  loadContractArtifact,
} from '@aztec/aztec.js';

import StatefulTestContractArtifactJson from '../artifacts/stateful_test_contract-StatefulTest.json' assert { type: 'json' };

export const StatefulTestContractArtifact = loadContractArtifact(
  StatefulTestContractArtifactJson as NoirCompiledContract,
);

/**
 * Type-safe interface for contract StatefulTest;
 */
export class StatefulTestContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, StatefulTestContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, StatefulTestContract.artifact, wallet) as Promise<StatefulTestContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, owner: AztecAddressLike, value: FieldLike) {
    return new DeployMethod<StatefulTestContract>(
      Point.ZERO,
      wallet,
      StatefulTestContractArtifact,
      StatefulTestContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
   */
  public static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, owner: AztecAddressLike, value: FieldLike) {
    return new DeployMethod<StatefulTestContract>(
      publicKey,
      wallet,
      StatefulTestContractArtifact,
      StatefulTestContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return StatefulTestContractArtifact;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public methods!: {
    /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
    compute_note_hash_and_nullifier: ((
      contract_address: AztecAddressLike,
      nonce: FieldLike,
      storage_slot: FieldLike,
      note_type_id: FieldLike,
      serialized_note: FieldLike[],
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** summed_values(owner: struct) */
    summed_values: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** destroy_and_create(recipient: struct, amount: field) */
    destroy_and_create: ((recipient: AztecAddressLike, amount: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** create_note(owner: struct, value: field) */
    create_note: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** increment_public_value(owner: struct, value: field) */
    increment_public_value: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** get_public_value(owner: struct) */
    get_public_value: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** constructor(owner: struct, value: field) */
    constructor: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };
}
