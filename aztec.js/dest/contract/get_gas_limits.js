import { PublicKernelType } from '@aztec/circuit-types';
import { Gas } from '@aztec/circuits.js';
/**
 * Returns suggested total and teardown gas limits for a simulated tx.
 * Note that public gas usage is only accounted for if the publicOutput is present.
 * @param pad - Percentage to pad the suggested gas limits by, defaults to 10%.
 */
export function getGasLimits(simulatedTx, simulationTeardownGasLimits, pad = 0.1) {
    const privateGasUsed = simulatedTx.tx.data.publicInputs.end.gasUsed
        .sub(simulationTeardownGasLimits)
        .add(simulatedTx.tx.data.forPublic?.endNonRevertibleData.gasUsed ?? Gas.empty());
    if (simulatedTx.publicOutput) {
        const publicGasUsed = Object.values(simulatedTx.publicOutput.gasUsed)
            .filter(Boolean)
            .reduce((total, current) => total.add(current), Gas.empty());
        const teardownGas = simulatedTx.publicOutput.gasUsed[PublicKernelType.TEARDOWN] ?? Gas.empty();
        return {
            totalGas: privateGasUsed.add(publicGasUsed).mul(1 + pad),
            teardownGas: teardownGas.mul(1 + pad),
        };
    }
    return { totalGas: privateGasUsed.mul(1 + pad), teardownGas: Gas.empty() };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X2dhc19saW1pdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QvZ2V0X2dhc19saW1pdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV6Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxXQUF3QixFQUFFLDJCQUFnQyxFQUFFLEdBQUcsR0FBRyxHQUFHO0lBQ2hHLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTztTQUNoRSxHQUFHLENBQUMsMkJBQTJCLENBQUM7U0FDaEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbkYsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNsRSxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFL0YsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3hELFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztBQUM3RSxDQUFDIn0=