import { Buffer } from 'buffer';
import { randomBytes } from '../crypto/index.js';
import { MemoryFifo } from '../fifo/index.js';
import { createDebugOnlyLogger } from '../log/index.js';
import { getEmptyWasiSdk } from './empty_wasi_sdk.js';
/**
 * WasmModule:
 *  Helper over a webassembly module.
 *  Assumes a few quirks.
 *  1) the module expects wasi_snapshot_preview1 with the methods from getEmptyWasiSdk
 *  2) of which the webassembly
 *  we instantiate only uses random_get (update this if more WASI sdk methods are needed).
 */
export class WasmModule {
    /**
     * Create a wasm module. Should be followed by await init();.
     * @param module - The module as a WebAssembly.Module or a Buffer.
     * @param importFn - Imports expected by the WASM.
     * @param loggerName - Optional, for debug logging.
     */
    constructor(module, importFn, loggerName = 'aztec:wasm') {
        this.module = module;
        this.importFn = importFn;
        this.mutexQ = new MemoryFifo();
        this.debug = createDebugOnlyLogger(loggerName);
        this.mutexQ.put(true);
    }
    /**
     * Return the wasm source.
     * @returns The source.
     */
    getModule() {
        return this.module;
    }
    /**
     * Initialize this wasm module.
     * @param wasmImportEnv - Linked to a module called "env". Functions implementations referenced from e.g. C++.
     * @param initial - 30 pages by default. 30*2**16 \> 1mb stack size plus other overheads.
     * @param initMethod - Defaults to calling '_initialize'.
     * @param maximum - 8192 maximum by default. 512mb.
     */
    async init(initial = 30, maximum = 8192, initMethod = '_initialize') {
        this.debug(`initial mem: ${initial} pages, ${(initial * 2 ** 16) / (1024 * 1024)}mb. max mem: ${maximum} pages, ${(maximum * 2 ** 16) / (1024 * 1024)}mb`);
        this.memory = new WebAssembly.Memory({ initial, maximum });
        // Create a view over the memory buffer.
        // We do this once here, as webkit *seems* bugged out and actually shows this as new memory,
        // thus displaying double. It's only worse if we create views on demand. I haven't established yet if
        // the bug is also exasperating the termination on mobile due to "excessive memory usage". It could be
        // that the OS is actually getting an incorrect reading in the same way the memory profiler does...
        // The view will have to be recreated if the memory is grown. See getMemory().
        this.heap = new Uint8Array(this.memory.buffer);
        // We support the wasi 12 SDK, but only implement random_get
        /* eslint-disable camelcase */
        const importObj = {
            wasi_snapshot_preview1: {
                ...getEmptyWasiSdk(this.debug),
                random_get: (arr, length) => {
                    arr = arr >>> 0;
                    const heap = this.getMemory();
                    const randomData = randomBytes(length);
                    for (let i = arr; i < arr + length; ++i) {
                        heap[i] = randomData[i - arr];
                    }
                },
            },
            env: this.importFn(this),
        };
        if (this.module instanceof WebAssembly.Module) {
            this.instance = await WebAssembly.instantiate(this.module, importObj);
        }
        else {
            const { instance } = await WebAssembly.instantiate(this.module, importObj);
            this.instance = instance;
        }
        // Init all global/static data.
        if (initMethod) {
            this.call(initMethod);
        }
    }
    /**
     * The methods or objects exported by the WASM module.
     * @returns An indexable object.
     */
    exports() {
        if (!this.instance) {
            throw new Error('WasmModule: not initialized!');
        }
        return this.instance.exports;
    }
    /**
     * Get the current logger.
     * @returns Logging function.
     */
    getLogger() {
        return this.debug;
    }
    /**
     * Add a logger.
     * @param logger - Function to call when logging.
     */
    addLogger(logger) {
        const oldDebug = this.debug;
        this.debug = (msg) => {
            logger(msg);
            oldDebug(msg);
        };
    }
    /**
     * Calls into the WebAssembly.
     * @param name - The method name.
     * @param args - The arguments to the method.
     * @returns The numeric method result.
     */
    call(name, ...args) {
        if (!this.exports()[name]) {
            throw new Error(`WASM function ${name} not found.`);
        }
        try {
            // When returning values from the WASM, use >>> operator to convert
            // signed representation to unsigned representation.
            return this.exports()[name](...args) >>> 0;
        }
        catch (err) {
            const message = `WASM function ${name} aborted, error: ${err}\n${err.stack}`;
            throw new Error(message);
        }
    }
    /**
     * Get the memory used by the WASM module.
     * @returns A WebAssembly memory object.
     */
    getRawMemory() {
        return this.memory;
    }
    /**
     * Get the memory used by the WASM module, as a byte array.
     * @returns A Uint8Array view of the WASM module memory.
     */
    getMemory() {
        // If the memory is grown, our view over it will be lost. Recreate the view.
        if (this.heap.length === 0) {
            this.heap = new Uint8Array(this.memory.buffer);
        }
        return this.heap;
    }
    /**
     * The memory size in bytes.
     * @returns Number of bytes.
     */
    memSize() {
        return this.getMemory().length;
    }
    /**
     * Get a slice of memory between two addresses.
     * @param start - The start address.
     * @param end - The end address.
     * @returns A Uint8Array view of memory.
     */
    getMemorySlice(start, end) {
        return this.getMemory().slice(start, end);
    }
    /**
     * Write data into the heap.
     * @param offset - The address to write data at.
     * @param arr - The data to write.
     */
    writeMemory(offset, arr) {
        const mem = this.getMemory();
        for (let i = 0; i < arr.length; i++) {
            mem[i + offset] = arr[i];
        }
    }
    /**
     * Read WASM memory as a JS string.
     * @param addr - The memory address.
     * @returns A JS string.
     */
    getMemoryAsString(addr) {
        addr = addr >>> 0;
        const m = this.getMemory();
        let i = addr;
        while (m[i] !== 0) {
            ++i;
        }
        return Buffer.from(m.slice(addr, i)).toString('ascii');
    }
    /**
     * When calling the wasm, sometimes a caller will require exclusive access over a series of calls.
     * E.g. When a result is written to address 0, one cannot have another caller writing to the same address via
     * writeMemory before the result is read via sliceMemory.
     * Acquire() gets a single token from a fifo. The caller must call release() to add the token back.
     */
    async acquire() {
        await this.mutexQ.get();
    }
    /**
     * Release the mutex, letting another promise call acquire().
     */
    release() {
        if (this.mutexQ.length() !== 0) {
            throw new Error('Release called but not acquired.');
        }
        this.mutexQ.put(true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FzbV9tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd2FzbS93YXNtX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFjLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBZ0N0RDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFPckI7Ozs7O09BS0c7SUFDSCxZQUNVLE1BQW1DLEVBQ25DLFFBQXFDLEVBQzdDLFVBQVUsR0FBRyxZQUFZO1FBRmpCLFdBQU0sR0FBTixNQUFNLENBQTZCO1FBQ25DLGFBQVEsR0FBUixRQUFRLENBQTZCO1FBWHZDLFdBQU0sR0FBRyxJQUFJLFVBQVUsRUFBVyxDQUFDO1FBY3pDLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFLGFBQTRCLGFBQWE7UUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FDUixnQkFBZ0IsT0FBTyxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENB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