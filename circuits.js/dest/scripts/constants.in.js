import * as fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const NOIR_CONSTANTS_FILE = '../../../../noir-projects/noir-protocol-circuits/crates/types/src/constants.nr';
const TS_CONSTANTS_FILE = '../constants.gen.ts';
const CPP_AZTEC_CONSTANTS_FILE = '../../../../barretenberg/cpp/src/barretenberg/vm/avm_trace/aztec_constants.hpp';
const PIL_AZTEC_CONSTANTS_FILE = '../../../../barretenberg/cpp/pil/avm/constants_gen.pil';
const SOLIDITY_CONSTANTS_FILE = '../../../../l1-contracts/src/core/libraries/ConstantsGen.sol';
// Whitelist of constants that will be copied to aztec_constants.hpp.
// We don't copy everything as just a handful are needed, and updating them breaks the cache and triggers expensive bb builds.
const CPP_CONSTANTS = [
    'TOTAL_FEES_LENGTH',
    'GAS_FEES_LENGTH',
    'GAS_LENGTH',
    'CONTENT_COMMITMENT_LENGTH',
    'GLOBAL_VARIABLES_LENGTH',
    'APPEND_ONLY_TREE_SNAPSHOT_LENGTH',
    'PARTIAL_STATE_REFERENCE_LENGTH',
    'STATE_REFERENCE_LENGTH',
    'HEADER_LENGTH',
    'CALL_CONTEXT_LENGTH',
    'PUBLIC_CONTEXT_INPUTS_LENGTH',
    'PUBLIC_CIRCUIT_PUBLIC_INPUTS_LENGTH',
    'READ_REQUEST_LENGTH',
    'MAX_NOTE_HASH_READ_REQUESTS_PER_CALL',
    'MAX_NULLIFIER_READ_REQUESTS_PER_CALL',
    'MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL',
    'MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL',
    'CONTRACT_STORAGE_UPDATE_REQUEST_LENGTH',
    'MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL',
    'CONTRACT_STORAGE_READ_LENGTH',
    'MAX_PUBLIC_DATA_READS_PER_CALL',
    'MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL',
    'NOTE_HASH_LENGTH',
    'MAX_NOTE_HASHES_PER_CALL',
    'NULLIFIER_LENGTH',
    'MAX_NULLIFIERS_PER_CALL',
    'L2_TO_L1_MESSAGE_LENGTH',
    'MAX_L2_TO_L1_MSGS_PER_CALL',
    'LOG_HASH_LENGTH',
    'MAX_UNENCRYPTED_LOGS_PER_CALL',
    'HEADER_LENGTH',
    'GLOBAL_VARIABLES_LENGTH',
    'AZTEC_ADDRESS_LENGTH',
    'START_NOTE_HASH_EXISTS_WRITE_OFFSET',
    'START_NULLIFIER_EXISTS_OFFSET',
    'START_NULLIFIER_NON_EXISTS_OFFSET',
    'START_L1_TO_L2_MSG_EXISTS_WRITE_OFFSET',
    'START_SSTORE_WRITE_OFFSET',
    'START_SLOAD_WRITE_OFFSET',
    'START_EMIT_NOTE_HASH_WRITE_OFFSET',
    'START_EMIT_NULLIFIER_WRITE_OFFSET',
    'START_EMIT_L2_TO_L1_MSG_WRITE_OFFSET',
    'START_EMIT_UNENCRYPTED_LOG_WRITE_OFFSET',
    'SENDER_SELECTOR',
    'ADDRESS_SELECTOR',
    'STORAGE_ADDRESS_SELECTOR',
    'FUNCTION_SELECTOR_SELECTOR',
    'START_GLOBAL_VARIABLES',
    'CHAIN_ID_SELECTOR',
    'VERSION_SELECTOR',
    'BLOCK_NUMBER_SELECTOR',
    'TIMESTAMP_SELECTOR',
    'COINBASE_SELECTOR',
    'FEE_PER_DA_GAS_SELECTOR',
    'FEE_PER_L2_GAS_SELECTOR',
    'END_GLOBAL_VARIABLES',
    'START_SIDE_EFFECT_COUNTER',
    'TRANSACTION_FEE_SELECTOR',
];
const PIL_CONSTANTS = [
    'MAX_NOTE_HASH_READ_REQUESTS_PER_CALL',
    'MAX_NULLIFIER_READ_REQUESTS_PER_CALL',
    'MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL',
    'MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL',
    'MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL',
    'MAX_PUBLIC_DATA_READS_PER_CALL',
    'MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL',
    'MAX_NOTE_HASHES_PER_CALL',
    'MAX_NULLIFIERS_PER_CALL',
    'MAX_L2_TO_L1_MSGS_PER_CALL',
    'MAX_UNENCRYPTED_LOGS_PER_CALL',
    'START_NOTE_HASH_EXISTS_WRITE_OFFSET',
    'START_NULLIFIER_EXISTS_OFFSET',
    'START_NULLIFIER_NON_EXISTS_OFFSET',
    'START_L1_TO_L2_MSG_EXISTS_WRITE_OFFSET',
    'START_SSTORE_WRITE_OFFSET',
    'START_SLOAD_WRITE_OFFSET',
    'START_EMIT_NOTE_HASH_WRITE_OFFSET',
    'START_EMIT_NULLIFIER_WRITE_OFFSET',
    'START_EMIT_L2_TO_L1_MSG_WRITE_OFFSET',
    'START_EMIT_UNENCRYPTED_LOG_WRITE_OFFSET',
    'SENDER_SELECTOR',
    'ADDRESS_SELECTOR',
    'STORAGE_ADDRESS_SELECTOR',
    'FUNCTION_SELECTOR_SELECTOR',
    'START_GLOBAL_VARIABLES',
    'CHAIN_ID_SELECTOR',
    'VERSION_SELECTOR',
    'BLOCK_NUMBER_SELECTOR',
    'TIMESTAMP_SELECTOR',
    'COINBASE_SELECTOR',
    'FEE_PER_DA_GAS_SELECTOR',
    'FEE_PER_L2_GAS_SELECTOR',
    'END_GLOBAL_VARIABLES',
    'START_SIDE_EFFECT_COUNTER',
    'TRANSACTION_FEE_SELECTOR',
];
/**
 * Processes a collection of constants and generates code to export them as TypeScript constants.
 *
 * @param constants - An object containing key-value pairs representing constants.
 * @returns A string containing code that exports the constants as TypeScript constants.
 */
