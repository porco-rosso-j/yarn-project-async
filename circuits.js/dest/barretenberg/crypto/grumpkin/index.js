// import { BarretenbergSync } from '@aztec/bb.js';
import { Barretenberg } from '@aztec/bb.js';
import { Point } from '@aztec/foundation/fields';
// import { NativeModules } from 'react-native';
// const { BBSwiftModule } = NativeModules;
// eslint-disable-next-line require-await
async function emptyAsyncMethod() {
    return Promise.resolve('This is the returned value.');
}
/**
 * Grumpkin elliptic curve operations.
 */
export class Grumpkin {
    /**
     * Point generator
     * @returns The generator for the curve.
     */
    generator() {
        return Grumpkin.generator;
    }
    /**
     * Multiplies a point by a scalar (adds the point `scalar` amount of times).
     * @param point - Point to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Result of the multiplication.
     */
    async mul(point, scalar) {
        const bb = Barretenberg.new();
        return Point.fromBuffer(await bb.eccGrumpkinMul(point.toBuffer(), scalar.toBuffer()));
    }
    /**
     * Add two points.
     * @param a - Point a in the addition
     * @param b - Point b to add to a
     * @returns Result of the addition.
     */
    async add(a, b) {
        const bb = Barretenberg.new();
        return Point.fromBuffer(await bb.eccGrumpkinAdd(a.toBuffer(), b.toBuffer()));
    }
    /**
     * Multiplies a set of points by a scalar.
     * @param points - Points to multiply.
     * @param scalar - Scalar to multiply by.
     * @returns Points multiplied by the scalar.
     */
    batchMul(points, scalar) {
        points;
        scalar;
        throw new Error('batchMul not supported');
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
Grumpkin.generator = Point.fromBuffer(Buffer.from([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xcf, 0x13, 0x5e, 0x75, 0x06, 0xa4, 0x5d, 0x63,
    0x2d, 0x27, 0x0d, 0x45, 0xf1, 0x18, 0x12, 0x94, 0x83, 0x3f, 0xc4, 0x8d, 0x82, 0x3f, 0x27, 0x2c,
]));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NyeXB0by9ncnVtcGtpbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtREFBbUQ7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQTJCLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFFLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFFM0MseUNBQXlDO0FBQ3pDLEtBQUssVUFBVSxnQkFBZ0I7SUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFTbkI7OztPQUdHO0lBQ0ksU0FBUztRQUNkLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQVksRUFBRSxNQUFzQjtRQUNuRCxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQVEsRUFBRSxDQUFRO1FBQ2pDLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM5QixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLFFBQVEsQ0FBQyxNQUFlLEVBQUUsTUFBc0I7UUFDckQsTUFBTSxDQUFDO1FBQ1AsTUFBTSxDQUFDO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxXQUFXO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1CQUFtQixDQUFDLFVBQWtCO1FBQzNDLFVBQVUsQ0FBQztRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN2RCxDQUFDOztBQWxFRCxrQkFBa0I7QUFDWCxrQkFBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUM5QyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0lBQzlGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDOUYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUM5RixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0NBQy9GLENBQUMsQ0FBQyxDQUFDIn0=