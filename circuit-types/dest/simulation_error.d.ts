import { type AztecAddress, type FunctionSelector } from '@aztec/circuits.js';
import { type OpcodeLocation } from '@aztec/foundation/abi';
/**
 * Address and selector of a function that failed during simulation.
 */
export interface FailingFunction {
    /**
     * The address of the contract that failed.
     */
    contractAddress: AztecAddress;
    /**
     * The name of the contract that failed.
     */
    contractName?: string;
    /**
     * The selector of the function that failed.
     */
    functionSelector: FunctionSelector;
    /**
     * The name of the function that failed.
     */
    functionName?: string;
}
/**
 * A pointer to a failing section of the noir source code.
 */
export interface SourceCodeLocation {
    /**
     * The path to the source file.
     */
    filePath: string;
    /**
     * The line number of the call.
     */
    line: number;
    /**
     * The column number of the call.
     */
    column: number;
    /**
     * The source code of the file.
     */
    fileSource: string;
    /**
     * The source code text of the failed constraint.
     */
    locationText: string;
}
/**
 * A stack of noir source code locations.
 */
export type NoirCallStack = SourceCodeLocation[] | OpcodeLocation[];
/**
 * Checks if a call stack is unresolved.
 */
export declare function isNoirCallStackUnresolved(callStack: NoirCallStack): callStack is OpcodeLocation[];
/**
 * An error during the simulation of a function call.
 */
export declare class SimulationError extends Error {
    private originalMessage;
    private functionErrorStack;
    private noirErrorStack?;
    constructor(originalMessage: string, functionErrorStack: FailingFunction[], noirErrorStack?: NoirCallStack | undefined, options?: ErrorOptions);
    getMessage(): string;
    /**
     * Enriches the error with the name of a contract that failed.
     * @param contractAddress - The address of the contract
     * @param contractName - The corresponding name
     */
    enrichWithContractName(contractAddress: AztecAddress, contractName: string): void;
    /**
     * Enriches the error with the name of a function that failed.
     * @param contractAddress - The address of the contract
     * @param functionSelector - The selector of the function
     * @param functionName - The corresponding name
     */
    enrichWithFunctionName(contractAddress: AztecAddress, functionSelector: FunctionSelector, functionName: string): void;
    getStack(): string;
    /**
     * The aztec function stack that failed during simulation.
     */
    getCallStack(): FailingFunction[];
    /**
     * Returns the noir call stack inside the first function that failed during simulation.
     * @returns The noir call stack.
     */
    getNoirCallStack(): NoirCallStack;
    /**
     * Sets the noir call stack.
     * @param callStack - The noir call stack.
     */
    setNoirCallStack(callStack: NoirCallStack): void;
    toJSON(): {
        originalMessage: string;
        functionErrorStack: FailingFunction[];
        noirErrorStack: NoirCallStack | undefined;
    };
    static fromJSON(obj: ReturnType<SimulationError['toJSON']>): SimulationError;
}
//# sourceMappingURL=simulation_error.d.ts.map