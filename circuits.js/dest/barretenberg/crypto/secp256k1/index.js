/**
 * Secp256k1 elliptic curve operations.
 */
export class Secp256k1 {
    /**
     * Point generator
     * @returns The generator for the curve.
     */
    generator() {
        return Secp256k1.generator;
    }
    /**
     * Multiplies a point by a scalar (adds the point `scalar` amount of time).
     * @param point - Point to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Result of the multiplication.
     */
    mul(point, scalar) {
        point;
        scalar;
        throw new Error('mul not supported');
    }
    /**
     * Gets a random field element.
     * @returns Random field element.
     */
    getRandomFr() {
        throw new Error('getRandomFr not supported');
    }
    /**
     * Converts a 512 bits long buffer to a field.
     * @param uint512Buf - The buffer to convert.
     * @returns Buffer representation of the field element.
     */
    reduce512BufferToFr(uint512Buf) {
        uint512Buf;
        throw new Error('reduce512BufferToFr not supported');
    }
}
// prettier-ignore
Secp256k1.generator = Buffer.from([
    0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07,
    0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98,
    0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0e, 0x11, 0x08, 0xa8,
    0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10, 0xd4, 0xb8,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NyeXB0by9zZWNwMjU2azEvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8sU0FBUztJQVNwQjs7O09BR0c7SUFDSSxTQUFTO1FBQ2QsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEdBQUcsQ0FBQyxLQUFpQixFQUFFLE1BQWtCO1FBQzlDLEtBQUssQ0FBQztRQUNOLE1BQU0sQ0FBQztRQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQkFBbUIsQ0FBQyxVQUFrQjtRQUMzQyxVQUFVLENBQUM7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7QUE1Q0Qsa0JBQWtCO0FBQ1gsbUJBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzdCLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDOUYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUM5RixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0lBQzlGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7Q0FDL0YsQ0FBQyxDQUFDIn0=