function processConstantsTS(constants) {
    const code = [];
    Object.entries(constants).forEach(([key, value]) => {
        code.push(`export const ${key} = ${+value > Number.MAX_SAFE_INTEGER ? value + 'n' : value};`);
    });
    return code.join('\n');
}
/**
 * Processes a collection of constants and generates code to export them as cpp constants.
 * Required to ensure consistency between the constants used in pil and used in the vm witness generator.
 *
 * @param constants - An object containing key-value pairs representing constants.
 * @returns A string containing code that exports the constants as cpp constants.
 */
function processConstantsCpp(constants) {
    const code = [];
    Object.entries(constants).forEach(([key, value]) => {
        if (CPP_CONSTANTS.includes(key)) {
            code.push(`#define ${key} ${value}`);
        }
    });
    return code.join('\n');
}
/**
 * Processes a collection of constants and generates code to export them as PIL constants.
 * Required to ensure consistency between the constants used in pil and used in the vm witness generator.
 *
 * @param constants - An object containing key-value pairs representing constants.
 * @returns A string containing code that exports the constants as cpp constants.
 */
function processConstantsPil(constants) {
    const code = [];
    Object.entries(constants).forEach(([key, value]) => {
        if (PIL_CONSTANTS.includes(key)) {
            code.push(`    pol ${key} = ${value};`);
        }
    });
    return code.join('\n');
}
/**
 * Processes an enum and generates code to export it as a TypeScript enum.
 *
 * @param enumName - The name of the enum.
 * @param enumValues - An object containing key-value pairs representing enum values.
 * @returns A string containing code that exports the enum as a TypeScript enum.
 */
