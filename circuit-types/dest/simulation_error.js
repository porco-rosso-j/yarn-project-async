/**
 * Checks if a call stack is unresolved.
 */
export function isNoirCallStackUnresolved(callStack) {
    return typeof callStack[0] === 'string';
}
/**
 * An error during the simulation of a function call.
 */
export class SimulationError extends Error {
    constructor(originalMessage, functionErrorStack, noirErrorStack, options) {
        super(originalMessage, options);
        this.originalMessage = originalMessage;
        this.functionErrorStack = functionErrorStack;
        this.noirErrorStack = noirErrorStack;
        const getMessage = () => this.getMessage();
        const getStack = () => this.getStack();
        Object.defineProperties(this, {
            message: {
                configurable: false,
                enumerable: true,
                /**
                 * Getter for the custom error message. It has to be defined here because JS errors have the message property defined
                 * in the error itself, not its prototype. Thus if we define it as a class getter will be shadowed.
                 * @returns The message.
                 */
                get() {
                    return getMessage();
                },
            },
            stack: {
                configurable: false,
                enumerable: true,
                /**
                 * Getter for the custom error stack. It has to be defined here due to the same issue as the message.
                 * @returns The stack.
                 */
                get() {
                    return getStack();
                },
            },
        });
    }
    getMessage() {
        if (this.noirErrorStack && !isNoirCallStackUnresolved(this.noirErrorStack) && this.noirErrorStack.length) {
            return `${this.originalMessage} '${this.noirErrorStack[this.noirErrorStack.length - 1].locationText}'`;
        }
        return this.originalMessage;
    }
    /**
     * Enriches the error with the name of a contract that failed.
     * @param contractAddress - The address of the contract
     * @param contractName - The corresponding name
     */
    enrichWithContractName(contractAddress, contractName) {
        this.functionErrorStack.forEach(failingFunction => {
            if (failingFunction.contractAddress.equals(contractAddress)) {
                failingFunction.contractName = contractName;
            }
        });
    }
    /**
     * Enriches the error with the name of a function that failed.
     * @param contractAddress - The address of the contract
     * @param functionSelector - The selector of the function
     * @param functionName - The corresponding name
     */
    enrichWithFunctionName(contractAddress, functionSelector, functionName) {
        this.functionErrorStack.forEach(failingFunction => {
            if (failingFunction.contractAddress.equals(contractAddress) &&
                failingFunction.functionSelector.equals(functionSelector)) {
                failingFunction.functionName = functionName;
            }
        });
    }
    getStack() {
        const functionCallStack = this.getCallStack();
        const noirCallStack = this.getNoirCallStack();
        // Try to resolve the contract and function names of the stack of failing functions.
        const stackLines = [
            ...functionCallStack.map(failingFunction => {
                return `at ${failingFunction.contractName ?? failingFunction.contractAddress.toString()}.${failingFunction.functionName ?? failingFunction.functionSelector.toString()}`;
            }),
            ...noirCallStack.map(errorLocation => typeof errorLocation === 'string'
                ? `at opcode ${errorLocation}`
                : `at ${errorLocation.locationText} (${errorLocation.filePath}:${errorLocation.line}:${errorLocation.column})`),
        ];
        return [`Simulation error: ${this.message}`, ...stackLines.reverse()].join('\n');
    }
    /**
     * The aztec function stack that failed during simulation.
     */
    getCallStack() {
        return this.functionErrorStack;
    }
    /**
     * Returns the noir call stack inside the first function that failed during simulation.
     * @returns The noir call stack.
     */
    getNoirCallStack() {
        return this.noirErrorStack || [];
    }
    /**
     * Sets the noir call stack.
     * @param callStack - The noir call stack.
     */
    setNoirCallStack(callStack) {
        this.noirErrorStack = callStack;
    }
    toJSON() {
        return {
            originalMessage: this.originalMessage,
            functionErrorStack: this.functionErrorStack,
            noirErrorStack: this.noirErrorStack,
        };
    }
    static fromJSON(obj) {
        return new SimulationError(obj.originalMessage, obj.functionErrorStack, obj.noirErrorStack);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGlvbl9lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaW11bGF0aW9uX2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdEQTs7R0FFRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxTQUF3QjtJQUNoRSxPQUFPLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMxQyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxLQUFLO0lBQ3hDLFlBQ1UsZUFBdUIsRUFDdkIsa0JBQXFDLEVBQ3JDLGNBQThCLEVBQ3RDLE9BQXNCO1FBRXRCLEtBQUssQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFMeEIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFJdEMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO1lBQzVCLE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCOzs7O21CQUlHO2dCQUNILEdBQUc7b0JBQ0QsT0FBTyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQzthQUNGO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLFlBQVksRUFBRSxLQUFLO2dCQUNuQixVQUFVLEVBQUUsSUFBSTtnQkFDaEI7OzttQkFHRztnQkFDSCxHQUFHO29CQUNELE9BQU8sUUFBUSxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxV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