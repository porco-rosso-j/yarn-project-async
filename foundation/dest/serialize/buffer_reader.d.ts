import { type Tuple } from './types.js';
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
export declare class BufferReader {
    #private;
    private buffer;
    private index;
    constructor(buffer: Buffer, offset?: number);
    /**
     * Creates a BufferReader instance from either a Buffer or an existing BufferReader.
     * If the input is a Buffer, it creates a new BufferReader with the given buffer.
     * If the input is already a BufferReader, it returns the input unchanged.
     *
     * @param bufferOrReader - A Buffer or BufferReader to initialize the BufferReader.
     * @returns An instance of BufferReader.
     */
    static asReader(bufferOrReader: Uint8Array | Buffer | BufferReader): BufferReader;
    /** Returns true if the underlying buffer has been consumed completely. */
    isEmpty(): boolean;
    /**
     * Reads a 32-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 4 bytes after reading the number.
     *
     * @returns The read 32-bit unsigned integer value.
     */
    readNumber(): number;
    /**
     * Reads `count` 32-bit unsigned integers from the buffer at the current index position.
     * @param count - The number of 32-bit unsigned integers to read.
     * @returns An array of 32-bit unsigned integers.
     */
    readNumbers<N extends number>(count: N): Tuple<number, N>;
    /**
     * Reads a 16-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 2 bytes after reading the number.
     *
     * @returns The read 16 bit value.
     */
    readUInt16(): number;
    /**
     * Reads a 8-bit unsigned integer from the buffer at the current index position.
     * Updates the index position by 1 byte after reading the number.
     *
     * @returns The read 8 bit value.
     */
    readUInt8(): number;
    /**
     * Reads and returns the next boolean value from the buffer.
     * Advances the internal index by 1, treating the byte at the current index as a boolean value.
     * Returns true if the byte is non-zero, false otherwise.
     *
     * @returns A boolean value representing the byte at the current index.
     */
    readBoolean(): boolean;
    /**
     * Reads a specified number of bytes from the buffer and returns a new Buffer containing those bytes.
     * Advances the reader's index by the number of bytes read. Throws an error if there are not enough
     * bytes left in the buffer to satisfy the requested number of bytes.
     *
     * @param n - The number of bytes to read from the buffer.
     * @returns A new Buffer containing the read bytes.
     */
    readBytes(n: number): Buffer;
    /** Reads until the end of the buffer. */
    readToEnd(): Buffer;
    /**
     * Reads a vector of numbers from the buffer and returns it as an array of numbers.
     * The method utilizes the 'readVector' method, passing a deserializer that reads numbers.
     *
     * @returns An array of numbers representing the vector read from the buffer.
     */
    readNumberVector(): number[];
    /**
     * Reads a vector of fixed size from the buffer and deserializes its elements using the provided itemDeserializer object.
     * The 'itemDeserializer' object should have a 'fromBuffer' method that takes a BufferReader instance and returns the deserialized element.
     * The method first reads the size of the vector (a number) from the buffer, then iterates through its elements,
     * deserializing each one using the 'fromBuffer' method of 'itemDeserializer'.
     *
     * @param itemDeserializer - Object with 'fromBuffer' method to deserialize vector elements.
     * @returns An array of deserialized elements of type T.
     */
    readVector<T>(itemDeserializer: {
        /**
         * A method to deserialize data from a buffer.
         */
        fromBuffer: (reader: BufferReader) => T;
    }): T[];
    /**
     * Reads a vector of fixed size from the buffer and deserializes its elements using the provided itemDeserializer object.
     * The 'itemDeserializer' object should have a 'fromBuffer' method that takes a BufferReader instance and returns the deserialized element.
     * The method first reads the size of the vector (a number) from the buffer, then iterates through its elements,
     * deserializing each one using the 'fromBuffer' method of 'itemDeserializer'.
     *
     * @param itemDeserializer - Object with 'fromBuffer' method to deserialize vector elements.
     * @returns An array of deserialized elements of type T.
     */
    readVectorUint8Prefix<T>(itemDeserializer: {
        /**
         * A method to deserialize data from a buffer.
         */
        fromBuffer: (reader: BufferReader) => T;
    }): T[];
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
    readArray<T, N extends number>(size: N, itemDeserializer: {
        /**
         * A function for deserializing data from a BufferReader instance.
         */
        fromBuffer: (reader: BufferReader) => T;
    }): Tuple<T, N>;
    /**
     * Read a variable sized Buffer array where elements are represented by length + data.
     * The method consecutively looks for a number which is the size of the proceeding buffer,
     * then reads the bytes until it reaches the end of the reader's internal buffer.
     * NOTE: if `size` is not provided, this will run to the end of the reader's buffer.
     * @param size - Size of the buffer array in bytes (full remaining buffer length if left empty).
     * @returns An array of variable sized buffers.
     */
    readBufferArray(size?: number): Buffer[];
    /**
     * Reads a serialized object from a buffer and returns the deserialized object using the given deserializer.
     *
     * @typeparam T - The type of the deserialized object.
     * @param deserializer - An object with a 'fromBuffer' method that takes a BufferReader instance and returns an instance of the deserialized object.
     * @returns The deserialized object of type T.
     */
    readObject<T>(deserializer: {
        /**
         * A method that takes a BufferReader instance and returns an instance of the deserialized data type.
         */
        fromBuffer: (reader: BufferReader) => T;
    }): T;
    /**
     * Returns a Buffer containing the next n bytes from the current buffer without modifying the reader's index position.
     * If n is not provided or exceeds the remaining length of the buffer, it returns all bytes from the current position till the end of the buffer.
     *
     * @param n - The number of bytes to peek from the current buffer. (Optional).
     * @returns A Buffer with the next n bytes or the remaining bytes if n is not provided or exceeds the buffer length.
     */
    peekBytes(n?: number): Buffer;
    /**
     * Reads a string from the buffer and returns it.
     * The method first reads the size of the string, then reads the corresponding
     * number of bytes from the buffer and converts them to a string.
     *
     * @returns The read string from the buffer.
     */
    readString(): string;
    /**
     * Reads a buffer from the current position of the reader and advances the index.
     * The method first reads the size (number) of bytes to be read, and then returns
     * a Buffer with that size containing the bytes. Useful for reading variable-length
     * binary data encoded as (size, data) format.
     *
     * @returns A Buffer containing the read bytes.
     */
    readBuffer(): Buffer;
    /**
     * Reads and constructs a map object from the current buffer using the provided deserializer.
     * The method reads the number of entries in the map, followed by iterating through each key-value pair.
     * The key is read as a string, while the value is obtained using the passed deserializer's `fromBuffer` method.
     * The resulting map object is returned, containing all the key-value pairs read from the buffer.
     *
     * @param deserializer - An object with a `fromBuffer` method to deserialize the values in the map.
     * @returns A map object with string keys and deserialized values based on the provided deserializer.
     */
    readMap<T>(deserializer: {
        /**
         * Deserializes an element of type T from a BufferReader instance.
         */
        fromBuffer: (reader: BufferReader) => T;
    }): {
        [key: string]: T;
    };
    /**
     * Get the length of the reader's buffer.
     * @returns The length of the underlying reader's buffer.
     */
    getLength(): number;
}
/**
 * A deserializer
 */
export interface FromBuffer<T> {
    /**
     * Deserializes an object from a buffer
     * @param buffer - The buffer to deserialize.
     */
    fromBuffer(buffer: Buffer): T;
}
//# sourceMappingURL=buffer_reader.d.ts.map