import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, ContractNotes, ContractStorageLayout, DeployMethod, EventSelector, FieldLike, Fr, L1EventPayload, Wallet } from '@aztec/aztec.js';
export declare const CrowdfundingContractArtifact: ContractArtifact;
export type WithdrawalProcessed = {
    who: Fr;
    amount: Fr;
};
/**
 * Type-safe interface for contract Crowdfunding;
 */
export declare class CrowdfundingContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<CrowdfundingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: bigint | number): DeployMethod<CrowdfundingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: bigint | number): DeployMethod<CrowdfundingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof CrowdfundingContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<CrowdfundingContract['methods'][M]>): DeployMethod<CrowdfundingContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'admin' | 'minters' | 'balances' | 'total_supply' | 'pending_shields' | 'public_balances' | 'symbol' | 'name' | 'decimals'>;
    static get notes(): ContractNotes<'TransparentNote' | 'TokenNote' | 'ValueNote'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** donate(amount: integer) */
        donate: ((amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** withdraw(amount: integer) */
        withdraw: ((amount: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** init(donation_token: struct, operator: struct, deadline: integer) */
        init: ((donation_token: AztecAddressLike, operator: AztecAddressLike, deadline: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
    private static decodeEvent;
    static get events(): {
        WithdrawalProcessed: {
            decode: (payload: L1EventPayload | undefined) => WithdrawalProcessed | undefined;
            eventSelector: EventSelector;
            fieldNames: string[];
        };
    };
}
//# sourceMappingURL=Crowdfunding.d.ts.map