import { FunctionType, NoteSelector, } from '@aztec/foundation/abi';
import { Fr } from '@aztec/foundation/fields';
import { AZTEC_INITIALIZER_ATTRIBUTE, AZTEC_INTERNAL_ATTRIBUTE, AZTEC_PRIVATE_ATTRIBUTE, AZTEC_PUBLIC_ATTRIBUTE, AZTEC_PUBLIC_VM_ATTRIBUTE, AZTEC_VIEW_ATTRIBUTE, } from '../noir/index.js';
import { mockVerificationKey } from './mocked_keys.js';
/**
 * Serializes a contract artifact to a buffer for storage.
 * @param artifact - Artifact to serialize.
 * @returns A buffer.
 */
export function contractArtifactToBuffer(artifact) {
    return Buffer.from(JSON.stringify(artifact, (key, value) => {
        if (key === 'bytecode' &&
            value !== null &&
            typeof value === 'object' &&
            value.type === 'Buffer' &&
            Array.isArray(value.data)) {
            return Buffer.from(value.data).toString('base64');
        }
        return value;
    }), 'utf-8');
}
/**
 * Deserializes a contract artifact from storage.
 * @param buffer - Buffer to deserialize.
 * @returns Deserialized artifact.
 */
export function contractArtifactFromBuffer(buffer) {
    return JSON.parse(buffer.toString('utf-8'), (key, value) => {
        if (key === 'bytecode' && typeof value === 'string') {
            return Buffer.from(value, 'base64');
        }
        if (typeof value === 'object' && value !== null && value.type === 'NoteSelector') {
            return new NoteSelector(Number(value.value));
        }
        if (typeof value === 'object' && value !== null && value.type === 'Fr') {
            return new Fr(BigInt(value.value));
        }
        return value;
    });
}
/**
 * Gets nargo build output and returns a valid contract artifact instance.
 * @param input - Input object as generated by nargo compile.
 * @returns A valid contract artifact instance.
 */
export function loadContractArtifact(input) {
    if (isContractArtifact(input)) {
        return input;
    }
    return generateContractArtifact(input);
}
/**
 * Checks if the given input looks like a valid ContractArtifact. The check is not exhaustive,
 * and it's just meant to differentiate between nargo raw build artifacts and the ones
 * produced by this compiler.
 * @param input - Input object.
 * @returns True if it looks like a ContractArtifact.
 */
function isContractArtifact(input) {
    if (typeof input !== 'object') {
        return false;
    }
    const maybeContractArtifact = input;
    if (typeof maybeContractArtifact.name !== 'string') {
        return false;
    }
    if (!Array.isArray(maybeContractArtifact.functions)) {
        return false;
    }
    for (const fn of maybeContractArtifact.functions) {
        if (typeof fn.name !== 'string') {
            return false;
        }
        if (typeof fn.functionType !== 'string') {
            return false;
        }
    }
    return true;
}
/**
 * Generates a function parameter out of one generated by a nargo build.
 * @param param - Noir parameter.
 * @returns A function parameter.
 */
function generateFunctionParameter(param) {
    const { visibility } = param;
    if (visibility === 'databus') {
        throw new Error(`Unsupported visibility ${param.visibility} for noir contract function parameter ${param.name}.`);
    }
    return { ...param, visibility: visibility };
}
/**
 * Generates a function build artifact. Replaces verification key with a mock value.
 * @param fn - Noir function entry.
 * @param contract - Parent contract.
 * @returns Function artifact.
 */
