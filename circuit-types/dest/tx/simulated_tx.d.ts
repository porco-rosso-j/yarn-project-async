import { NestedProcessReturnValues, PublicSimulationOutput } from './public_simulation_output.js';
import { Tx } from './tx.js';
export declare class SimulatedTx {
    tx: Tx;
    privateReturnValues?: NestedProcessReturnValues | undefined;
    publicOutput?: PublicSimulationOutput | undefined;
    constructor(tx: Tx, privateReturnValues?: NestedProcessReturnValues | undefined, publicOutput?: PublicSimulationOutput | undefined);
    /**
     * Convert a SimulatedTx class object to a plain JSON object.
     * @returns A plain object with SimulatedTx properties.
     */
    toJSON(): {
        tx: {
            data: string;
            noteEncryptedLogs: string;
            encryptedLogs: string;
            unencryptedLogs: string;
            proof: string;
            enqueuedPublicFunctions: string[];
            publicTeardownFunctionCall: string;
        };
        privateReturnValues: any;
        publicOutput: {
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
            revertReason: import("../simulation_error.js").SimulationError | undefined;
            constants: string;
            end: string;
            publicReturnValues: any[];
            gasUsed: Partial<Record<import("./processed_tx.js").PublicKernelType, {
                daGas: number;
                l2Gas: number;
            }>>;
        } | undefined;
    };
    /**
     * Convert a plain JSON object to a Tx class object.
     * @param obj - A plain Tx JSON object.
     * @returns A Tx class object.
     */
    static fromJSON(obj: any): SimulatedTx;
}
//# sourceMappingURL=simulated_tx.d.ts.map