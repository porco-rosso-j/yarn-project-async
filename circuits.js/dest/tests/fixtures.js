import { loadContractArtifact } from '@aztec/types/abi';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
// Copied from the build output for the contract `Benchmarking` in noir-contracts
export function getBenchmarkContractArtifact() {
    const path = getPathToFixture('Benchmarking.test.json');
    const content = JSON.parse(readFileSync(path).toString());
    return loadContractArtifact(content);
}
// Copied from the build output for the contract `Benchmarking` in noir-contracts
export function getTestContractArtifact() {
    const path = getPathToFixture('Benchmarking.test.json');
    const content = JSON.parse(readFileSync(path).toString());
    return loadContractArtifact(content);
}
// Copied from the test 'registers a new contract class' in end-to-end/src/e2e_deploy_contract.test.ts
export function getSampleContractClassRegisteredEventPayload() {
    const path = getPathToFixture('ContractClassRegisteredEventData.hex');
    return Buffer.from(readFileSync(path).toString(), 'hex');
}
// Copied from the test 'deploying a contract instance' in end-to-end/src/e2e_deploy_contract.test.ts
export function getSampleContractInstanceDeployedEventPayload() {
    const path = getPathToFixture('ContractInstanceDeployedEventData.hex');
    return Buffer.from(readFileSync(path).toString(), 'hex');
}
// Generated from end-to-end/src/e2e_deploy_contract.test.ts with AZTEC_GENERATE_TEST_DATA
export function getSamplePrivateFunctionBroadcastedEventPayload() {
    const path = getPathToFixture('PrivateFunctionBroadcastedEventData.hex');
    return Buffer.from(readFileSync(path).toString(), 'hex');
}
// Generated from end-to-end/src/e2e_deploy_contract.test.ts with AZTEC_GENERATE_TEST_DATA
export function getSampleUnconstrainedFunctionBroadcastedEventPayload() {
    const path = getPathToFixture('UnconstrainedFunctionBroadcastedEventData.hex');
    return Buffer.from(readFileSync(path).toString(), 'hex');
}
function getPathToFixture(name) {
    return resolve(dirname(fileURLToPath(import.meta.url)), `../../fixtures/${name}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4dHVyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdHMvZml4dHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQztBQUNsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXBDLGlGQUFpRjtBQUNqRixNQUFNLFVBQVUsNEJBQTRCO0lBQzFDLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQXlCLENBQUM7SUFDbEYsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsaUZBQWlGO0FBQ2pGLE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBeUIsQ0FBQztJQUNsRixPQUFPLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxzR0FBc0c7QUFDdEcsTUFBTSxVQUFVLDRDQUE0QztJQUMxRCxNQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3RFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELHFHQUFxRztBQUNyRyxNQUFNLFVBQVUsNkNBQTZDO0lBQzNELE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDdkUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsMEZBQTBGO0FBQzFGLE1BQU0sVUFBVSwrQ0FBK0M7SUFDN0QsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUN6RSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCwwRkFBMEY7QUFDMUYsTUFBTSxVQUFVLHFEQUFxRDtJQUNuRSxNQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQy9FLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsSUFBWTtJQUNwQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRixDQUFDIn0=