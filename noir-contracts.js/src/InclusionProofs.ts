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

import InclusionProofsContractArtifactJson from '../artifacts/inclusion_proofs_contract-InclusionProofs.json' assert { type: 'json' };

export const InclusionProofsContractArtifact = loadContractArtifact(
  InclusionProofsContractArtifactJson as NoirCompiledContract,
);

/**
 * Type-safe interface for contract InclusionProofs;
 */
export class InclusionProofsContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, InclusionProofsContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, InclusionProofsContract.artifact, wallet) as Promise<InclusionProofsContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, public_value: FieldLike) {
    return new DeployMethod<InclusionProofsContract>(
      Point.ZERO,
      wallet,
      InclusionProofsContractArtifact,
      InclusionProofsContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
   */
  public static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet, public_value: FieldLike) {
    return new DeployMethod<InclusionProofsContract>(
      publicKey,
      wallet,
      InclusionProofsContractArtifact,
      InclusionProofsContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return InclusionProofsContractArtifact;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public methods!: {
    /** test_nullifier_inclusion(nullifier: field, use_block_number: boolean, block_number: integer) */
    test_nullifier_inclusion: ((
      nullifier: FieldLike,
      use_block_number: boolean,
      block_number: bigint | number,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_note_not_nullified(owner: struct, use_block_number: boolean, block_number: integer, fail_case: boolean) */
    test_note_not_nullified: ((
      owner: AztecAddressLike,
      use_block_number: boolean,
      block_number: bigint | number,
      fail_case: boolean,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_note_inclusion(owner: struct, use_block_number: boolean, block_number: integer, nullified: boolean) */
    test_note_inclusion: ((
      owner: AztecAddressLike,
      use_block_number: boolean,
      block_number: bigint | number,
      nullified: boolean,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_note_inclusion_fail_case(owner: struct, use_block_number: boolean, block_number: integer) */
    test_note_inclusion_fail_case: ((
      owner: AztecAddressLike,
      use_block_number: boolean,
      block_number: bigint | number,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** constructor(public_value: field) */
    constructor: ((public_value: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** nullify_note(owner: struct) */
    nullify_note: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** test_public_unused_value_inclusion(block_number: integer) */
    test_public_unused_value_inclusion: ((block_number: bigint | number) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** create_note(owner: struct, value: field) */
    create_note: ((owner: AztecAddressLike, value: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_contract_inclusion(public_key: struct, contract_address_salt: field, contract_class_id: struct, initialization_hash: field, portal_contract_address: struct, block_number: integer) */
    test_contract_inclusion: ((
      public_key: { x: FieldLike; y: FieldLike },
      contract_address_salt: FieldLike,
      contract_class_id: WrappedFieldLike,
      initialization_hash: FieldLike,
      portal_contract_address: EthAddressLike,
      block_number: bigint | number,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_note_validity(owner: struct, use_block_number: boolean, block_number: integer, nullified: boolean) */
    test_note_validity: ((
      owner: AztecAddressLike,
      use_block_number: boolean,
      block_number: bigint | number,
      nullified: boolean,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** test_public_value_inclusion(public_value: field, use_block_number: boolean, block_number: integer) */
    test_public_value_inclusion: ((
      public_value: FieldLike,
      use_block_number: boolean,
      block_number: bigint | number,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
    compute_note_hash_and_nullifier: ((
      contract_address: AztecAddressLike,
      nonce: FieldLike,
      storage_slot: FieldLike,
      note_type_id: FieldLike,
      serialized_note: FieldLike[],
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };
}
