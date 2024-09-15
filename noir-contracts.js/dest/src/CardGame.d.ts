import { AztecAddress, AztecAddressLike, ContractArtifact, ContractBase, ContractFunctionInteraction, ContractMethod, DeployMethod, FieldLike, PublicKey, Wallet } from '@aztec/aztec.js';
export declare const CardGameContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract CardGame;
 */
export declare class CardGameContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<CardGameContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet): DeployMethod<CardGameContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public key to derive the address.
     */
    static deployWithPublicKey(publicKey: PublicKey, wallet: Wallet): DeployMethod<CardGameContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** view_collection_cards(owner: struct, offset: integer) */
        view_collection_cards: ((owner: AztecAddressLike, offset: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, serialized_note: array) */
        compute_note_hash_and_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** view_game_cards(game: integer, player: struct, offset: integer) */
        view_game_cards: ((game: bigint | number, player: AztecAddressLike, offset: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** view_game(game: integer) */
        view_game: ((game: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** play_card(game: integer, card: struct) */
        play_card: ((game: bigint | number, card: {
            strength: bigint | number;
            points: bigint | number;
        }) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** start_game(game: integer) */
        start_game: ((game: bigint | number) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** buy_pack(seed: field) */
        buy_pack: ((seed: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor() */
        constructor: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** join_game(game: integer, cards_fields: array) */
        join_game: ((game: bigint | number, cards_fields: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** claim_cards(game: integer, cards_fields: array) */
        claim_cards: ((game: bigint | number, cards_fields: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=CardGame.d.ts.map