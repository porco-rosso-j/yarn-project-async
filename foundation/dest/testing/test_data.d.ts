/** Returns whether test data generation is enabled */
export declare function isGenerateTestDataEnabled(): boolean;
/** Pushes test data with the given name, only if test data generation is enabled. */
export declare function pushTestData<T>(itemName: string, data: T): void;
/** Returns all instances of pushed test data with the given name, or empty if test data generation is not enabled. */
export declare function getTestData(itemName: string): unknown[];
/** Writes the contents specified to the target file if test data generation is enabled. */
export declare function writeTestData(targetFileFromRepoRoot: string, contents: string | Buffer): void;
/**
 * Looks for a variable assignment in the target file and updates the value, only if test data generation is enabled.
 * Note that a magic inline comment would be a cleaner approach, like `/* TEST-DATA-START *\/` and `/* TEST-DATA-END *\/`,
 * but running nargo fmt on it panics since the comment would be erased, so we roll with this for now.
 * @remarks Requires AZTEC_GENERATE_TEST_DATA=1 to be set
 */
export declare function updateInlineTestData(targetFileFromRepoRoot: string, itemName: string, value: string): void;
//# sourceMappingURL=test_data.d.ts.map