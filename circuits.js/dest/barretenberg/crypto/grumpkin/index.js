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
        // return BBSwiftModule.eccGrumpkinMul(point, scalar)
        //   .then((resultBuffer: any) => {
        //     console.log('Result:', resultBuffer);
        //     if (!resultBuffer) {
        //       throw new Error('eccGrumpkinMul returned null or encountered an error');
        //     }
        //     return Point.fromBuffer(Buffer.from(resultBuffer));
        //   })
        //   .catch((error: any) => {
        //     console.error('Error:', error);
        //   });
        point;
        scalar;
        return await emptyAsyncMethod();
    }
    /**
     * Add two points.
     * @param a - Point a in the addition
     * @param b - Point b to add to a
     * @returns Result of the addition.
     */
    async add(a, b) {
        // return BBSwiftModule.eccGrumpkinAdd(a, b)
        //   .then((resultBuffer: any) => {
        //     console.log('Result:', resultBuffer);
        //     if (!resultBuffer) {
        //       throw new Error('eccGrumpkinAdd returned null or encountered an error');
        //     }
        //     return Point.fromBuffer(Buffer.from(resultBuffer));
        //   })
        //   .catch((error: any) => {
        //     console.error('Error:', error);
        //   });
        a;
        b;
        return await emptyAsyncMethod();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NyeXB0by9ncnVtcGtpbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTJCLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFFLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFFM0MseUNBQXlDO0FBQ3pDLEtBQUssVUFBVSxnQkFBZ0I7SUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFTbkI7OztPQUdHO0lBQ0ksU0FBUztRQUNkLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQVksRUFBRSxNQUFzQjtRQUNuRCxxREFBcUQ7UUFDckQsbUNBQW1DO1FBQ25DLDRDQUE0QztRQUM1QywyQkFBMkI7UUFDM0IsaUZBQWlGO1FBQ2pGLFFBQVE7UUFDUiwwREFBMEQ7UUFDMUQsT0FBTztRQUNQLDZCQUE2QjtRQUM3QixzQ0FBc0M7UUFDdEMsUUFBUTtRQUNSLEtBQUssQ0FBQztRQUNOLE1BQU0sQ0FBQztRQUNQLE9BQU8sTUFBTSxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDakMsNENBQTRDO1FBQzVDLG1DQUFtQztRQUNuQyw0Q0FBNEM7UUFDNUMsMkJBQTJCO1FBQzNCLGlGQUFpRjtRQUNqRixRQUFRO1FBQ1IsMERBQTBEO1FBQzFELE9BQU87UUFDUCw2QkFBNkI7UUFDN0Isc0NBQXNDO1FBQ3RDLFFBQVE7UUFDUixDQUFDLENBQUM7UUFDRixDQUFDLENBQUM7UUFDRixPQUFPLE1BQU0sZ0JBQWdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxRQUFRLENBQUMsTUFBZSxFQUFFLE1BQXNCO1FBQ3JELE1BQU0sQ0FBQztRQUNQLE1BQU0sQ0FBQztRQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQkFBbUIsQ0FBQyxVQUFrQjtRQUMzQyxVQUFVLENBQUM7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7QUExRkQsa0JBQWtCO0FBQ1gsa0JBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDOUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUM5RixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0lBQzlGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7SUFDOUYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtDQUMvRixDQUFDLENBQUMsQ0FBQyJ9