function processEnumTS(enumName, enumValues) {
    const code = [];
    code.push(`export enum ${enumName} {`);
    Object.entries(enumValues).forEach(([key, value]) => {
        code.push(`  ${key} = ${value},`);
    });
    code.push('}');
    return code.join('\n');
}
/**
 * Processes a collection of constants and generates code to export them as Solidity constants.
 *
 * @param constants - An object containing key-value pairs representing constants.
 * @param prefix - A prefix to add to the constant names.
 * @returns A string containing code that exports the constants as Noir constants.
 */
function processConstantsSolidity(constants, prefix = '') {
    const code = [];
    Object.entries(constants).forEach(([key, value]) => {
        code.push(`  uint256 internal constant ${prefix}${key} = ${value};`);
    });
    return code.join('\n');
}
/**
 * Generate the constants file in Typescript.
 */
function generateTypescriptConstants({ constants, generatorIndexEnum }, targetPath) {
    const result = [
        '/* eslint-disable */\n// GENERATED FILE - DO NOT EDIT, RUN yarn remake-constants',
        processConstantsTS(constants),
        processEnumTS('GeneratorIndex', generatorIndexEnum),
    ].join('\n');
    fs.writeFileSync(targetPath, result);
}
/**
 * Generate the constants file in C++.
 */
function generateCppConstants({ constants }, targetPath) {
    const resultCpp = `// GENERATED FILE - DO NOT EDIT, RUN yarn remake-constants in circuits.js
#pragma once

${processConstantsCpp(constants)}
\n`;
    fs.writeFileSync(targetPath, resultCpp);
}
/**
 * Generate the constants file in PIL.
 */
function generatePilConstants({ constants }, targetPath) {
    const resultPil = `// GENERATED FILE - DO NOT EDIT, RUN yarn remake-constants in circuits.js
namespace constants(256);
${processConstantsPil(constants)}
\n`;
    fs.writeFileSync(targetPath, resultPil);
}
/**
 * Generate the constants file in Solidity.
 */
function generateSolidityConstants({ constants }, targetPath) {
    const resultSolidity = `// GENERATED FILE - DO NOT EDIT, RUN yarn remake-constants in circuits.js
// SPDX-License-Identifier: Apache-2.0
// Copyright 2023 Aztec Labs.
pragma solidity >=0.8.18;

/**
 * @title Constants Library
 * @author Aztec Labs
 * @notice Library that contains constants used throughout the Aztec protocol
 */
library Constants {
  // Prime field modulus
  uint256 internal constant P =
    21888242871839275222246405745257275088548364400416034343698204186575808495617;
  uint256 internal constant MAX_FIELD_VALUE = P - 1;

${processConstantsSolidity(constants)}
}\n`;
    fs.writeFileSync(targetPath, resultSolidity);
}
/**
 * Parse the content of the constants file in Noir.
 */
function parseNoirFile(fileContent) {
    const constantsExpressions = [];
    const generatorIndexEnum = {};
    fileContent.split('\n').forEach(l => {
        const line = l.trim();
        if (!line || line.match(/^\/\/|^\s*\/?\*/)) {
            return;
        }
        const [, name, _type, value] = line.match(/global\s+(\w+)(\s*:\s*\w+)?\s*=\s*(.+?);/) || [];
        if (!name || !value) {
            // eslint-disable-next-line no-console
            console.warn(`Unknown content: ${line}`);
            return;
        }
        const [, indexName] = name.match(/GENERATOR_INDEX__(\w+)/) || [];
        if (indexName) {
            generatorIndexEnum[indexName] = +value;
        }
        else {
            constantsExpressions.push([name, value]);
        }
    });
    const constants = evaluateExpressions(constantsExpressions);
    return { constants, generatorIndexEnum };
}
/**
 * Converts constants defined as expressions to constants with actual values.
 * @param expressions Ordered list of expressions of the type: "CONSTANT_NAME: expression".
 *   where the expression is a string that can be evaluated to a number.
 *   For example: "CONSTANT_NAME: 2 + 2" or "CONSTANT_NAME: CONSTANT_A * CONSTANT_B".
 * @returns Parsed expressions of the form: "CONSTANT_NAME: number_as_string".
 */
