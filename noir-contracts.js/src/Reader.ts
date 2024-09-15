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

import ReaderContractArtifactJson from '../artifacts/reader_contract-Reader.json' assert { type: 'json' };

export const ReaderContractArtifact = loadContractArtifact(ReaderContractArtifactJson as NoirCompiledContract);

/**
 * Type-safe interface for contract Reader;
 */
export class ReaderContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, ReaderContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, ReaderContract.artifact, wallet) as Promise<ReaderContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet) {
    return new DeployMethod<ReaderContract>(
      Point.ZERO,
      wallet,
      ReaderContractArtifact,
      ReaderContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
   */
  public static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet) {
    return new DeployMethod<ReaderContract>(
      publicKey,
      wallet,
      ReaderContractArtifact,
      ReaderContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return ReaderContractArtifact;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public methods!: {
    /** check_name_private(who: struct, what: string) */
    check_name_private: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** get_name(who: struct) */
    get_name: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** check_name_public(who: struct, what: string) */
    check_name_public: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** check_symbol_private(who: struct, what: string) */
    check_symbol_private: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** check_decimals_private(who: struct, what: integer) */
    check_decimals_private: ((who: AztecAddressLike, what: bigint | number) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** check_decimals_public(who: struct, what: integer) */
    check_decimals_public: ((who: AztecAddressLike, what: bigint | number) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** get_decimals(who: struct) */
    get_decimals: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
    compute_note_hash_and_nullifier: ((
      contract_address: AztecAddressLike,
      nonce: FieldLike,
      storage_slot: FieldLike,
      note_type_id: FieldLike,
      serialized_note: FieldLike[],
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** constructor() */
    constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_symbol(who: struct) */
    get_symbol: ((who: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** check_symbol_public(who: struct, what: string) */
    check_symbol_public: ((who: AztecAddressLike, what: string) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };
}
