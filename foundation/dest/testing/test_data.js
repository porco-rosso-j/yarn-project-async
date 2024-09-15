import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { createConsoleLogger } from '../log/console.js';
import { fileURLToPath } from '../url/index.js';
const testData = {};
/** Returns whether test data generation is enabled */
export function isGenerateTestDataEnabled() {
    return process.env.AZTEC_GENERATE_TEST_DATA === '1' && typeof expect !== 'undefined';
}
/** Pushes test data with the given name, only if test data generation is enabled. */
export function pushTestData(itemName, data) {
    if (!isGenerateTestDataEnabled()) {
        return;
    }
    if (typeof expect === 'undefined') {
        return;
    }
    const testName = expect.getState().currentTestName;
    const fullItemName = `${testName} ${itemName}`;
    if (!testData[fullItemName]) {
        testData[fullItemName] = [];
    }
    testData[fullItemName].push(data);
}
/** Returns all instances of pushed test data with the given name, or empty if test data generation is not enabled. */
export function getTestData(itemName) {
    if (!isGenerateTestDataEnabled()) {
        return [];
    }
    const testName = expect.getState().currentTestName;
    const fullItemName = `${testName} ${itemName}`;
    return testData[fullItemName];
}
/** Writes the contents specified to the target file if test data generation is enabled. */
export function writeTestData(targetFileFromRepoRoot, contents) {
    if (!isGenerateTestDataEnabled()) {
        return;
    }
    const targetFile = getPathToFile(targetFileFromRepoRoot);
    const toWrite = typeof contents === 'string' ? contents : contents.toString('hex');
    writeFileSync(targetFile, toWrite);
    const logger = createConsoleLogger('aztec:testing:test_data');
    logger(`Wrote test data to ${targetFile}`);
}
/**
 * Looks for a variable assignment in the target file and updates the value, only if test data generation is enabled.
 * Note that a magic inline comment would be a cleaner approach, like `/* TEST-DATA-START *\/` and `/* TEST-DATA-END *\/`,
 * but running nargo fmt on it panics since the comment would be erased, so we roll with this for now.
 * @remarks Requires AZTEC_GENERATE_TEST_DATA=1 to be set
 */
export function updateInlineTestData(targetFileFromRepoRoot, itemName, value) {
    if (!isGenerateTestDataEnabled()) {
        return;
    }
    const logger = createConsoleLogger('aztec:testing:test_data');
    const targetFile = getPathToFile(targetFileFromRepoRoot);
    const contents = readFileSync(targetFile, 'utf8').toString();
    const regex = new RegExp(`let ${itemName} = [\\s\\S]*?;`, 'g');
    if (!regex.exec(contents)) {
        throw new Error(`Test data marker for ${itemName} not found in ${targetFile}`);
    }
    const updatedContents = contents.replaceAll(regex, `let ${itemName} = ${value};`);
    writeFileSync(targetFile, updatedContents);
    logger(`Updated test data in ${targetFile} for ${itemName} to ${value}`);
}
function getPathToFile(targetFileFromRepoRoot) {
    const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../');
    if (!existsSync(join(repoRoot, 'CODEOWNERS'))) {
        throw new Error(`Path to repo root is incorrect (got ${repoRoot})`);
    }
    return join(repoRoot, targetFileFromRepoRoot);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RpbmcvdGVzdF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLElBQUksQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE1BQU0sUUFBUSxHQUFpQyxFQUFFLENBQUM7QUFFbEQsc0RBQXNEO0FBQ3RELE1BQU0sVUFBVSx5QkFBeUI7SUFDdkMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixLQUFLLEdBQUcsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFDdkYsQ0FBQztBQUVELHFGQUFxRjtBQUNyRixNQUFNLFVBQVUsWUFBWSxDQUFJLFFBQWdCLEVBQUUsSUFBTztJQUN2RCxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDO1FBQ2pDLE9BQU87SUFDVCxDQUFDO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDbkQsTUFBTSxZQUFZLEdBQUcsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7SUFFL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNELFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENB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