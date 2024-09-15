import { CombinedAccumulatedData, CombinedConstantData, Fr, Gas } from '@aztec/circuits.js';
import { EncryptedTxL2Logs, UnencryptedTxL2Logs } from '../logs/tx_l2_logs.js';
import { type SimulationError } from '../simulation_error.js';
import { type PublicKernelType } from './processed_tx.js';
/** Return values of simulating a circuit. */
export type ProcessReturnValues = Fr[] | undefined;
/** Return values of simulating complete callstack. */
export declare class NestedProcessReturnValues {
    values: ProcessReturnValues;
    nested: NestedProcessReturnValues[];
    constructor(values: ProcessReturnValues, nested?: NestedProcessReturnValues[]);
    toJSON(): any;
    static fromJSON(json: any): NestedProcessReturnValues;
}
/**
 * Outputs of processing the public component of a transaction.
 */
export declare class PublicSimulationOutput {
    encryptedLogs: EncryptedTxL2Logs;
    unencryptedLogs: UnencryptedTxL2Logs;
    revertReason: SimulationError | undefined;
    constants: CombinedConstantData;
    end: CombinedAccumulatedData;
    publicReturnValues: NestedProcessReturnValues[];
    gasUsed: Partial<Record<PublicKernelType, Gas>>;
    constructor(encryptedLogs: EncryptedTxL2Logs, unencryptedLogs: UnencryptedTxL2Logs, revertReason: SimulationError | undefined, constants: CombinedConstantData, end: CombinedAccumulatedData, publicReturnValues: NestedProcessReturnValues[], gasUsed: Partial<Record<PublicKernelType, Gas>>);
    toJSON(): {
        encryptedLogs: {
            functionLogs: {
                logs: object[];
            }[];
        };
        unencryptedLogs: {
            functionLogs: {
                logs: object[];
            }[];
        };
        revertReason: SimulationError | undefined;
        constants: string;
        end: string;
        publicReturnValues: any[];
        gasUsed: Partial<Record<PublicKernelType, {
            daGas: number;
            l2Gas: number;
        }>>;
    };
    static fromJSON(json: any): PublicSimulationOutput;
}
//# sourceMappingURL=public_simulation_output.d.ts.map