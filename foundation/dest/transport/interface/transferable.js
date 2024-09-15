const $transferable = Symbol('thread.transferable');
/**
 * Determines if the provided object is transferable.
 * Transferable objects are instances of a certain set of classes,
 * such as ArrayBuffer or MessagePort, which can be transferred between
 * different execution contexts (e.g., workers) without incurring the
 * overhead of serialization and deserialization.
 *
 * This function checks for the basic transferable criteria, but does not
 * perform an exhaustive check for all possible transferable types. As new
 * transferable types are added to JavaScript, they may be supported without
 * needing to modify this function.
 *
 * @param thing - The object to check for transferability.
 * @returns A boolean indicating whether the object is transferable.
 */
function isTransferable(thing) {
    if (!thing || typeof thing !== 'object') {
        return false;
    }
    // Don't check too thoroughly, since the list of transferable things in JS might grow over time
    return true;
}
/**
 * Determines whether a given object is a TransferDescriptor.
 * A TransferDescriptor is an object with a [$transferable] property set to true and used for
 * transferring ownership of transferable objects between threads.
 * This function checks if the input object has the required properties to be considered
 * a valid TransferDescriptor.
 *
 * @param thing - The object to be checked for being a TransferDescriptor.
 * @returns True if the object is a TransferDescriptor, false otherwise.
 */
export function isTransferDescriptor(thing) {
    return thing && typeof thing === 'object' && thing[$transferable];
}
/**
 * Create a TransferDescriptor for transferable objects within an arbitrary object or array, allowing
 * them to be transferred between threads instead of being serialized and deserialized.
 * This method is particularly useful when working with Web Workers and other multi-threaded environments.
 * Transferable objects include ArrayBuffers, MessagePorts, and a few other special types.
 * Note that after transferring, the original thread will lose access to the transferred object unless
 * it's transferred back again.
 *
 * @param payload - The transferable object or an object containing transferable properties.
 * @param transferables - Optional array of Transferable objects found in the payload. If not provided,
 *                        the payload itself should be a Transferable object.
 * @returns A TransferDescriptor<T> containing the payload and transferables, marked as transferable.
 * @throws Error if payload is not transferable and transferables array is not provided.
 * @see https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
 */
export function Transfer(payload, transferables) {
    if (!transferables) {
        if (!isTransferable(payload)) {
            throw Error();
        }
        transferables = [payload];
    }
    return {
        [$transferable]: true,
        send: payload,
        transferables,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydC9pbnRlcmZhY2UvdHJhbnNmZXJhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBc0JwRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQVMsY0FBYyxDQUFDLEtBQVU7SUFDaEMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCwrRkFBK0Y7SUFDL0YsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQVU7SUFDN0MsT0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBdUNEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBSSxPQUFVLEVBQUUsYUFBOEI7SUFDcEUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLEtBQUssRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxhQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTztRQUNMLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSTtRQUNyQixJQUFJLEVBQUUsT0FBTztRQUNiLGFBQWE7S0FDZCxDQUFDO0FBQ0osQ0FBQyJ9