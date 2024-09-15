import { inspect } from 'util';
import { Fr } from '../fields/index.js';
/** A selector is the first 4 bytes of the hash of a signature. */
export declare abstract class Selector {
    value: number;
    /** The size of the selector in bytes. */
    static SIZE: number;
    constructor(/** Value of the selector */ value: number);
    /**
     * Checks if the selector is empty (all bytes are 0).
     * @returns True if the selector is empty (all bytes are 0).
     */
    isEmpty(): boolean;
    /**
     * Serialize as a buffer.
     * @param bufferSize - The buffer size.
     * @returns The buffer.
     */
    toBuffer(bufferSize?: number): Buffer;
    /**
     * Serialize as a hex string.
     * @returns The string.
     */
    toString(): string;
    [inspect.custom](): string;
    /**
     * Checks if this selector is equal to another.
     * @param other - The other selector.
     * @returns True if the selectors are equal.
     */
    equals(other: Selector): boolean;
    /**
     * Returns a new field with the same contents as this EthAddress.
     *
     * @returns An Fr instance.
     */
    toField(): Fr;
}
//# sourceMappingURL=selector.d.ts.map