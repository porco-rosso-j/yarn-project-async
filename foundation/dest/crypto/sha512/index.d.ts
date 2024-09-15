import { type Bufferable } from '../../serialize/serialize.js';
export declare const sha512: (data: Buffer) => Buffer;
/**
 * @dev We don't truncate in this function (unlike in sha256ToField) because this function is used in situations where
 * we don't care only about collision resistance but we need the output to be uniformly distributed as well. This is
 * because we use it as a pseudo-random function.
 */
export declare const sha512ToGrumpkinScalar: (data: Bufferable[]) => import("../../fields/fields.js").Fq;
//# sourceMappingURL=index.d.ts.map