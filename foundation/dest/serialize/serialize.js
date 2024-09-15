import { toBigIntBE, toBufferBE } from '../bigint-buffer/index.js';
import { Fr } from '../fields/fields.js';
import { numToUInt32BE } from './free_funcs.js';
/**
 * For serializing an array of fixed length buffers.
 * @param arr - Array of bufferable.
 * @param prefixLength - The length of the prefix (denominated in bytes).
 * @returns The serialized buffers.
 */
export function serializeArrayOfBufferableToVector(objs, prefixLength = 4) {
    const arr = serializeToBufferArray(objs);
    let lengthBuf;
    if (prefixLength === 1) {
        lengthBuf = Buffer.alloc(1);
        lengthBuf.writeUInt8(arr.length, 0);
    }
    else if (prefixLength === 4) {
        lengthBuf = Buffer.alloc(4);
        lengthBuf.writeUInt32BE(arr.length, 0);
    }
    else {
        throw new Error(`Unsupported prefix length. Got ${prefixLength}, expected 1 or 4`);
    }
    return Buffer.concat([lengthBuf, ...arr]);
}
/**
 * Deserializes an array from a vector on an element-by-element basis.
 * @param deserialize - A function used to deserialize each element of the vector.
 * @param vector - The vector to deserialize.
 * @param offset - The position in the vector to start deserializing from.
 * @returns Deserialized array and how many bytes we advanced by.
 */
export function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = vector.readUInt32BE(pos);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
/**
 * Cast a uint8 array to a number.
 * @param array - The uint8 array.
 * @returns The number.
 */
export function uint8ArrayToNum(array) {
    const buf = Buffer.from(array);
    return buf.readUint32LE();
}
/**
 * Serializes a boolean to a buffer.
 * @param value - Value to serialize.
 * @returns The serialized boolean.
 */
export function boolToBuffer(value, bufferSize = 1) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt8(value ? 1 : 0, bufferSize - 1);
    return buf;
}
/**
 * Deserialize the 256-bit number at address `offset`.
 * @param buf - The buffer.
 * @param offset - The address.
 * @returns The deserialized 256-bit field.
 */
export function deserializeField(buf, offset = 0) {
    const adv = 32;
    return { elem: buf.slice(offset, offset + adv), adv };
}
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns A buffer list with the concatenation of all fields.
 */
export function serializeToBufferArray(...objs) {
    const ret = [];
    for (const obj of objs) {
        if (Array.isArray(obj)) {
            ret.push(...serializeToBufferArray(...obj));
        }
        else if (Buffer.isBuffer(obj)) {
            ret.push(obj);
        }
        else if (typeof obj === 'boolean') {
            ret.push(boolToBuffer(obj));
        }
        else if (typeof obj === 'bigint') {
            // Throw if bigint does not fit into 32 bytes
            if (obj > BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')) {
                throw new Error(`BigInt ${obj} does not fit into 32 bytes`);
            }
            ret.push(serializeBigInt(obj));
        }
        else if (typeof obj === 'number') {
            // Note: barretenberg assumes everything is big-endian
            ret.push(numToUInt32BE(obj)); // TODO: Are we always passing numbers as UInt32?
        }
        else if (typeof obj === 'string') {
            ret.push(numToUInt32BE(obj.length));
            ret.push(Buffer.from(obj));
        }
        else if ('toBuffer' in obj) {
            ret.push(obj.toBuffer());
        }
        else {
            throw new Error(`Cannot serialize input to buffer: ${typeof obj} ${obj.constructor?.name}`);
        }
    }
    return ret;
}
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns An array of fields with the concatenation of all fields.
 */
export function serializeToFields(...objs) {
    const ret = [];
    for (const obj of objs) {
        if (Array.isArray(obj)) {
            ret.push(...serializeToFields(...obj));
        }
        else if (obj instanceof Fr) {
            ret.push(obj);
        }
        else if (typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'bigint') {
            ret.push(new Fr(obj));
        }
        else if ('toFields' in obj) {
            ret.push(...obj.toFields());
        }
        else if ('toFr' in obj) {
            ret.push(obj.toFr());
        }
        else if ('toField' in obj) {
            ret.push(obj.toField());
        }
        else if (Buffer.isBuffer(obj)) {
            ret.push(Fr.fromBuffer(obj));
        }
        else {
            throw new Error(`Cannot serialize input to field: ${typeof obj} ${obj.constructor?.name}`);
        }
    }
    return ret;
}
/**
 * Serializes a list of objects contiguously.
 * @param objs - Objects to serialize.
 * @returns A single buffer with the concatenation of all fields.
 */
