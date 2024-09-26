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

import PrivateFPCContractArtifactJson from '../artifacts/private_fpc_contract-PrivateFPC.json' assert { type: 'json' };

export const PrivateFPCContractArtifact = loadContractArtifact(PrivateFPCContractArtifactJson as NoirCompiledContract);

/**
 * Type-safe interface for contract PrivateFPC;
 */
export class PrivateFPCContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, PrivateFPCContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, PrivateFPCContract.artifact, wallet) as Promise<PrivateFPCContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(wallet: Wallet, other_asset: AztecAddressLike, admin_npk_m_hash: FieldLike) {
    return new DeployMethod<PrivateFPCContract>(
      Fr.ZERO,
      wallet,
      PrivateFPCContractArtifact,
      PrivateFPCContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeysHash(
    publicKeysHash: Fr,
    wallet: Wallet,
    other_asset: AztecAddressLike,
    admin_npk_m_hash: FieldLike,
  ) {
    return new DeployMethod<PrivateFPCContract>(
      publicKeysHash,
      wallet,
      PrivateFPCContractArtifact,
      PrivateFPCContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof PrivateFPCContract['methods']>(
    opts: { publicKeysHash?: Fr; method?: M; wallet: Wallet },
    ...args: Parameters<PrivateFPCContract['methods'][M]>
  ) {
    return new DeployMethod<PrivateFPCContract>(
      opts.publicKeysHash ?? Fr.ZERO,
      opts.wallet,
      PrivateFPCContractArtifact,
      PrivateFPCContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return PrivateFPCContractArtifact;
  }

  public static get storage(): ContractStorageLayout<
    'admin' | 'minters' | 'balances' | 'total_supply' | 'symbol' | 'name' | 'decimals'
  > {
    return {
      admin: {
        slot: new Fr(1n),
      },
      minters: {
        slot: new Fr(2n),
      },
      balances: {
        slot: new Fr(3n),
      },
      total_supply: {
        slot: new Fr(4n),
      },
      symbol: {
        slot: new Fr(5n),
      },
      name: {
        slot: new Fr(6n),
      },
      decimals: {
        slot: new Fr(7n),
      },
    } as ContractStorageLayout<'admin' | 'minters' | 'balances' | 'total_supply' | 'symbol' | 'name' | 'decimals'>;
  }

  public static get notes(): ContractNotes<'TokenNote'> {
    return {
      TokenNote: {
        id: new NoteSelector(3992089675),
      },
    } as ContractNotes<'TokenNote'>;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public override methods!: {
    /** fund_transaction_privately(amount: field, asset: struct, user_randomness: field) */
    fund_transaction_privately: ((
      amount: FieldLike,
      asset: AztecAddressLike,
      user_randomness: FieldLike,
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

    /** constructor(other_asset: struct, admin_npk_m_hash: field) */
    constructor: ((other_asset: AztecAddressLike, admin_npk_m_hash: FieldLike) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };
}
