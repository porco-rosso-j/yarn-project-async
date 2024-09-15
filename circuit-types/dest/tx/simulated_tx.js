import { NestedProcessReturnValues, PublicSimulationOutput } from './public_simulation_output.js';
import { Tx } from './tx.js';
// REFACTOR: Review what we need to expose to the user when running a simulation.
// Eg tx already has encrypted and unencrypted logs, but those cover only the ones
// emitted during private. We need the ones from ProcessOutput to include the public
// ones as well. However, those would only be present if the user chooses to simulate
// the public side of things. This also points at this class needing to be split into
// two: one with just private simulation, and one that also includes public simulation.
export class SimulatedTx {
    constructor(tx, privateReturnValues, publicOutput) {
        this.tx = tx;
        this.privateReturnValues = privateReturnValues;
        this.publicOutput = publicOutput;
    }
    /**
     * Convert a SimulatedTx class object to a plain JSON object.
     * @returns A plain object with SimulatedTx properties.
     */
    toJSON() {
        return {
            tx: this.tx.toJSON(),
            privateReturnValues: this.privateReturnValues && this.privateReturnValues.toJSON(),
            publicOutput: this.publicOutput && this.publicOutput.toJSON(),
        };
    }
    /**
     * Convert a plain JSON object to a Tx class object.
     * @param obj - A plain Tx JSON object.
     * @returns A Tx class object.
     */
    static fromJSON(obj) {
        const tx = Tx.fromJSON(obj.tx);
        const publicOutput = obj.publicOutput ? PublicSimulationOutput.fromJSON(obj.publicOutput) : undefined;
        const privateReturnValues = obj.privateReturnValues
            ? NestedProcessReturnValues.fromJSON(obj.privateReturnValues)
            : undefined;
        return new SimulatedTx(tx, privateReturnValues, publicOutput);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGVkX3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R4L3NpbXVsYXRlZF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTdCLGlGQUFpRjtBQUNqRixrRkFBa0Y7QUFDbEYsb0ZBQW9GO0FBQ3BGLHFGQUFxRjtBQUNyRixxRkFBcUY7QUFDckYsdUZBQXVGO0FBQ3ZGLE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFlBQ1MsRUFBTSxFQUNOLG1CQUErQyxFQUMvQyxZQUFxQztRQUZyQyxPQUFFLEdBQUYsRUFBRSxDQUFJO1FBQ04sd0JBQW1CLEdBQW5CLG1CQUFtQixDQUE0QjtRQUMvQyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7SUFDM0MsQ0FBQztJQUVKOzs7T0FHRztJQUNJLE1BQU07UUFDWCxPQUFPO1lBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ3BCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFO1lBQ2xGLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1NBQzlELENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBUTtRQUM3QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEcsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsbUJBQW1CO1lBQ2pELENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1lBQzdELENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFZCxPQUFPLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0YifQ==