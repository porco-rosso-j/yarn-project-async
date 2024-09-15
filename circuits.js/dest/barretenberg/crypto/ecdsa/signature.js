import { toBufferBE } from '@aztec/foundation/bigint-buffer';
import { randomBytes } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { mapTuple } from '@aztec/foundation/serialize';
/**
 * ECDSA signature used for transactions.
 * @see cpp/barretenberg/cpp/src/barretenberg/crypto/ecdsa/ecdsa.hpp
 */
export class EcdsaSignature {
    constructor(
    /**
     * The r byte-array (32 bytes) in an ECDSA signature.
     */
    r, 
    /**
     * The s byte-array (32 bytes) in an ECDSA signature.
     */
    s, 
    /**
     * The recovery id (1 byte) in an ECDSA signature.
     */
    v) {
        this.r = r;
        this.s = s;
        this.v = v;
        if (r.length != 32) {
            throw new Error(`Invalid length of 'r' in ECDSA signature`);
        }
        if (s.length != 32) {
            throw new Error(`Invalid length of 's' in ECDSA signature`);
        }
        if (v.length != 1) {
            throw new Error(`Invalid length of '1' in ECDSA signature`);
        }
    }
    /**
     * Converts an ECDSA signature to a buffer.
     * @returns A buffer.
     */
    toBuffer() {
        return Buffer.concat([this.r, this.s, this.v]);
    }
    /**
     * Deserializes the signature from a buffer.
     * @param buffer - The buffer from which to deserialize the signature.
     * @returns The ECDSA signature
     */
    static fromBuffer(buffer) {
        return new EcdsaSignature(buffer.subarray(0, 32), buffer.subarray(32, 64), buffer.subarray(64, 65));
    }
    /**
     * Creates a new instance from bigint r and s values.
     * @param r - r.
     * @param s - s.
     * @param v - v.
     * @returns The resulting signature.
     */
    static fromBigInts(r, s, v) {
        return new EcdsaSignature(toBufferBE(r, 32), toBufferBE(s, 32), Buffer.from([v]));
    }
    /**
     * Generate a random ECDSA signature for testing.
     * @returns A randomly generated ECDSA signature (not a valid one).
     */
    static random() {
        return new EcdsaSignature(randomBytes(32), randomBytes(32), Buffer.from([27]));
    }
    /**
     * Convert an ECDSA signature to a buffer.
     * @returns A 65-character string of the form 0x<r><s><v>.
     */
    toString() {
        return `0x${this.toBuffer().toString('hex')}`;
    }
    /**
     * Converts the signature to an array of fields.
     * @param includeV - Determines whether the 'v' term is included
     * @returns The signature components as an array of fields
     */
    toFields(includeV = false) {
        const sig = this.toBuffer();
        const buf1 = Buffer.alloc(32);
        const buf2 = Buffer.alloc(32);
        const buf3 = Buffer.alloc(32);
        sig.copy(buf1, 1, 0, 31);
        sig.copy(buf2, 1, 31, 62);
        sig.copy(buf3, 1, 62, includeV ? 65 : 64);
        return mapTuple([buf1, buf2, buf3], Fr.fromBuffer);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2JhcnJldGVuYmVyZy9jcnlwdG8vZWNkc2Evc2lnbmF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUl2RDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUN6QjtJQUNFOztPQUVHO0lBQ0ksQ0FBUztJQUNoQjs7T0FFRztJQUNJLENBQVM7SUFDaEI7O09BRUc7SUFDSSxDQUFTO1FBUlQsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUlULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFJVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBRWhCLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQ3JDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDdkQsT0FBTyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDTixPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU5QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YifQ==