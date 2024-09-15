import { AztecAddress } from '@aztec/foundation/aztec-address';
import { EthAddress } from '@aztec/foundation/eth-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, FieldReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
import { GasFees } from './gas_fees.js';
/**
 * Global variables of the L2 block.
 */
export declare class GlobalVariables {
    /** ChainId for the L2 block. */
    chainId: Fr;
    /** Version for the L2 block. */
    version: Fr;
    /** Block number of the L2 block. */
    blockNumber: Fr;
    /** Timestamp of the L2 block. */
    timestamp: Fr;
    /** Recipient of block reward. */
    coinbase: EthAddress;
    /** Address to receive fees. */
    feeRecipient: AztecAddress;
    /** Global gas prices for this block. */
    gasFees: GasFees;
    constructor(
    /** ChainId for the L2 block. */
    chainId: Fr, 
    /** Version for the L2 block. */
    version: Fr, 
    /** Block number of the L2 block. */
    blockNumber: Fr, 
    /** Timestamp of the L2 block. */
    timestamp: Fr, 
    /** Recipient of block reward. */
    coinbase: EthAddress, 
    /** Address to receive fees. */
    feeRecipient: AztecAddress, 
    /** Global gas prices for this block. */
    gasFees: GasFees);
    getSize(): number;
    static from(fields: FieldsOf<GlobalVariables>): GlobalVariables;
    static empty(): GlobalVariables;
    static fromBuffer(buffer: Buffer | BufferReader): GlobalVariables;
    static fromJSON(obj: any): GlobalVariables;
    static fromFields(fields: Fr[] | FieldReader): GlobalVariables;
    static getFields(fields: FieldsOf<GlobalVariables>): readonly [Fr, Fr, Fr, Fr, EthAddress, AztecAddress, GasFees];
    toBuffer(): Buffer;
    toFields(): Fr[];
    toJSON(): {
        chainId: `0x${string}`;
        version: `0x${string}`;
        blockNumber: `0x${string}`;
        timestamp: `0x${string}`;
        coinbase: `0x${string}`;
        feeRecipient: `0x${string}`;
        gasFees: {
            feePerDaGas: `0x${string}`;
            feePerL2Gas: `0x${string}`;
        };
    };
    clone(): GlobalVariables;
    isEmpty(): boolean;
}
//# sourceMappingURL=global_variables.d.ts.map