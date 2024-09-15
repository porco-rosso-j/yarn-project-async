var _BufferReader_instances, _BufferReader_rangeCheck;
import { __classPrivateFieldGet } from "tslib";
/**
 * The BufferReader class provides a utility for reading various data types from a buffer.
 * It supports reading numbers, booleans, byte arrays, Fr and Fq field elements,
 * vectors, arrays, objects, strings, and maps. It maintains an internal index to
 * keep track of the current reading position in the buffer.
 *
 * Usage:
 * Create a new instance of BufferReader with a buffer and an optional offset.
 * Use the provided methods to read desired data types from the buffer.
 * The reading methods automatically advance the internal index.
 *
 * @example
 * const reader = new BufferReader(someBuffer);
 * const num = reader.readNumber();
 * const bool = reader.readBoolean();
 * const byteArray = reader.readBytes(4);
 */
export class BufferReader {
    constructor(buffer, offset = 0) {
        _BufferReader_instances.add(this);
        this.buffer = buffer;
        this.index = offset;
    }
    /**
     * Creates a BufferReader instance from either a Buffer or an existing BufferReader.
     * If the input is a Buffer, it creates a new BufferReader with the given buffer.
     * If the input is already a BufferReader, it returns the input unchanged.
     *
     * @param bufferOrReader - A Buffer or BufferReader to initialize the BufferReader.
     * @returns An instance of BufferReader.
     */
    static asReader(bufferOrReader) {
        if (bufferOrReader instanceof BufferReader) {
            return bufferOrReader;
        }
        const buf = Buffer.isBuffer(bufferOrReader)
            ? bufferOrReader
            : Buffer.from(bufferOrReader.buffer, bufferOrReader.byteOffset, bufferOrReader.byteLength);
        return new BufferReader(buf);
    }
    /** Returns true if the underlying buffer has been consumed completely. */
    isEmpty() {
        return this.index === this.buffer.length;
    }
    /**
     * Reads a 32-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 4 bytes after reading the number.
     *
     * @returns The read 32-bit unsigned integer value.
     */
    readNumber() {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, 4);
        this.index += 4;
        return this.buffer.readUint32BE(this.index - 4);
    }
    /**
     * Reads `count` 32-bit unsigned integers from the buffer at the current index position.
     * @param count - The number of 32-bit unsigned integers to read.
     * @returns An array of 32-bit unsigned integers.
     */
    readNumbers(count) {
        const result = Array.from({ length: count }, () => this.readNumber());
        return result;
    }
    /**
     * Reads a 16-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 2 bytes after reading the number.
     *
     * @returns The read 16 bit value.
     */
    readUInt16() {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, 2);
        this.index += 2;
        return this.buffer.readUInt16BE(this.index - 2);
    }
    /**
     * Reads a 8-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 1 byte after reading the number.
     *
     * @returns The read 8 bit value.
     */
    readUInt8() {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, 1);
        this.index += 1;
        return this.buffer.readUInt8(this.index - 1);
    }
    /**
     * Reads and returns the next boolean value from the buffer.
     * Advances the internal index by 1, treating the byte at the current index as a boolean value.
     * Returns true if the byte is non-zero, false otherwise.
     *
     * @returns A boolean value representing the byte at the current index.
     */
    readBoolean() {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, 1);
        this.index += 1;
        return Boolean(this.buffer.at(this.index - 1));
    }
    /**
     * Reads a specified number of bytes from the buffer and returns a new Buffer containing those bytes.
     * Advances the reader's index by the number of bytes read. Throws an error if there are not enough
     * bytes left in the buffer to satisfy the requested number of bytes.
     *
     * @param n - The number of bytes to read from the buffer.
     * @returns A new Buffer containing the read bytes.
     */
    readBytes(n) {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, n);
        this.index += n;
        return Buffer.from(this.buffer.subarray(this.index - n, this.index));
    }
    /** Reads until the end of the buffer. */
    readToEnd() {
        const result = this.buffer.subarray(this.index);
        this.index = this.buffer.length;
        return result;
    }
    /**
     * Reads a vector of numbers from the buffer and returns it as an array of numbers.
     * The method utilizes the 'readVector' method, passing a deserializer that reads numbers.
     *
     * @returns An array of numbers representing the vector read from the buffer.
     */
    readNumberVector() {
        return this.readVector({
            fromBuffer: (reader) => reader.readNumber(),
        });
    }
    /**
     * Reads a vector of fixed size from the buffer and deserializes its elements using the provided itemDeserializer object.
     * The 'itemDeserializer' object should have a 'fromBuffer' method that takes a BufferReader instance and returns the deserialized element.
     * The method first reads the size of the vector (a number) from the buffer, then iterates through its elements,
     * deserializing each one using the 'fromBuffer' method of 'itemDeserializer'.
     *
     * @param itemDeserializer - Object with 'fromBuffer' method to deserialize vector elements.
     * @returns An array of deserialized elements of type T.
     */
    readVector(itemDeserializer) {
        const size = this.readNumber();
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    /**
     * Reads a vector of fixed size from the buffer and deserializes its elements using the provided itemDeserializer object.
     * The 'itemDeserializer' object should have a 'fromBuffer' method that takes a BufferReader instance and returns the deserialized element.
     * The method first reads the size of the vector (a number) from the buffer, then iterates through its elements,
     * deserializing each one using the 'fromBuffer' method of 'itemDeserializer'.
     *
     * @param itemDeserializer - Object with 'fromBuffer' method to deserialize vector elements.
     * @returns An array of deserialized elements of type T.
     */
    readVectorUint8Prefix(itemDeserializer) {
        const size = this.readUInt8();
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    /**
     * Read an array of a fixed size with elements of type T from the buffer.
     * The 'itemDeserializer' object should have a 'fromBuffer' method that takes a BufferReader instance as input,
     * and returns an instance of the desired deserialized data type T.
     * This method will call the 'fromBuffer' method for each element in the array and return the resulting array.
     *
     * @param size - The fixed number of elements in the array.
     * @param itemDeserializer - An object with a 'fromBuffer' method to deserialize individual elements of type T.
     * @returns An array of instances of type T.
     */
    readArray(size, itemDeserializer) {
        const result = Array.from({ length: size }, () => itemDeserializer.fromBuffer(this));
        return result;
    }
    /**
     * Read a variable sized Buffer array where elements are represented by length + data.
     * The method consecutively looks for a number which is the size of the proceeding buffer,
     * then reads the bytes until it reaches the end of the reader's internal buffer.
     * NOTE: if `size` is not provided, this will run to the end of the reader's buffer.
     * @param size - Size of the buffer array in bytes (full remaining buffer length if left empty).
     * @returns An array of variable sized buffers.
     */
    readBufferArray(size = -1) {
        const result = [];
        const end = size >= 0 ? this.index + size : this.buffer.length;
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, end - this.index);
        while (this.index < end) {
            const item = this.readBuffer();
            result.push(item);
        }
        // Ensure that all bytes have been read.
        if (this.index !== end) {
            throw new Error(`Reader buffer was not fully consumed. Consumed up to ${this.index} bytes. End of data: ${end} bytes.`);
        }
        return result;
    }
    /**
     * Reads a serialized object from a buffer and returns the deserialized object using the given deserializer.
     *
     * @typeparam T - The type of the deserialized object.
     * @param deserializer - An object with a 'fromBuffer' method that takes a BufferReader instance and returns an instance of the deserialized object.
     * @returns The deserialized object of type T.
     */
    readObject(deserializer) {
        return deserializer.fromBuffer(this);
    }
    /**
     * Returns a Buffer containing the next n bytes from the current buffer without modifying the reader's index position.
     * If n is not provided or exceeds the remaining length of the buffer, it returns all bytes from the current position till the end of the buffer.
     *
     * @param n - The number of bytes to peek from the current buffer. (Optional).
     * @returns A Buffer with the next n bytes or the remaining bytes if n is not provided or exceeds the buffer length.
     */
    peekBytes(n) {
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, n || 0);
        return this.buffer.subarray(this.index, n ? this.index + n : undefined);
    }
    /**
     * Reads a string from the buffer and returns it.
     * The method first reads the size of the string, then reads the corresponding
     * number of bytes from the buffer and converts them to a string.
     *
     * @returns The read string from the buffer.
     */
    readString() {
        return this.readBuffer().toString();
    }
    /**
     * Reads a buffer from the current position of the reader and advances the index.
     * The method first reads the size (number) of bytes to be read, and then returns
     * a Buffer with that size containing the bytes. Useful for reading variable-length
     * binary data encoded as (size, data) format.
     *
     * @returns A Buffer containing the read bytes.
     */
    readBuffer() {
        const size = this.readNumber();
        __classPrivateFieldGet(this, _BufferReader_instances, "m", _BufferReader_rangeCheck).call(this, size);
        return this.readBytes(size);
    }
    /**
     * Reads and constructs a map object from the current buffer using the provided deserializer.
     * The method reads the number of entries in the map, followed by iterating through each key-value pair.
     * The key is read as a string, while the value is obtained using the passed deserializer's `fromBuffer` method.
     * The resulting map object is returned, containing all the key-value pairs read from the buffer.
     *
     * @param deserializer - An object with a `fromBuffer` method to deserialize the values in the map.
     * @returns A map object with string keys and deserialized values based on the provided deserializer.
     */
    readMap(deserializer) {
        const numEntries = this.readNumber();
        const map = {};
        for (let i = 0; i < numEntries; i++) {
            const key = this.readString();
            const value = this.readObject(deserializer);
            map[key] = value;
        }
        return map;
    }
    /**
     * Get the length of the reader's buffer.
     * @returns The length of the underlying reader's buffer.
     */
    getLength() {
        return this.buffer.length;
    }
}
_BufferReader_instances = new WeakSet(), _BufferReader_rangeCheck = function _BufferReader_rangeCheck(numBytes) {
    if (this.index + numBytes > this.buffer.length) {
        throw new Error(`Attempted to read beyond buffer length. Start index: ${this.index}, Num bytes to read: ${numBytes}, Buffer length: ${this.buffer.length}`);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyX3JlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvYnVmZmVyX3JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFFdkIsWUFBb0IsTUFBYyxFQUFFLE1BQU0sR0FBRyxDQUFDOztRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFrRDtRQUN2RSxJQUFJLGNBQWMsWUFBWSxZQUFZLEVBQUUsQ0FBQztZQUMzQyxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7WUFDekMsQ0FBQyxDQUFDLGNBQWM7WUFDaEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3RixPQUFPLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCwwRUFBMEU7SUFDbkUsT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFVO1FBQ2YsdUJBQUEsSUFBSSx5REFBWSxNQUFoQixJQUFJLEVBQWEsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFtQixLQUFRO1FBQzNDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdEUsT0FBTyxNQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFVBQVU7UUFDZix1QkFBQSxJQUFJLHlEQUFZLE1BQWhCLElBQUksRUFBYSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksU0FBUztRQUNkLHVCQUFBLElBQUkseURBQVksTUFBaEIsSUFBSSxFQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksV0FBVztRQUNoQix1QkFBQSxJQUFJLHlEQUFZLE1BQWhCLElBQUksRUFBYSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxTQUFTLENBQUMsQ0FBUztRQUN4Qix1QkFBQSxJQUFJLHlEQUFZLE1BQWhCLElBQUksRUFBYSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELHlDQUF5QztJQUNsQyxTQUFTO1FBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksZ0JBQWdCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQixVQUFVLEVBQUUsQ0FBQyxNQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1NBQzFELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLFVBQVUsQ0FBSSxnQkFLcEI7UUFDQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxDQUFDLENBQUM7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLHFCQUFxQixDQUFJLGdCQUsvQjtRQUNDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBSSxJQUFJLENBQUMsQ0FBQztRQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLFNBQVMsQ0FDZCxJQUFPLEVBQ1AsZ0JBS0M7UUFFRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sTUFBcUIsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDL0QsdUJBQUEsSUFBSSx5REFBWSxNQUFoQixJQUFJLEVBQWEsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUNELHdDQUF3QztRQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDYix3REFBd0QsSUFBSSxDQUFDLEtBQUssd0JBQXdCLEdBQUcsU0FBUyxDQUN2RyxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxVQUFVLENBQUksWUFLcEI7UUFDQyxPQUFPLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLFNBQVMsQ0FBQyxDQUFVO1FBQ3pCLHVCQUFBLElBQUkseURBQVksTUFBaEIsSUFBSSxFQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLFVBQVU7UUFDZixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0IsdUJBQUEsSUFBSSx5REFBWSxNQUFoQixJQUFJLEVBQWEsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLE9BQU8sQ0FBSSxZQUtqQjtRQUNDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEdBQUcsR0FBeUIsRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBSSxZQUFZLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7O09BR0c7SUFDSSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0NBU0Y7c0dBUGEsUUFBZ0I7SUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0RBQXdELElBQUksQ0FBQyxLQUFLLHdCQUF3QixRQUFRLG9CQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUMzSSxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMifQ==