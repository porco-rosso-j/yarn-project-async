import { FunctionSelector } from '@aztec/foundation/abi';
import { BufferReader, numToInt32BE, serializeArrayOfBufferableToVector, serializeToBuffer, } from '@aztec/foundation/serialize';
import { FUNCTION_SELECTOR_NUM_BYTES } from '../constants.gen.js';
/**
 * Packs together a set of public functions for a contract class.
 * @remarks This function should no longer be necessary once we have a single bytecode per contract.
 */
export function packBytecode(publicFns) {
    return serializeArrayOfBufferableToVector(publicFns.map(fn => serializeToBuffer(fn.selector, numToInt32BE(fn.bytecode.length), fn.bytecode)));
}
/**
 * Unpacks a set of public functions for a contract class from packed bytecode.
 * @remarks This function should no longer be necessary once we have a single bytecode per contract.
 */
export function unpackBytecode(buffer) {
    const reader = BufferReader.asReader(buffer);
    return reader.readVector({
        fromBuffer: (reader) => ({
            selector: FunctionSelector.fromBuffer(reader.readBytes(FUNCTION_SELECTOR_NUM_BYTES)),
            bytecode: reader.readBuffer(),
        }),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2J5dGVjb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0L3B1YmxpY19ieXRlY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsWUFBWSxFQUNaLFlBQVksRUFDWixrQ0FBa0MsRUFDbEMsaUJBQWlCLEdBQ2xCLE1BQU0sNkJBQTZCLENBQUM7QUFHckMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbEU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxTQUEyQztJQUN0RSxPQUFPLGtDQUFrQyxDQUN2QyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDbkcsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkIsVUFBVSxFQUFFLENBQUMsTUFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNwRixRQUFRLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRTtTQUM5QixDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9