export function serializeToBuffer(...objs) {
    return Buffer.concat(serializeToBufferArray(...objs));
}
/**
 * Returns a user-friendly JSON representation of an object, showing buffers as hex strings.
 * @param obj - Object to json-stringify.
 * @returns A JSON string.
 */
export function toFriendlyJSON(obj) {
    return JSON.stringify(obj, (key, value) => {
        if (value !== null && typeof value === 'object' && value.type === 'Buffer' && Array.isArray(value.data)) {
            return '0x' + Buffer.from(value.data).toString('hex');
        }
        else if (typeof value === 'bigint') {
            return value.toString();
        }
        else if (value &&
            value.toFriendlyJSON) {
            return value.toFriendlyJSON();
        }
        else if (value && value.type && ['Fr', 'Fq', 'AztecAddress'].includes(value.type)) {
            return value.value;
        }
        else {
            return value;
        }
    }, 2);
}
/**
 * Serialize a BigInt value into a Buffer of specified width.
 * The function converts the input BigInt into its big-endian representation and stores it in a Buffer of the given width.
 * If the width is not provided, a default value of 32 bytes will be used. It is important to provide an appropriate width
 * to avoid truncation or incorrect serialization of large BigInt values.
 *
 * @param n - The BigInt value to be serialized.
 * @param width - The width (in bytes) of the output Buffer, optional with default value 32.
 * @returns A Buffer containing the serialized BigInt value in big-endian format.
 */
export function serializeBigInt(n, width = 32) {
    return toBufferBE(n, width);
}
/**
 * Deserialize a big integer from a buffer, given an offset and width.
 * Reads the specified number of bytes from the buffer starting at the offset, converts it to a big integer, and returns the deserialized result along with the number of bytes read (advanced).
 *
 * @param buf - The buffer containing the big integer to be deserialized.
 * @param offset - The position in the buffer where the big integer starts. Defaults to 0.
 * @param width - The number of bytes to read from the buffer for the big integer. Defaults to 32.
 * @returns An object containing the deserialized big integer value ('elem') and the number of bytes advanced ('adv').
 */
export function deserializeBigInt(buf, offset = 0, width = 32) {
    return { elem: toBigIntBE(buf.subarray(offset, offset + width)), adv: width };
}
/**
 * Serializes a Date object into a Buffer containing its timestamp as a big integer value.
 * The resulting Buffer has a fixed width of 8 bytes, representing a 64-bit big-endian integer.
 * This function is useful for converting date values into a binary format that can be stored or transmitted easily.
 *
 * @param date - The Date object to be serialized.
 * @returns A Buffer containing the serialized timestamp of the input Date object.
 */
export function serializeDate(date) {
    return serializeBigInt(BigInt(date.getTime()), 8);
}
/**
 * Deserialize a boolean value from a given buffer at the specified offset.
 * Reads a single byte at the provided offset in the buffer and returns
 * the deserialized boolean value along with the number of bytes read (adv).
 *
 * @param buf - The buffer containing the serialized boolean value.
 * @param offset - The position in the buffer to start reading the boolean value.
 * @returns An object containing the deserialized boolean value (elem) and the number of bytes read (adv).
 */
export function deserializeBool(buf, offset = 0) {
    const adv = 1;
    return { elem: buf.readUInt8(offset), adv };
}
/**
 * Deserialize a 4-byte unsigned integer from a buffer, starting at the specified offset.
 * The deserialization reads 4 bytes from the given buffer and converts it into a number.
 * Returns an object containing the deserialized unsigned integer and the number of bytes advanced (4).
 *
 * @param buf - The buffer containing the serialized unsigned integer.
 * @param offset - The starting position in the buffer to deserialize from (default is 0).
 * @returns An object with the deserialized unsigned integer as 'elem' and the number of bytes advanced ('adv') as 4.
 */
export function deserializeUInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readUInt32BE(offset), adv };
}
/**
 * Deserialize a signed 32-bit integer from a buffer at the given offset.
 * The input 'buf' should be a Buffer containing binary data, and 'offset' should be the position in the buffer
 * where the signed 32-bit integer starts. Returns an object with both the deserialized integer (elem) and the
 * number of bytes advanced in the buffer (adv, always equal to 4).
 *
 * @param buf - The buffer containing the binary data.
 * @param offset - Optional, the position in the buffer where the signed 32-bit integer starts (default is 0).
 * @returns An object with the deserialized integer as 'elem' and the number of bytes advanced as 'adv'.
 */
export function deserializeInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readInt32BE(offset), adv };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZS9zZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLElBQWtCLEVBQUUsWUFBWSxHQUFHLENBQUM7SUFDckYsTUFBTSxHQUFHLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsSUFBSSxTQUFpQixDQUFDO0lBQ3RCLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO1NBQU0sSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsWUFBWSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFtQkQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFV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