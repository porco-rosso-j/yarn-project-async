import nodeCrypto from 'crypto';
import isNode from 'detect-node';
import { RandomnessSingleton } from './randomness_singleton.js';
// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536;
const getWebCrypto = () => {
    if (typeof window !== 'undefined' && window.crypto) {
        return window.crypto;
    }
    if (typeof self !== 'undefined' && self.crypto) {
        return self.crypto;
    }
    return undefined;
};
export const randomBytes = (len) => {
    const singleton = RandomnessSingleton.getInstance();
    if (singleton.isDeterministic()) {
        return singleton.getBytes(len);
    }
    if (isNode) {
        return nodeCrypto.randomBytes(len);
    }
    const crypto = getWebCrypto();
    if (!crypto) {
        throw new Error('randomBytes UnsupportedEnvironment');
    }
    const buf = Buffer.allocUnsafe(len);
    if (len > MAX_BYTES) {
        // this is the max bytes crypto.getRandomValues
        // can do at once see https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
        for (let generated = 0; generated < len; generated += MAX_BYTES) {
            // buffer.slice automatically checks if the end is past the end of
            // the buffer so we don't have to here
            crypto.getRandomValues(buf.slice(generated, generated + MAX_BYTES));
        }
    }
    else {
        crypto.getRandomValues(buf);
    }
    return buf;
};
/**
 * Generate a random integer less than max.
 * @param max - The maximum value.
 * @returns A random integer.
 *
 * TODO(#3949): This is insecure as it's modulo biased. Nuke or safeguard before mainnet.
 */
export const randomInt = (max) => {
    const randomBuffer = randomBytes(6); // Generate a buffer of 6 random bytes.
    const randomInt = parseInt(randomBuffer.toString('hex'), 16); // Convert buffer to a large integer.
    return randomInt % max; // Use modulo to ensure the result is less than max.
};
/**
 * Generate a random bigint less than max.
 * @param max - The maximum value.
 * @returns A random bigint.
 *
 * TODO(#3949): This is insecure as it's modulo biased. Nuke or safeguard before mainnet.
 */
export const randomBigInt = (max) => {
    const randomBuffer = randomBytes(8); // Generate a buffer of 8 random bytes.
    const randomBigInt = BigInt(`0x${randomBuffer.toString('hex')}`); // Convert buffer to a large integer.
    return randomBigInt % max; // Use modulo to ensure the result is less than max.
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3JhbmRvbS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLG9DQUFvQztBQUNwQywwRUFBMEU7QUFDMUUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBRXhCLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUN4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUN6QyxNQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUVwRCxJQUFJLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNYLE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQVcsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLCtDQUErQztRQUMvQyxvR0FBb0c7UUFDcEcsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDaEUsa0VBQWtFO1lBQ2xFLHNDQUFzQztZQUN0QyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDdkMsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO0lBQzVFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMscUNBQXFDO0lBQ25HLE9BQU8sU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLG9EQUFvRDtBQUM5RSxDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUMxQyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7SUFDNUUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUM7SUFDdkcsT0FBTyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsb0RBQW9EO0FBQ2pGLENBQUMsQ0FBQyJ9