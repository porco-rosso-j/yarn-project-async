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

import EasyPrivateTokenContractArtifactJson from '../artifacts/easy_private_token_contract-EasyPrivateToken.json' assert { type: 'json' };

export const EasyPrivateTokenContractArtifact = loadContractArtifact(
  EasyPrivateTokenContractArtifactJson as NoirCompiledContract,
);

/**
 * Type-safe interface for contract EasyPrivateToken;
 */
export class EasyPrivateTokenContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, EasyPrivateTokenContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, EasyPrivateTokenContract.artifact, wallet) as Promise<EasyPrivateTokenContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(
    wallet: Wallet,
    initial_supply: bigint | number,
    owner: AztecAddressLike,
    outgoing_viewer: AztecAddressLike,
  ) {
    return new DeployMethod<EasyPrivateTokenContract>(
      Fr.ZERO,
      wallet,
      EasyPrivateTokenContractArtifact,
      EasyPrivateTokenContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeysHash(
    publicKeysHash: Fr,
    wallet: Wallet,
    initial_supply: bigint | number,
    owner: AztecAddressLike,
    outgoing_viewer: AztecAddressLike,
  ) {
    return new DeployMethod<EasyPrivateTokenContract>(
      publicKeysHash,
      wallet,
      EasyPrivateTokenContractArtifact,
      EasyPrivateTokenContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof EasyPrivateTokenContract['methods']>(
    opts: { publicKeysHash?: Fr; method?: M; wallet: Wallet },
    ...args: Parameters<EasyPrivateTokenContract['methods'][M]>
  ) {
    return new DeployMethod<EasyPrivateTokenContract>(
      opts.publicKeysHash ?? Fr.ZERO,
      opts.wallet,
      EasyPrivateTokenContractArtifact,
      EasyPrivateTokenContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return EasyPrivateTokenContractArtifact;
  }

  public static get storage(): ContractStorageLayout<'balances'> {
    return {
      balances: {
        slot: new Fr(1n),
      },
    } as ContractStorageLayout<'balances'>;
  }

  public static get notes(): ContractNotes<'ValueNote'> {
    return {
      ValueNote: {
        id: new NoteSelector(1900156023),
      },
    } as ContractNotes<'ValueNote'>;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public override methods!: {
    /** constructor(initial_supply: integer, owner: struct, outgoing_viewer: struct) */
    constructor: ((
      initial_supply: bigint | number,
      owner: AztecAddressLike,
      outgoing_viewer: AztecAddressLike,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** transfer(amount: integer, sender: struct, recipient: struct, outgoing_viewer: struct) */
    transfer: ((
      amount: bigint | number,
      sender: AztecAddressLike,
      recipient: AztecAddressLike,
      outgoing_viewer: AztecAddressLike,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

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

    /** mint(amount: integer, owner: struct, outgoing_viewer: struct) */
    mint: ((
      amount: bigint | number,
      owner: AztecAddressLike,
      outgoing_viewer: AztecAddressLike,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;

    /** get_balance(owner: struct) */
    get_balance: ((owner: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
  };
}
