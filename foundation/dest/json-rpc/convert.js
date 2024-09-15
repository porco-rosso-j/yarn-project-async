import { Buffer } from 'buffer';
import cloneDeepWith from 'lodash.clonedeepwith';
/**
 * Check prototype chain to determine if an object is 'plain' (not a class instance).
 * @param obj - The object to check.
 * @returns True if the object is 'plain'.
 */
function isPlainObject(obj) {
    if (obj === null) {
        return false;
    }
    let proto = obj;
    let counter = 0;
    const MAX_PROTOTYPE_CHAIN_LENGTH = 1000; // Adjust as needed
    while (Object.getPrototypeOf(proto) !== null) {
        if (counter >= MAX_PROTOTYPE_CHAIN_LENGTH) {
            // This is a failsafe in case circular prototype chain has been created. It should not be hit
            return false;
        }
        proto = Object.getPrototypeOf(proto);
        counter++;
    }
    return Object.getPrototypeOf(obj) === proto;
}
/**
 * Recursively looks through an object for bigints and converts them to object format.
 * @param obj - The object to convert.
 * @returns The converted object with stringified bigints.
 */
export const convertBigintsInObj = (obj) => {
    return cloneDeepWith(obj, (value) => {
        if (typeof value === 'bigint') {
            return { type: 'bigint', data: value.toString() };
        }
    });
};
/**
 * JSON.stringify helper that handles bigints.
 * @param obj - The object to be stringified.
 * @returns The resulting string.
 */
export function JsonStringify(obj, prettify) {
    return JSON.stringify(obj, (key, value) => typeof value === 'bigint'
        ? JSON.stringify({
            type: 'bigint',
            data: value.toString(),
        })
        : value, prettify ? 2 : 0);
}
/**
 * Convert a JSON-friendly object, which may encode a class object.
 * @param cc - The class converter.
 * @param obj - The encoded object.
 * @returns The decoded object.
 */
export function convertFromJsonObj(cc, obj) {
    if (obj === null) {
        return undefined; // `null` doesn't work with default args.
    }
    if (!obj) {
        return obj; // Primitive type
    }
    // Is this a serialized Node buffer?
    if (obj.type === 'Buffer' && typeof obj.data === 'string') {
        return Buffer.from(obj.data, 'base64');
    }
    if (obj.type === 'bigint' && typeof obj.data === 'string') {
        return BigInt(obj.data);
    }
    // Is this a convertible type?
    if (typeof obj.type === 'string') {
        if (cc.isRegisteredClassName(obj.type)) {
            return cc.toClassObj(obj);
        }
        else {
            throw new Error(`Object ${obj.type} not registered for serialization FROM JSON`);
        }
    }
    // Is this an array?
    if (Array.isArray(obj)) {
        return obj.map((x) => convertFromJsonObj(cc, x));
    }
    // Is this a dictionary?
    if (typeof obj === 'object') {
        const newObj = {};
        for (const key of Object.keys(obj)) {
            newObj[key] = convertFromJsonObj(cc, obj[key]);
        }
        return newObj;
    }
    // Leave alone, assume JSON primitive
    return obj;
}
/**
 * Convert objects or classes to a JSON-friendly object.
 * @param cc - The class converter.
 * @param obj - The object.
 * @returns The encoded object.
 */
export function convertToJsonObj(cc, obj) {
    // Bigint is a primitive type that needs special handling since it's not serializable
    if (typeof obj === 'bigint') {
        return {
            type: 'bigint',
            data: obj.toString(),
        };
    }
    if (!obj) {
        return obj; // Primitive type
    }
    // Is this a Node buffer?
    if (obj instanceof Buffer) {
        return { type: 'Buffer', data: obj.toString('base64') };
    }
    // Is this a convertible type?
    if (cc.isRegisteredClass(obj.constructor)) {
        return cc.toJsonObj(obj);
    }
    // Is this an array?
    if (Array.isArray(obj)) {
        return obj.map((x) => convertToJsonObj(cc, x));
    }
    if (typeof obj === 'object') {
        // Is this a dictionary?
        if (isPlainObject(obj)) {
            const newObj = {};
            for (const key of Object.keys(obj)) {
                newObj[key] = convertToJsonObj(cc, obj[key]);
            }
            return newObj;
        }
        else {
            // Throw if this is a non-primitive class that was not registered
            throw new Error(`Object ${obj.constructor.name} not registered for serialization TO JSON`);
        }
    }
    // Leave alone, assume JSON primitive
    return obj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qc29uLXJwYy9jb252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxhQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFJakQ7Ozs7R0FJRztBQUNILFNBQVMsYUFBYSxDQUFDLEdBQVE7SUFDN0IsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyxDQUFDLG1CQUFtQjtJQUM1RCxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDN0MsSUFBSSxPQUFPLElBQUksMEJBQTBCLEVBQUUsQ0FBQztZQUMxQyw2RkFBNkY7WUFDN0YsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDOUMsT0FBTyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxD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