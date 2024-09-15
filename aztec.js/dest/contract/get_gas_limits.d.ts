import { type SimulatedTx } from '@aztec/circuit-types';
import { Gas } from '@aztec/circuits.js';
/**
 * Returns suggested total and teardown gas limits for a simulated tx.
 * Note that public gas usage is only accounted for if the publicOutput is present.
 * @param pad - Percentage to pad the suggested gas limits by, defaults to 10%.
 */
export declare function getGasLimits(simulatedTx: SimulatedTx, simulationTeardownGasLimits: Gas, pad?: number): {
    totalGas: Gas;
    teardownGas: Gas;
};
//# sourceMappingURL=get_gas_limits.d.ts.map