function generateFunctionArtifact(fn, contract) {
    if (fn.custom_attributes === undefined) {
        throw new Error(`No custom attributes found for contract function ${fn.name}. Try rebuilding the contract with the latest nargo version.`);
    }
    const functionType = getFunctionType(fn);
    const isInternal = fn.custom_attributes.includes(AZTEC_INTERNAL_ATTRIBUTE);
    const isStatic = fn.custom_attributes.includes(AZTEC_VIEW_ATTRIBUTE);
    // If the function is not unconstrained, the first item is inputs or CallContext which we should omit
    let parameters = fn.abi.parameters.map(generateFunctionParameter);
    if (hasKernelFunctionInputs(parameters)) {
        parameters = parameters.slice(1);
    }
    let returnTypes = [];
    if (functionType === FunctionType.UNCONSTRAINED && fn.abi.return_type) {
        returnTypes = [fn.abi.return_type.abi_type];
    }
    else {
        const pathToFind = `${contract.name}::${fn.name}_abi`;
        const abiStructs = contract.outputs.structs['functions'];
        const returnStruct = abiStructs.find(a => a.kind === 'struct' && a.path === pathToFind);
        if (returnStruct) {
            if (returnStruct.kind !== 'struct') {
                throw new Error('Could not generate contract function artifact');
            }
            const returnTypeField = returnStruct.fields.find(field => field.name === 'return_type');
            if (returnTypeField) {
                returnTypes = [returnTypeField.type];
            }
        }
    }
    return {
        name: fn.name,
        functionType,
        isInternal,
        isStatic,
        isInitializer: fn.custom_attributes.includes(AZTEC_INITIALIZER_ATTRIBUTE),
        parameters,
        returnTypes,
        bytecode: Buffer.from(fn.bytecode, 'base64'),
        verificationKey: mockVerificationKey,
        debugSymbols: fn.debug_symbols,
    };
}
function getFunctionType(fn) {
    if (fn.custom_attributes.includes(AZTEC_PRIVATE_ATTRIBUTE)) {
        return FunctionType.PRIVATE;
    }
    else if (fn.custom_attributes.includes(AZTEC_PUBLIC_ATTRIBUTE) ||
        fn.custom_attributes.includes(AZTEC_PUBLIC_VM_ATTRIBUTE)) {
        return FunctionType.PUBLIC;
    }
    else if (fn.is_unconstrained) {
        return FunctionType.UNCONSTRAINED;
    }
    else {
        // Default to a private function (see simple_macro_example_expanded for an example of this behavior)
        return FunctionType.PRIVATE;
    }
}
/**
 * Returns true if the first parameter is kernel function inputs.
 *
 * Noir macros #[aztec(private|public)] inject the following code
 * fn <name>(inputs: <Public|Private>ContextInputs, ...otherparams) {}
 *
 * Return true if this injected parameter is found
 */
function hasKernelFunctionInputs(params) {
    const firstParam = params[0];
    return firstParam?.type.kind === 'struct' && firstParam.type.path.includes('ContextInputs');
}
/**
 * Generates a storage layout for the contract artifact.
 * @param input - The compiled noir contract to get storage layout for
 * @returns A storage layout for the contract.
 */
function getStorageLayout(input) {
    const storage = input.outputs.globals.storage ? input.outputs.globals.storage[0] : { fields: [] };
    const storageFields = storage.fields;
    if (!storageFields) {
        return {};
    }
    return storageFields.reduce((acc, field) => {
        const name = field.name;
        const slot = field.value.fields[0].value;
        acc[name] = {
            slot: Fr.fromString(slot.value),
        };
        return acc;
    }, {});
}
/**
 * Generates records of the notes with note type ids of the artifact.
 * @param input - The compiled noir contract to get note types for
 * @return A record of the note types and their ids
 */
function getNoteTypes(input) {
    const notes = input.outputs.globals.notes;
    if (!notes) {
        return {};
    }
    return notes.reduce((acc, note) => {
        const name = note.fields[1].value;
        // Note id is encoded as a hex string
        const id = NoteSelector.fromField(Fr.fromString(note.fields[0].value));
        acc[name] = {
            id,
            typ: name,
        };
        return acc;
    }, {});
}
/**
 * Given a Nargo output generates an Aztec-compatible contract artifact.
 * @param compiled - Noir build output.
 * @returns Aztec contract build artifact.
 */
function generateContractArtifact(contract, aztecNrVersion) {
    return {
        name: contract.name,
        functions: contract.functions.map(f => generateFunctionArtifact(f, contract)),
        outputs: contract.outputs,
        storageLayout: getStorageLayout(contract),
        notes: getNoteTypes(contract),
        fileMap: contract.file_map,
        aztecNrVersion,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfYXJ0aWZhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYWJpL2NvbnRyYWN0X2FydGlmYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFRTCxZQUFZLEVBRVosWUFBWSxHQUdiLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTlDLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIseUJBQXlCLEVBQ3pCLG9CQUFvQixHQUVyQixNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXZEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBMEI7SUFDakUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN0QyxJQUNFLEdBQUcsS0FBSyxVQUFVO1lBQ2xCLEtBQUssS0FBSyxJQUFJO1lBQ2QsT0FBTyxLQUFLLEtBQUssUUFBUTtZQUN6QixLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQ3pCLENBQUM7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUMsRUFDRixPQUFPLENBQ1IsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE1BQWM7SUFDdkQsT0FBTyxJQUFJLENB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