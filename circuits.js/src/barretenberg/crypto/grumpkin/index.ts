import { Fr, type GrumpkinScalar, Point } from '@aztec/foundation/fields';

// import { NativeModules } from 'react-native';
// const { BBSwiftModule } = NativeModules;

// eslint-disable-next-line require-await
async function emptyAsyncMethod(): Promise<any> {
  return Promise.resolve('This is the returned value.');
}

/**
 * Grumpkin elliptic curve operations.
 */
export class Grumpkin {
  // prettier-ignore
  static generator = Point.fromBuffer(Buffer.from([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xcf, 0x13, 0x5e, 0x75, 0x06, 0xa4, 0x5d, 0x63,
    0x2d, 0x27, 0x0d, 0x45, 0xf1, 0x18, 0x12, 0x94, 0x83, 0x3f, 0xc4, 0x8d, 0x82, 0x3f, 0x27, 0x2c,
  ]));

  /**
   * Point generator
   * @returns The generator for the curve.
   */
  public generator(): Point {
    return Grumpkin.generator;
  }

  /**
   * Multiplies a point by a scalar (adds the point `scalar` amount of times).
   * @param point - Point to multiply.
   * @param scalar - Scalar to multiply by.
   * @returns Result of the multiplication.
   */
  public async mul(point: Point, scalar: GrumpkinScalar): Promise<Point> {
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
  public async add(a: Point, b: Point): Promise<Point> {
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
  public batchMul(points: Point[], scalar: GrumpkinScalar) {
    points;
    scalar;
    throw new Error('batchMul not supported');
  }

  /**
   * Gets a random field element.
   * @returns Random field element.
   */
  public getRandomFr(): Fr {
    throw new Error('getRandomFr not supported');
  }

  /**
   * Converts a 512 bits long buffer to a field.
   * @param uint512Buf - The buffer to convert.
   * @returns Buffer representation of the field element.
   */
  public reduce512BufferToFr(uint512Buf: Buffer): Fr {
    uint512Buf;
    throw new Error('reduce512BufferToFr not supported');
  }
}
