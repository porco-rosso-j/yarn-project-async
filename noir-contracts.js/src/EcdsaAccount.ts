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
  ContractNotes,
  ContractStorageLayout,
  DeployMethod,
  EthAddress,
  EthAddressLike,
  EventSelector,
  FieldLike,
  Fr,
  FunctionSelectorLike,
  L1EventPayload,
  NoirCompiledContract,
  NoteSelector,
  Point,
  PublicKey,
  Wallet,
  WrappedFieldLike,
  loadContractArtifact,
} from '@aztec/aztec.js';

import EcdsaAccountContractArtifactJson from '../artifacts/ecdsa_account_contract-EcdsaAccount.json' assert { type: 'json' };

export const EcdsaAccountContractArtifact = loadContractArtifact(
  EcdsaAccountContractArtifactJson as NoirCompiledContract,
);

/**
 * Type-safe interface for contract EcdsaAccount;
 */
export class EcdsaAccountContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, EcdsaAccountContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, EcdsaAccountContract.artifact, wallet) as Promise<EcdsaAccountContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, signing_pub_key_x: (bigint | number)[], signing_pub_key_y: (bigint | number)[]) {
    return new DeployMethod<EcdsaAccountContract>(
      Fr.ZERO,
      wallet,
      EcdsaAccountContractArtifact,
      EcdsaAccountContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeysHash(
    publicKeysHash: Fr,
    wallet: Wallet,
    signing_pub_key_x: (bigint | number)[],
    signing_pub_key_y: (bigint | number)[],
  ) {
    return new DeployMethod<EcdsaAccountContract>(
      publicKeysHash,
      wallet,
      EcdsaAccountContractArtifact,
      EcdsaAccountContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof EcdsaAccountContract['methods']>(
    opts: { publicKeysHash?: Fr; method?: M; wallet: Wallet },
    ...args: Parameters<EcdsaAccountContract['methods'][M]>
  ) {
    return new DeployMethod<EcdsaAccountContract>(
      opts.publicKeysHash ?? Fr.ZERO,
      opts.wallet,
      EcdsaAccountContractArtifact,
      EcdsaAccountContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return EcdsaAccountContractArtifact;
  }

  public static get storage(): ContractStorageLayout<'public_key'> {
    return {
      public_key: {
        slot: new Fr(1n),
      },
    } as ContractStorageLayout<'public_key'>;
  }

  public static get notes(): ContractNotes<'EcdsaPublicKeyNote'> {
    return {
      EcdsaPublicKeyNote: {
        id: new NoteSelector(2423044547),
      },
    } as ContractNotes<'EcdsaPublicKeyNote'>;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public override methods!: {
    /** entrypoint(app_payload: struct, fee_payload: struct) */
    entrypoint: ((
      app_payload: {
        function_calls: {
          args_hash: FieldLike;
          function_selector: FunctionSelectorLike;
          target_address: AztecAddressLike;
          is_public: boolean;
          is_static: boolean;
        }[];
        nonce: FieldLike;
      },
      fee_payload: {
        function_calls: {
          args_hash: FieldLike;
          function_selector: FunctionSelectorLike;
          target_address: AztecAddressLike;
          is_public: boolean;
          is_static: boolean;
        }[];
        nonce: FieldLike;
        is_fee_payer: boolean;
      },
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** constructor(signing_pub_key_x: array, signing_pub_key_y: array) */
    constructor: ((
      signing_pub_key_x: (bigint | number)[],
      signing_pub_key_y: (bigint | number)[],
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** verify_private_authwit(inner_hash: field) */
    verify_private_authwit: ((inner_hash: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
    compute_note_hash_and_optionally_a_nullifier: ((
      contract_address: AztecAddressLike,
      nonce: FieldLike,
      storage_slot: FieldLike,
      note_type_id: FieldLike,
      compute_nullifier: boolean,
      serialized_note: FieldLike[],
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };
}
