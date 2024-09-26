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

import CrowdfundingContractArtifactJson from '../artifacts/crowdfunding_contract-Crowdfunding.json' assert { type: 'json' };

export const CrowdfundingContractArtifact = loadContractArtifact(
  CrowdfundingContractArtifactJson as NoirCompiledContract,
);

export type WithdrawalProcessed = {
  who: Fr;
  amount: Fr;
};

/**
 * Type-safe interface for contract Crowdfunding;
 */
export class CrowdfundingContract extends ContractBase {
  private constructor(instance: ContractInstanceWithAddress, wallet: Wallet) {
    super(instance, CrowdfundingContractArtifact, wallet);
  }

  /**
   * Creates a contract instance.
   * @param address - The deployed contract's address.
   * @param wallet - The wallet to use when interacting with the contract.
   * @returns A promise that resolves to a new Contract instance.
   */
  public static async at(address: AztecAddress, wallet: Wallet) {
    return Contract.at(address, CrowdfundingContract.artifact, wallet) as Promise<CrowdfundingContract>;
  }

  /**
   * Creates a tx to deploy a new instance of this contract.
   */
  public static deploy(
    wallet: Wallet,
    donation_token: AztecAddressLike,
    operator: AztecAddressLike,
    deadline: bigint | number,
  ) {
    return new DeployMethod<CrowdfundingContract>(
      Fr.ZERO,
      wallet,
      CrowdfundingContractArtifact,
      CrowdfundingContract.at,
      Array.from(arguments).slice(1),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
   */
  public static deployWithPublicKeysHash(
    publicKeysHash: Fr,
    wallet: Wallet,
    donation_token: AztecAddressLike,
    operator: AztecAddressLike,
    deadline: bigint | number,
  ) {
    return new DeployMethod<CrowdfundingContract>(
      publicKeysHash,
      wallet,
      CrowdfundingContractArtifact,
      CrowdfundingContract.at,
      Array.from(arguments).slice(2),
    );
  }

  /**
   * Creates a tx to deploy a new instance of this contract using the specified constructor method.
   */
  public static deployWithOpts<M extends keyof CrowdfundingContract['methods']>(
    opts: { publicKeysHash?: Fr; method?: M; wallet: Wallet },
    ...args: Parameters<CrowdfundingContract['methods'][M]>
  ) {
    return new DeployMethod<CrowdfundingContract>(
      opts.publicKeysHash ?? Fr.ZERO,
      opts.wallet,
      CrowdfundingContractArtifact,
      CrowdfundingContract.at,
      Array.from(arguments).slice(1),
      opts.method ?? 'constructor',
    );
  }

  /**
   * Returns this contract's artifact.
   */
  public static get artifact(): ContractArtifact {
    return CrowdfundingContractArtifact;
  }

  public static get storage(): ContractStorageLayout<
    | 'admin'
    | 'minters'
    | 'balances'
    | 'total_supply'
    | 'pending_shields'
    | 'public_balances'
    | 'symbol'
    | 'name'
    | 'decimals'
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
      pending_shields: {
        slot: new Fr(5n),
      },
      public_balances: {
        slot: new Fr(6n),
      },
      symbol: {
        slot: new Fr(7n),
      },
      name: {
        slot: new Fr(8n),
      },
      decimals: {
        slot: new Fr(9n),
      },
    } as ContractStorageLayout<
      | 'admin'
      | 'minters'
      | 'balances'
      | 'total_supply'
      | 'pending_shields'
      | 'public_balances'
      | 'symbol'
      | 'name'
      | 'decimals'
    >;
  }

  public static get notes(): ContractNotes<'TransparentNote' | 'TokenNote' | 'ValueNote'> {
    return {
      TransparentNote: {
        id: new NoteSelector(1049878767),
      },
      TokenNote: {
        id: new NoteSelector(3992089675),
      },
      ValueNote: {
        id: new NoteSelector(1900156023),
      },
    } as ContractNotes<'TransparentNote' | 'TokenNote' | 'ValueNote'>;
  }

  /** Type-safe wrappers for the public methods exposed by the contract. */
  public override methods!: {
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

    /** donate(amount: integer) */
    donate: ((amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** withdraw(amount: integer) */
    withdraw: ((amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;

    /** init(donation_token: struct, operator: struct, deadline: integer) */
    init: ((
      donation_token: AztecAddressLike,
      operator: AztecAddressLike,
      deadline: bigint | number,
    ) => ContractFunctionInteraction) &
      Pick<ContractMethod, 'selector'>;
  };

  // Partial application is chosen is to avoid the duplication of so much codegen.
  private static decodeEvent<T>(
    fieldsLength: number,
    eventSelector: EventSelector,
    fields: string[],
  ): (payload: L1EventPayload | undefined) => T | undefined {
    return (payload: L1EventPayload | undefined): T | undefined => {
      if (payload === undefined) {
        return undefined;
      }
      if (!eventSelector.equals(payload.eventTypeId)) {
        return undefined;
      }
      if (payload.event.items.length !== fieldsLength) {
        throw new Error(
          'Something is weird here, we have matching EventSelectors, but the actual payload has mismatched length',
        );
      }

      return fields.reduce(
        (acc, curr, i) => ({
          ...acc,
          [curr]: payload.event.items[i],
        }),
        {} as T,
      );
    };
  }

  public static get events(): {
    WithdrawalProcessed: {
      decode: (payload: L1EventPayload | undefined) => WithdrawalProcessed | undefined;
      eventSelector: EventSelector;
      fieldNames: string[];
    };
  } {
    return {
      WithdrawalProcessed: {
        decode: this.decodeEvent(2, EventSelector.fromSignature('WithdrawalProcessed(Field,Field)'), ['who', 'amount']),
        eventSelector: EventSelector.fromSignature('WithdrawalProcessed(Field,Field)'),
        fieldNames: ['who', 'amount'],
      },
    };
  }
}
