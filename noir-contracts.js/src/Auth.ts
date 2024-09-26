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

import AuthContractArtifactJson from '../artifacts/auth_contract-Auth.json' assert { type: 'json' };

export const AuthContractArtifact = loadContractArtifact(AuthContractArtifactJson as NoirCompiledContract);

/**
 * Type-safe interface for contract Auth;
 */
export class AuthContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, AuthContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, AuthContract.artifact, wallet) as Promise<AuthContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, admin: AztecAddressLike) {
    return new DeployMethod<AuthContract>(
      Fr.ZERO,
      wallet,
      AuthContractArtifact,
      AuthContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, admin: AztecAddressLike) {
    return new DeployMethod<AuthContract>(
      publicKeysHash,
      wallet,
      AuthContractArtifact,
      AuthContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof AuthContract['methods']>(
    opts: { publicKeysHash?: Fr; method?: M; wallet: Wallet },
    ...args: Parameters<AuthContract['methods'][M]>
  ) {
    return new DeployMethod<AuthContract>(
      opts.publicKeysHash ?? Fr.ZERO,
      opts.wallet,
      AuthContractArtifact,
      AuthContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return AuthContractArtifact;
  }

  public static get storage(): ContractStorageLayout<'admin' | 'authorized'> {
    return {
      admin: {
        slot: new Fr(1n),
      },
      authorized: {
        slot: new Fr(2n),
      },
    } as ContractStorageLayout<'admin' | 'authorized'>;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public override methods!: {
    /** do_private_authorized_thing() */
    do_private_authorized_thing: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_authorized_delay() */
    get_authorized_delay: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** set_authorized_delay(new_delay: integer) */
    set_authorized_delay: ((new_delay: bigint | number) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** get_authorized_in_private() */
    get_authorized_in_private: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** constructor(admin: struct) */
    constructor: ((admin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_scheduled_authorized() */
    get_scheduled_authorized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** get_authorized() */
    get_authorized: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

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

    /** set_authorized(authorized: struct) */
    set_authorized: ((authorized: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
  };
}