function evaluateExpressions(expressions) {
    const constants = {};
    // Create JS expressions. It is not as easy as just evaluating the expression!
    // We basically need to convert everything to BigInts, otherwise things don't fit.
    // However, (1) the bigints need to be initialized from strings; (2) everything needs to
    // be a bigint, even the actual constant values!
    const prelude = expressions
        .map(([name, rhs]) => {
        const guardedRhs = rhs
            // We make some space around the parentheses, so that constant numbers are still split.
            .replace(/\(/g, '( ')
            .replace(/\)/g, ' )')
            // We split the expression into terms...
            .split(' ')
            // ...and then we convert each term to a BigInt if it is a number.
            .map(term => (isNaN(+term) ? term : `BigInt('${term}')`))
            // We join the terms back together.
            .join(' ');
        return `var ${name} = ${guardedRhs};`;
    })
        .join('\n');
    // Extract each value from the expressions. Observe that this will still be a string,
    // so that we can then choose to express it as BigInt or Number depending on the size.
    for (const [name, _] of expressions) {
        constants[name] = eval(prelude + `; BigInt(${name}).toString()`);
    }
    return constants;
}
/**
 * Convert the Noir constants to TypeScript and Solidity.
 */
function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const noirConstantsFile = join(__dirname, NOIR_CONSTANTS_FILE);
    const noirConstants = fs.readFileSync(noirConstantsFile, 'utf-8');
    const parsedContent = parseNoirFile(noirConstants);
    // Typescript
    const tsTargetPath = join(__dirname, TS_CONSTANTS_FILE);
    generateTypescriptConstants(parsedContent, tsTargetPath);
    // Cpp
    const cppTargetPath = join(__dirname, CPP_AZTEC_CONSTANTS_FILE);
    generateCppConstants(parsedContent, cppTargetPath);
    // PIL
    const pilTargetPath = join(__dirname, PIL_AZTEC_CONSTANTS_FILE);
    generatePilConstants(parsedContent, pilTargetPath);
    // Solidity
    const solidityTargetPath = join(__dirname, SOLIDITY_CONSTANTS_FILE);
    fs.mkdirSync(dirname(solidityTargetPath), { recursive: true });
    generateSolidityConstants(parsedContent, solidityTargetPath);
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvY29uc3RhbnRzLmluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFcEMsTUFBTSxtQkFBbUIsR0FBRyxnRkFBZ0YsQ0FBQztBQUM3RyxNQUFNLGlCQUFpQixHQUFHLHFCQUFxQixDQUFDO0FBQ2hELE1BQU0sd0JBQXdCLEdBQUcsZ0ZBQWdGLENBQUM7QUFDbEgsTUFBTSx3QkFBd0IsR0FBRyx3REFBd0QsQ0FBQztBQUMxRixNQUFNLHVCQUF1QixHQUFHLDhEQUE4RCxDQUFDO0FBRS9GLHFFQUFxRTtBQUNyRSw4SEFBOEg7QUFDOUgsTUFBTSxhQUFhLEdBQUc7SUFDcEIsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6QixrQ0FBa0M7SUFDbEMsZ0NBQWdDO0lBQ2hDLHdCQUF3QjtJQUN4QixlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLDhCQUE4QjtJQUM5QixxQ0FBcUM7SUFDckMscUJBQXFCO0lBQ3JCLHNDQUFzQztJQUN0QyxzQ0FBc0M7SUFDdEMsbURBQW1EO0lBQ25ELHlDQUF5QztJQUN6Qyx3Q0FBd0M7SUFDeEMsMENBQTBDO0lBQzFDLDhCQUE4QjtJQUM5QixnQ0FBZ0M7SUFDaEMsdUNBQXVDO0lBQ3ZDLGtCQUFrQjtJQUNsQiwwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0IsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixzQkFBc0I7SUFDdEIs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